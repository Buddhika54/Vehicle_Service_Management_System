<?php

namespace App\Services;

use App\Models\Part;
use Illuminate\Support\Facades\DB;

class PartService
{
    public function getPaginatedParts(?string $search = null, int $perPage = 10)
    {
        return Part::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('part_number', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createPart(array $data): Part
    {
        return DB::transaction(fn () => Part::create($data));
    }

    public function updatePart(Part $part, array $data): Part
    {
        return DB::transaction(function () use ($part, $data) {
            $part->update($data);
            return $part;
        });
    }

    public function deletePart(Part $part): void
    {
        $part->delete();
    }

    public function adjustStock(Part $part, int $delta): Part
    {
        return DB::transaction(function () use ($part, $delta) {
            $locked = Part::lockForUpdate()->findOrFail($part->id);
            $locked->stock_quantity = max(0, $locked->stock_quantity + $delta);
            $locked->save();
            return $locked;
        });
    }
}