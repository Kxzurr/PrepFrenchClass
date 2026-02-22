'use client';

import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
    id: string;
    name: string;
}

interface Instructor {
    id: string;
    user: { name: string; email: string };
}

interface UploadStatus {
    loading: boolean;
    error: string;
    success: string;
}

type UploadStatusSetter = Dispatch<SetStateAction<UploadStatus>>;

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const MAX_UPLOAD_MB = 10;

export default function NewCoursePage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(false);
    const [courseImageStatus, setCourseImageStatus] = useState<UploadStatus>({
        loading: false,
        error: '',
        success: '',
    });
    const [sidebarImageStatus, setSidebarImageStatus] = useState<UploadStatus>({
        loading: false,
        error: '',
        success: '',
    });
    const [videoPreviewStatus, setVideoPreviewStatus] = useState<UploadStatus>({
        loading: false,
        error: '',
        success: '',
    });
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
        { id: string; question: string; answer: string; order: number }[]
    >([]);
    const [faqForm, setFaqForm] = useState({
        question: '',
        answer: '',
        order: '',
    });
    const [lessons, setLessons] = useState<
        { id: string; title: string; duration: string; monthNumber: string; order: number; published: boolean }[]
    >([]);
    const [lessonForm, setLessonForm] = useState({
        title: '',
        duration: '',
        monthNumber: '',
        order: '',
        published: true,
    });
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        shortDescription: '',
        Homedescription: '',
        image: '',
        categoryIds: [] as string[],
        instructorId: '',
        level: 'BEGINNER',
        language: 'English',
        duration: '',
        lessonsCount: '',
        hindiBatchDate: '',
        englishBatchDate: '',
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

    const uploadImage = async (
        file: File,
        onSuccess: (url: string) => void,
        setStatus: UploadStatusSetter
    ) => {
        if (!file.type.startsWith('image/')) {
            setStatus({ loading: false, error: 'Only image files are allowed.', success: '' });
            return;
        }
        if (file.size > MAX_UPLOAD_BYTES) {
            setStatus({ loading: false, error: `File too large. Max ${MAX_UPLOAD_MB}MB.`, success: '' });
            return;
        }

        setStatus({ loading: true, error: '', success: '' });
        try {
            const data = new FormData();
            data.append('file', file);
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: data,
            });
            const json = await res.json();
            if (res.ok && json.success && json.url) {
                onSuccess(json.url);
                setStatus({ loading: false, error: '', success: 'Upload complete.' });
                return;
            }
            setStatus({ loading: false, error: json.error || 'Failed to upload image', success: '' });
        } catch (err) {
            console.error('Error uploading image:', err);
            setStatus({ loading: false, error: 'Failed to upload image', success: '' });
        }
    };

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
        
        if (formData.categoryIds.length === 0) {
            alert('Please select at least one category');
            return;
        }
        
        setLoading(true);

        try {
            const payload = {
                ...formData,
                duration: formData.duration ? Number(formData.duration) : null,
                lessonsCount: formData.lessonsCount ? Number(formData.lessonsCount) : 0,
                hindiBatchDate: formData.hindiBatchDate ? new Date(formData.hindiBatchDate).toISOString() : null,
                englishBatchDate: formData.englishBatchDate ? new Date(formData.englishBatchDate).toISOString() : null,
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

                    for (const lesson of lessons) {
                        await fetch(`/api/admin/courses/${created.id}/lessons`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                title: lesson.title,
                                duration: lesson.duration ? Number(lesson.duration) : null,
                                order: lesson.order,
                                published: lesson.published,
                            }),
                        });
                    }

                    for (const faq of faqs) {
                        await fetch(`/api/admin/courses/${created.id}/faqs`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                question: faq.question,
                                answer: faq.answer,
                                order: faq.order,
                            }),
                        });
                    }
                } catch (err) {
                    console.error('Error saving course extras for new course:', err);
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
        <div className="flex flex-col h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Course</h1>

            <form id="course-create-form" onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-4xl flex-1 overflow-y-auto">
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
                                Home Description (For Home Page Display)
                            </label>
                            <textarea
                                value={formData.Homedescription}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        Homedescription: e.target.value,
                                    })
                                }
                                rows={3}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Description to display on the home page"
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
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    uploadImage(file, (url) => {
                                        setFormData({ ...formData, image: url });
                                    }, setCourseImageStatus);
                                }}
                                disabled={courseImageStatus.loading}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Max file size: {MAX_UPLOAD_MB}MB</p>
                            {courseImageStatus.loading && (
                                <p className="text-xs text-indigo-600 mt-1">Uploading...</p>
                            )}
                            {courseImageStatus.error && (
                                <p className="text-xs text-red-600 mt-1">{courseImageStatus.error}</p>
                            )}
                            {courseImageStatus.success && (
                                <p className="text-xs text-green-600 mt-1">{courseImageStatus.success}</p>
                            )}
                            {formData.image && (
                                <div className="mt-3">
                                    <img 
                                        src={formData.image} 
                                        alt="Course preview" 
                                        className="w-full max-w-xs h-auto rounded-lg border border-gray-300 shadow-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Uploaded to Cloudinary</p>
                                </div>
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
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categories * (Select one or more)
                            </label>
                            <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                                {categories.map((cat) => (
                                    <label key={cat.id} className="flex items-center gap-2 py-2 hover:bg-gray-50 px-2 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.categoryIds.includes(cat.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFormData({
                                                        ...formData,
                                                        categoryIds: [...formData.categoryIds, cat.id],
                                                    });
                                                } else {
                                                    setFormData({
                                                        ...formData,
                                                        categoryIds: formData.categoryIds.filter((id) => id !== cat.id),
                                                    });
                                                }
                                            }}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-gray-900">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                            {formData.categoryIds.length === 0 && (
                                <p className="text-xs text-red-600 mt-1">Please select at least one category</p>
                            )}
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
                                Hindi to French Batch Date
                            </label>
                            <input
                                type="date"
                                value={formData.hindiBatchDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, hindiBatchDate: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                English to French Batch Date
                            </label>
                            <input
                                type="date"
                                value={formData.englishBatchDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, englishBatchDate: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

                {/* Curriculum / Lessons */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Curriculum</h2>
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lesson Title
                                </label>
                                <input
                                    type="text"
                                    value={lessonForm.title}
                                    onChange={(e) =>
                                        setLessonForm({ ...lessonForm, title: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Introduction to French Alphabet"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Month Number
                                </label>
                                <input
                                    type="number"
                                    value={lessonForm.monthNumber}
                                    onChange={(e) =>
                                        setLessonForm({ ...lessonForm, monthNumber: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={lessonForm.duration}
                                    onChange={(e) =>
                                        setLessonForm({ ...lessonForm, duration: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="25"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={lessonForm.order}
                                    onChange={(e) =>
                                        setLessonForm({ ...lessonForm, order: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder={String(lessons.length + 1)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="inline-flex items-center text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={lessonForm.published}
                                    onChange={(e) =>
                                        setLessonForm({ ...lessonForm, published: e.target.checked })
                                    }
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="ml-2">Published</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!lessonForm.title.trim()) {
                                        alert('Lesson title is required');
                                        return;
                                    }
                                    const nextOrder = lessonForm.order
                                        ? Number(lessonForm.order)
                                        : lessons.length + 1;
                                    setLessons((prev) => [
                                        ...prev,
                                        {
                                            id: `tmp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                                            title: lessonForm.title,
                                            duration: lessonForm.duration,
                                            monthNumber: lessonForm.monthNumber,
                                            order: nextOrder,
                                            published: lessonForm.published,
                                        },
                                    ]);
                                    setLessonForm({
                                        title: '',
                                        duration: '',
                                        monthNumber: '',
                                        order: '',
                                        published: true,
                                    });
                                }}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700"
                            >
                                Add Lesson
                            </button>
                        </div>
                    </div>

                    {lessons.length === 0 ? (
                        <p className="text-sm text-gray-600">No lessons yet. Add your first lesson above.</p>
                    ) : (
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Order
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Day
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Duration (min)
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Published
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {lessons.map((lesson) => (
                                    <tr key={lesson.id} className="bg-white">
                                        <td className="px-4 py-2 align-middle">
                                            <input
                                                type="number"
                                                value={lesson.order}
                                                onChange={(e) =>
                                                    setLessons((prev) =>
                                                        prev.map((l) =>
                                                            l.id === lesson.id
                                                                ? { ...l, order: Number(e.target.value || 0) }
                                                                : l
                                                        )
                                                    )
                                                }
                                                className="w-20 rounded-md border border-gray-300 px-2 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            <input
                                                type="text"
                                                value={lesson.title}
                                                onChange={(e) =>
                                                    setLessons((prev) =>
                                                        prev.map((l) =>
                                                            l.id === lesson.id
                                                                ? { ...l, title: e.target.value }
                                                                : l
                                                        )
                                                    )
                                                }
                                                className="w-full rounded-md border border-gray-300 px-2 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            <input
                                                type="number"
                                                value={lesson.monthNumber}
                                                onChange={(e) =>
                                                    setLessons((prev) =>
                                                        prev.map((l) =>
                                                            l.id === lesson.id
                                                                ? { ...l, monthNumber: e.target.value }
                                                                : l
                                                        )
                                                    )
                                                }
                                                className="w-20 rounded-md border border-gray-300 px-2 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                                placeholder="Month"
                                            />
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            <input
                                                type="number"
                                                value={lesson.duration}
                                                onChange={(e) =>
                                                    setLessons((prev) =>
                                                        prev.map((l) =>
                                                            l.id === lesson.id
                                                                ? { ...l, duration: e.target.value }
                                                                : l
                                                        )
                                                    )
                                                }
                                                className="w-24 rounded-md border border-gray-300 px-2 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            <input
                                                type="checkbox"
                                                checked={lesson.published}
                                                onChange={(e) =>
                                                    setLessons((prev) =>
                                                        prev.map((l) =>
                                                            l.id === lesson.id
                                                                ? { ...l, published: e.target.checked }
                                                                : l
                                                        )
                                                    )
                                                }
                                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setLessons((prev) =>
                                                        prev.filter((l) => l.id !== lesson.id)
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-900 font-medium text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
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
                                Sidebar Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    uploadImage(file, (url) => {
                                        setOverviewContent({
                                            ...overviewContent,
                                            sidebarImage: url,
                                        });
                                    }, setSidebarImageStatus);
                                }}
                                disabled={sidebarImageStatus.loading}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">Max file size: {MAX_UPLOAD_MB}MB</p>
                            {sidebarImageStatus.loading && (
                                <p className="text-xs text-indigo-600 mt-1">Uploading...</p>
                            )}
                            {sidebarImageStatus.error && (
                                <p className="text-xs text-red-600 mt-1">{sidebarImageStatus.error}</p>
                            )}
                            {sidebarImageStatus.success && (
                                <p className="text-xs text-green-600 mt-1">{sidebarImageStatus.success}</p>
                            )}
                            {overviewContent.sidebarImage && (
                                <div className="mt-3">
                                    <img 
                                        src={overviewContent.sidebarImage} 
                                        alt="Sidebar preview" 
                                        className="w-full max-w-xs h-auto rounded-lg border border-gray-300 shadow-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Uploaded to Cloudinary</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video URL or Image
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
                            <div className="mt-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        uploadImage(file, (url) => {
                                            setOverviewContent({
                                                ...overviewContent,
                                                videoUrl: url,
                                            });
                                        }, setVideoPreviewStatus);
                                    }}
                                    disabled={videoPreviewStatus.loading}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Upload an image instead of a video (max {MAX_UPLOAD_MB}MB)</p>
                                {videoPreviewStatus.loading && (
                                    <p className="text-xs text-indigo-600 mt-1">Uploading...</p>
                                )}
                                {videoPreviewStatus.error && (
                                    <p className="text-xs text-red-600 mt-1">{videoPreviewStatus.error}</p>
                                )}
                                {videoPreviewStatus.success && (
                                    <p className="text-xs text-green-600 mt-1">{videoPreviewStatus.success}</p>
                                )}
                            </div>
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
                        Manage common questions for this course. These appear in the FAQ
                        tab.
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
                        <button
                            type="button"
                            onClick={() => {
                                if (!faqForm.question.trim() || !faqForm.answer.trim()) {
                                    alert('Question and answer are required');
                                    return;
                                }
                                const nextOrder = faqForm.order
                                    ? Number(faqForm.order)
                                    : faqs.length + 1;
                                setFaqs((prev) => [
                                    ...prev,
                                    {
                                        id: `tmp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                                        question: faqForm.question,
                                        answer: faqForm.answer,
                                        order: nextOrder,
                                    },
                                ]);
                                setFaqForm({ question: '', answer: '', order: '' });
                            }}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700"
                        >
                            Add FAQ
                        </button>
                    </div>

                    {faqs.length === 0 ? (
                        <p className="text-sm text-gray-600">
                            No FAQs yet. Add your first FAQ above.
                        </p>
                    ) : (
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Order
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Question
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Answer
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {faqs.map((faq) => (
                                    <tr key={faq.id} className="bg-white">
                                        <td className="px-4 py-2 align-middle">
                                            <input
                                                type="number"
                                                value={faq.order}
                                                onChange={(e) =>
                                                    setFaqs((prev) =>
                                                        prev.map((f) =>
                                                            f.id === faq.id
                                                                ? { ...f, order: Number(e.target.value || 0) }
                                                                : f
                                                        )
                                                    )
                                                }
                                                className="w-20 rounded-md border border-gray-300 px-2 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            <input
                                                type="text"
                                                value={faq.question}
                                                onChange={(e) =>
                                                    setFaqs((prev) =>
                                                        prev.map((f) =>
                                                            f.id === faq.id
                                                                ? { ...f, question: e.target.value }
                                                                : f
                                                        )
                                                    )
                                                }
                                                className="w-full rounded-md border border-gray-300 px-2 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            <textarea
                                                rows={2}
                                                value={faq.answer}
                                                onChange={(e) =>
                                                    setFaqs((prev) =>
                                                        prev.map((f) =>
                                                            f.id === faq.id
                                                                ? { ...f, answer: e.target.value }
                                                                : f
                                                        )
                                                    )
                                                }
                                                className="w-full rounded-md border border-gray-300 px-2 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFaqs((prev) => prev.filter((f) => f.id !== faq.id))
                                                }
                                                className="text-red-600 hover:text-red-900 font-medium text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
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
            </form>

            {/* Sticky Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        form="course-create-form"
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
            </div>
        </div>
    );
}
