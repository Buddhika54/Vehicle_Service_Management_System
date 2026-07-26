<?php

namespace App\Http\Controllers\Advisor;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Services\InvoiceService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function __construct(protected InvoiceService $invoiceService) {}

    public function index(Request $request)
    {
        return Inertia::render('Advisor/Invoices/Index', [
            'invoices' => $this->invoiceService->getPaginatedInvoices($request->status),
            'filters' => $request->only('status'),
        ]);
    }

    public function markAsPaid(Invoice $invoice)
    {
        Gate::authorize('update', $invoice);
        $this->invoiceService->markAsPaid($invoice);

        return back()->with('success', 'Invoice marked as paid.');
    }

    public function download(Invoice $invoice)
    {
        Gate::authorize('download', $invoice);

        $invoice = $this->invoiceService->getInvoiceForPdf($invoice);

        $pdf = Pdf::loadView('pdf.invoice', compact('invoice'));

        return $pdf->download("invoice-{$invoice->invoice_number}.pdf");
    }
}
