'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Course {
    id: string;
    title: string;
    slug: string;
    displayOrder: number | null;
}

export default function CourseOrderPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/courses?limit=1000&sortByOrder=true');
            const data = await response.json();

            if (data.success) {
                // Sort by displayOrder with null values at the end
                const sorted = data.data.sort((a: Course, b: Course) => {
                    const orderA = a.displayOrder ?? Infinity;
                    const orderB = b.displayOrder ?? Infinity;
                    return orderA - orderB;
                });
                setCourses(sorted);
                setHasChanges(false);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            alert('Error fetching courses');
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(index));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        const sourceIndexStr = e.dataTransfer.getData('text/plain');
        const sourceIndex = parseInt(sourceIndexStr, 10);

        if (sourceIndex === targetIndex) return;

        const newCourses = [...courses];
        const [movedCourse] = newCourses.splice(sourceIndex, 1);
        newCourses.splice(targetIndex, 0, movedCourse);

        setCourses(newCourses);
        setHasChanges(true);
    };

    const handleOrderChange = (index: number, newOrder: number) => {
        const newCourses = [...courses];
        newCourses[index].displayOrder = newOrder;
        setCourses(newCourses);
        setHasChanges(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Assign order numbers based on position
            const ordersToSave = courses.map((course, index) => ({
                id: course.id,
                displayOrder: index + 1,
            }));

            const response = await fetch('/api/admin/courses/bulk/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orders: ordersToSave }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Course order saved successfully!');
                setHasChanges(false);
                fetchCourses();
            } else {
                alert('Error saving course order: ' + data.error);
            }
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes');
        } finally {
            setSaving(false);
        }
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newCourses = [...courses];
        [newCourses[index - 1], newCourses[index]] = [newCourses[index], newCourses[index - 1]];
        setCourses(newCourses);
        setHasChanges(true);
    };

    const moveDown = (index: number) => {
        if (index === courses.length - 1) return;
        const newCourses = [...courses];
        [newCourses[index], newCourses[index + 1]] = [newCourses[index + 1], newCourses[index]];
        setCourses(newCourses);
        setHasChanges(true);
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Course Ordering</h1>
                    <p className="text-gray-600 mt-2">
                        Drag courses to reorder or use arrow buttons. This order will be used as the default on the frontend.
                    </p>
                </div>
                <Link
                    href="/admin/courses"
                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                    Back to Courses
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-gray-600">No courses found.</p>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {courses.map((course, index) => (
                                <div
                                    key={course.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className="p-4 hover:bg-gray-50 cursor-move flex items-center justify-between gap-4 bg-white hover:shadow-sm transition"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="text-gray-500 font-bold w-8">#{index + 1}</div>
                                        <div className="text-sm font-medium text-gray-900 flex-1">{course.title}</div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => moveUp(index)}
                                            disabled={index === 0}
                                            className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Move up"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            onClick={() => moveDown(index)}
                                            disabled={index === courses.length - 1}
                                            className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Move down"
                                        >
                                            ↓
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {hasChanges && (
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Order'}
                            </button>
                            <button
                                onClick={() => {
                                    setHasChanges(false);
                                    fetchCourses();
                                }}
                                className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
