<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicPartController extends Controller
{
    public function index(Request $request)
    {
        $parts = Part::select('id', 'name', 'unit_price')
            ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->get();

        return Inertia::render('Public/PartsPricing', [
            'parts' => $parts,
            'filters' => $request->only('search'),
        ]);
    }
}
