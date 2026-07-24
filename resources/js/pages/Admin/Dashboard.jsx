import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function AdminDashboard({ stats }) {
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />

            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Total Customers */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalCustomers ?? 0}</p>
                                <Link href={route('customers.index')} className="text-xs text-orange-500 hover:text-orange-700 mt-1 inline-block">
                                    View all →
                                </Link>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Total Vehicles */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Vehicles</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalVehicles ?? 0}</p>
                                <Link href={route('vehicles.index')} className="text-xs text-orange-500 hover:text-orange-700 mt-1 inline-block">
                                    View all →
                                </Link>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Total Staff */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Staff</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalStaff ?? 0}</p>
                                <Link href={route('admin.staff.index')} className="text-xs text-orange-500 hover:text-orange-700 mt-1 inline-block">
                                    Manage →
                                </Link>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link
                            href={route('customers.index')}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                        >
                            <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Customers</span>
                        </Link>
                        <Link
                            href={route('vehicles.index')}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                        >
                            <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Vehicles</span>
                        </Link>
                        <Link
                            href={route('bookings.index')}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                        >
                            <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Bookings</span>
                        </Link>
                        <Link
                            href={route('admin.staff.index')}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                        >
                            <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Manage Staff</span>
                        </Link>
                        <Link
                            href={route('mechanics.index')}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                        >
                            <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Manage Mechanics</span>
                        </Link>
                        <Link
                            href={route('parts.index')}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                        >
                            <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Manage Parts</span>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

