import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';

export default function VehiclesIndex({ vehicles, customers, selectedCustomer, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [deletingVehicle, setDeletingVehicle] = useState(null);

    const form = useForm({
        customer_id: selectedCustomer ? selectedCustomer.id : '',
        registration_no: '',
        make: '',
        model: '',
        year: new Date().getFullYear(),
        vin: '',
        mileage: 0,
    });

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const params = {};
        if (search) params.search = search;
        if (filters.customer_id) params.customer_id = filters.customer_id;

        router.get(
            selectedCustomer ? route('customers.vehicles.index', selectedCustomer.id) : route('vehicles.index'),
            params,
            { preserveState: true, replace: true }
        );
    };

    const handleClearSearch = () => {
        setSearch('');
        const params = {};
        if (filters.customer_id) params.customer_id = filters.customer_id;

        router.get(
            selectedCustomer ? route('customers.vehicles.index', selectedCustomer.id) : route('vehicles.index'),
            params,
            { preserveState: true, replace: true }
        );
    };

    const openCreateModal = () => {
        setEditingVehicle(null);
        form.setData({
            customer_id: selectedCustomer ? selectedCustomer.id : (customers[0]?.id || ''),
            registration_no: '',
            make: '',
            model: '',
            year: new Date().getFullYear(),
            vin: '',
            mileage: 0,
        });
        form.clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (vehicle) => {
        setEditingVehicle(vehicle);
        form.setData({
            customer_id: vehicle.customer_id || '',
            registration_no: vehicle.registration_no || '',
            make: vehicle.make || '',
            model: vehicle.model || '',
            year: vehicle.year || '',
            vin: vehicle.vin || '',
            mileage: vehicle.mileage || 0,
        });
        form.clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingVehicle(null);
        form.reset();
        form.clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingVehicle) {
            form.put(route('vehicles.update', editingVehicle.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            form.post(route('vehicles.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (vehicle) => {
        setDeletingVehicle(vehicle);
    };

    const confirmDelete = () => {
        if (deletingVehicle) {
            router.delete(route('vehicles.destroy', deletingVehicle.id), {
                onSuccess: () => setDeletingVehicle(null),
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Vehicle Management" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Header & Action Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Vehicle Management</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {selectedCustomer
                                ? `Showing vehicles for ${selectedCustomer.name}`
                                : 'Manage customer vehicles and registration records.'}
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 ease-in-out hover:from-yellow-500 hover:to-orange-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Vehicle</span>
                    </button>
                </div>

                {/* Filter banner if nested under customer */}
                {selectedCustomer && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-orange-800">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v25a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                            </svg>
                            <span>
                                Filtered by Customer: <strong className="font-semibold">{selectedCustomer.name}</strong> ({selectedCustomer.email})
                            </span>
                        </div>
                        <Link
                            href={route('vehicles.index')}
                            className="text-xs font-semibold text-orange-700 hover:text-orange-900 bg-white px-3 py-1.5 rounded-lg border border-orange-200 shadow-sm"
                        >
                            View All Vehicles
                        </Link>
                    </div>
                )}

                {/* Search Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by plate number, make, model, or VIN..."
                                className="block w-full pl-10 pr-4 py-2 text-sm border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition"
                            >
                                Search
                            </button>
                            {filters.search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Vehicles Table Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/75 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">Registration No</th>
                                    <th className="py-3.5 px-6">Vehicle Details</th>
                                    <th className="py-3.5 px-6">Customer</th>
                                    <th className="py-3.5 px-6">VIN</th>
                                    <th className="py-3.5 px-6">Mileage</th>
                                    <th className="py-3.5 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {vehicles.data.length > 0 ? (
                                    vehicles.data.map((vehicle) => (
                                        <tr key={vehicle.id} className="hover:bg-gray-50/50 transition">
                                            <td className="py-4 px-6 font-semibold text-gray-900">
                                                <span className="inline-block px-2.5 py-1 rounded bg-gray-100 border border-gray-300 font-mono text-xs uppercase tracking-wider text-gray-800">
                                                    {vehicle.registration_no}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-medium text-gray-900">
                                                <div>
                                                    <span className="text-gray-900 font-semibold">{vehicle.make} {vehicle.model}</span>
                                                    <span className="text-xs text-gray-500 block">Year: {vehicle.year}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {vehicle.customer ? (
                                                    <div>
                                                        <span className="text-gray-900 font-medium">{vehicle.customer.name}</span>
                                                        <span className="text-xs text-gray-500 block">{vehicle.customer.phone}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic">Unassigned</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-xs font-mono text-gray-600">
                                                {vehicle.vin || '-'}
                                            </td>
                                            <td className="py-4 px-6 text-xs text-gray-700">
                                                <span className="font-semibold">{vehicle.mileage.toLocaleString()}</span> km
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <button
                                                    onClick={() => openEditModal(vehicle)}
                                                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(vehicle)}
                                                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500 text-sm">
                                            No vehicles found. Click <strong className="text-orange-600">Add Vehicle</strong> to register one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {vehicles.links && vehicles.links.length > 3 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                            <div className="text-xs text-gray-500">
                                Showing {vehicles.from || 0} to {vehicles.to || 0} of {vehicles.total} vehicles
                            </div>
                            <div className="flex space-x-1">
                                {vehicles.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        preserveState
                                        className={`px-3 py-1 text-xs rounded-md ${
                                            link.active
                                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold'
                                                : link.url
                                                ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Edit Vehicle Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
                        {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                    </h2>

                    <div>
                        <InputLabel htmlFor="customer_id" value="Customer *" />
                        <select
                            id="customer_id"
                            value={form.data.customer_id}
                            onChange={(e) => form.setData('customer_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                            required
                        >
                            <option value="">Select a Customer</option>
                            {customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name} ({c.email})
                                </option>
                            ))}
                        </select>
                        <InputError message={form.errors.customer_id} className="mt-1" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="registration_no" value="Registration No *" />
                            <TextInput
                                id="registration_no"
                                type="text"
                                value={form.data.registration_no}
                                onChange={(e) => form.setData('registration_no', e.target.value)}
                                className="mt-1 block w-full uppercase font-mono"
                                placeholder="e.g. ABC-1234"
                                required
                            />
                            <InputError message={form.errors.registration_no} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="year" value="Year *" />
                            <TextInput
                                id="year"
                                type="number"
                                value={form.data.year}
                                onChange={(e) => form.setData('year', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={form.errors.year} className="mt-1" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="make" value="Make *" />
                            <TextInput
                                id="make"
                                type="text"
                                value={form.data.make}
                                onChange={(e) => form.setData('make', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="e.g. Toyota"
                                required
                            />
                            <InputError message={form.errors.make} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="model" value="Model *" />
                            <TextInput
                                id="model"
                                type="text"
                                value={form.data.model}
                                onChange={(e) => form.setData('model', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="e.g. Camry"
                                required
                            />
                            <InputError message={form.errors.model} className="mt-1" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="vin" value="VIN (Vehicle ID Number)" />
                            <TextInput
                                id="vin"
                                type="text"
                                value={form.data.vin}
                                onChange={(e) => form.setData('vin', e.target.value)}
                                className="mt-1 block w-full uppercase font-mono"
                                placeholder="17-character VIN"
                            />
                            <InputError message={form.errors.vin} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="mileage" value="Current Mileage (km) *" />
                            <TextInput
                                id="mileage"
                                type="number"
                                value={form.data.mileage}
                                onChange={(e) => form.setData('mileage', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={form.errors.mileage} className="mt-1" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <SecondaryButton onClick={closeModal} type="button">
                            Cancel
                        </SecondaryButton>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold text-xs uppercase tracking-widest rounded-md shadow-sm transition ease-in-out duration-150 disabled:opacity-25"
                        >
                            {editingVehicle ? 'Update Vehicle' : 'Save Vehicle'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={!!deletingVehicle} onClose={() => setDeletingVehicle(null)} maxWidth="md">
                <div className="p-6 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">Delete Vehicle</h2>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete vehicle <strong className="text-gray-900">{deletingVehicle?.registration_no} ({deletingVehicle?.make} {deletingVehicle?.model})</strong>?
                    </p>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <SecondaryButton onClick={() => setDeletingVehicle(null)} type="button">
                            Cancel
                        </SecondaryButton>
                        <button
                            onClick={confirmDelete}
                            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-widest rounded-md shadow-sm transition ease-in-out duration-150"
                        >
                            Confirm Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}
