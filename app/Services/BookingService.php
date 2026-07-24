<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingPart;
use App\Models\Invoice;
use App\Models\Part;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BookingService
{
    /**
     * Valid status transitions map.
     *
     * @var array<string, list<string>>
     */
    private const ALLOWED_TRANSITIONS = [
        'pending' => ['in_progress', 'cancelled'],
        'in_progress' => ['completed', 'cancelled'],
        'completed' => [],
        'cancelled' => [],
    ];

    /**
     * Create a new booking with conflict checking wrapped in a database transaction.
     *
     * @param  array<string, mixed>  $data
     *
     * @throws ValidationException
     */
    public function createBooking(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            $scheduledAt = Carbon::parse($data['scheduled_at']);
            $vehicleId = $data['vehicle_id'];
            $mechanicId = $data['mechanic_id'] ?? null;

            $windowStart = $scheduledAt->copy()->subHours(2);
            $windowEnd = $scheduledAt->copy()->addHours(2);

            // Prevent vehicle double-booking
            $vehicleConflict = Booking::where('vehicle_id', $vehicleId)
                ->where('status', '!=', 'cancelled')
                ->whereBetween('scheduled_at', [$windowStart, $windowEnd])
                ->exists();

            if ($vehicleConflict) {
                throw ValidationException::withMessages([
                    'scheduled_at' => 'This vehicle already has a booking scheduled near this time window.',
                ]);
            }

            // Prevent mechanic double-booking if a mechanic is specified
            if ($mechanicId) {
                $mechanicConflict = Booking::where('mechanic_id', $mechanicId)
                    ->where('status', '!=', 'cancelled')
                    ->whereBetween('scheduled_at', [$windowStart, $windowEnd])
                    ->exists();

                if ($mechanicConflict) {
                    throw ValidationException::withMessages([
                        'scheduled_at' => 'The selected mechanic is already booked near this time slot.',
                    ]);
                }
            }

            return Booking::create([
                'customer_id' => $data['customer_id'],
                'vehicle_id' => $vehicleId,
                'mechanic_id' => $mechanicId,
                'scheduled_at' => $scheduledAt,
                'status' => 'pending',
                'service_type' => $data['service_type'],
                'notes' => $data['notes'] ?? null,
            ]);
        });
    }

    /**
     * Get paginated bookings for a customer.
     *
     * @return LengthAwarePaginator<Booking>
     */
    public function getBookingsForCustomer(int $customerId, int $perPage = 10): LengthAwarePaginator
    {
        return Booking::where('customer_id', $customerId)
            ->with(['vehicle', 'mechanic'])
            ->orderBy('scheduled_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Get all bookings for advisor/admin view, with optional filters.
     *
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Booking>
     */
    public function getPaginatedBookings(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return Booking::query()
            ->with(['customer', 'vehicle', 'mechanic'])
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($filters['date'] ?? null, function ($query, $date) {
                $query->whereDate('scheduled_at', $date);
            })
            ->with(['customer', 'vehicle', 'mechanic'])
            ->orderBy('scheduled_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Assign a mechanic to a booking, with conflict detection using pessimistic locking.
     *
     * @throws ValidationException
     */
    public function assignMechanic(Booking $booking, int $mechanicId): Booking
    {
        return DB::transaction(function () use ($booking, $mechanicId) {
            $scheduledAt = $booking->scheduled_at;
            $windowStart = $scheduledAt->copy()->subHours(2);
            $windowEnd = $scheduledAt->copy()->addHours(2);

            // Lock conflicting rows for this mechanic to prevent race conditions
            $conflict = Booking::where('mechanic_id', $mechanicId)
                ->where('id', '!=', $booking->id)
                ->where('status', ['cancelled', 'completed'])
                ->whereBetween('scheduled_at', [$windowStart, $windowEnd])
                ->lockForUpdate()
                ->exists();

            if ($conflict) {
                throw ValidationException::withMessages([
                    'mechanic_id' => 'This mechanic is already booked in that time window. Choose a different mechanic or time.',
                ]);
            }

            $booking->update(['mechanic_id' => $mechanicId]);

            return $booking->fresh();
        });
    }

    /**
     * Update booking status, validating that the transition is legal.
     *
     * Legal transitions:
     *   pending     → in_progress | cancelled
     *   in_progress → completed   | cancelled
     *   completed   → (none)
     *   cancelled   → (none)
     *
     * @throws ValidationException
     */
    public function updateStatus(Booking $booking, string $newStatus): Booking
    {
        $currentStatus = $booking->status;
        $allowed = self::ALLOWED_TRANSITIONS[$currentStatus] ?? [];

        if (! in_array($newStatus, $allowed, true)) {
            throw ValidationException::withMessages([
                'status' => "Cannot transition booking from '{$currentStatus}' to '{$newStatus}'.",
            ]);
        }

        return DB::transaction(function () use ($booking, $newStatus) {
            if ($newStatus === 'completed') {
                $bookingParts = $booking->bookingParts()->with('part')->get();

                $partsCost = 0;

                foreach ($bookingParts as $bp) {
                    $part = Part::lockForUpdate()->findOrFail($bp->part_id);

                    if ($part->stock_quantity < $bp->quantity) {
                        throw ValidationException::withMessages([
                            'stock' => "Not enough stock for {$part->name} to complete this job.",
                        ]);
                    }

                    $part->decrement('stock_quantity', $bp->quantity);
                    $partsCost += $bp->quantity * $bp->unit_price;
                }

                $laborCost = self::LABOR_RATE_PER_HOUR * self::DEFAULT_LABOR_HOURS;
                $total = $laborCost + $partsCost;

                Invoice::create([
                    'booking_id' => $booking->id,
                    'invoice_number' => $this->generateInvoiceNumber(),
                    'labor_cost' => $laborCost,
                    'parts_cost' => $partsCost,
                    'total' => $total,
                    'payment_status' => 'pending',
                ]);
            }

            $booking->update(['status' => $newStatus]);

            // Day 5 hook: when status transitions to 'completed', stock deduction will go here.

            return $booking->fresh(['invoice']);
        });
    }

    protected function generateInvoiceNumber(): string
    {
        $year = now()->year;
        $lastInvoice = Invoice::where('invoice_number', 'like', "INV-{$year}-%")
            ->orderByDesc('invoice_number')
            ->first();

        $nextNumber = $lastInvoice
            ? ((int) substr($lastInvoice->invoice_number, -4)) + 1
            : 1;

        return sprintf('INV-%d-%04d', $year, $nextNumber);
    }

    /**
     * Cancel a pending booking.
     *
     * @throws ValidationException
     */
    public function cancelBooking(Booking $booking): Booking
    {
        if ($booking->status !== 'pending') {
            throw ValidationException::withMessages([
                'status' => 'Only pending bookings can be cancelled.',
            ]);
        }

        return DB::transaction(function () use ($booking) {
            $booking->update([
                'status' => 'cancelled',
            ]);

            return $booking;
        });
    }
    const LABOR_RATE_PER_HOUR = 50;
    const DEFAULT_LABOR_HOURS = 1.5;

    public function attachParts(Booking $booking, array $parts): Booking
    {
        return DB::transaction(function () use ($booking, $parts) {
            foreach ($parts as $item) {
                $part = Part::lockForUpdate()->findOrFail($item['part_id']);

                if ($part->stock_quantity < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'parts' => "Not enough stock for {$part->name}. Available: {$part->stock_quantity}.",
                    ]);
                }

                BookingPart::create([
                    'booking_id' => $booking->id,
                    'part_id' => $part->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $part->unit_price,
                ]);
            }

            return $booking->fresh(['bookingParts.part']);
        });
    }

}
