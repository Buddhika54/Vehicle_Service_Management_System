<?php

namespace App\Http\Controllers\Advisor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Services\CustomerService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function __construct(
        protected CustomerService $customerService
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $customers = $this->customerService->getPaginatedCustomers($search);

        return Inertia::render('Advisor/Customers/Index', [
            'customers' => $customers,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(StoreCustomerRequest $request): RedirectResponse
    {
        $this->customerService->createCustomer($request->validated());

        return redirect()->back()->with('success', 'Customer created successfully.');
    }

    public function update(UpdateCustomerRequest $request, Customer $customer): RedirectResponse
    {
        $this->customerService->updateCustomer($customer, $request->validated());

        return redirect()->back()->with('success', 'Customer updated successfully.');
    }

    public function destroy(Request $request, Customer $customer): RedirectResponse
    {
        Gate::authorize('delete', $customer);

        $this->customerService->deleteCustomer($customer);

        return redirect()->back()->with('success', 'Customer deleted successfully.');
    }
}
