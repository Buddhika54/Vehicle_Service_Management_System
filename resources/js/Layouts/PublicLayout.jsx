import { Link } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const isCurrentRoute = (pattern) => {
        try {
            return route().current(pattern);
        } catch {
            return false;
        }
    };

    const navLinkClass = (isActive) =>
        `px-4 py-2 text-sm font-medium transition-colors ${
            isActive
                ? 'text-orange-600 font-semibold'
                : 'text-gray-700 hover:text-orange-600'
        }`;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-gray-800">Garage-Plus</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-1">
                            <Link href={route('home')} className={navLinkClass(isCurrentRoute('home'))}>
                                Home
                            </Link>
                            <Link href={route('services')} className={navLinkClass(isCurrentRoute('services'))}>
                                Services
                            </Link>
                            <Link href={route('parts-pricing')} className={navLinkClass(isCurrentRoute('parts-pricing'))}>
                                Parts & Pricing
                            </Link>
                            <Link href={route('about')} className={navLinkClass(isCurrentRoute('about'))}>
                                About
                            </Link>
                            <Link href={route('contact')} className={navLinkClass(isCurrentRoute('contact'))}>
                                Contact
                            </Link>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Link
                                href={route('login')}
                                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all shadow-sm"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1">{children}</main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-3 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold">Vehicle Service</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Vehicle Service Management. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
