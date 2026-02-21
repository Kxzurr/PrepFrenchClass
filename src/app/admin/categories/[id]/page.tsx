'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        gradientFrom: '',
        gradientTo: '',
    });

    const fetchCategory = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/categories/${resolvedParams.id}`);
            const data = await response.json();

            if (data.success) {
                setFormData({
                    name: data.data.name || '',
                    slug: data.data.slug || '',
                    description: data.data.description || '',
                    image: data.data.image || '',
                    gradientFrom: data.data.gradientFrom || '',
                    gradientTo: data.data.gradientTo || '',
                });
            } else {
                alert('Error loading category');
                router.push('/admin/categories');
            }
        } catch (error) {
            console.error('Error fetching category:', error);
            alert('Error loading category');
            router.push('/admin/categories');
        } finally {
            setLoading(false);
        }
    }, [resolvedParams.id, router]);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/admin/categories/${resolvedParams.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert('Category updated successfully!');
                router.push('/admin/categories');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Error updating category');
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
                <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
                <button
                    onClick={() => router.push('/admin/categories')}
                    className="rounded-md bg-gray-600 px-6 py-2 text-white font-medium hover:bg-gray-700"
                >
                    Back to Categories
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
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
                            Category Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                    const data = new FormData();
                                    data.append('file', file);
                                    const res = await fetch('/api/admin/upload', {
                                        method: 'POST',
                                        body: data,
                                    });
                                    const json = await res.json();
                                    if (json.success && json.url) {
                                        setFormData({ ...formData, image: json.url });
                                    } else {
                                        alert(json.error || 'Failed to upload image');
                                    }
                                } catch (err) {
                                    console.error('Error uploading image:', err);
                                    alert('Failed to upload image');
                                }
                            }}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        {formData.image && (
                            <div className="mt-3">
                                <img 
                                    src={formData.image} 
                                    alt="Category preview" 
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                                />
                                <p className="text-xs text-gray-500 mt-2">Current/Uploaded Image</p>
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                            Upload an image for the category (used in homepage slider).
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

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700"
                        >
                            Update Category
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/admin/categories')}
                            className="rounded-md bg-gray-300 px-6 py-2 text-gray-700 font-medium hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
