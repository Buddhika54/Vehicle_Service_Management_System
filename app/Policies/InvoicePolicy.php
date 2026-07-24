<?php

namespace App\Policies;

use App\Models\Invoice;
use App\Models\User;

class InvoicePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    public function view(User $user, Invoice $invoice): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor']);
    }

    public function update(User $user, Invoice $invoice): bool
    {
        return $user->hasAnyRole(['admin', 'service_advisor']);
    }
}