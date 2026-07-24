<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['booking_id', 'invoice_number', 'labor_cost', 'parts_cost', 'total', 'payment_status'])]
class Invoice extends Model
{
    protected function casts(): array
    {
        return [
            'labor_cost' => 'decimal:2',
            'parts_cost' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}