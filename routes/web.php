<?php

use App\Http\Controllers\Admin\StaffController;
use App\Http\Controllers\Advisor\CustomerController;
use App\Http\Controllers\Advisor\VehicleController;
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
            $customerProfile = Customer::firstOrCreate(
                ['email' => $user->email],
                [
                    'name' => $user->name,
                    'phone' => 'Not provided',
                ]
            );
            $customerProfile->load('vehicles');

            return Inertia::render('Customer/Dashboard', [
                'customerProfile' => $customerProfile,
                'vehicles' => $customerProfile->vehicles,
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

    // Admin + Advisor routes
    Route::middleware(['role:admin|service_advisor'])->group(function () {
        Route::resource('customers', CustomerController::class);
        Route::get('/customers/{customer}/vehicles', [VehicleController::class, 'index'])
            ->name('customers.vehicles.index');
        Route::resource('vehicles', VehicleController::class);
        Route::get('/bookings', fn () => Inertia::render('Advisor/Bookings/Index'))
            ->name('bookings.index');
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
    });

    // Customer-only routes
    Route::middleware(['role:customer'])->group(function () {
        Route::get('/customer/vehicles', fn () => Inertia::render('Customer/Vehicles/Index'))
            ->name('customer.vehicles.index');
        Route::get('/customer/bookings', fn () => Inertia::render('Customer/Bookings/Index'))
            ->name('customer.bookings.index');
    });

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
