import PublicLayout from '@/Layouts/PublicLayout';

export default function About({ mechanics }) {
    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Learn more about our mission and the team behind our exceptional automotive services.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                    <p className="text-gray-600 mb-4">
                        Vehicle Service Management has been serving the community for over 15 years. What started as a small family-owned garage has grown into a full-service automotive center, but our commitment to quality and customer satisfaction remains unchanged.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Our mission is simple: to provide honest, reliable, and affordable automotive services that keep our customers safe on the road. We believe in transparency, quality workmanship, and building long-term relationships with our customers.
                    </p>
                    <p className="text-gray-600">
                        Whether you need routine maintenance, complex repairs, or just advice on keeping your vehicle in top condition, our team of certified mechanics is here to help. We invest in the latest diagnostic equipment and ongoing training to ensure we can handle any automotive challenge.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mechanics.map((mechanic) => (
                            <div key={mechanic.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{mechanic.name}</h3>
                                <p className="text-sm text-gray-600 text-center">{mechanic.specialization || 'General Mechanic'}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h3>
                            <p className="text-gray-600 text-sm">
                                We believe in honest communication and fair pricing. No hidden fees, no unnecessary repairs.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
                            <p className="text-gray-600 text-sm">
                                We take pride in our work and strive for excellence in every job, big or small.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Focus</h3>
                            <p className="text-gray-600 text-sm">
                                Your satisfaction is our priority. We listen to your needs and deliver solutions that work for you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
