'use client';

import { useEffect, useState } from 'react';

interface DashboardStats {
    totalCourses: number;
    totalStudents: number;
    totalCategories: number;
    totalInstructors: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalCourses: 0,
        totalStudents: 0,
        totalCategories: 0,
        totalInstructors: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch stats from API
                // For now, we'll use mock data
                setStats({
                    totalCourses: 0,
                    totalStudents: 0,
                    totalCategories: 0,
                    totalInstructors: 0,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Courses Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">📚</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-600 text-sm">Total Courses</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {stats.totalCourses}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Students Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">👥</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-600 text-sm">Total Students</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {stats.totalStudents}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Categories Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">🏷️</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-600 text-sm">Categories</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {stats.totalCategories}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Instructors Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">👨‍🏫</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-600 text-sm">Instructors</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {stats.totalInstructors}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                </h2>
                <p className="text-gray-600">
                    No recent activity yet. Visit the courses section to manage your content.
                </p>
            </div>
        </div>
    );
}
