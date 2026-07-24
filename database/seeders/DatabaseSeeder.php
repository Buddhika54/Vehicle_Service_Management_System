<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
\App\Models\Part::factory(20)->create();
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CustomerSeeder::class,
        ]);
    }
}
