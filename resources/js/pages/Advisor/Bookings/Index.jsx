import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function AdvisorBookingsIndex() {
    return (
        <AppLayout>
            <Head title="Manage Bookings" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Service Bookings</h1>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <p className="text-gray-600">No service bookings found.</p>
                </div>
            </div>
        </AppLayout>
    );
}
