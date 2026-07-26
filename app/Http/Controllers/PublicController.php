<?php

namespace App\Http\Controllers;

use App\Models\Mechanic;
use App\Models\Service;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        $popularServices = Service::limit(4)->get(['id', 'name', 'base_labor_hours', 'hourly_rate']);

        return Inertia::render('Public/Home', [
            'popularServices' => $popularServices,
        ]);
    }

    public function about()
    {
        $mechanics = Mechanic::select('id', 'name', 'specialization')->get();

        return Inertia::render('Public/About', [
            'mechanics' => $mechanics,
        ]);
    }

    public function contact()
    {
        return Inertia::render('Public/Contact');
    }
}
