<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StaffService
{
    public function createStaff(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

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

            if (isset($data['password'])) {
                $user->update([
                    'password' => Hash::make($data['password']),
                ]);
            }

            if (isset($data['role'])) {
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
        return User::role(['admin', 'service_advisor', 'mechanic'])
            ->with('roles')
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
