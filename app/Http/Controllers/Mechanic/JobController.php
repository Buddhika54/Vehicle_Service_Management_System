<?php

namespace App\Http\Controllers\Mechanic;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Mechanic;
use App\Services\BookingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function __construct(
        protected BookingService $bookingService
    ) {}

    /**
     * Display jobs assigned to the authenticated mechanic.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $mechanic = Mechanic::where('user_id', $user->id)->first();

        $jobs = $mechanic
            ? Booking::where('mechanic_id', $mechanic->id)
                ->with(['customer', 'vehicle'])
                ->orderBy('scheduled_at', 'desc')
                ->paginate(15)
                ->withQueryString()
            : new \Illuminate\Pagination\LengthAwarePaginator([], 0, 15);

        return Inertia::render('Mechanic/Jobs/Index', [
            'jobs' => $jobs,
            'mechanic' => $mechanic,
        ]);
    }

    /**
     * Update job status (forward transitions only).
     */
    public function updateStatus(Booking $booking, Request $request): RedirectResponse
    {
        $user = $request->user();
        $mechanic = Mechanic::where('user_id', $user->id)->first();

        if (! $mechanic || $booking->mechanic_id !== $mechanic->id) {
            abort(403, 'Unauthorized to update this job.');
        }

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:in_progress,completed'],
        ]);

        $newStatus = $validated['status'];

        // Enforce forward-only status updates for mechanics
        if ($booking->status === 'pending' && $newStatus !== 'in_progress') {
            abort(422, 'Pending jobs can only move to In Progress.');
        }

        if ($booking->status === 'in_progress' && $newStatus !== 'completed') {
            abort(422, 'In Progress jobs can only move to Completed.');
        }

        if ($booking->status === 'completed' || $booking->status === 'cancelled') {
            abort(422, 'Finished or cancelled jobs cannot be updated.');
        }

        $this->bookingService->updateStatus($booking, $newStatus);

        return redirect()->back()->with('success', 'Job status updated successfully.');
    }
}
