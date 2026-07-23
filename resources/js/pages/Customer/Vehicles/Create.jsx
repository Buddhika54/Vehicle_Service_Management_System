import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function CustomerVehiclesCreate() {
    const currentYear = new Date().getFullYear();

    const { data, setData, post, processing, errors } = useForm({
        registration_no: '',
        make: '',
        model: '',
        year: currentYear.toString(),
        vin: '',
        mileage: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('customer.vehicles.store'));
    };

    return (
        <AppLayout>
            <Head title="Add Vehicle" />

            <div className="p-6 max-w-3xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Add New Vehicle</h1>
                        <p className="text-gray-600 text-sm mt-1">Register a vehicle under your account to book service appointments.</p>
                    </div>
                    <Link
                        href={route('customer.vehicles.index')}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition"
                    >
                        ← Back to My Vehicles
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Registration Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Registration Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.registration_no}
                                    onChange={(e) => setData('registration_no', e.target.value.toUpperCase())}
                                    placeholder="e.g. ABC-1234"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm font-mono"
                                    required
                                />
                                {errors.registration_no && (
                                    <p className="mt-1 text-xs text-red-600">{errors.registration_no}</p>
                                )}
                            </div>

                            {/* Make */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Make <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.make}
                                    onChange={(e) => setData('make', e.target.value)}
                                    placeholder="e.g. Toyota, Honda, Ford"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                    required
                                />
                                {errors.make && (
                                    <p className="mt-1 text-xs text-red-600">{errors.make}</p>
                                )}
                            </div>

                            {/* Model */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Model <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    placeholder="e.g. Corolla, Civic, Mustang"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                    required
                                />
                                {errors.model && (
                                    <p className="mt-1 text-xs text-red-600">{errors.model}</p>
                                )}
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Year <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="1980"
                                    max={currentYear}
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    placeholder={`1980-${currentYear}`}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                    required
                                />
                                {errors.year && (
                                    <p className="mt-1 text-xs text-red-600">{errors.year}</p>
                                )}
                            </div>

                            {/* VIN */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    VIN (Vehicle Identification Number) <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.vin}
                                    onChange={(e) => setData('vin', e.target.value.toUpperCase())}
                                    placeholder="17-character VIN"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm font-mono"
                                />
                                {errors.vin && (
                                    <p className="mt-1 text-xs text-red-600">{errors.vin}</p>
                                )}
                            </div>

                            {/* Current Mileage */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Current Mileage (km) <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.mileage}
                                    onChange={(e) => setData('mileage', e.target.value)}
                                    placeholder="e.g. 45000"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                />
                                {errors.mileage && (
                                    <p className="mt-1 text-xs text-red-600">{errors.mileage}</p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
                            <Link
                                href={route('customer.vehicles.index')}
                                className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Add Vehicle'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
