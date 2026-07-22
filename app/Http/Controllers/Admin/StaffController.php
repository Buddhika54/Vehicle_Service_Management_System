<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStaffRequest;
use App\Http\Requests\UpdateStaffRequest;
use App\Models\User;
use App\Services\StaffService;
use Inertia\Inertia;
use Inertia\Response;

class StaffController extends Controller
{
    public function __construct(
        private StaffService $staffService
    ) {}

    public function index(): Response
    {
        $staff = $this->staffService->getStaffUsers();

        return Inertia::render('Admin/Staff/Index', [
            'staff' => $staff->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->roles->first()->name ?? null,
                    'created_at' => $user->created_at->format('M d, Y'),
                ];
            }),
        ]);
    }

    public function store(StoreStaffRequest $request)
    {
        $this->staffService->createStaff($request->validated());

        return redirect()->back()->with('success', 'Staff member created successfully.');
    }

    public function update(UpdateStaffRequest $request, User $user)
    {
        $this->staffService->updateStaff($user, $request->validated());

        return redirect()->back()->with('success', 'Staff member updated successfully.');
    }

    public function destroy(User $user)
    {
        $this->staffService->deleteStaff($user);

        return redirect()->back()->with('success', 'Staff member deleted successfully.');
    }
}
