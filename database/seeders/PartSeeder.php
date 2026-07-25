<?php

namespace Database\Seeders;

use App\Models\Part;
use Illuminate\Database\Seeder;

class PartSeeder extends Seeder
{
    public function run(): void
    {
        $parts = [
            ['name' => 'Brake Pad Set', 'part_number' => 'PN-10001', 'description' => 'Front and rear brake pad set for most vehicles.', 'unit_price' => 45.99, 'stock_quantity' => 20, 'low_stock_threshold' => 5],
            ['name' => 'Oil Filter', 'part_number' => 'PN-10002', 'description' => 'Standard oil filter compatible with most engines.', 'unit_price' => 8.99, 'stock_quantity' => 50, 'low_stock_threshold' => 10],
            ['name' => 'Air Filter', 'part_number' => 'PN-10003', 'description' => 'Engine air filter for improved airflow.', 'unit_price' => 12.50, 'stock_quantity' => 30, 'low_stock_threshold' => 5],
            ['name' => 'Spark Plug Set', 'part_number' => 'PN-10004', 'description' => 'Set of 4 iridium spark plugs.', 'unit_price' => 34.00, 'stock_quantity' => 25, 'low_stock_threshold' => 5],
            ['name' => 'Timing Belt', 'part_number' => 'PN-10005', 'description' => 'OEM-grade timing belt for engine synchronization.', 'unit_price' => 89.99, 'stock_quantity' => 10, 'low_stock_threshold' => 3],
            ['name' => 'Car Battery', 'part_number' => 'PN-10006', 'description' => '12V 70Ah maintenance-free battery.', 'unit_price' => 129.00, 'stock_quantity' => 15, 'low_stock_threshold' => 3],
            ['name' => 'Radiator Hose', 'part_number' => 'PN-10007', 'description' => 'Upper and lower radiator hose kit.', 'unit_price' => 22.75, 'stock_quantity' => 12, 'low_stock_threshold' => 4],
            ['name' => 'Clutch Kit', 'part_number' => 'PN-10008', 'description' => 'Complete clutch kit including disc, pressure plate, and bearing.', 'unit_price' => 189.95, 'stock_quantity' => 8, 'low_stock_threshold' => 2],
            ['name' => 'Wiper Blade Set', 'part_number' => 'PN-10009', 'description' => 'Front wiper blade pair, all-weather silicone.', 'unit_price' => 18.50, 'stock_quantity' => 40, 'low_stock_threshold' => 8],
            ['name' => 'Fuel Pump', 'part_number' => 'PN-10010', 'description' => 'Electric fuel pump module with sending unit.', 'unit_price' => 149.00, 'stock_quantity' => 6, 'low_stock_threshold' => 2],
            ['name' => 'Cabin Air Filter', 'part_number' => 'PN-10011', 'description' => 'Activated carbon cabin air filter.', 'unit_price' => 14.99, 'stock_quantity' => 35, 'low_stock_threshold' => 8],
            ['name' => 'Serpentine Belt', 'part_number' => 'PN-10012', 'description' => 'Multi-rib drive belt for accessory components.', 'unit_price' => 27.50, 'stock_quantity' => 18, 'low_stock_threshold' => 5],
            ['name' => 'Brake Rotor Pair', 'part_number' => 'PN-10013', 'description' => 'Vented front brake rotors, sold as a pair.', 'unit_price' => 95.00, 'stock_quantity' => 10, 'low_stock_threshold' => 3],
            ['name' => 'Engine Oil (5W-30)', 'part_number' => 'PN-10014', 'description' => 'Full synthetic 5W-30 engine oil, 5L.', 'unit_price' => 32.00, 'stock_quantity' => 60, 'low_stock_threshold' => 15],
            ['name' => 'Transmission Fluid', 'part_number' => 'PN-10015', 'description' => 'ATF+4 automatic transmission fluid, 4L.', 'unit_price' => 24.99, 'stock_quantity' => 20, 'low_stock_threshold' => 5],
        ];

        foreach ($parts as $part) {
            Part::firstOrCreate(['part_number' => $part['part_number']], $part);
        }
    }
}
