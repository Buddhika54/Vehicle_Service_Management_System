import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function CustomerVehiclesIndex({ vehicles = [] }) {
    return (
        <AppLayout>
            <Head title="My Vehicles" />

            <div className="p-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">My Registered Vehicles</h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Manage your vehicles registered for service appointments.
                        </p>
                    </div>
                    <Link
                        href={route('customer.vehicles.create')}
                        className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Vehicle</span>
                    </Link>
                </div>

                {vehicles.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-200">
                        <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">No Vehicles Registered Yet</h3>
                        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto mb-6">
                            You don't have any vehicles added to your account. Add your vehicle now to start booking service appointments.
                        </p>
                        <Link
                            href={route('customer.vehicles.create')}
                            className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Your First Vehicle</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-400 transition-colors flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                                                {vehicle.year}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900 mt-2">
                                                {vehicle.make} {vehicle.model}
                                            </h3>
                                        </div>
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                                        <div className="flex justify-between py-1">
                                            <span className="text-gray-500">Registration No:</span>
                                            <span className="font-semibold font-mono text-gray-800">{vehicle.registration_no}</span>
                                        </div>
                                        {vehicle.vin && (
                                            <div className="flex justify-between py-1">
                                                <span className="text-gray-500">VIN:</span>
                                                <span className="font-mono text-xs text-gray-700">{vehicle.vin}</span>
                                            </div>
                                        )}
                                        {vehicle.mileage !== null && vehicle.mileage !== undefined && (
                                            <div className="flex justify-between py-1">
                                                <span className="text-gray-500">Mileage:</span>
                                                <span className="font-medium text-gray-800">{vehicle.mileage.toLocaleString()} km</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
                                    <Link
                                        href={route('customer.bookings.create')}
                                        className="inline-flex items-center space-x-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
                                    >
                                        <span>Book Service</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
