'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
    id: string;
    name: string;
}

interface Instructor {
    id: string;
    user: { name: string; email: string };
}

export default function NewCoursePage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(false);
    const [overviewContent, setOverviewContent] = useState({
        whatYouWillLearn: '',
        courseFeatures: '',
        keyBenefits: '',
        toolsResources: '',
        prerequisites: '',
        objectives: '',
        highlights: '',
        includes: '',
        whoThisIsFor: '',
        highlightTip: '',
        closingMessage: '',
        sidebarImage: '',
        videoUrl: '',
        feeOneTitle: '',
        feeOneDesc: '',
        feeTwoTitle: '',
        feeTwoDesc: '',
    });
    const [faqs, setFaqs] = useState<
        { id: string; question: string; answer: string; order: number }
    >([]);
    const [faqForm, setFaqForm] = useState({
        question: '',
        answer: '',
        order: '',
    });
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        shortDescription: '',
        image: '',
        categoryId: '',
        instructorId: '',
        level: 'BEGINNER',
        language: 'English',
        duration: '',
        lessonsCount: '',
        status: 'DRAFT',
        featured: false,
        pricing: {
            originalPrice: '',
            discountedPrice: '',
            discountPercentage: '',
            currency: 'USD',
        },
        seo: {
            metaTitle: '',
            metaDescription: '',
            metaKeywords: '',
            ogImage: '',
            ogTitle: '',
            ogDescription: '',
        },
    });

    useEffect(() => {
        fetchCategories();
        fetchInstructors();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/categories');
            const data = await response.json();
            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchInstructors = async () => {
        try {
            const response = await fetch('/api/admin/instructors');
            const data = await response.json();
            if (data.success) {
                setInstructors(data.data);
            }
        } catch (error) {
            console.error('Error fetching instructors:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                duration: formData.duration ? Number(formData.duration) : null,
                lessonsCount: formData.lessonsCount ? Number(formData.lessonsCount) : 0,
                pricing: {
                    originalPrice: Number(formData.pricing.originalPrice || 0),
                    discountedPrice: formData.pricing.discountedPrice
                        ? Number(formData.pricing.discountedPrice)
                        : null,
                    discountPercentage: formData.pricing.discountPercentage
                        ? Number(formData.pricing.discountPercentage)
                        : 0,
                    currency: formData.pricing.currency || 'USD',
                },
            };

            const response = await fetch('/api/admin/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                const created = data.data as { id: string };

                // After course is created, sync overview content and FAQs if provided
                try {
                    const toArray = (value: string) =>
                        value
                            .split('\n')
                            .map((s) => s.trim())
                            .filter(Boolean);

                    await fetch(`/api/admin/courses/${created.id}/content`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            whatYouWillLearn: toArray(overviewContent.whatYouWillLearn),
                            courseFeatures: toArray(overviewContent.courseFeatures),
                            keyBenefits: toArray(overviewContent.keyBenefits),
                            toolsResources: toArray(overviewContent.toolsResources),
                            prerequisites: toArray(overviewContent.prerequisites),
                            objectives: toArray(overviewContent.objectives),
                            highlights: toArray(overviewContent.highlights),
                            includes: toArray(overviewContent.includes),
                            whoThisIsFor: overviewContent.whoThisIsFor || null,
                            highlightTip: overviewContent.highlightTip || null,
                            closingMessage: overviewContent.closingMessage || null,
                            sidebarImage: overviewContent.sidebarImage || null,
                            videoUrl: overviewContent.videoUrl || null,
                            feeOneTitle: overviewContent.feeOneTitle || null,
                            feeOneDesc: overviewContent.feeOneDesc || null,
                            feeTwoTitle: overviewContent.feeTwoTitle || null,
                            feeTwoDesc: overviewContent.feeTwoDesc || null,
                        }),
                    });

                    if (faqForm.question.trim() && faqForm.answer.trim()) {
                        await fetch(`/api/admin/courses/${created.id}/faqs`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                question: faqForm.question,
                                answer: faqForm.answer,
                                order: faqForm.order ? Number(faqForm.order) : 1,
                            }),
                        });
                    }
                } catch (err) {
                    console.error('Error saving overview/FAQ for new course:', err);
                }

                router.push('/admin/courses');
            } else {
                alert('Error creating course: ' + data.error);
            }
        } catch (error) {
            console.error('Error creating course:', error);
            alert('Error creating course');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Course</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-4xl">
                {/* Basic Information */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Basic Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Title *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleTitleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Enter course title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData({ ...formData, slug: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="course-slug"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Auto-generated from title
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Short Description
                            </label>
                            <input
                                type="text"
                                value={formData.shortDescription}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        shortDescription: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Brief description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Description *
                            </label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                rows={5}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Enter full course description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Image
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
                                <p className="text-xs text-gray-500 mt-1">Image uploaded: {formData.image}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Course Details */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Course Details
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                required
                                value={formData.categoryId}
                                onChange={(e) =>
                                    setFormData({ ...formData, categoryId: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Instructor *
                            </label>
                            <select
                                required
                                value={formData.instructorId}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        instructorId: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="">Select an instructor</option>
                                {instructors.map((inst) => (
                                    <option key={inst.id} value={inst.id}>
                                        {inst.user.name || inst.user.email}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Level
                            </label>
                            <select
                                value={formData.level}
                                onChange={(e) =>
                                    setFormData({ ...formData, level: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="BEGINNER">Beginner</option>
                                <option value="INTERMEDIATE">Intermediate</option>
                                <option value="ADVANCED">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language
                            </label>
                            <input
                                type="text"
                                value={formData.language}
                                onChange={(e) =>
                                    setFormData({ ...formData, language: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="English"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (hours)
                            </label>
                            <input
                                type="number"
                                step="0.5"
                                value={formData.duration}
                                onChange={(e) =>
                                    setFormData({ ...formData, duration: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Lessons
                            </label>
                            <input
                                type="number"
                                value={formData.lessonsCount}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        lessonsCount: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({ ...formData, status: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                            </select>
                        </div>
                        <div className="flex items-center mt-6">
                            <input
                                id="featured"
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) =>
                                    setFormData({ ...formData, featured: e.target.checked })
                                }
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="featured"
                                className="ml-2 block text-sm text-gray-700"
                            >
                                Show on homepage (featured)
                            </label>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Pricing
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Original Price *
                            </label>
                            <input
                                type="number"
                                required
                                step="0.01"
                                value={formData.pricing.originalPrice}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        pricing: {
                                            ...formData.pricing,
                                            originalPrice: e.target.value,
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="99.99"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount Price
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.pricing.discountedPrice}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        pricing: {
                                            ...formData.pricing,
                                            discountedPrice: e.target.value,
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="49.99"
                            />
                        </div>
                    </div>
                </div>

                {/* Course Overview Content (for Overview tab) */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Overview Content
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Control the bullet points and extra text shown in the Course
                        Overview tab for this course. Leave blank to use default copy.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What You&apos;ll Learn (one item per line)
                            </label>
                            <textarea
                                rows={4}
                                value={overviewContent.whatYouWillLearn}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        whatYouWillLearn: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Features (one item per line)
                            </label>
                            <textarea
                                rows={4}
                                value={overviewContent.courseFeatures}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        courseFeatures: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Key Benefits (one item per line)
                            </label>
                            <textarea
                                rows={4}
                                value={overviewContent.keyBenefits}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        keyBenefits: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tools &amp; Resources (one item per line)
                            </label>
                            <textarea
                                rows={4}
                                value={overviewContent.toolsResources}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        toolsResources: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Who This Course Is For
                            </label>
                            <textarea
                                rows={3}
                                value={overviewContent.whoThisIsFor}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        whoThisIsFor: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Highlight Tip (inline text)
                            </label>
                            <input
                                type="text"
                                value={overviewContent.highlightTip}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        highlightTip: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Closing Message
                            </label>
                            <input
                                type="text"
                                value={overviewContent.closingMessage}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        closingMessage: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prerequisites (one per line)
                            </label>
                            <textarea
                                rows={4}
                                value={overviewContent.prerequisites}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        prerequisites: e.target.value,
                                    })
                                }
                                placeholder="Enter prerequisites, one per line"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Objectives (one per line)
                            </label>
                            <textarea
                                rows={4}
                                value={overviewContent.objectives}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        objectives: e.target.value,
                                    })
                                }
                                placeholder="Enter objectives, one per line"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Highlights (one per line)
                            </label>
                            <textarea
                                rows={4}
                                value={overviewContent.highlights}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        highlights: e.target.value,
                                    })
                                }
                                placeholder="Enter highlights, one per line"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What This Course Includes (one per line)
                            </label>
                            <textarea
                                rows={4}
                                value={overviewContent.includes}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        includes: e.target.value,
                                    })
                                }
                                placeholder="Enter what's included, one per line"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sidebar Image URL
                            </label>
                            <input
                                type="text"
                                value={overviewContent.sidebarImage}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        sidebarImage: e.target.value,
                                    })
                                }
                                placeholder="Enter sidebar/preview image URL"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video URL
                            </label>
                            <input
                                type="text"
                                value={overviewContent.videoUrl}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        videoUrl: e.target.value,
                                    })
                                }
                                placeholder="Enter video preview URL"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fee Option 1 Title
                            </label>
                            <input
                                type="text"
                                value={overviewContent.feeOneTitle}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        feeOneTitle: e.target.value,
                                    })
                                }
                                placeholder="e.g., Basic Plan"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fee Option 1 Description
                            </label>
                            <input
                                type="text"
                                value={overviewContent.feeOneDesc}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        feeOneDesc: e.target.value,
                                    })
                                }
                                placeholder="e.g., $99/month"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fee Option 2 Title
                            </label>
                            <input
                                type="text"
                                value={overviewContent.feeTwoTitle}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        feeTwoTitle: e.target.value,
                                    })
                                }
                                placeholder="e.g., Premium Plan"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fee Option 2 Description
                            </label>
                            <input
                                type="text"
                                value={overviewContent.feeTwoDesc}
                                onChange={(e) =>
                                    setOverviewContent({
                                        ...overviewContent,
                                        feeTwoDesc: e.target.value,
                                    })
                                }
                                placeholder="e.g., $199/month"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">FAQs</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Optionally add a first FAQ for this course. You can add more
                        later from the Edit Course page.
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Question
                                </label>
                                <input
                                    type="text"
                                    value={faqForm.question}
                                    onChange={(e) =>
                                        setFaqForm({ ...faqForm, question: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={faqForm.order}
                                    onChange={(e) =>
                                        setFaqForm({ ...faqForm, order: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Answer
                            </label>
                            <textarea
                                rows={3}
                                value={faqForm.answer}
                                onChange={(e) =>
                                    setFaqForm({ ...faqForm, answer: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        SEO Metadata
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                value={formData.seo.metaTitle}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        seo: { ...formData.seo, metaTitle: e.target.value },
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Page title for search engines"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                value={formData.seo.metaDescription}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        seo: {
                                            ...formData.seo,
                                            metaDescription: e.target.value,
                                        },
                                    })
                                }
                                rows={3}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Brief description for search engines (160 chars)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Keywords
                            </label>
                            <input
                                type="text"
                                value={formData.seo.metaKeywords}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        seo: {
                                            ...formData.seo,
                                            metaKeywords: e.target.value,
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="keyword1, keyword2, keyword3"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 font-medium hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
