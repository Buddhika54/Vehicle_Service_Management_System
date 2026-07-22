<?php

namespace App\Services;

use App\Models\Vehicle;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class VehicleService
{
    public function getPaginatedVehicles(?int $customerId = null, ?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Vehicle::query()
            ->with('customer')
            ->when($customerId, function ($query, $customerId) {
                $query->where('customer_id', $customerId);
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('registration_no', 'like', "%{$search}%")
                        ->orWhere('make', 'like', "%{$search}%")
                        ->orWhere('model', 'like', "%{$search}%")
                        ->orWhere('vin', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createVehicle(array $data): Vehicle
    {
        return DB::transaction(function () use ($data) {
            return Vehicle::create([
                'customer_id' => $data['customer_id'],
                'registration_no' => strtoupper($data['registration_no']),
                'make' => $data['make'],
                'model' => $data['model'],
                'year' => (int) $data['year'],
                'vin' => isset($data['vin']) && filled($data['vin']) ? strtoupper($data['vin']) : null,
                'mileage' => (int) ($data['mileage'] ?? 0),
            ]);
        });
    }

    public function updateVehicle(Vehicle $vehicle, array $data): Vehicle
    {
        return DB::transaction(function () use ($vehicle, $data) {
            $vehicle->update([
                'customer_id' => $data['customer_id'],
                'registration_no' => strtoupper($data['registration_no']),
                'make' => $data['make'],
                'model' => $data['model'],
                'year' => (int) $data['year'],
                'vin' => isset($data['vin']) && filled($data['vin']) ? strtoupper($data['vin']) : null,
                'mileage' => (int) ($data['mileage'] ?? 0),
            ]);

            return $vehicle;
        });
    }

    public function deleteVehicle(Vehicle $vehicle): void
    {
        DB::transaction(function () use ($vehicle) {
            $vehicle->delete();
        });
    }
}
