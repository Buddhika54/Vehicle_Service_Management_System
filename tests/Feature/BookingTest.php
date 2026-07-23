<?php

use App\Models\Booking;
use App\Models\Customer;
use App\Models\User;
use App\Models\Vehicle;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'customer']);
    Role::firstOrCreate(['name' => 'admin']);
    Role::firstOrCreate(['name' => 'service_advisor']);
});

test('customer can view bookings index', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $customer = Customer::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('customer.bookings.index'));

    $response->assertStatus(200);
});

test('customer can view booking creation page with registered vehicles', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $customer = Customer::factory()->create(['user_id' => $user->id]);
    $vehicle = Vehicle::factory()->create(['customer_id' => $customer->id]);

    $response = $this->actingAs($user)->get(route('customer.bookings.create'));

    $response->assertStatus(200);
});

test('customer can create a booking for a future date', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $customer = Customer::factory()->create(['user_id' => $user->id]);
    $vehicle = Vehicle::factory()->create(['customer_id' => $customer->id]);

    $scheduledAt = now()->addDays(2)->format('Y-m-d H:i:s');

    $response = $this->actingAs($user)->post(route('customer.bookings.store'), [
        'vehicle_id' => $vehicle->id,
        'service_type' => 'Oil Change',
        'scheduled_at' => $scheduledAt,
        'notes' => 'Checking engine oil level',
    ]);

    $response->assertRedirect(route('customer.bookings.index'));

    $this->assertDatabaseHas('bookings', [
        'customer_id' => $customer->id,
        'vehicle_id' => $vehicle->id,
        'service_type' => 'Oil Change',
        'status' => 'pending',
    ]);
});

test('cannot create overlapping booking within 2 hours for same vehicle', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $customer = Customer::factory()->create(['user_id' => $user->id]);
    $vehicle = Vehicle::factory()->create(['customer_id' => $customer->id]);

    $baseTime = now()->addDays(2)->setHour(10)->setMinute(0)->setSecond(0);

    Booking::factory()->create([
        'customer_id' => $customer->id,
        'vehicle_id' => $vehicle->id,
        'scheduled_at' => $baseTime->format('Y-m-d H:i:s'),
        'status' => 'pending',
    ]);

    // Attempt booking 1 hour after existing booking (within 2-hour window)
    $overlappingTime = $baseTime->copy()->addHour()->format('Y-m-d H:i:s');

    $response = $this->actingAs($user)->post(route('customer.bookings.store'), [
        'vehicle_id' => $vehicle->id,
        'service_type' => 'Brake Service',
        'scheduled_at' => $overlappingTime,
    ]);

    $response->assertSessionHasErrors('scheduled_at');
});

test('customer can cancel a pending future booking', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $customer = Customer::factory()->create(['user_id' => $user->id]);
    $vehicle = Vehicle::factory()->create(['customer_id' => $customer->id]);

    $booking = Booking::factory()->create([
        'customer_id' => $customer->id,
        'vehicle_id' => $vehicle->id,
        'scheduled_at' => now()->addDays(3),
        'status' => 'pending',
    ]);

    $response = $this->actingAs($user)->delete(route('customer.bookings.destroy', $booking));

    $response->assertSessionHasNoErrors();

    $this->assertDatabaseHas('bookings', [
        'id' => $booking->id,
        'status' => 'cancelled',
    ]);
});

test('customer cannot cancel another customer booking', function () {
    $user1 = User::factory()->create();
    $user1->assignRole('customer');
    $customer1 = Customer::factory()->create(['user_id' => $user1->id]);

    $user2 = User::factory()->create();
    $user2->assignRole('customer');
    $customer2 = Customer::factory()->create(['user_id' => $user2->id]);
    $vehicle2 = Vehicle::factory()->create(['customer_id' => $customer2->id]);

    $booking = Booking::factory()->create([
        'customer_id' => $customer2->id,
        'vehicle_id' => $vehicle2->id,
        'scheduled_at' => now()->addDays(3),
        'status' => 'pending',
    ]);

    $response = $this->actingAs($user1)->delete(route('customer.bookings.destroy', $booking));

    $response->assertStatus(403);
});
