import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

export default function PartsIndex({ parts, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [editingPart, setEditingPart] = useState(null);
    const [search, setSearch] = useState(filters?.search || '');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        part_number: '',
        description: '',
        unit_price: '',
        stock_quantity: '',
        low_stock_threshold: 5,
    });

    const openCreate = () => {
        reset();
        setEditingPart(null);
        setShowModal(true);
    };

    const openEdit = (part) => {
        setData({
            name: part.name,
            part_number: part.part_number,
            description: part.description || '',
            unit_price: part.unit_price,
            stock_quantity: part.stock_quantity,
            low_stock_threshold: part.low_stock_threshold,
        });
        setEditingPart(part);
        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingPart) {
            put(route('parts.update', editingPart.id), {
                onSuccess: () => setShowModal(false),
            });
        } else {
            post(route('parts.store'), {
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('parts.index'), { search }, { preserveState: true });
    };

    const handleDelete = (part) => {
        if (confirm(`Remove part ${part.name}?`)) {
            router.delete(route('parts.destroy', part.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Parts Inventory" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Parts Inventory</h1>
                    <button
                        onClick={openCreate}
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-md hover:from-yellow-500 hover:to-orange-600"
                    >
                        Add Part
                    </button>
                </div>

                <form onSubmit={handleSearch} className="mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or part number..."
                        className="w-full max-w-md rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                    />
                </form>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part #</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {parts.data.map((part) => {
                                const lowStock = part.stock_quantity <= part.low_stock_threshold;
                                return (
                                    <tr key={part.id}>
                                        <td className="px-6 py-4 text-sm text-gray-900">{part.part_number}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{part.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">${Number(part.unit_price).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                lowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                                {part.stock_quantity} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm space-x-3">
                                            <button onClick={() => openEdit(part)} className="text-orange-600 hover:text-orange-800">Edit</button>
                                            <button onClick={() => handleDelete(part)} className="text-red-600 hover:text-red-800">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">
                                {editingPart ? 'Edit Part' : 'Add Part'}
                            </h2>
                            <form onSubmit={submit} className="space-y-4">
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
                                    <label className="block text-sm font-medium text-gray-700">Part Number</label>
                                    <input
                                        type="text"
                                        value={data.part_number}
                                        onChange={(e) => setData('part_number', e.target.value)}
                                        className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                    />
                                    {errors.part_number && <p className="text-sm text-red-600 mt-1">{errors.part_number}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                        rows={2}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.unit_price}
                                            onChange={(e) => setData('unit_price', e.target.value)}
                                            className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                        />
                                        {errors.unit_price && <p className="text-sm text-red-600 mt-1">{errors.unit_price}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Stock Qty</label>
                                        <input
                                            type="number"
                                            value={data.stock_quantity}
                                            onChange={(e) => setData('stock_quantity', e.target.value)}
                                            className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                        />
                                        {errors.stock_quantity && <p className="text-sm text-red-600 mt-1">{errors.stock_quantity}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Low Stock At</label>
                                        <input
                                            type="number"
                                            value={data.low_stock_threshold}
                                            onChange={(e) => setData('low_stock_threshold', e.target.value)}
                                            className="mt-1 w-full rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                                        />
                                    </div>
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