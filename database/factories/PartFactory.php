<?php

namespace Database\Factories;

use App\Models\Part;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Part>
 */
class PartFactory extends Factory
{
    public function definition(): array
    {
        $names = ['Brake Pad Set', 'Oil Filter', 'Air Filter', 'Spark Plug', 'Timing Belt', 'Battery', 'Radiator Hose', 'Clutch Kit', 'Wiper Blade', 'Fuel Pump'];

        return [
            'name' => fake()->randomElement($names),
            'part_number' => 'PN-' . fake()->unique()->numberBetween(10000, 99999),
            'description' => fake()->sentence(),
            'unit_price' => fake()->randomFloat(2, 5, 300),
            'stock_quantity' => fake()->numberBetween(0, 50),
            'low_stock_threshold' => 5,
        ];
    }
}
