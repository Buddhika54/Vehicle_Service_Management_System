import { usePage, Link } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const roles = user?.roles || [];

    const isAdmin = roles.includes('admin');
    const isAdvisor = roles.includes('service_advisor');
    const isMechanic = roles.includes('mechanic');
    const isCustomer = roles.includes('customer');

    const getRoleLabel = () => {
        if (isAdmin) return 'Admin';
        if (isAdvisor) return 'Service Advisor';
        if (isMechanic) return 'Mechanic';
        if (isCustomer) return 'Customer';
        return 'User';
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between h-screen sticky top-0">
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className="flex items-center space-x-3 mb-6 px-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-800 leading-tight">Vehicle Service</h2>
                            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                                {getRoleLabel()}
                            </span>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <Link
                            href={route('dashboard')}
                            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                route().current('dashboard')
                                    ? 'bg-orange-50 text-orange-600 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            Dashboard
                        </Link>

                        {(isAdmin || isAdvisor) && (
                            <>
                                <Link
                                    href={route('customers.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        route().current('customers.index')
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    Customers
                                </Link>
                                <Link
                                    href={route('vehicles.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        route().current('vehicles.index')
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    Vehicles
                                </Link>
                                <Link
                                    href={route('bookings.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        route().current('bookings.index')
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    Bookings
                                </Link>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <Link
                                    href={route('mechanics.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        route().current('mechanics.index')
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    Mechanics
                                </Link>
                                <Link
                                    href={route('parts.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        route().current('parts.index')
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    Parts Inventory
                                </Link>
                                <Link
                                    href={route('admin.staff.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        route().current('admin.staff.index')
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    Manage Staff
                                </Link>
                            </>
                        )}

                        {isMechanic && (
                            <Link
                                href={route('jobs.index')}
                                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    route().current('jobs.index')
                                        ? 'bg-orange-50 text-orange-600 font-semibold'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                My Jobs
                            </Link>
                        )}

                        {isCustomer && (
                            <>
                                <Link
                                    href={route('customer.vehicles.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        route().current('customer.vehicles.index')
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    My Vehicles
                                </Link>
                                <Link
                                    href={route('customer.bookings.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        route().current('customer.bookings.index')
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    My Bookings
                                </Link>
                            </>
                        )}
                    </nav>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                    {user && (
                        <div className="mb-3 px-2">
                            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    )}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 ease-in-out hover:from-yellow-500 hover:to-orange-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Log Out</span>
                    </Link>
                </div>
            </aside>

            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
    );
}