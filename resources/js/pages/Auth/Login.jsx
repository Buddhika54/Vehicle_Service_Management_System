import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="bg-[#FFF8E7]" >
        <GuestLayout>
            
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="bg-[#FFF8E7] p-6 rounded-lg shadow-md">
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="font-semibold text-orange-700"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-md border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        className="font-semibold text-orange-700"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-md border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="h-4 w-4 rounded border-orange-300 text-orange-500 shadow-sm focus:ring-orange-400"
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-orange-600 underline hover:text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="ms-4 inline-flex items-center rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50"
                    >
                        Log in
                    </button>
                </div>
            </form>

            <div className="mt-6 border-t border-orange-100 pt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don&apos;t have an account?
                </p>

                <Link
                    href={route('register')}
                    className="mt-3 inline-block w-full rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                >
                    Sign Up
                </Link>
            </div>
            
        </GuestLayout>
        </div>
    );
}