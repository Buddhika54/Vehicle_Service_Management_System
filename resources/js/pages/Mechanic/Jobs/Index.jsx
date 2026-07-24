import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const statusBadge = {
    pending: 'bg-amber-100 text-amber-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

const statusLabel = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function JobsIndex({ bookings }) {
    const advanceStatus = (booking) => {
        const next = booking.status === 'pending' ? 'in_progress' : 'completed';
        router.patch(route('jobs.update-status', booking.id), { status: next });
    };

    return (
        <AppLayout>
            <Head title="My Jobs" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Jobs</h1>

                <div className="space-y-4">
                    {bookings.data?.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between"
                        >
                            <div>
                                <p className="font-medium text-gray-900">
                                    {booking.vehicle?.make} {booking.vehicle?.model} — {booking.service_type}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {booking.customer?.name} · {new Date(booking.scheduled_at).toLocaleString()}
                                </p>
                                {booking.notes && (
                                    <p className="text-sm text-gray-400 mt-1">"{booking.notes}"</p>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[booking.status]}`}>
                                    {statusLabel[booking.status]}
                                </span>

                                {(booking.status === 'pending' || booking.status === 'in_progress') && (
                                    <button
                                        onClick={() => advanceStatus(booking)}
                                        className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold shadow-md hover:from-yellow-500 hover:to-orange-600"
                                    >
                                        {booking.status === 'pending' ? 'Start Job' : 'Complete'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {(!bookings.data || bookings.data.length === 0) && (
                        <p className="text-sm text-gray-500 text-center py-8">No jobs assigned yet.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}