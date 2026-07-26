<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;

class PublicServiceController extends Controller
{
    public function index()
    {
        $services = Service::all(['id', 'name', 'base_labor_hours', 'hourly_rate']);

        return Inertia::render('Public/Services', [
            'services' => $services,
        ]);
    }
}
