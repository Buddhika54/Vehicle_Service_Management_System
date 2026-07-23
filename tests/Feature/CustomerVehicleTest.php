<?php

use App\Models\Customer;
use App\Models\User;
use App\Models\Vehicle;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'customer']);
    Role::firstOrCreate(['name' => 'admin']);
    Role::firstOrCreate(['name' => 'service_advisor']);
});

test('customer can view my vehicles index page', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $customer = Customer::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('customer.vehicles.index'));

    $response->assertStatus(200);
});

test('customer can view create vehicle form', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $customer = Customer::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('customer.vehicles.create'));

    $response->assertStatus(200);
});

test('customer can add a new vehicle for themselves', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $customer = Customer::factory()->create(['user_id' => $user->id]);

    $vehicleData = [
        'registration_no' => 'CUST-8899',
        'make' => 'Toyota',
        'model' => 'Camry',
        'year' => 2022,
        'vin' => '1HGCR2F83HA000000',
        'mileage' => 15000,
    ];

    $response = $this->actingAs($user)->post(route('customer.vehicles.store'), $vehicleData);

    $response->assertRedirect(route('customer.vehicles.index'));

    $this->assertDatabaseHas('vehicles', [
        'customer_id' => $customer->id,
        'registration_no' => 'CUST-8899',
        'make' => 'Toyota',
        'model' => 'Camry',
        'year' => 2022,
    ]);
});

test('customer cannot assign vehicle to another customer id via request', function () {
    $user1 = User::factory()->create();
    $user1->assignRole('customer');
    $customer1 = Customer::factory()->create(['user_id' => $user1->id]);

    $user2 = User::factory()->create();
    $user2->assignRole('customer');
    $customer2 = Customer::factory()->create(['user_id' => $user2->id]);

    $vehicleData = [
        'customer_id' => $customer2->id, // Attempting to hijack another customer's ID
        'registration_no' => 'HIJACK-1',
        'make' => 'Honda',
        'model' => 'Civic',
        'year' => 2021,
    ];

    $response = $this->actingAs($user1)->post(route('customer.vehicles.store'), $vehicleData);

    $response->assertRedirect(route('customer.vehicles.index'));

    // The vehicle MUST be created under customer1, NOT customer2
    $this->assertDatabaseHas('vehicles', [
        'customer_id' => $customer1->id,
        'registration_no' => 'HIJACK-1',
    ]);

    $this->assertDatabaseMissing('vehicles', [
        'customer_id' => $customer2->id,
        'registration_no' => 'HIJACK-1',
    ]);
});

test('fresh customer with zero vehicles can add vehicle and then create a booking', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    // User logs in with no initial vehicle
    $this->actingAs($user);

    // 1. Add vehicle
    $storeResponse = $this->post(route('customer.vehicles.store'), [
        'registration_no' => 'NEW-CAR-101',
        'make' => 'Nissan',
        'model' => 'Altima',
        'year' => 2023,
    ]);
    $storeResponse->assertRedirect(route('customer.vehicles.index'));

    $vehicle = Vehicle::where('registration_no', 'NEW-CAR-101')->firstOrFail();

    // 2. Book service with newly added vehicle
    $bookingResponse = $this->post(route('customer.bookings.store'), [
        'vehicle_id' => $vehicle->id,
        'service_type' => 'Oil Change',
        'scheduled_at' => now()->addDays(2)->format('Y-m-d H:i:s'),
    ]);

    $bookingResponse->assertRedirect(route('customer.bookings.index'));

    $this->assertDatabaseHas('bookings', [
        'vehicle_id' => $vehicle->id,
        'service_type' => 'Oil Change',
    ]);
});
