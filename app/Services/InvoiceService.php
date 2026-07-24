<?php

namespace App\Services;

use App\Models\Invoice;
use Illuminate\Support\Facades\DB;

class InvoiceService
{
    public function getPaginatedInvoices(?string $status = null, int $perPage = 10)
    {
        return Invoice::query()
            ->when($status, fn ($q, $status) => $q->where('payment_status', $status))
            ->with('booking.customer')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function markAsPaid(Invoice $invoice): Invoice
    {
        return DB::transaction(function () use ($invoice) {
            $invoice->update(['payment_status' => 'paid']);
            return $invoice;
        });
    }
}