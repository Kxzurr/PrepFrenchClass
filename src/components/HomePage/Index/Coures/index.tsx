'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightUpLine, RiTimeLine, RiBookOpenLine, RiUserLine } from '@remixicon/react';
import lngCourseGirl from '../../../../assets/images/language/lng-course-girl.png';

interface ApiCourse {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string | null;
    image: string;
    level: string;
    language: string;
    duration?: number | null;
    lessonsCount?: number | null;
    pricing?: {
        originalPrice?: number | null;
        discountedPrice?: number | null;
        currency?: string | null;
    } | null;
}

function formatPrice(course?: ApiCourse): string {
    if (!course || !course.pricing) return 'Contact for Fees';

    const { originalPrice, discountedPrice, currency } = course.pricing;
    const amount = discountedPrice ?? originalPrice;

    if (!amount || amount <= 0) return 'Contact for Fees';

    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    } catch {
        return `${amount}`;
    }
}

function buildMeta(course?: ApiCourse) {
    if (!course) return [] as { icon: React.JSX.Element; text: string }[];

    const meta: { icon: React.JSX.Element; text: string }[] = [];

    meta.push({
        icon: <RiTimeLine className="w-4 h-4" />,
        text: course.duration ? `${course.duration} hours` : 'Flexible schedule',
    });

    meta.push({
        icon: <RiBookOpenLine className="w-4 h-4" />,
        text:
            course.lessonsCount && course.lessonsCount > 0
                ? `${course.lessonsCount} lessons`
                : 'Comprehensive curriculum',
    });

    meta.push({
        icon: <RiUserLine className="w-4 h-4" />,
        text: `${course.level || 'All Levels'} • ${course.language || 'Any'}`,
    });

    return meta;
}

