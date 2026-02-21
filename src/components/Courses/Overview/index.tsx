'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiStarFill, RiStarHalfFill, RiStarLine } from '@remixicon/react';
import CourseOverviewTab from './CourseOverviewTab';
import CurriculumTab from './CurriculumTab';
import ReviewsTab from './ReviewsTab';
import FAQTab from './FAQTab';
import CourseSidebar from './CourseSidebar';
import courseLearning from '../../../assets/images/course/course-learning.png';
import courseLanguage from '../../../assets/images/course/course-language.png';

interface CourseData {
    id: string;
    title: string;
    description: string;
    shortDescription?: string;
    image: string;
    rating: number;
    category?: { id: string; name: string };
    categories?: { category: { id: string; name: string } }[];
    instructor: {
        user?: { name: string; image: string };
        firstName?: string;
        lastName?: string;
        avatar?: string;
        bio?: string;
        socialLinks?: Record<string, string | undefined> | null;
    };
    pricing: { discountedPrice?: number; originalPrice: number };
    duration?: number;
    lessonsCount: number;
    language: string;
    level: string;
    hindiBatchDate?: string;
    englishBatchDate?: string;
    lessons?: Array<{ id: string; title: string; duration?: number; dayNumber?: number }>;
    reviews?: Array<{
        id: string;
        rating: number;
        comment?: string;
        createdAt: string;
        user?: { name?: string; image?: string };
    }>;
    content?: {
        whatYouWillLearn?: unknown;
        courseFeatures?: unknown;
        keyBenefits?: unknown;
        toolsResources?: unknown;
        prerequisites?: unknown;
        objectives?: unknown;
        highlights?: unknown;
        includes?: unknown;
        whoThisIsFor?: string | null;
        highlightTip?: string | null;
        closingMessage?: string | null;
        sidebarImage?: string | null;
        videoUrl?: string | null;
        feeOneTitle?: string | null;
        feeOneDesc?: string | null;
        feeTwoTitle?: string | null;
        feeTwoDesc?: string | null;
    } | null;
    faqs?: Array<{
        id: string;
        question: string;
        answer: string;
    }>;
    ratingBreakdown?: {
        five: number;
        four: number;
        three: number;
        two: number;
        one: number;
    };
    _count?: { enrollments: number; reviews: number };
}

interface CourseOverviewProps {
    courseData?: CourseData;
}

