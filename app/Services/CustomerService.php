<?php

namespace App\Services;

use App\Models\Customer;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class CustomerService
{
    public function getPaginatedCustomers(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Customer::query()
            ->withCount('vehicles')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createCustomer(array $data): Customer
    {
        return DB::transaction(function () use ($data) {
            return Customer::create($data);
        });
    }

    public function updateCustomer(Customer $customer, array $data): Customer
    {
        return DB::transaction(function () use ($customer, $data) {
            $customer->update($data);

            return $customer;
        });
    }

    public function deleteCustomer(Customer $customer): void
    {
        DB::transaction(function () use ($customer) {
            $customer->delete();
        });
    }
}
