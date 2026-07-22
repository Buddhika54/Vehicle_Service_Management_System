<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $makesAndModels = [
            'Toyota' => ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
            'Honda' => ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'],
            'Ford' => ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus'],
            'Chevrolet' => ['Silverado', 'Malibu', 'Equinox', 'Tahoe', 'Cruze'],
            'Nissan' => ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier'],
            'BMW' => ['3 Series', '5 Series', 'X3', 'X5', 'M3'],
        ];

        $make = fake()->randomElement(array_keys($makesAndModels));
        $model = fake()->randomElement($makesAndModels[$make]);

        return [
            'customer_id' => Customer::factory(),
            'registration_no' => strtoupper(fake()->bothify('??# ???')).rand(10, 99),
            'make' => $make,
            'model' => $model,
            'year' => fake()->numberBetween(2010, 2024),
            'vin' => strtoupper(fake()->bothify('1HGCR2F8#HA######')),
            'mileage' => fake()->numberBetween(5000, 180000),
        ];
    }
}
