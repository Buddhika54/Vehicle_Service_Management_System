import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const statusBadge = {
    pending: 'bg-amber-100 text-amber-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

const statusLabel = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

const TABS = ['all', 'pending', 'in_progress', 'completed', 'cancelled'];

export default function BookingsIndex({ bookings, mechanics, parts, filters }) {
    const [activeTab, setActiveTab] = useState(filters?.status || 'all');
    const [assigningId, setAssigningId] = useState(null);
    const [partsBookingId, setPartsBookingId] = useState(null);
    const [partsList, setPartsList] = useState([{ part_id: '', quantity: 1 }]);
    const [selectedMechanic, setSelectedMechanic] = useState('');

    const switchTab = (tab) => {
        setActiveTab(tab);
        router.get(
            route('bookings.index'),
            tab === 'all' ? {} : { status: tab },
            { preserveState: true }
        );
    };

    const openAssign = (booking) => {
        setAssigningId(booking.id);
        setSelectedMechanic(booking.mechanic_id || '');
    };

    const confirmAssign = (booking) => {
        if (!selectedMechanic) return;
        router.post(
            route('bookings.assign-mechanic', booking.id),
            { mechanic_id: selectedMechanic },
            { onSuccess: () => setAssigningId(null) }
        );
    };

    const addPartRow = () => setPartsList([...partsList, { part_id: '', quantity: 1 }]);

    const updatePartRow = (index, field, value) => {
        const updated = [...partsList];
        updated[index][field] = value;
        setPartsList(updated);
    };

    const submitParts = (booking) => {
        const validParts = partsList.filter((p) => p.part_id && p.quantity > 0);
        if (validParts.length === 0) return;

        router.post(
            route('bookings.attach-parts', booking.id),
            { parts: validParts },
            {
                onSuccess: () => {
                    setPartsBookingId(null);
                    setPartsList([{ part_id: '', quantity: 1 }]);
                },
            }
        );
    };

    const updateStatus = (booking, newStatus) => {
        router.patch(route('bookings.update-status', booking.id), { status: newStatus });
    };

    return (
        <AppLayout>
            <Head title="Bookings" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Bookings</h1>

                <div className="flex gap-2 mb-6 border-b border-gray-200">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => switchTab(tab)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                                activeTab === tab
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab === 'all' ? 'All' : statusLabel[tab]}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mechanic</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.data.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{booking.customer?.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {booking.vehicle?.make} {booking.vehicle?.model}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{booking.service_type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(booking.scheduled_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[booking.status]}`}>
                                            {statusLabel[booking.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {assigningId === booking.id ? (
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={selectedMechanic}
                                                    onChange={(e) => setSelectedMechanic(e.target.value)}
                                                    className="rounded-md border-gray-300 text-sm focus:border-orange-400 focus:ring-orange-400"
                                                >
                                                    <option value="">Select...</option>
                                                    {mechanics.map((m) => (
                                                        <option key={m.id} value={m.id}>{m.name} ({m.employee_id})</option>
                                                    ))}
                                                </select>
                                                <button onClick={() => confirmAssign(booking)} className="text-orange-600 text-xs font-medium">Save</button>
                                                <button onClick={() => setAssigningId(null)} className="text-gray-400 text-xs">Cancel</button>
                                            </div>
                                        ) : (
                                            booking.mechanic?.name || <span className="text-gray-400">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm space-x-2">
                                        {assigningId !== booking.id && (
                                            <button onClick={() => openAssign(booking)} className="text-orange-600 hover:text-orange-800">
                                                Assign
                                            </button>
                                        )}
                                        <button onClick={() => setPartsBookingId(booking.id)} className="text-orange-600 hover:text-orange-800">
                                            Parts
                                        </button>
                                        {booking.status === 'pending' && (
                                            <button onClick={() => updateStatus(booking, 'cancelled')} className="text-red-600 hover:text-red-800">
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {bookings.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {partsBookingId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-lg font-semibold">Attach Parts</h2>
                            {partsList.map((row, i) => (
                                <div key={i} className="mb-2 flex gap-2">
                                    <select
                                        value={row.part_id}
                                        onChange={(e) => updatePartRow(i, 'part_id', e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 text-sm"
                                    >
                                        <option value="">Select part...</option>
                                        {parts?.map((part) => (
                                            <option key={part.id} value={part.id}>
                                                {part.name} (${part.unit_price})
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min="1"
                                        value={row.quantity}
                                        onChange={(e) => updatePartRow(i, 'quantity', e.target.value)}
                                        className="w-20 rounded-md border-gray-300 text-sm"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addPartRow}
                                className="mb-4 text-sm text-orange-600"
                            >
                                + Add another part
                            </button>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPartsBookingId(null)}
                                    className="px-4 py-2 text-sm text-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        submitParts(bookings.data.find((booking) => booking.id === partsBookingId))
                                    }
                                    className="rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white"
                                >
                                    Attach
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
