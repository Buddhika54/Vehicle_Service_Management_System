<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles/permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'manage-customers',
            'manage-vehicles',
            'manage-mechanics',
            'manage-bookings',
            'manage-parts',
            'manage-billing',
            'view-dashboard',
            'view-own-jobs',
            'update-job-status',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions(Permission::all());

        $advisor = Role::firstOrCreate(['name' => 'service_advisor']);
        $advisor->syncPermissions([
            'manage-customers',
            'manage-vehicles',
            'manage-bookings',
            'manage-billing',
            'view-dashboard',
        ]);

        $mechanic = Role::firstOrCreate(['name' => 'mechanic']);
        $mechanic->syncPermissions([
            'view-own-jobs',
            'update-job-status',
        ]);
    }
}