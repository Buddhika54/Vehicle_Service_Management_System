import PublicLayout from '@/Layouts/PublicLayout';

const SERVICE_IMAGES = {
    'Oil Change': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHJtwXaYVpES1r3jR4uhFcRLrrJAHbrC-0T0COBkyOAtWFDHxS3jyI9fw&s=10',
    'Brake Pad Replacement': 'https://ptdka.co.id/wp-content/uploads/2023/02/when-do-you-need-to-replace-your-brake-pads-1.jpg',
    'Tire Rotation': 'https://jiffylubespecials.com/wp-content/uploads/2024/09/Take-Care-of-Your-Tires-With-a-Tire-Rotation.jpg',
    'General Inspection': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt3Zc4xE8K4kEDtWiOqVLZFzSpByyiJR5bAmvk9_4gKFKMfitdltQzOYU&s=10',
    'Engine Diagnostic': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQpCD4-QH6vMwRtrDgL8Pj-pCebkUWz_x2XhMFBZSRI0tw4GoTKRiNiSc&s=10',
    'Battery Replacement': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREngh8N421CEIbkwrX0WjkZ1YxnMYzWNcs8yjbX1VNRmD2wkgIsIjWMes&s=10',
    'Air Filter Replacement': 'https://www.wikihow.com/images/thumb/d/d5/Change-Your-Air-Filter-Step-5.jpg/v4-460px-Change-Your-Air-Filter-Step-5.jpg',
    'Timing Belt Replacement': 'https://media.istockphoto.com/id/2213868681/photo/mechanic-working-on-car-timing-belt-replacement-under-the-hood-in-automotive-workshop.jpg?s=612x612&w=0&k=20&c=0sXMqdcbLyo_VwmQXVyRQGrPaVepPSGC0rXklR3kto8=',
};

const FALLBACK_IMAGE = 'https://www.mrpaintauto.lk/news/wp-content/uploads/2024/12/Regular-Vehicle-Inspections-in-Sri-Lanka.jpg';

export default function Services({ services }) {
    const calculateStartingPrice = (service) => {
        return (service.base_labor_hours * service.hourly_rate).toFixed(2);
    };

    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Professional automotive services to keep your vehicle running smoothly. From routine maintenance to complex repairs, we've got you covered.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <img
                                src={SERVICE_IMAGES[service.name] || FALLBACK_IMAGE}
                                alt={service.name}
                                onError={(e) => {
                                    e.target.src = FALLBACK_IMAGE;
                                }}
                                className="w-full h-40 object-cover rounded-t-xl"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Estimated labor: {service.base_labor_hours} hours
                                </p>
                                <p className="text-base font-semibold text-orange-600">
                                    Starting from ${calculateStartingPrice(service)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
