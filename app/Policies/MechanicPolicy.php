<?php

namespace App\Policies;

use App\Models\Mechanic;
use App\Models\User;

class MechanicPolicy
{
    /**
     * Determine whether the user can view any mechanics.
     * Advisors need to see mechanics to assign them to bookings.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    /**
     * Determine whether the user can view a specific mechanic.
     */
    public function view(User $user, Mechanic $mechanic): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    /**
     * Determine whether the user can create mechanics.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can update the mechanic.
     */
    public function update(User $user, Mechanic $mechanic): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can delete the mechanic.
     */
    public function delete(User $user, Mechanic $mechanic): bool
    {
        return $user->hasRole('admin');
    }
}
