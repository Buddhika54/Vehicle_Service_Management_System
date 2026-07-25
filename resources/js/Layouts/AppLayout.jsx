import { usePage, Link } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const rawRoles = user?.roles;
    let roles = [];
    if (Array.isArray(rawRoles)) {
        roles = rawRoles.map((r) => (typeof r === 'object' && r !== null ? (r.name || r.id) : String(r)));
    } else if (typeof rawRoles === 'object' && rawRoles !== null) {
        roles = Object.values(rawRoles).map((r) => (typeof r === 'object' && r !== null ? (r.name || r.id) : String(r)));
    } else if (typeof rawRoles === 'string') {
        roles = [rawRoles];
    }

    if (user?.role && !roles.includes(user.role)) {
        roles.push(user.role);
    }

    let isAdmin = roles.includes('admin');
    let isAdvisor = roles.includes('service_advisor') || roles.includes('advisor');
    let isMechanic = roles.includes('mechanic');
    let isCustomer = roles.includes('customer');

    // Fallback role resolution if no role was explicitly detected
    if (!isAdmin && !isAdvisor && !isMechanic && !isCustomer && user?.email) {
        const email = user.email.toLowerCase();
        if (email.includes('admin')) isAdmin = true;
        else if (email.includes('advisor')) isAdvisor = true;
        else if (email.includes('mechanic')) isMechanic = true;
        else isCustomer = true;
    }

    const getRoleLabel = () => {
        if (isAdmin) return 'Admin';
        if (isAdvisor) return 'Service Advisor';
        if (isMechanic) return 'Mechanic';
        if (isCustomer) return 'Customer';
        return 'User';
    };

    const isCurrentRoute = (pattern) => {
        try {
            return route().current(pattern);
        } catch {
            return false;
        }
    };

    const navLinkClass = (isActive) =>
        `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive
                ? 'bg-orange-50 text-orange-600 font-semibold shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`;

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
                        <Link href={route('dashboard')} className={navLinkClass(isCurrentRoute('dashboard'))}>
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Dashboard</span>
                        </Link>

                        {(isAdmin || isAdvisor) && (
                            <>
                                <Link href={route('customers.index')} className={navLinkClass(isCurrentRoute('customers.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>Customers</span>
                                </Link>

                                <Link href={route('vehicles.index')} className={navLinkClass(isCurrentRoute('vehicles.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                    <span>Vehicles</span>
                                </Link>

                                <Link href={route('bookings.index')} className={navLinkClass(isCurrentRoute('bookings.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Bookings</span>
                                </Link>

                                <Link href={route('cost-estimator.index')} className={navLinkClass(isCurrentRoute('cost-estimator.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span>Cost Estimator</span>
                                </Link>

                                <Link href={route('invoices.index')} className={navLinkClass(isCurrentRoute('invoices.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Invoices</span>
                                </Link>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <Link href={route('mechanics.index')} className={navLinkClass(isCurrentRoute('mechanics.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Mechanics</span>
                                </Link>

                                <Link href={route('parts.index')} className={navLinkClass(isCurrentRoute('parts.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    <span>Parts Inventory</span>
                                </Link>

                                <Link href={route('admin.staff.index')} className={navLinkClass(isCurrentRoute('admin.staff.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span>Manage Staff</span>
                                </Link>
                            </>
                        )}

                        {isMechanic && (
                            <Link href={route('jobs.index')} className={navLinkClass(isCurrentRoute('jobs.*'))}>
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>My Jobs</span>
                            </Link>
                        )}

                        {isCustomer && (
                            <>
                                <Link href={route('customer.vehicles.index')} className={navLinkClass(isCurrentRoute('customer.vehicles.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                    <span>My Vehicles</span>
                                </Link>

                                <Link href={route('customer.bookings.index')} className={navLinkClass(isCurrentRoute('customer.bookings.*'))}>
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>My Bookings</span>
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