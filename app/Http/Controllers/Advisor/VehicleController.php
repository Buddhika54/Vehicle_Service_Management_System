<?php

namespace App\Http\Controllers\Advisor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function __construct(
        protected VehicleService $vehicleService
    ) {}

    public function index(Request $request, ?Customer $customer = null): Response
    {
        $customerId = $customer?->id ?? $request->input('customer_id');
        $search = $request->input('search');

        $vehicles = $this->vehicleService->getPaginatedVehicles(
            customerId: $customerId ? (int) $customerId : null,
            search: $search
        );

        $selectedCustomer = $customer?->id ? $customer : ($customerId ? Customer::find($customerId) : null);

        $customers = Customer::select('id', 'name', 'phone', 'email')
            ->orderBy('name')
            ->get();

        return Inertia::render('Advisor/Vehicles/Index', [
            'vehicles' => $vehicles,
            'customers' => $customers,
            'selectedCustomer' => $selectedCustomer,
            'filters' => [
                'search' => $search,
                'customer_id' => $customerId,
            ],
        ]);
    }

    public function store(StoreVehicleRequest $request): RedirectResponse
    {
        $this->vehicleService->createVehicle($request->validated());

        return redirect()->back()->with('success', 'Vehicle added successfully.');
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $this->vehicleService->updateVehicle($vehicle, $request->validated());

        return redirect()->back()->with('success', 'Vehicle updated successfully.');
    }

    public function destroy(Request $request, Vehicle $vehicle): RedirectResponse
    {
        Gate::authorize('delete', $vehicle);

        $this->vehicleService->deleteVehicle($vehicle);

        return redirect()->back()->with('success', 'Vehicle deleted successfully.');
    }
}
