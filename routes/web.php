<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Auth/Login'));

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
        ->name('dashboard');

    // Admin + Advisor routes
    Route::middleware(['role:admin|service_advisor'])->group(function () {
        Route::get('/customers', fn () => Inertia::render('Advisor/Customers/Index'))
            ->name('customers.index');
        Route::get('/vehicles', fn () => Inertia::render('Advisor/Vehicles/Index'))
            ->name('vehicles.index');
        Route::get('/bookings', fn () => Inertia::render('Advisor/Bookings/Index'))
            ->name('bookings.index');
    });

    // Admin-only routes
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/mechanics', fn () => Inertia::render('Admin/Mechanics/Index'))
            ->name('mechanics.index');
        Route::get('/parts', fn () => Inertia::render('Admin/Parts/Index'))
            ->name('parts.index');
    });

    // Mechanic-only routes
    Route::middleware(['role:mechanic'])->group(function () {
        Route::get('/my-jobs', fn () => Inertia::render('Mechanic/Jobs/Index'))
            ->name('jobs.index');
    });
});

require __DIR__.'/auth.php';