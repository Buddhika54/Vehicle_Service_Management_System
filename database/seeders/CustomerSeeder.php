<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customer::factory()
            ->count(15)
            ->create()
            ->each(function (Customer $customer) {
                $vehicleCount = rand(1, 3);
                Vehicle::factory()
                    ->count($vehicleCount)
                    ->create([
                        'customer_id' => $customer->id,
                    ]);
            });
    }
}
