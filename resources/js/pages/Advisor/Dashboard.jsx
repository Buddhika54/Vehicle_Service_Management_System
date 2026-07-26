import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function AdvisorDashboard({ stats }) {
    return (
        <AppLayout>
            <Head title="Service Advisor Dashboard" />

            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Service Advisor Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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

                    {/* Today's Bookings */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Today's Bookings</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.todaysBookings ?? 0}</p>
                                <Link href={route('bookings.index')} className="text-xs text-orange-500 hover:text-orange-700 mt-1 inline-block">
                                    View all →
                                </Link>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Active Jobs */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.activeJobs ?? 0}</p>
                                <Link href={route('bookings.index')} className="text-xs text-orange-500 hover:text-orange-700 mt-1 inline-block">
                                    View all →
                                </Link>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Low Stock Parts */}
                    <div className={`bg-white rounded-xl shadow-sm p-6 border ${stats?.lowStockParts?.count > 0 ? 'border-red-200' : 'border-gray-100'}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Low Stock Parts</p>
                                <p className={`text-3xl font-bold mt-2 ${stats?.lowStockParts?.count > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {stats?.lowStockParts?.count ?? 0}
                                </p>
                                <Link href={route('parts.index')} className="text-xs text-orange-500 hover:text-orange-700 mt-1 inline-block">
                                    Manage →
                                </Link>
                            </div>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stats?.lowStockParts?.count > 0 ? 'bg-gradient-to-br from-red-400 to-red-500' : 'bg-gradient-to-br from-yellow-400 to-orange-500'}`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                        {stats?.lowStockParts?.count > 0 && stats?.lowStockParts?.parts?.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-xs font-medium text-red-600 mb-2">Low stock items:</p>
                                <ul className="space-y-1">
                                    {stats.lowStockParts.parts.slice(0, 3).map((part) => (
                                        <li key={part.id} className="text-xs text-gray-600">
                                            {part.name} ({part.stock_quantity} left)
                                        </li>
                                    ))}
                                    {stats.lowStockParts.parts.length > 3 && (
                                        <li className="text-xs text-gray-500">
                                            +{stats.lowStockParts.parts.length - 3} more
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Daily Revenue */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Daily Revenue</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">${parseFloat(stats?.dailyRevenue ?? 0).toFixed(2)}</p>
                                <Link href={route('invoices.index')} className="text-xs text-orange-500 hover:text-orange-700 mt-1 inline-block">
                                    View invoices →
                                </Link>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                            href={route('invoices.index')}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                        >
                            <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Invoices</span>
                        </Link>
                        <Link
                            href={route('cost-estimator.index')}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                        >
                            <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Cost Estimator</span>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
