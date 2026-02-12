'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if ((session?.user as any)?.role !== 'ADMIN') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Access Denied</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white">
                <div className="p-6">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>

                <nav className="mt-8 space-y-2">
                    <Link
                        href="/admin"
                        className="block px-6 py-3 hover:bg-gray-800 transition"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/courses"
                        className="block px-6 py-3 hover:bg-gray-800 transition"
                    >
                        Courses
                    </Link>
                    <Link
                        href="/admin/courses/new"
                        className="block px-6 py-3 hover:bg-gray-800 transition"
                    >
                        New Course
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="block px-6 py-3 hover:bg-gray-800 transition"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/admin/instructors"
                        className="block px-6 py-3 hover:bg-gray-800 transition"
                    >
                        Instructors
                    </Link>
                    <Link
                        href="/admin/students"
                        className="block px-6 py-3 hover:bg-gray-800 transition"
                    >
                        Students
                    </Link>
                </nav>

                <div className="mt-auto p-6 border-t border-gray-700">
                    <p className="text-sm text-gray-400">{session?.user?.email}</p>
                    <button
                        onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                        className="mt-4 w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-4 px-6">
                        <h2 className="text-gray-900 font-semibold text-lg">
                            Welcome, {session?.user?.name}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto py-6 px-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
