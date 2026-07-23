<?php

namespace App\Services;

use App\Models\Mechanic;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class MechanicService
{
    /**
     * Get paginated mechanics with optional search.
     *
     * @return LengthAwarePaginator<Mechanic>
     */
    public function getPaginatedMechanics(?string $search = null, int $perPage = 15): LengthAwarePaginator
    {
        return Mechanic::query()
            ->with('user')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('employee_id', 'like', "%{$search}%")
                        ->orWhere('specialization', 'like', "%{$search}%")
                        ->orWhere('contact', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Get all mechanics as a simple collection (for dropdowns).
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, Mechanic>
     */
    public function getAllMechanics()
    {
        return Mechanic::orderBy('name')->get(['id', 'employee_id', 'name', 'specialization']);
    }

    public function createMechanic(array $data): Mechanic
    {
        return DB::transaction(function () use ($data) {
            return Mechanic::create([
                'user_id' => $data['user_id'] ?? null,
                'employee_id' => strtoupper($data['employee_id']),
                'name' => $data['name'],
                'specialization' => $data['specialization'] ?? null,
                'contact' => $data['contact'],
            ]);
        });
    }

    public function updateMechanic(Mechanic $mechanic, array $data): Mechanic
    {
        return DB::transaction(function () use ($mechanic, $data) {
            $mechanic->update([
                'user_id' => $data['user_id'] ?? null,
                'employee_id' => strtoupper($data['employee_id']),
                'name' => $data['name'],
                'specialization' => $data['specialization'] ?? null,
                'contact' => $data['contact'],
            ]);

            return $mechanic;
        });
    }

    public function deleteMechanic(Mechanic $mechanic): void
    {
        DB::transaction(function () use ($mechanic) {
            $mechanic->delete();
        });
    }
}
