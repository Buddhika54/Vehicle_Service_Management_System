import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function MechanicDashboard({ jobs = [], mechanic = null }) {
    const getStatusBadge = (status) => {
        const statusMap = {
            pending: 'bg-amber-100 text-amber-800',
            in_progress: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return statusMap[status] || 'bg-gray-100 text-gray-800';
    };

    const formatStatus = (status) => {
        if (!status) return 'Unknown';
        const labelMap = {
            pending: 'Pending',
            in_progress: 'In Progress',
            completed: 'Completed',
            cancelled: 'Cancelled',
        };
        return labelMap[status] || status.replace('_', ' ').replace('-', ' ');
    };

    const advanceStatus = (job) => {
        const next = job.status === 'pending' ? 'in_progress' : 'completed';
        router.patch(route('jobs.update-status', job.id), { status: next });
    };

    const pendingCount = jobs.filter((j) => j.status === 'pending').length;
    const inProgressCount = jobs.filter((j) => j.status === 'in_progress').length;
    const completedCount = jobs.filter((j) => j.status === 'completed').length;

    return (
        <AppLayout>
            <Head title="Mechanic Dashboard" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Mechanic Dashboard</h1>
                        {mechanic && (
                            <p className="text-sm text-gray-500 mt-1">
                                Specialization: <span className="font-medium text-gray-700">{mechanic.specialization || 'General Repair'}</span> · ID: {mechanic.employee_id}
                            </p>
                        )}
                    </div>
                    <Link
                        href={route('jobs.index')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-sm transition-all"
                    >
                        View All Jobs ({jobs.length})
                    </Link>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Jobs</p>
                            <p className="text-3xl font-bold text-amber-600 mt-1">{pendingCount}</p>
                        </div>
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold">
                            ⌛
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">In Progress</p>
                            <p className="text-3xl font-bold text-blue-600 mt-1">{inProgressCount}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                            🔧
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Completed Jobs</p>
                            <p className="text-3xl font-bold text-green-600 mt-1">{completedCount}</p>
                        </div>
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center font-bold">
                            ✓
                        </div>
                    </div>
                </div>

                {/* Assigned Jobs List */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Assigned Jobs</h2>
                        <span className="text-xs text-gray-500 font-medium">Showing recent {jobs.length} jobs</span>
                    </div>

                    {jobs.length > 0 ? (
                        <div className="space-y-3">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50/20 transition-all gap-4"
                                >
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <p className="font-semibold text-gray-900">{job.customer?.name || 'Customer'}</p>
                                            <span className="text-gray-300">•</span>
                                            <p className="text-sm text-gray-600 font-medium">
                                                {job.vehicle ? `${job.vehicle.year ? job.vehicle.year + ' ' : ''}${job.vehicle.make} ${job.vehicle.model}` : 'Vehicle details N/A'}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            <span className="font-medium text-orange-600">{job.service_type || 'General Service'}</span>
                                            {job.notes && <span className="text-gray-500 italic"> — "{job.notes}"</span>}
                                        </p>
                                        {job.scheduled_at && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                Scheduled: {new Date(job.scheduled_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-3 shrink-0">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(job.status)}`}>
                                            {formatStatus(job.status)}
                                        </span>

                                        {(job.status === 'pending' || job.status === 'in_progress') && (
                                            <button
                                                onClick={() => advanceStatus(job)}
                                                className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-sm transition-colors"
                                            >
                                                {job.status === 'pending' ? 'Start Job' : 'Complete Job'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <h3 className="text-base font-semibold text-gray-700">No jobs assigned yet</h3>
                            <p className="text-sm text-gray-500 mt-1">When a service advisor assigns a booking to you, it will appear right here.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

