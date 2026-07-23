<?php

namespace App\Models;

use Database\Factories\MechanicFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string $employee_id
 * @property string $name
 * @property string|null $specialization
 * @property string $contact
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Mechanic extends Model
{
    /** @use HasFactory<MechanicFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employee_id',
        'name',
        'specialization',
        'contact',
    ];

    /**
     * Get the user account linked to this mechanic (optional).
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the bookings assigned to this mechanic.
     *
     * @return HasMany<Booking, $this>
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
