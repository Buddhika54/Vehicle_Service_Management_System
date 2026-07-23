<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Customer;
use App\Services\BookingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function __construct(
        protected BookingService $bookingService
    ) {}

    /**
     * Get or ensure customer profile for current user.
     */
    protected function getCustomerProfile(): Customer
    {
        $user = auth()->user();

        $customer = Customer::where('user_id', $user->id)
            ->orWhere('email', $user->email)
            ->first();

        if (! $customer) {
            $customer = Customer::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'phone' => 'Not provided',
            ]);
        } elseif (! $customer->user_id) {
            $customer->update(['user_id' => $user->id]);
        }

        return $customer;
    }

    /**
     * Display a listing of customer's bookings.
     */
    public function index(): Response
    {
        $customer = $this->getCustomerProfile();
        $bookings = $this->bookingService->getBookingsForCustomer($customer->id);

        return Inertia::render('Customer/Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Show the form for creating a new booking.
     */
    public function create(): Response
    {
        $customer = $this->getCustomerProfile();
        $customer->load('vehicles');

        return Inertia::render('Customer/Bookings/Create', [
            'vehicles' => $customer->vehicles,
        ]);
    }

    /**
     * Store a newly created booking in storage.
     */
    public function store(StoreBookingRequest $request): RedirectResponse
    {
        $customer = $this->getCustomerProfile();

        $data = array_merge($request->validated(), [
            'customer_id' => $customer->id,
        ]);

        $this->bookingService->createBooking($data);

        return redirect()
            ->route('customer.bookings.index')
            ->with('success', 'Booking created successfully.');
    }

    /**
     * Cancel an existing booking.
     */
    public function destroy(Booking $booking): RedirectResponse
    {
        Gate::authorize('cancel', $booking);

        $this->bookingService->cancelBooking($booking);

        return redirect()
            ->back()
            ->with('success', 'Booking cancelled successfully.');
    }
}
