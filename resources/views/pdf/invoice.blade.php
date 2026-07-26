<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            border-bottom: 3px solid #f97316;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #333;
            margin: 0 0 5px 0;
            font-size: 28px;
        }
        .header p {
            color: #666;
            margin: 2px 0;
            font-size: 11px;
        }
        .invoice-info {
            text-align: right;
            margin-top: 10px;
        }
        .invoice-info h2 {
            color: #f97316;
            margin: 0 0 5px 0;
            font-size: 20px;
        }
        .invoice-info p {
            margin: 2px 0;
            font-size: 11px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section h3 {
            color: #f97316;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
            margin: 0 0 15px 0;
            font-size: 16px;
        }
        .info-grid {
            width: 100%;
            border-collapse: collapse;
        }
        .info-grid td {
            padding: 8px 0;
            vertical-align: top;
        }
        .info-grid td:first-child {
            width: 150px;
            color: #666;
            font-weight: bold;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
        }
        .status-paid {
            background-color: #d1fae5;
            color: #065f46;
        }
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        table.parts-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table.parts-table th {
            background-color: #f97316;
            color: white;
            padding: 10px;
            text-align: left;
            font-weight: bold;
            font-size: 11px;
        }
        table.parts-table td {
            padding: 10px;
            border-bottom: 1px solid #e5e7eb;
        }
        table.parts-table tr:last-child td {
            border-bottom: none;
        }
        .summary {
            width: 300px;
            margin-left: auto;
        }
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .summary-row:last-child {
            border-bottom: none;
        }
        .summary-row.total {
            font-size: 16px;
            font-weight: bold;
            color: #f97316;
            padding-top: 15px;
            border-top: 2px solid #f97316;
            border-bottom: none;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #666;
            font-size: 11px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <table style="width: 100%;">
                <tr>
                    <td>
                        <h1>Vehicle Service Center</h1>
                        <p>123 Auto Service Lane, Vehicle City, VC 12345</p>
                        <p>Phone: (555) 123-4567 | Email: info@vehicleservice.com</p>
                    </td>
                    <td class="invoice-info">
                        <h2>INVOICE</h2>
                        <p><strong>Invoice #:</strong> {{ $invoice->invoice_number }}</p>
                        <p><strong>Date:</strong> {{ $invoice->created_at->format('F j, Y') }}</p>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Customer & Vehicle Info -->
        <div class="section">
            <h3>Customer & Vehicle Information</h3>
            <table class="info-grid">
                <tr>
                    <td>Customer Name:</td>
                    <td>{{ $invoice->booking->customer->name }}</td>
                </tr>
                <tr>
                    <td>Phone:</td>
                    <td>{{ $invoice->booking->customer->phone ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <td>Vehicle:</td>
                    <td>{{ $invoice->booking->vehicle->make }} {{ $invoice->booking->vehicle->model }} ({{ $invoice->booking->vehicle->year }})</td>
                </tr>
                <tr>
                    <td>Registration:</td>
                    <td>{{ $invoice->booking->vehicle->license_plate ?? 'N/A' }}</td>
                </tr>
            </table>
        </div>

        <!-- Service Details -->
        <div class="section">
            <h3>Service Details</h3>
            <table class="info-grid">
                <tr>
                    <td>Service Type:</td>
                    <td>{{ $invoice->booking->service_type }}</td>
                </tr>
                <tr>
                    <td>Scheduled Date:</td>
                    <td>{{ $invoice->booking->scheduled_at->format('F j, Y') }}</td>
                </tr>
                <tr>
                    <td>Mechanic:</td>
                    <td>{{ $invoice->booking->mechanic->name ?? 'Not assigned' }}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>
                        <span class="status-badge {{ $invoice->booking->status === 'completed' ? 'status-paid' : 'status-pending' }}">
                            {{ strtoupper($invoice->booking->status) }}
                        </span>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Parts Table -->
        <div class="section">
            <h3>Parts Used</h3>
            @if($invoice->booking->bookingParts->count() > 0)
                <table class="parts-table">
                    <thead>
                        <tr>
                            <th>Part Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($invoice->booking->bookingParts as $bookingPart)
                            <tr>
                                <td>{{ $bookingPart->part->name }}</td>
                                <td>{{ $bookingPart->quantity }}</td>
                                <td>${{ number_format($bookingPart->unit_price, 2) }}</td>
                                <td>${{ number_format($bookingPart->quantity * $bookingPart->unit_price, 2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <p style="color: #666; font-style: italic;">No parts were used for this service.</p>
            @endif
        </div>

        <!-- Cost Summary -->
        <div class="section">
            <h3>Cost Summary</h3>
            <div class="summary">
                <div class="summary-row">
                    <span>Labor Cost:</span>
                    <span>${{ number_format($invoice->labor_cost, 2) }}</span>
                </div>
                <div class="summary-row">
                    <span>Parts Cost:</span>
                    <span>${{ number_format($invoice->parts_cost, 2) }}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${{ number_format($invoice->total, 2) }}</span>
                </div>
            </div>
        </div>

        <!-- Payment Status -->
        <div class="section">
            <h3>Payment Status</h3>
            <span class="status-badge {{ $invoice->payment_status === 'paid' ? 'status-paid' : 'status-pending' }}" style="font-size: 14px; padding: 8px 20px;">
                {{ strtoupper($invoice->payment_status) }}
            </span>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Thank you for choosing Vehicle Service Center.</strong></p>
            <p>For questions about this invoice, please contact us at (555) 123-4567 or info@vehicleservice.com</p>
            <p style="margin-top: 10px; color: #999;">Generated on {{ now()->format('F j, Y g:i A') }}</p>
        </div>
    </div>
</body>
</html>
