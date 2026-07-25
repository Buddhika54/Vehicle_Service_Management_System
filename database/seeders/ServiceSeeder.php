<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name' => 'Oil Change', 'base_labor_hours' => 0.5, 'hourly_rate' => 50],
            ['name' => 'Brake Pad Replacement', 'base_labor_hours' => 1.5, 'hourly_rate' => 60],
            ['name' => 'Tire Rotation', 'base_labor_hours' => 0.5, 'hourly_rate' => 45],
            ['name' => 'General Inspection', 'base_labor_hours' => 1.0, 'hourly_rate' => 50],
            ['name' => 'Engine Diagnostic', 'base_labor_hours' => 1.5, 'hourly_rate' => 70],
            ['name' => 'Battery Replacement', 'base_labor_hours' => 0.5, 'hourly_rate' => 45],
            ['name' => 'Air Filter Replacement', 'base_labor_hours' => 0.5, 'hourly_rate' => 40],
            ['name' => 'Timing Belt Replacement', 'base_labor_hours' => 3.0, 'hourly_rate' => 75],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(['name' => $service['name']], $service);
        }
    }
}
