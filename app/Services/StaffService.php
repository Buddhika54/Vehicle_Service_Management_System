<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class StaffService
{
    public function createStaff(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $data['password'],
            ]);

            Role::findOrCreate($data['role'], 'web');
            $user->assignRole($data['role']);

            return $user;
        });
    }

    public function updateStaff(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {
            $user->update([
                'name' => $data['name'],
                'email' => $data['email'],
            ]);

            if (! empty($data['password'])) {
                $user->update([
                    'password' => $data['password'],
                ]);
            }

            if (isset($data['role'])) {
                Role::findOrCreate($data['role'], 'web');
                $user->syncRoles([$data['role']]);
            }

            return $user;
        });
    }

    public function deleteStaff(User $user): void
    {
        DB::transaction(function () use ($user) {
            $user->syncRoles([]);
            $user->delete();
        });
    }

    public function getStaffUsers()
    {
        return User::with('roles')
            ->whereHas('roles', function ($query) {
                $query->whereIn('name', ['admin', 'service_advisor', 'mechanic']);
            })
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
