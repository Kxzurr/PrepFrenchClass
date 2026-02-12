'use client';

import { useEffect, useState } from 'react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    iconKey?: string | null;
    gradientFrom?: string | null;
    gradientTo?: string | null;
    _count: { courses: number };
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        iconKey: '',
        gradientFrom: '',
        gradientTo: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/categories');
            const data = await response.json();

            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setFormData({ name: '', slug: '', description: '', iconKey: '', gradientFrom: '', gradientTo: '' });
                setShowForm(false);
                fetchCategories();
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Error creating category');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`/api/admin/categories/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();

                if (data.success) {
                    fetchCategories();
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Error deleting category');
            }
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700"
                >
                    {showForm ? 'Cancel' : '+ New Category'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">New Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setFormData({
                                        ...formData,
                                        name,
                                        slug: generateSlug(name),
                                    });
                                }}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Category name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData({ ...formData, slug: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="category-slug"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Auto-generated from name
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                rows={3}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Category description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Icon Key (for homepage)
                            </label>
                            <select
                                value={formData.iconKey}
                                onChange={(e) =>
                                    setFormData({ ...formData, iconKey: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="">Select icon</option>
                                <option value="book">Book / Study</option>
                                <option value="global">Global / Language</option>
                                <option value="school">School / Academic</option>
                                <option value="graduation">Graduation / Exam</option>
                                <option value="sparkling">Special / Premium</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Controls which icon appears in the homepage category slider.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gradient From class
                                </label>
                                <input
                                    type="text"
                                    value={formData.gradientFrom}
                                    onChange={(e) =>
                                        setFormData({ ...formData, gradientFrom: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="e.g. from-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gradient To class
                                </label>
                                <input
                                    type="text"
                                    value={formData.gradientTo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, gradientTo: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="e.g. to-blue-600"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700"
                        >
                            Create Category
                        </button>
                    </form>
                </div>
            )}

            {categories.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-gray-600">No categories found. Create your first one!</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Courses
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {category.slug}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {category._count.courses}
                                    </td>
                                    <td className="px-6 py-4 text-sm space-x-2">
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
