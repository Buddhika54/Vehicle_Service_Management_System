import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function InvoicesIndex({ invoices, filters }) {
    const markAsPaid = (invoice) => {
        router.patch(route('invoices.mark-paid', invoice.id));
    };

    return (
        <AppLayout>
            <Head title="Invoices" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Invoices</h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Labor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parts</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoices.data.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{invoice.invoice_number}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{invoice.booking?.customer?.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">${Number(invoice.labor_cost).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">${Number(invoice.parts_cost).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${Number(invoice.total).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            invoice.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            {invoice.payment_status === 'paid' ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm space-x-2">
                                        <a
                                            href={route('invoices.download', invoice.id)}
                                            className="inline-flex items-center px-3 py-1 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold hover:from-yellow-500 hover:to-orange-600"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Download PDF
                                        </a>
                                        {invoice.payment_status === 'pending' && (
                                            <button
                                                onClick={() => markAsPaid(invoice)}
                                                className="px-3 py-1 rounded-md bg-green-50 text-green-700 border border-green-200 text-xs font-semibold hover:bg-green-100"
                                            >
                                                Mark as Paid
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {invoices.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                                        No invoices yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}