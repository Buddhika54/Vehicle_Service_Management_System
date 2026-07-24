<?php

namespace App\Http\Controllers\Advisor;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Part;
use App\Services\BookingService;
use App\Services\MechanicService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function __construct(
        protected BookingService $bookingService,
        protected MechanicService $mechanicService
    ) {}

    /**
     * Display a listing of all bookings for advisors/admins.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Booking::class);

        $filters = [
            'status' => $request->input('status'),
            'date' => $request->input('date'),
        ];

        $bookings = $this->bookingService->getPaginatedBookings($filters);
        $mechanics = $this->mechanicService->getAllMechanics();
        $parts = Part::query()
            ->select(['id', 'name', 'unit_price'])
            ->orderBy('name')
            ->get();

        return Inertia::render('Advisor/Bookings/Index', [
            'bookings' => $bookings,
            'mechanics' => $mechanics,
            'parts' => $parts,
            'filters' => $filters,
        ]);
    }

    /**
     * Assign a mechanic to a booking.
     */
    public function assignMechanic(Booking $booking, Request $request): RedirectResponse
    {
        Gate::authorize('update', $booking);

        $validated = $request->validate([
            'mechanic_id' => ['required', 'integer', 'exists:mechanics,id'],
        ]);

        $this->bookingService->assignMechanic($booking, (int) $validated['mechanic_id']);

        return redirect()->back()->with('success', 'Mechanic assigned successfully.');
    }

    /**
     * Update status of a booking.
     */
    public function updateStatus(Booking $booking, Request $request): RedirectResponse
    {
        Gate::authorize('update', $booking);

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,in_progress,completed,cancelled'],
        ]);

        $this->bookingService->updateStatus($booking, $validated['status']);

        return redirect()->back()->with('success', 'Booking status updated successfully.');
    }

    public function attachParts(Request $request, \App\Models\Booking $booking)
    {
        $request->validate([
            'parts' => ['required', 'array', 'min:1'],
            'parts.*.part_id' => ['required', 'exists:parts,id'],
            'parts.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $this->bookingService->attachParts($booking, $request->parts);

        return back()->with('success', 'Parts attached.');
    }
}
