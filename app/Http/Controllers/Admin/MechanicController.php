<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMechanicRequest;
use App\Http\Requests\UpdateMechanicRequest;
use App\Models\Mechanic;
use App\Models\User;
use App\Services\MechanicService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class MechanicController extends Controller
{
    public function __construct(
        protected MechanicService $mechanicService
    ) {}

    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Mechanic::class);

        $mechanics = $this->mechanicService->getPaginatedMechanics(
            search: $request->input('search')
        );

        // Only mechanic-role users that aren't already linked to a mechanic record
        $availableUsers = User::role('mechanic')
            ->whereDoesntHave('mechanic')
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        return Inertia::render('Admin/Mechanics/Index', [
            'mechanics' => $mechanics,
            'availableUsers' => $availableUsers,
            'filters' => [
                'search' => $request->input('search'),
            ],
        ]);
    }

    public function store(StoreMechanicRequest $request): RedirectResponse
    {
        $this->mechanicService->createMechanic($request->validated());

        return redirect()->back()->with('success', 'Mechanic added successfully.');
    }

    public function update(UpdateMechanicRequest $request, Mechanic $mechanic): RedirectResponse
    {
        $this->mechanicService->updateMechanic($mechanic, $request->validated());

        return redirect()->back()->with('success', 'Mechanic updated successfully.');
    }

    public function destroy(Mechanic $mechanic): RedirectResponse
    {
        Gate::authorize('delete', $mechanic);

        $this->mechanicService->deleteMechanic($mechanic);

        return redirect()->back()->with('success', 'Mechanic deleted successfully.');
    }
}
