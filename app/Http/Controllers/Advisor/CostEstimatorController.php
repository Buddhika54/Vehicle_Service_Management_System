<?php

namespace App\Http\Controllers\Advisor;

use App\Http\Controllers\Controller;
use App\Models\Part;
use App\Models\Service;
use App\Services\CostEstimatorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CostEstimatorController extends Controller
{
    public function __construct(protected CostEstimatorService $estimatorService) {}

    public function index()
    {
        return Inertia::render('Advisor/CostEstimator/Index', [
            'services' => Service::orderBy('name')->get(),
            'parts' => Part::orderBy('name')->get(['id', 'name', 'unit_price']),
            'estimate' => session('estimate'),
        ]);
    }

    public function estimate(Request $request)
    {
        $request->validate([
            'service_ids' => ['required', 'array', 'min:1'],
            'service_ids.*' => ['exists:services,id'],
            'part_ids' => ['array'],
            'part_ids.*' => ['exists:parts,id'],
        ]);

        $result = $this->estimatorService->estimate(
            $request->service_ids,
            $request->part_ids ?? []
        );

        return redirect()->route('cost-estimator.index')->with('estimate', $result);
    }
}