export default function LanguageCoursesSection() {
    const [courses, setCourses] = useState<ApiCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            try {
                const response = await fetch('/api/courses?featured=true&limit=3');
                const data = await response.json();

                if (data.success && Array.isArray(data.data)) {
                    setCourses(data.data);
                    setError(null);
                } else {
                    setError('Failed to load featured courses');
                }
            } catch (err) {
                console.error('Error fetching featured courses:', err);
                setError('Failed to load featured courses');
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedCourses();
    }, []);

    const primaryCourse = courses[0];
    const secondaryCourse = courses[1];
    const tertiaryCourse = courses[2];

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                {/* Header */}
                <div className="max-w-2xl text-center mx-auto mb-12">
                    <h2 className="md:text-4xl text-primary-950 dark:text-primary-100 mb-2 leading-snug">
                        French Courses for Every Goal
                    </h2>
                    <p className="text-gray-600 dark:text-dark-400">
                        Whether you're learning French for career growth, academic opportunities, travel, or Canada PR,
                        our structured programs are designed to help you build confidence, fluency, and real-world communication skills.
                        Learn online with expert trainers and personalized guidance at every stage.
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-12 xl:gap-8 gap-6">
                    {/* Left Column - Primary Featured Course */}
                    <div className="col-span-12 lg:col-span-4">
                        <h3 className="mb-2 leading-snug">Start Your French Journey</h3>
                        <p className="text-gray-600 dark:text-dark-400 mb-5">
                            From complete beginners to advanced learners, we help you develop strong speaking,
                            listening, reading, and writing skills through interactive sessions.
                        </p>
                        <Image
                            src={lngCourseGirl}
                            alt="Student learning French online"
                            className="w-52 mx-auto"
                        />
                        <div className="rounded-xl p-6 bg-primary-500/10">
                            <h5 className="mb-2">
                                {primaryCourse ? (
                                    <Link
                                        href={`/course/${primaryCourse.slug}`}
                                        className="leading-snug hover:text-primary-600 transition-colors"
                                    >
                                        {primaryCourse.title}
                                    </Link>
                                ) : (
                                    <span className="leading-snug">
                                        Explore Our French Programs
                                    </span>
                                )}
                            </h5>
                            <p className="text-gray-600 dark:text-dark-400 mb-5 mt-2">
                                {primaryCourse
                                    ? primaryCourse.shortDescription || primaryCourse.description
                                    : 'Build a strong foundation in French with structured lessons, real-life practice, and expert guidance for every stage of your journey.'}
                            </p>
                            <Link
                                href={primaryCourse ? `/course/${primaryCourse.slug}` : '/course-list-view'}
                                className="btn btn-primary inline-flex items-center gap-3 rounded-full p-2 ps-7 relative group z-10 overflow-hidden"
                            >
                                Explore Program
                                <span className="bg-primary-800 size-10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                    <RiArrowRightUpLine className="size-5" />
                                </span>
                                <span className="absolute inset-0 h-full w-0 bg-primary-800 rounded-full transition-all duration-400 ease-out -z-10 group-hover:w-full"></span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Course Cards */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-12 xl:gap-8 gap-6">
                            {/* Secondary Featured Course */}
                            <div className="col-span-12 md:col-span-7">
                                <div className="rounded-xl p-6 bg-primary-500/10">
                                    <h5 className="mb-2">
                                        {secondaryCourse ? (
                                            <Link
                                                href={`/course/${secondaryCourse.slug}`}
                                                className="leading-snug hover:text-primary-600 transition-colors"
                                            >
                                                {secondaryCourse.title}
                                            </Link>
                                        ) : (
                                            <span className="leading-snug">Exam Preparation Course</span>
                                        )}
                                    </h5>
                                    <div className="flex justify-between mb-4 flex-wrap gap-2 mt-2">
                                        {buildMeta(secondaryCourse).map((item, index) => (
                                            <div key={index} className="flex items-center gap-1">
                                                {item.icon}
                                                <p className="text-gray-600 dark:text-dark-400">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-dark-400 mb-2">
                                        {secondaryCourse
                                            ? secondaryCourse.shortDescription || secondaryCourse.description
                                            : 'Prepare with structured modules, mock tests, and guided feedback to reach your target score.'}
                                    </p>
                                    <p className="text-gray-600 dark:text-dark-400 mb-5">
                                        {secondaryCourse
                                            ? secondaryCourse.description
                                            : 'Designed for learners working towards academic, professional, or immigration goals with French.'}
                                    </p>
                                    <div className="flex justify-between items-center flex-wrap gap-2">
                                        <h3 className="text-primary-500">{formatPrice(secondaryCourse)}</h3>
                                        <Link
                                            href={secondaryCourse ? `/course/${secondaryCourse.slug}` : '/course-list-view'}
                                            className="btn btn-outline-primary inline-flex items-center gap-3 rounded-full p-2 ps-7 relative group z-10 overflow-hidden"
                                        >
                                            View Course
                                            <span className="bg-primary-800 size-10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                                <RiArrowRightUpLine className="size-5" />
                                            </span>
                                            <span className="absolute inset-0 h-full w-0 bg-primary-800 rounded-full transition-all duration-400 ease-out -z-10 group-hover:w-full"></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-5">
                                {secondaryCourse && (
                                    <Image
                                        src={secondaryCourse.image}
                                        alt={secondaryCourse.title}
                                        width={600}
                                        height={400}
                                        className="rounded-xl w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="col-span-12 md:col-span-5">
                                {tertiaryCourse && (
                                    <Image
                                        src={tertiaryCourse.image}
                                        alt={tertiaryCourse.title}
                                        width={600}
                                        height={400}
                                        className="rounded-xl w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Tertiary Featured Course */}
                            <div className="col-span-12 md:col-span-7">
                                <div className="rounded-xl p-6 bg-primary-500/10">
                                    <h5 className="mb-2">
                                        {tertiaryCourse ? (
                                            <Link
                                                href={`/course/${tertiaryCourse.slug}`}
                                                className="leading-snug hover:text-primary-600 transition-colors"
                                            >
                                                {tertiaryCourse.title}
                                            </Link>
                                        ) : (
                                            <span className="leading-snug">Advanced French Course</span>
                                        )}
                                    </h5>
                                    <div className="flex justify-between mb-4 flex-wrap gap-2 mt-2">
                                        {buildMeta(tertiaryCourse).map((item, index) => (
                                            <div key={index} className="flex items-center gap-1">
                                                {item.icon}
                                                <p className="text-gray-600 dark:text-dark-400">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-dark-400 mb-2">
                                        {tertiaryCourse
                                            ? tertiaryCourse.shortDescription || tertiaryCourse.description
                                            : 'Deepen your skills with structured lessons, practice, and expert guidance to reach higher proficiency.'}
                                    </p>
                                    <p className="text-gray-600 dark:text-dark-400 mb-5">
                                        {tertiaryCourse
                                            ? tertiaryCourse.description
                                            : 'Ideal for learners aiming for advanced communication, exams, or professional fluency.'}
                                    </p>
                                    <div className="flex justify-between items-center flex-wrap gap-2">
                                        <h3 className="text-primary-500">{formatPrice(tertiaryCourse)}</h3>
                                        <Link
                                            href={tertiaryCourse ? `/course/${tertiaryCourse.slug}` : '/course-list-view'}
                                            className="btn btn-outline-primary inline-flex items-center gap-3 rounded-full p-2 ps-7 relative group z-10 overflow-hidden"
                                        >
                                            View Course
                                            <span className="bg-primary-800 size-10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                                <RiArrowRightUpLine className="size-5" />
                                            </span>
                                            <span className="absolute inset-0 h-full w-0 bg-primary-800 rounded-full transition-all duration-400 ease-out -z-10 group-hover:w-full"></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
