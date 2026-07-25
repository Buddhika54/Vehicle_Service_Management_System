<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'base_labor_hours', 'hourly_rate'])]
class Service extends Model
{
    protected function casts(): array
    {
        return [
            'base_labor_hours' => 'decimal:2',
            'hourly_rate' => 'decimal:2',
        ];
    }
}
