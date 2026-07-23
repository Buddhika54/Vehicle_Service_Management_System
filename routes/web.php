<?php

use App\Http\Controllers\Admin\MechanicController as AdminMechanicController;
use App\Http\Controllers\Admin\StaffController;
use App\Http\Controllers\Advisor\BookingController as AdvisorBookingController;
use App\Http\Controllers\Advisor\CustomerController;
use App\Http\Controllers\Advisor\VehicleController;
use App\Http\Controllers\Customer\BookingController as CustomerBookingController;
use App\Http\Controllers\Customer\VehicleController as CustomerVehicleController;
use App\Http\Controllers\Mechanic\JobController as MechanicJobController;
use App\Http\Controllers\ProfileController;
use App\Models\Customer;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Auth/Login'));

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        $user = auth()->user();

        if ($user->hasRole('customer')) {
            $customerProfile = Customer::where('user_id', $user->id)
                ->orWhere('email', $user->email)
                ->first();

            if (! $customerProfile) {
                $customerProfile = Customer::create([
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'phone' => 'Not provided',
                ]);
            } elseif (! $customerProfile->user_id) {
                $customerProfile->update(['user_id' => $user->id]);
            }

            $customerProfile->load('vehicles');

            $bookings = $customerProfile->bookings()
                ->with('vehicle')
                ->orderBy('scheduled_at', 'desc')
                ->take(5)
                ->get();

            return Inertia::render('Customer/Dashboard', [
                'customerProfile' => $customerProfile,
                'vehicles' => $customerProfile->vehicles,
                'bookings' => $bookings,
            ]);
        }

        if ($user->hasRole('admin')) {
            return Inertia::render('Admin/Dashboard', [
                'stats' => [
                    'totalCustomers' => Customer::count(),
                    'totalVehicles' => Vehicle::count(),
                    'totalStaff' => User::role(['admin', 'service_advisor', 'mechanic'])->count(),
                ],
            ]);
        }

        if ($user->hasRole('service_advisor')) {
            return Inertia::render('Advisor/Dashboard', [
                'stats' => [
                    'totalCustomers' => Customer::count(),
                    'totalVehicles' => Vehicle::count(),
                ],
            ]);
        }

        if ($user->hasRole('mechanic')) {
            return Inertia::render('Mechanic/Dashboard');
        }

        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Customer Booking routes
    Route::get('/my-bookings', [CustomerBookingController::class, 'index'])
        ->name('customer.bookings.index');
    Route::get('/my-bookings/create', [CustomerBookingController::class, 'create'])
        ->name('customer.bookings.create');
    Route::post('/my-bookings', [CustomerBookingController::class, 'store'])
        ->name('customer.bookings.store');
    Route::delete('/my-bookings/{booking}', [CustomerBookingController::class, 'destroy'])
        ->name('customer.bookings.destroy');

    // Admin + Advisor routes
    Route::middleware(['role:admin|service_advisor'])->group(function () {
        Route::resource('customers', CustomerController::class);
        Route::get('/customers/{customer}/vehicles', [VehicleController::class, 'index'])
            ->name('customers.vehicles.index');
        Route::resource('vehicles', VehicleController::class);
        Route::get('/bookings', fn () => Inertia::render('Advisor/Bookings/Index'))
            ->name('bookings.index');
        Route::post('/bookings/{booking}/assign-mechanic', [AdvisorBookingController::class, 'assignMechanic'])
            ->name('bookings.assign-mechanic');
        Route::patch('/bookings/{booking}/update-status', [AdvisorBookingController::class, 'updateStatus'])
            ->name('bookings.update-status');
    });

    // Admin-only routes
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/mechanics', fn () => Inertia::render('Admin/Mechanics/Index'))
            ->name('mechanics.index');
        Route::get('/parts', fn () => Inertia::render('Admin/Parts/Index'))
            ->name('parts.index');
        Route::get('/admin/staff', [StaffController::class, 'index'])
            ->name('admin.staff.index');
        Route::post('/admin/staff', [StaffController::class, 'store'])
            ->name('admin.staff.store');
        Route::put('/admin/staff/{user}', [StaffController::class, 'update'])
            ->name('admin.staff.update');
        Route::delete('/admin/staff/{user}', [StaffController::class, 'destroy'])
            ->name('admin.staff.destroy');
    });

    // Mechanic-only routes
    Route::middleware(['role:mechanic'])->group(function () {
        Route::get('/my-jobs', fn () => Inertia::render('Mechanic/Jobs/Index'))
            ->name('jobs.index');
        Route::patch('/my-jobs/{booking}/update-status', [MechanicJobController::class, 'updateStatus'])
            ->name('jobs.update-status');
    });

    // Customer-only routes
    Route::middleware(['role:customer'])->group(function () {
        Route::get('/my-vehicles', [CustomerVehicleController::class, 'index'])
            ->name('customer.vehicles.index');
        Route::get('/my-vehicles/create', [CustomerVehicleController::class, 'create'])
            ->name('customer.vehicles.create');
        Route::post('/my-vehicles', [CustomerVehicleController::class, 'store'])
            ->name('customer.vehicles.store');
    });

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
