import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function MechanicDashboard() {
    const jobs = [
        { id: 1, customer: 'John Doe', vehicle: 'Toyota Camry', issue: 'Brake replacement', status: 'pending' },
        { id: 2, customer: 'Jane Smith', vehicle: 'Honda Civic', issue: 'Oil change', status: 'in-progress' },
        { id: 3, customer: 'Bob Johnson', vehicle: 'Ford F-150', issue: 'Engine diagnostics', status: 'completed' },
        { id: 4, customer: 'Alice Brown', vehicle: 'Chevrolet Malibu', issue: 'Tire rotation', status: 'pending' },
    ];

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
        return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <AppLayout>
            <Head title="Mechanic Dashboard" />

            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Mechanic Dashboard</h1>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Jobs</h2>
                    <div className="space-y-3">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-orange-400 transition-colors"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{job.customer}</p>
                                            <p className="text-sm text-gray-500">{job.vehicle}</p>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span className="text-gray-400">•</span> {job.issue}
                                        </div>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                                    {formatStatus(job.status)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <Link
                        href={route('jobs.index')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        View All Jobs
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
