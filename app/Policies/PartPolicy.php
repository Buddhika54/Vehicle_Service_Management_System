<?php

namespace App\Policies;

use App\Models\Part;
use App\Models\User;

class PartPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    public function view(User $user, Part $part): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    public function update(User $user, Part $part): bool
    {
        return $user->hasRole('admin');
    }

    public function delete(User $user, Part $part): bool
    {
        return $user->hasRole('admin');
    }
}