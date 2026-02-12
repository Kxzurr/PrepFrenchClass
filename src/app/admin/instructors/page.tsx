'use client';

import { useEffect, useState } from 'react';

interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
    bio?: string;
    expertise?: string;
    socialLinks?: Record<string, string | undefined> | null;
    user: { id: string; name: string | null; email: string | null };
}

export default function InstructorsPage() {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        bio: '',
        expertise: '',
        linkedin: '',
        twitter: '',
        instagram: '',
        website: '',
    });

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/instructors');
            const data = await res.json();
            if (data.success) {
                setInstructors(data.data);
                setError(null);
            } else {
                setError(data.error || 'Failed to load instructors');
            }
        } catch (err) {
            console.error('Error fetching instructors:', err);
            setError('Failed to load instructors');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/instructors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    bio: form.bio,
                    expertise: form.expertise,
                    socialLinks: {
                        linkedin: form.linkedin || undefined,
                        twitter: form.twitter || undefined,
                        instagram: form.instagram || undefined,
                        website: form.website || undefined,
                    },
                }),
            });
            const data = await res.json();
            if (data.success) {
                setForm({
                    email: '',
                    firstName: '',
                    lastName: '',
                    bio: '',
                    expertise: '',
                    linkedin: '',
                    twitter: '',
                    instagram: '',
                    website: '',
                });
                fetchInstructors();
            } else {
                alert(data.error || 'Failed to create instructor');
            }
        } catch (err) {
            console.error('Error creating instructor:', err);
            alert('Failed to create instructor');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Instructors</h1>

            {/* Create Instructor */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6 mb-8 max-w-3xl space-y-4"
            >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Add Instructor</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Link an existing user (by email) as an instructor.
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Email *</label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="user@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input
                            type="text"
                            required
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                            type="text"
                            required
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            value={form.bio}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            rows={3}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                        <input
                            type="text"
                            value={form.expertise}
                            onChange={(e) => setForm({ ...form, expertise: e.target.value })}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="French grammar, conversation, exam prep"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-2 rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700"
                >
                    Create Instructor
                </button>
            </form>

            {/* Instructor List */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Existing Instructors</h2>
                {loading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : instructors.length === 0 ? (
                    <p className="text-gray-600">No instructors found.</p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 font-semibold text-gray-900">Name</th>
                                <th className="px-4 py-2 font-semibold text-gray-900">Email</th>
                                <th className="px-4 py-2 font-semibold text-gray-900">Expertise</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {instructors.map((inst) => (
                                <tr key={inst.id}>
                                    <td className="px-4 py-2 text-gray-900">
                                        {inst.firstName} {inst.lastName}
                                    </td>
                                    <td className="px-4 py-2 text-gray-600">
                                        {inst.user.email}
                                    </td>
                                    <td className="px-4 py-2 text-gray-600">
                                        {inst.expertise || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

