import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl p-6 border border-gray-100">
                        <h1 className="text-xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                        <p className="text-gray-600">You are logged into the Vehicle Service Management System.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

