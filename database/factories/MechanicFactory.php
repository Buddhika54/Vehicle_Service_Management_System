<?php

namespace Database\Factories;

use App\Models\Mechanic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Mechanic>
 */
class MechanicFactory extends Factory
{
    protected $model = Mechanic::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $specializations = [
            'Engine Repair',
            'Electrical Systems',
            'Brake Service',
            'Transmission',
            'Suspension & Steering',
            'Air Conditioning',
            'General Maintenance',
        ];

        return [
            'user_id' => null,
            'employee_id' => 'EMP-'.strtoupper($this->faker->unique()->bothify('##??')),
            'name' => $this->faker->name(),
            'specialization' => $this->faker->randomElement($specializations),
            'contact' => $this->faker->phoneNumber(),
        ];
    }
}
