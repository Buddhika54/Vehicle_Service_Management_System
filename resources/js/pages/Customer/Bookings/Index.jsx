import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function CustomerBookingsIndex({ bookings }) {
    const { flash } = usePage().props;
    const bookingList = Array.isArray(bookings) ? bookings : (bookings?.data || []);
    const [cancellingId, setCancellingId] = useState(null);

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: 'bg-amber-100 text-amber-800 border border-amber-200',
            in_progress: 'bg-blue-100 text-blue-800 border border-blue-200',
            completed: 'bg-green-100 text-green-800 border border-green-200',
            cancelled: 'bg-red-100 text-red-800 border border-red-200',
        };
        return statusMap[status] || 'bg-gray-100 text-gray-800 border border-gray-200';
    };

    const formatStatus = (status) => {
        if (!status) return '';
        if (status === 'in_progress') return 'In Progress';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const handleCancel = (bookingId) => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            setCancellingId(bookingId);
            router.delete(route('customer.bookings.destroy', bookingId), {
                onFinish: () => setCancellingId(null),
            });
        }
    };

    return (
        <AppLayout>
            <Head title="My Bookings" />

            <div className="p-6">
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm flex items-center justify-between">
                        <span>{flash.success}</span>
                    </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">My Service Bookings</h1>
                        <p className="text-gray-600 text-sm mt-1">View and manage your service appointments.</p>
                    </div>
                    <Link
                        href={route('customer.bookings.create')}
                        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                        + Book New Service
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {bookingList.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Vehicle
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Service Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Notes
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookingList.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {booking.vehicle ? `${booking.vehicle.year} ${booking.vehicle.make} ${booking.vehicle.model}` : 'Vehicle'}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {booking.vehicle?.registration_no}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-800 font-medium">
                                                    {booking.service_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {formatDate(booking.scheduled_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                                                    {formatStatus(booking.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                {booking.notes || '—'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {booking.status === 'pending' ? (
                                                    <button
                                                        onClick={() => handleCancel(booking.id)}
                                                        disabled={cancellingId === booking.id}
                                                        className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-md text-xs font-semibold hover:bg-red-100 hover:text-red-800 disabled:opacity-50 transition-colors"
                                                    >
                                                        {cancellingId === booking.id ? 'Cancelling...' : 'Cancel'}
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-gray-400">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 text-orange-500 mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">No Bookings Yet</h3>
                            <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                                Schedule your first service appointment for your registered vehicles.
                            </p>
                            <Link
                                href={route('customer.bookings.create')}
                                className="mt-5 inline-flex items-center rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:from-yellow-500 hover:to-orange-600 transition"
                            >
                                Book New Service
                            </Link>
                        </div>
                    )}

                    {bookings?.links && bookings.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="flex space-x-1">
                                {bookings.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1 text-xs rounded ${
                                            link.active
                                                ? 'bg-orange-500 text-white font-semibold'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
