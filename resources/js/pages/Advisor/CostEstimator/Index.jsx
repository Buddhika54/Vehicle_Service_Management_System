import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function CostEstimatorIndex({ services = [], parts = [], estimate = null }) {
    const pageProps = usePage().props;
    const currentEstimate = estimate ?? pageProps.flash?.estimate ?? null;


    const { data, setData, post, processing } = useForm({
        service_ids: [],
        part_ids: [],
    });

    const toggle = (field, id) => {
        const current = data[field];
        setData(field, current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('cost-estimator.estimate'), { preserveScroll: true });
    };

    const selectAllServices = () => {
        if (data.service_ids.length === services.length) {
            setData('service_ids', []);
        } else {
            setData('service_ids', services.map((s) => s.id));
        }
    };

    const selectAllParts = () => {
        if (data.part_ids.length === parts.length) {
            setData('part_ids', []);
        } else {
            setData('part_ids', parts.map((p) => p.id));
        }
    };

    return (
        <AppLayout>
            <Head title="AI Cost Estimator" />
            <div className="p-6 max-w-4xl">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">AI Cost Estimator</h1>
                        <p className="text-sm text-gray-500">Generate intelligent labor, parts, and total cost estimations powered by AI.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Input Form */}
                    <div className={currentEstimate ? 'lg:col-span-7' : 'lg:col-span-12'}>
                        <form onSubmit={submit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                            {/* Services Section */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                        <span>🛠️ Select Services</span>
                                        <span className="text-xs font-normal text-gray-500">({data.service_ids.length} selected)</span>
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={selectAllServices}
                                        className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                                    >
                                        {data.service_ids.length === services.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                                    {services.map((s) => {
                                        const isSelected = data.service_ids.includes(s.id);
                                        return (
                                            <label
                                                key={s.id}
                                                className={`flex items-center justify-between p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                                                    isSelected
                                                        ? 'border-orange-400 bg-orange-50/50 text-gray-900 font-medium shadow-sm'
                                                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggle('service_ids', s.id)}
                                                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-400 h-4 w-4"
                                                    />
                                                    <span>{s.name}</span>
                                                </div>
                                                <span className="text-xs text-gray-400">{s.base_labor_hours ? `${s.base_labor_hours}h` : ''}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Parts Section */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                        <span>📦 Select Parts (Optional)</span>
                                        <span className="text-xs font-normal text-gray-500">({data.part_ids.length} selected)</span>
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={selectAllParts}
                                        className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                                    >
                                        {data.part_ids.length === parts.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                                    {parts.map((p) => {
                                        const isSelected = data.part_ids.includes(p.id);
                                        return (
                                            <label
                                                key={p.id}
                                                className={`flex items-center justify-between p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                                                    isSelected
                                                        ? 'border-orange-400 bg-orange-50/50 text-gray-900 font-medium shadow-sm'
                                                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggle('part_ids', p.id)}
                                                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-400 h-4 w-4"
                                                    />
                                                    <span className="truncate max-w-[140px]">{p.name}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-600">${Number(p.unit_price).toFixed(2)}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing || data.service_ids.length === 0}
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white font-bold text-sm shadow-md hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Calculating AI Estimate...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>✨ Generate AI Estimate</span>
                                    </>
                                )}
                            </button>

                            {data.service_ids.length === 0 && (
                                <p className="text-xs text-amber-600 text-center font-medium">Please select at least 1 service to generate an estimate.</p>
                            )}
                        </form>
                    </div>

                    {/* Output Results */}
                    {currentEstimate && (
                        <div className="lg:col-span-5 space-y-4">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4 pb-3 border-b">
                                    <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                        <span>📊 Cost Breakdown</span>
                                    </h2>
                                    <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full">AI Estimated</span>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-600">Estimated Labor</span>
                                        <span className="font-semibold text-gray-800">{currentEstimate.labor_hours} hrs (${currentEstimate.labor_cost})</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-600">Parts Subtotal</span>
                                        <span className="font-semibold text-gray-800">${Number(currentEstimate.parts_cost).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                        <span className="text-base font-bold text-gray-900">Total Estimate</span>
                                        <span className="text-xl font-black text-orange-600">${Number(currentEstimate.total_estimate).toFixed(2)}</span>
                                    </div>
                                </div>

                                {currentEstimate.ai_suggested_services?.length > 0 && (
                                    <div className="mt-5 p-4 bg-orange-50/70 border border-orange-100 rounded-xl">
                                        <p className="text-xs font-bold text-orange-900 uppercase tracking-wider mb-2">💡 Recommended Additions:</p>
                                        <ul className="space-y-1 text-xs text-orange-800 font-medium">
                                            {currentEstimate.ai_suggested_services.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-1.5">
                                                    <span className="text-orange-500">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {currentEstimate.ai_notes && (
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 italic">"{currentEstimate.ai_notes}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}