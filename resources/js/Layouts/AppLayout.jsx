import { usePage, Link } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const roles = auth.user.roles;

    const isAdmin = roles.includes('admin');
    const isAdvisor = roles.includes('service_advisor');
    const isMechanic = roles.includes('mechanic');

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200 p-4">
                <h2 className="text-lg font-bold mb-6">Vehicle Service</h2>
                <nav className="space-y-1">
                    <Link href={route('dashboard')} className="block px-3 py-2 rounded hover:bg-gray-100">
                        Dashboard
                    </Link>

                    {(isAdmin || isAdvisor) && (
                        <>
                            <Link href={route('customers.index')} className="block px-3 py-2 rounded hover:bg-gray-100">
                                Customers
                            </Link>
                            <Link href={route('vehicles.index')} className="block px-3 py-2 rounded hover:bg-gray-100">
                                Vehicles
                            </Link>
                            <Link href={route('bookings.index')} className="block px-3 py-2 rounded hover:bg-gray-100">
                                Bookings
                            </Link>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <Link href={route('mechanics.index')} className="block px-3 py-2 rounded hover:bg-gray-100">
                                Mechanics
                            </Link>
                            <Link href={route('parts.index')} className="block px-3 py-2 rounded hover:bg-gray-100">
                                Parts Inventory
                            </Link>
                        </>
                    )}

                    {isMechanic && (
                        <Link href={route('jobs.index')} className="block px-3 py-2 rounded hover:bg-gray-100">
                            My Jobs
                        </Link>
                    )}
                </nav>
            </aside>

            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}