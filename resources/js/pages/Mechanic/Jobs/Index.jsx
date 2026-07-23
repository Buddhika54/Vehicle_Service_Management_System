import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function MechanicJobsIndex() {
    return (
        <AppLayout>
            <Head title="My Jobs" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Assigned Jobs</h1>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <p className="text-gray-600">No jobs assigned currently.</p>
                </div>
            </div>
        </AppLayout>
    );
}
