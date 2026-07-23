import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function CustomerBookingsCreate({ vehicles = [] }) {
    // Generate tomorrow's date as default YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = tomorrow.toISOString().split('T')[0];

    const serviceTypes = [
        'Oil Change',
        'Brake Service',
        'Tire Rotation',
        'General Inspection',
        'Engine Diagnostic',
        'Other',
    ];

    // Business hours slots: 8:00 AM to 5:30 PM (every 30 mins)
    const timeSlots = [];
    for (let hour = 8; hour < 18; hour++) {
        const hourStr = hour.toString().padStart(2, '0');
        timeSlots.push(`${hourStr}:00`);
        timeSlots.push(`${hourStr}:30`);
    }

    const { data, setData, post, processing, errors, transform } = useForm({
        vehicle_id: vehicles[0]?.id || '',
        service_type: 'Oil Change',
        date: defaultDate,
        time: '09:00',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        transform((data) => ({
            vehicle_id: data.vehicle_id,
            service_type: data.service_type,
            scheduled_at: `${data.date} ${data.time}:00`,
            notes: data.notes,
        }));

        post(route('customer.bookings.store'));
    };

    return (
        <AppLayout>
            <Head title="Book Service Appointment" />

            <div className="p-6 max-w-3xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Book Service Appointment</h1>
                        <p className="text-gray-600 text-sm mt-1">Schedule a service appointment for your registered vehicle.</p>
                    </div>
                    <Link
                        href={route('customer.bookings.index')}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition"
                    >
                        ← Back to My Bookings
                    </Link>
                </div>

                {vehicles.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
                        <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">You need to add a vehicle first</h3>
                        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto mb-6">
                            You don't have any registered vehicles. Please add a vehicle to your account before booking a service appointment.
                        </p>
                        <Link
                            href={route('customer.vehicles.create')}
                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        >
                            + Add Vehicle Now
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Vehicle Select */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Select Vehicle <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.vehicle_id}
                                    onChange={(e) => setData('vehicle_id', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                    required
                                >
                                    {vehicles.map((v) => (
                                        <option key={v.id} value={v.id}>
                                            {v.year} {v.make} {v.model} ({v.registration_no})
                                        </option>
                                    ))}
                                </select>
                                {errors.vehicle_id && (
                                    <p className="mt-1 text-xs text-red-600">{errors.vehicle_id}</p>
                                )}
                            </div>

                            {/* Service Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Service Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.service_type}
                                    onChange={(e) => setData('service_type', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                    required
                                >
                                    {serviceTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors.service_type && (
                                    <p className="mt-1 text-xs text-red-600">{errors.service_type}</p>
                                )}
                            </div>

                            {/* Date and Time Pickers */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Preferred Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Time Slot (8:00 AM - 6:00 PM) <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.time}
                                        onChange={(e) => setData('time', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                        required
                                    >
                                        {timeSlots.map((slot) => {
                                            const [h, m] = slot.split(':');
                                            const hourNum = parseInt(h, 10);
                                            const period = hourNum >= 12 ? 'PM' : 'AM';
                                            const displayHour = hourNum > 12 ? hourNum - 12 : (hourNum === 0 ? 12 : hourNum);
                                            const label = `${displayHour}:${m} ${period}`;
                                            return (
                                                <option key={slot} value={slot}>
                                                    {label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            {errors.scheduled_at && (
                                <p className="mt-1 text-xs text-red-600">{errors.scheduled_at}</p>
                            )}

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Issue Description / Notes <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Describe any specific issues, symptoms, or requests for our service team..."
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                />
                                {errors.notes && (
                                    <p className="mt-1 text-xs text-red-600">{errors.notes}</p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('customer.bookings.index')}
                                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Booking...' : 'Confirm Appointment'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
