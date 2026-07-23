<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerStoreVehicleRequest;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function __construct(
        protected VehicleService $vehicleService
    ) {}

    /**
     * Get or ensure customer profile for current user.
     */
    protected function getCustomerProfile(): Customer
    {
        $user = auth()->user();

        $customer = $user->customer;

        if (! $customer) {
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
        }

        return $customer;
    }

    /**
     * Display a listing of customer's vehicles.
     */
    public function index(): Response
    {
        $customer = $this->getCustomerProfile();

        $vehicles = Vehicle::where('customer_id', $customer->id)
            ->latest()
            ->get();

        return Inertia::render('Customer/Vehicles/Index', [
            'vehicles' => $vehicles,
        ]);
    }

    /**
     * Show the form for creating a new vehicle.
     */
    public function create(): Response
    {
        Gate::authorize('create', Vehicle::class);

        return Inertia::render('Customer/Vehicles/Create');
    }

    /**
     * Store a newly created vehicle in storage.
     */
    public function store(CustomerStoreVehicleRequest $request): RedirectResponse
    {
        Gate::authorize('create', Vehicle::class);

        $customer = $this->getCustomerProfile();

        $this->vehicleService->createVehicleForCustomer($customer->id, $request->validated());

        return redirect()
            ->route('customer.vehicles.index')
            ->with('success', 'Vehicle added successfully.');
    }
}
