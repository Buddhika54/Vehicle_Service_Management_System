import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

export default function MechanicsIndex({ mechanics, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [editingMechanic, setEditingMechanic] = useState(null);
    const [search, setSearch] = useState(filters?.search || '');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        employee_id: '',
        name: '',
        specialization: '',
        contact: '',
    });

    const openCreate = () => {
        reset();
        setEditingMechanic(null);
        setShowModal(true);
    };

    const openEdit = (mechanic) => {
        setData({
            employee_id: mechanic.employee_id,
            name: mechanic.name,
            specialization: mechanic.specialization || '',
            contact: mechanic.contact,
        });
        setEditingMechanic(mechanic);
        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingMechanic) {
            put(route('mechanics.update', editingMechanic.id), {
                onSuccess: () => setShowModal(false),
            });
        } else {
            post(route('mechanics.store'), {
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('mechanics.index'), { search }, { preserveState: true });
    };

    const handleDelete = (mechanic) => {
        if (confirm(`Remove mechanic ${mechanic.name}?`)) {
            router.delete(route('mechanics.destroy', mechanic.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Mechanics" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Mechanics</h1>
                    <button
                        onClick={openCreate}
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-md hover:from-yellow-500 hover:to-orange-600"
                    >
                        Add Mechanic
                    </button>
                </div>

                <form onSubmit={handleSearch} className="mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, employee ID, or specialization..."
                        className="w-full max-w-md rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                    />
                </form>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mechanics.data.map((mechanic) => (
                                <tr key={mechanic.id}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{mechanic.employee_id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{mechanic.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{mechanic.specialization || '—'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{mechanic.contact}</td>
                                    <td className="px-6 py-4 text-right text-sm space-x-3">
                                        <button onClick={() => openEdit(mechanic)} className="text-orange-600 hover:text-orange-800">Edit</button>
                                        <button onClick={() => handleDelete(mechanic)} className="text-red-600 hover:text-red-800">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">
                                {editingMechanic ? 'Edit Mechanic' : 'Add Mechanic'}
                            </h2>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                                    <input
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                    />
                                    {errors.employee_id && <p className="text-sm text-red-600 mt-1">{errors.employee_id}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                    />
                                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                    <input
                                        type="text"
                                        value={data.specialization}
                                        onChange={(e) => setData('specialization', e.target.value)}
                                        className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                                    <input
                                        type="text"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                    />
                                    {errors.contact && <p className="text-sm text-red-600 mt-1">{errors.contact}</p>}
                                </div>
                                <div className="flex justify-end gap-3 pt-2">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-md hover:from-yellow-500 hover:to-orange-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}