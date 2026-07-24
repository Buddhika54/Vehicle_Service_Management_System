<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePartRequest;
use App\Http\Requests\UpdatePartRequest;
use App\Models\Part;
use App\Services\PartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PartController extends Controller
{
    public function __construct(protected PartService $partService) {}

    public function index(Request $request)
    {
        Gate::authorize('viewAny', Part::class);

        return Inertia::render('Admin/Parts/Index', [
            'parts' => $this->partService->getPaginatedParts($request->search),
            'filters' => $request->only('search'),
        ]);
    }

    public function store(StorePartRequest $request)
    {
        $this->partService->createPart($request->validated());
        return back()->with('success', 'Part added.');
    }

    public function update(UpdatePartRequest $request, Part $part)
    {
        $this->partService->updatePart($part, $request->validated());
        return back()->with('success', 'Part updated.');
    }

    public function destroy(Part $part)
    {
        Gate::authorize('delete', $part);
        $this->partService->deletePart($part);
        return back()->with('success', 'Part removed.');
    }
}
