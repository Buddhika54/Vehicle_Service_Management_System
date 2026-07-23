<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Booking $booking): bool
    {
        if ($user->hasAnyRole(['admin', 'service_advisor'])) {
            return true;
        }

        if ($user->hasRole('mechanic')) {
            return $booking->mechanic?->user_id === $user->id;
        }

        $customer = $booking->customer;
        if ($customer && ($customer->user_id === $user->id || $customer->email === $user->email)) {
            return true;
        }

        return $booking->vehicle?->customer?->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['customer', 'admin', 'service_advisor']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Booking $booking): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    /**
     * Determine whether the user can cancel the model.
     */
    public function cancel(User $user, Booking $booking): bool
    {
        if ($user->hasAnyRole(['admin', 'service_advisor'])) {
            return true;
        }

        if ($booking->status !== 'pending') {
            return false;
        }

        if (! $booking->scheduled_at?->isFuture()) {
            return false;
        }

        $customer = $booking->customer;
        if ($customer && ($customer->user_id === $user->id || $customer->email === $user->email)) {
            return true;
        }

        return $booking->vehicle?->customer?->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Booking $booking): bool
    {
        return $this->cancel($user, $booking);
    }
}
