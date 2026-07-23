<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vehicle;

class VehiclePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor', 'customer']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Vehicle $vehicle): bool
    {
        if ($user->hasRole('customer')) {
            return $user->customer !== null && $vehicle->customer_id === $user->customer->id;
        }

        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor', 'customer']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Vehicle $vehicle): bool
    {
        if ($user->hasRole('customer')) {
            return false;
        }

        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Vehicle $vehicle): bool
    {
        if ($user->hasRole('customer')) {
            return false;
        }

        return $user->hasAnyRole(['admin', 'service_advisor']);
    }
}