export default function CourseOverview({ courseData }: CourseOverviewProps) {
    const [activeTab, setActiveTab] = useState('Course');

    // Use dynamic course data (required for proper functioning)
    if (!courseData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600 dark:text-dark-400">
                    No course data available. Please navigate from the courses list.
                </p>
            </div>
        );
    }

    const course = courseData;

    const tabs = [
        { id: 'Course', label: 'Course Overview' },
        { id: 'Curriculum', label: 'Curriculum' },
        { id: 'Reviews', label: 'Reviews' },
        { id: 'FAQ', label: 'FAQ' },
    ];



    const parseStringArray = (value: unknown): string[] | undefined => {
        if (!value) return undefined;
        if (Array.isArray(value)) {
            return value.filter((item): item is string => typeof item === 'string');
        }
        return undefined;
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<RiStarFill key={`full-${i}`} className="size-5 text-amber-400" />);
        }
        if (hasHalfStar) {
            stars.push(<RiStarHalfFill key="half" className="size-5 text-amber-400" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<RiStarLine key={`empty-${i}`} className="size-5 text-amber-400" />);
        }
        return stars;
    };

    return (
        <>
            {/* Banner section */}
            <section className="lg:pt-30 lg:pb-18 pt-25 pb-12 bg-gradient-to-r 
    from-primary-50 
    via-primary-100 
    to-primary-200 
    dark:from-primary-900 
    dark:via-primary-800 
    dark:to-primary-700 
    relative">

                <div className="container max-w-[84rem]">
                    <div className="max-w-3xl">

                        <h1 className="lg:text-4xl text-3xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
                            {course.title}
                        </h1>

                        <div className="flex items-center justify-between flex-wrap gap-6">

                            {/* Category */}
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Category</p>
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                    {course.category?.name || course.categories?.[0]?.category?.name || 'Uncategorized'}
                                </h5>
                            </div>

                            {/* Rating */}
                            <div>
                                <div className="flex items-center gap-1 text-amber-400">
                                    {renderStars(course.rating)}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {course.rating.toFixed(1)} / 5.0 ({course._count?.reviews || 0} Reviews)
                                </p>
                            </div>

                            {/* Level */}
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Level</p>
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                    {course.level}
                                </h5>
                            </div>

                        </div>
                    </div>
                </div>
            </section>



            {/* Course content section */}
            <section className="lg:pb-30 pb-20 pt-20 relative">

                <div className="container max-w-[84rem]">
                    <div className="grid grid-cols-12 xl:gap-12 gap-6">
                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8">

                            {/* Course Banner Image */}
                            <div className="relative rounded-xl overflow-hidden mb-10">
                                <Image
                                    src={course.image || courseLearning}
                                    alt={course.title}
                                    className="w-full h-auto object-cover"
                                    width={800}
                                    height={450}
                                />
                                <span className="absolute top-4 ltr:right-4 rtl:left-4 bg-primary-500 text-white text-xs font-semibold uppercase px-4 py-2 rounded-full shadow-md">
                                    {course.category?.name || course.categories?.[0]?.category?.name || 'Uncategorized'}
                                </span>
                            </div>

                            {/* Tab Navigation */}
                            <div className="flex justify-between gap-1 flex-wrap border rounded-lg p-3 border-black/20 dark:border-white/20 mb-5">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`tab-btn font-medium uppercase p-3 px-5 rounded-lg transition-all duration-300 ${
                                            activeTab === tab.id
                                                ? 'bg-primary-500 text-white'
                                                : 'hover:text-primary-500 hover:bg-primary-500/10'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div>
                                {activeTab === 'Course' && (
                                    <CourseOverviewTab
                                        description={course.description}
                                        whatYouWillLearnItems={parseStringArray(course.content?.whatYouWillLearn)}
                                        courseFeatureItems={parseStringArray(course.content?.courseFeatures)}
                                        keyBenefitItems={parseStringArray(course.content?.keyBenefits)}
                                        toolsResourcesItems={parseStringArray(course.content?.toolsResources)}
                                        prerequisitesItems={parseStringArray(course.content?.prerequisites)}
                                        objectivesItems={parseStringArray(course.content?.objectives)}
                                        highlightsItems={parseStringArray(course.content?.highlights)}
                                        includesItems={parseStringArray(course.content?.includes)}
                                        whoThisIsFor={course.content?.whoThisIsFor || undefined}
                                        highlightTip={course.content?.highlightTip || undefined}
                                        closingMessage={course.content?.closingMessage || undefined}
                                        feeOneTitle={course.content?.feeOneTitle || undefined}
                                        feeOneDesc={course.content?.feeOneDesc || undefined}
                                        feeTwoTitle={course.content?.feeTwoTitle || undefined}
                                        feeTwoDesc={course.content?.feeTwoDesc || undefined}
                                    />
                                )}
                                {activeTab === 'Curriculum' && course.lessons && <CurriculumTab lessons={course.lessons} />}
                                {activeTab === 'Reviews' && (
                                    <ReviewsTab
                                        averageRating={course.rating}
                                        totalReviews={course._count?.reviews || 0}
                                        ratingBreakdown={
                                            course.ratingBreakdown || {
                                                five: 0,
                                                four: 0,
                                                three: 0,
                                                two: 0,
                                                one: 0,
                                            }
                                        }
                                        reviews={(course.reviews || []).map((review) => ({
                                            id: review.id,
                                            author: review.user?.name || 'Learner',
                                            rating: review.rating,
                                            date: new Date(review.createdAt).toLocaleDateString(),
                                            comment: review.comment || '',
                                        }))}
                                    />
                                )}
                                {activeTab === 'FAQ' && (
                                    <FAQTab
                                        faqs={course.faqs?.map((f) => ({
                                            id: f.id,
                                            question: f.question,
                                            answer: f.answer,
                                        }))}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4 relative">
                            <div className="lg:-mt-44 lg:sticky lg:top-24">
                                <CourseSidebar
                                    previewImage={course.content?.sidebarImage || course.image || courseLanguage}
                                    previewImageAlt={course.title}
                                    videoUrl={course.content?.videoUrl || "https://www.youtube.com/embed/ScMzIvxBSi4?enablejsapi=1"}
                                    price={`$${course.pricing.discountedPrice || course.pricing.originalPrice}`}
                                    originalPrice={`$${course.pricing.originalPrice}`}
                                    duration={course.duration ? `${course.duration} Weeks` : '12 Weeks'}
                                    lessons={`${course.lessonsCount}+ Sessions`}
                                    level={course.level}
                                    language={course.language}
                                    hindiBatchDate={course.hindiBatchDate ? new Date(course.hindiBatchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined}
                                    englishBatchDate={course.englishBatchDate ? new Date(course.englishBatchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined}
                                    includesItems={parseStringArray(course.content?.includes)}
                                />
                            </div>
                        </div>

                        {/* Mobile Sticky Bottom CTA */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-900 border-t border-black/10 dark:border-white/10 p-4 lg:hidden z-50">
                            <Link
                                href="/contact"
                                className="block w-full py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition text-center"
                            >
                                Inquiry Now
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

