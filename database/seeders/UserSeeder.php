<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@test.com'],
            ['name' => 'Admin User', 'password' => bcrypt('password')]
        );
        $admin->assignRole('admin');

        $advisor = User::firstOrCreate(
            ['email' => 'advisor@test.com'],
            ['name' => 'Service Advisor', 'password' => bcrypt('password')]
        );
        $advisor->assignRole('service_advisor');

        $mechanic = User::firstOrCreate(
            ['email' => 'mechanic@test.com'],
            ['name' => 'Mechanic User', 'password' => bcrypt('password')]
        );
        $mechanic->assignRole('mechanic');
    }
}