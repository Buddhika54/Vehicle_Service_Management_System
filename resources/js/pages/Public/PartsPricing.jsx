import { useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const PART_IMAGES = {
    'Brake Pad Set': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYtOguDQDjUHPI2q9dtCKoGM92OoOlCI0suDoXnLefGg&s=10',
    'Oil Filter': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ytDVE38iTpC96oqN5Z7yvw5GwnjyRAAnUP0zB3_S9G-Ujs_JZBRNQcE&s=10',
    'Air Filter': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS8gkXL-b2mRhybcXDN2XadavNBFS9DZIqH-seLAwNrQ&s=10',
    'Spark Plug': 'https://www.e3sparkplugs.com/cdn/shop/articles/BlueOceanConsulting-322164-two-spark-plugs-blogbanner1.jpg?v=1725638401&width=1024',
    'Timing Belt': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2L0HdBLkS-sG1m4cWXa73rg_4SI41oRcjD1fvb1hhsng-aM3LKRH_KVc&s=10',
    'Battery': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFYOrE8NwyvXZzIfpyVOHektsHDsL8veaQp-mgjqs5sIRW8Gx1sB-28Ds&s=10',
    'Radiator Hose': 'https://www.bryke.com/cdn/shop/products/Lower_Radiator_Hose__66140.jpg?v=1701251505',
    'Clutch Kit': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTulJ_i_UTq5uFM4IVwdS4UNVUk8kxUSOVRbQ5XVAEh7A&s=10',
    'Wiper Blade': 'https://i5.walmartimages.com/seo/2-wipers-Factory-For-2006-2010-VW-Passat-Jetta-Touran-Scirocco-Eos-Golf-5-Golf-6-Skoda-Yeti-Original-Equipment-Replacement-Wiper-Blade_696f5a8f-0b5f-4f5a-9c01-5ab6a1493102.585a806fc8f0cfcceaf37b68ccd3a4fa.jpeg',
    'Fuel Pump': 'https://m.media-amazon.com/images/I/41xNIUG-CZL._AC_US400_.jpg',
};

const FALLBACK_IMAGE = 'https://www.mrpaintauto.lk/news/wp-content/uploads/2024/12/Regular-Vehicle-Inspections-in-Sri-Lanka.jpg';

export default function PartsPricing({ parts, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('parts-pricing'), { search }, { preserveState: true });
    };

    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Parts</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Browse our inventory of quality automotive parts. We stock a wide range of components to meet your vehicle's needs.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="max-w-md mx-auto">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search parts..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                        />
                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {parts.map((part) => (
                        <div key={part.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <img
                                src={PART_IMAGES[part.name] || FALLBACK_IMAGE}
                                alt={part.name}
                                onError={(e) => {
                                    e.target.src = FALLBACK_IMAGE;
                                }}
                                className="w-full h-40 object-cover rounded-t-xl"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{part.name}</h3>
                                <p className="text-base font-semibold text-orange-600">
                                    ${parseFloat(part.unit_price).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {parts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No parts found matching your search.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
