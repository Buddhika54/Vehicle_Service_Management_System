import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function CustomerDashboard({ customerProfile, vehicles = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const bookings = [];

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: 'bg-amber-100 text-amber-800',
            'in-progress': 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return statusMap[status] || 'bg-gray-100 text-gray-800';
    };

    const formatStatus = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const displayName = customerProfile?.name || user?.name || 'Customer';

    return (
        <AppLayout>
            <Head title="Customer Dashboard" />

            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome back, {displayName}!</h1>
                    <p className="text-gray-600 mt-2">
                        Manage your vehicles and service bookings from here.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">My Vehicles</h2>
                            <span className="text-sm text-gray-500">{vehicles.length} vehicles</span>
                        </div>
                        <div className="space-y-3">
                            {vehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className="p-4 rounded-lg border border-gray-200 hover:border-orange-400 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {vehicle.year} {vehicle.make} {vehicle.model}
                                            </p>
                                            <p className="text-sm text-gray-500">{vehicle.registration_no}</p>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                            {vehicles.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">No vehicles registered yet.</p>
                            )}
                        </div>
                        {vehicles.length > 0 && (
                            <Link
                                href={route('customer.vehicles.index')}
                                className="mt-4 inline-block text-sm text-orange-500 hover:text-orange-700"
                            >
                                View all vehicles →
                            </Link>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">My Bookings</h2>
                            <span className="text-sm text-gray-500">{bookings.length} bookings</span>
                        </div>
                        <div className="space-y-3">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="p-4 rounded-lg border border-gray-200 hover:border-orange-400 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium text-gray-900">{booking.vehicle}</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                                            {formatStatus(booking.status)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <p className="text-gray-600">{booking.service}</p>
                                        <p className="text-gray-500">{booking.date}</p>
                                    </div>
                                </div>
                            ))}
                            {bookings.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">No bookings yet.</p>
                            )}
                        </div>
                        <Link
                            href={route('customer.bookings.index')}
                            className="mt-4 inline-block text-sm text-orange-500 hover:text-orange-700"
                        >
                            View bookings →
                        </Link>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-sm p-6 text-white">
                    <h2 className="text-lg font-semibold mb-2">Need Service?</h2>
                    <p className="text-orange-100 mb-4">Book a new service appointment for your vehicle.</p>
                    <Link
                        href={route('customer.bookings.index')}
                        className="inline-flex items-center px-4 py-2 border border-white rounded-md text-sm font-medium text-white hover:bg-white hover:text-orange-500 transition-colors"
                    >
                        Book New Service
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
