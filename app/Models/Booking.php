<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $id
 * @property int $customer_id
 * @property int $vehicle_id
 * @property int|null $mechanic_id
 * @property Carbon $scheduled_at
 * @property string $status
 * @property string $service_type
 * @property string|null $notes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['customer_id', 'vehicle_id', 'mechanic_id', 'scheduled_at', 'status', 'service_type', 'notes'])]
class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'mechanic_id',
        'scheduled_at',
        'status',
        'service_type',
        'notes',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
        ];
    }

    /**
     * Get the customer that owns the booking.
     *
     * @return BelongsTo<Customer, $this>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the vehicle associated with the booking.
     *
     * @return BelongsTo<Vehicle, $this>
     */
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Get the mechanic assigned to the booking.
     *
     * @return BelongsTo<Mechanic, $this>
     */
    public function mechanic(): BelongsTo
    {
        return $this->belongsTo(Mechanic::class);
    }

    /**
     * Get the parts associated with the booking.
     *
     * @return HasMany<BookingPart>
     */
    public function bookingParts(): HasMany
    {
        return $this->hasMany(BookingPart::class);      
    }

    /**
     * Get the invoice associated with the booking.
     *
     * @return HasOne<Invoice>
     */
    public function invoice(): HasOne
    {
        return $this->hasOne(Invoice::class);
    }

}
