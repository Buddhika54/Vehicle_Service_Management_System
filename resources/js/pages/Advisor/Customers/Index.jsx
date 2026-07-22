import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function CustomersIndex({ customers, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [deletingCustomer, setDeletingCustomer] = useState(null);

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
    });

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(
            route('customers.index'),
            { search },
            { preserveState: true, replace: true }
        );
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get(route('customers.index'), {}, { preserveState: true, replace: true });
    };

    const openCreateModal = () => {
        setEditingCustomer(null);
        form.reset();
        form.clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (customer) => {
        setEditingCustomer(customer);
        form.setData({
            name: customer.name || '',
            email: customer.email || '',
            phone: customer.phone || '',
            address: customer.address || '',
            notes: customer.notes || '',
        });
        form.clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCustomer(null);
        form.reset();
        form.clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCustomer) {
            form.put(route('customers.update', editingCustomer.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            form.post(route('customers.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (customer) => {
        setDeletingCustomer(customer);
    };

    const confirmDelete = () => {
        if (deletingCustomer) {
            router.delete(route('customers.destroy', deletingCustomer.id), {
                onSuccess: () => setDeletingCustomer(null),
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Customer Management" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Header & Primary Action */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage customer profiles and contact details.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 ease-in-out hover:from-yellow-500 hover:to-orange-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Customer</span>
                    </button>
                </div>

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
                                placeholder="Search by name, email, or phone number..."
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

                {/* Customer Table Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/75 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">Customer</th>
                                    <th className="py-3.5 px-6">Contact Info</th>
                                    <th className="py-3.5 px-6">Vehicles</th>
                                    <th className="py-3.5 px-6">Address</th>
                                    <th className="py-3.5 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {customers.data.length > 0 ? (
                                    customers.data.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50/50 transition">
                                            <td className="py-4 px-6 font-medium text-gray-900">
                                                <div>
                                                    <span className="font-semibold text-gray-900">{customer.name}</span>
                                                    {customer.notes && (
                                                        <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{customer.notes}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-xs space-y-0.5">
                                                    <p className="text-gray-800 font-medium">{customer.email}</p>
                                                    <p className="text-gray-500">{customer.phone}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                                                    {customer.vehicles_count ?? 0} {customer.vehicles_count === 1 ? 'vehicle' : 'vehicles'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-xs text-gray-600 max-w-xs truncate">
                                                {customer.address || '-'}
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <Link
                                                    href={route('customers.vehicles.index', customer.id)}
                                                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md text-orange-700 bg-orange-50 hover:bg-orange-100 transition"
                                                >
                                                    View Vehicles
                                                </Link>
                                                <button
                                                    onClick={() => openEditModal(customer)}
                                                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(customer)}
                                                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-gray-500 text-sm">
                                            No customers found. Click <strong className="text-orange-600">Add Customer</strong> to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {customers.links && customers.links.length > 3 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                            <div className="text-xs text-gray-500">
                                Showing {customers.from || 0} to {customers.to || 0} of {customers.total} customers
                            </div>
                            <div className="flex space-x-1">
                                {customers.links.map((link, i) => (
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

            {/* Create / Edit Customer Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
                        {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                    </h2>

                    <div>
                        <InputLabel htmlFor="name" value="Full Name *" />
                        <TextInput
                            id="name"
                            type="text"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={form.errors.name} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email Address *" />
                        <TextInput
                            id="email"
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={form.errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number *" />
                        <TextInput
                            id="phone"
                            type="text"
                            value={form.data.phone}
                            onChange={(e) => form.setData('phone', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={form.errors.phone} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="Address" />
                        <textarea
                            id="address"
                            rows="2"
                            value={form.data.address}
                            onChange={(e) => form.setData('address', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                        ></textarea>
                        <InputError message={form.errors.address} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="notes" value="Notes" />
                        <textarea
                            id="notes"
                            rows="2"
                            value={form.data.notes}
                            onChange={(e) => form.setData('notes', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                        ></textarea>
                        <InputError message={form.errors.notes} className="mt-1" />
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
                            {editingCustomer ? 'Update Customer' : 'Save Customer'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={!!deletingCustomer} onClose={() => setDeletingCustomer(null)} maxWidth="md">
                <div className="p-6 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">Delete Customer</h2>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete <strong className="text-gray-900">{deletingCustomer?.name}</strong>?
                        This will also delete all associated vehicles!
                    </p>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <SecondaryButton onClick={() => setDeletingCustomer(null)} type="button">
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
