'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightUpLine, RiTimeLine, RiBookOpenLine, RiUserLine } from '@remixicon/react';
import lngCourseGirl from '../../../../assets/images/language/2.jpg';

interface ApiCourse {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string | null;
    Homedescription?: string | null;
    image: string;
    imageOptimized?: string;
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

const FEATURED_CACHE_TTL_MS = 5 * 1000; // 5 second cache for faster updates
let cachedFeaturedCourses: ApiCourse[] | null = null;
let cachedFeaturedAt = 0;

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
        text: course.duration ? `${course.duration} Weeks` : 'Flexible schedule',
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
    const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
    const inFlightRef = useRef(false);

    useEffect(() => {
        let isActive = true;
        const controller = new AbortController();

        const fetchFeaturedCourses = async () => {
            if (inFlightRef.current) return;
            inFlightRef.current = true;

            try {
                const now = Date.now();
                if (cachedFeaturedCourses && now - cachedFeaturedAt < FEATURED_CACHE_TTL_MS) {
                    if (isActive) {
                        setCourses(cachedFeaturedCourses);
                        setError(null);
                        setLoading(false);
                    }
                    inFlightRef.current = false;
                    return;
                }

                setLoading(true);
                const response = await fetch('/api/courses?featured=true&limit=3', {
                    cache: 'no-store',
                    signal: controller.signal,
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                    },
                });
                const data = await response.json();

                if (!response.ok || !data.success || !Array.isArray(data.data)) {
                    throw new Error('Failed to load featured courses');
                }

                cachedFeaturedCourses = data.data;
                cachedFeaturedAt = now;

                if (isActive) {
                    setCourses(data.data);
                    setError(null);
                }
            } catch (err) {
                if ((err as Error).name === 'AbortError') return;
                console.error('Error fetching featured courses:', err);
                if (isActive) {
                    setError('Failed to load featured courses');
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
                inFlightRef.current = false;
            }
        };

        fetchFeaturedCourses();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, []);

    const getCourseImage = (course?: ApiCourse) => {
        if (!course) return '';
        return course.imageOptimized || course.image;
    };

    const handleImageLoaded = (id: string) => {
        setImageLoaded((prev) => ({
            ...prev,
            [id]: true,
        }));
    };

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
                        Whether you are learning French for Canada PR, work permits, career advancement, or academic growth, our structured programs are designed to build fluency, confidence, and practical communication skills. Study live online with expert instructors, small batch sizes, and personalized guidance at every level.
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-12 xl:gap-8 gap-6">
                    {/* Left Column - Primary Featured Course */}
                    <div className="col-span-12 lg:col-span-4">
                        <h3 className="mb-2 leading-snug">Start Your French Journey</h3>
                       {/*  <p className="text-gray-600 dark:text-dark-400 mb-5">
                            Transform your French with structured, results-focused live training designed to accelerate your speaking, listening, reading, and writing skills. Whether you are starting from zero or aiming for CLB 7, our guided approach helps you progress faster with clarity and confidence.
                        </p>*/}
                        <Image
                            src={lngCourseGirl}
                            alt="Student learning French online"
                            className="w-122 mx-auto rounded-2xl p-2"
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
                                    ? primaryCourse.Homedescription || primaryCourse.shortDescription
                                    : 'Build a strong foundation in French with structured lessons, real-life practice, and expert guidance for every stage of your journey.'}
                            </p>
                            <Link
                                href={primaryCourse ? `/course/${primaryCourse.slug}` : '/courses'}
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
                                            ? secondaryCourse.shortDescription
                                            : 'Prepare with structured modules, mock tests, and guided feedback to reach your target score.'}
                                    </p>
                                    <p className="text-gray-600 dark:text-dark-400 mb-5">
                                        {secondaryCourse
                                            ? secondaryCourse.Homedescription
                                            : 'Designed for learners working towards academic, professional, or immigration goals with French.'}
                                    </p>
                                    <div className="flex justify-between items-center flex-wrap gap-2">
                                        <h3 className="text-primary-500">{formatPrice(secondaryCourse)}</h3>
                                        <Link
                                            href={secondaryCourse ? `/course/${secondaryCourse.slug}` : '/courses'}
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

                            <div className="col-span-12 md:col-span-5 hidden md:block">
                                {secondaryCourse && (
                                    <div className="relative w-full h-full">
                                        {!imageLoaded[secondaryCourse.id] && (
                                            <div className="absolute inset-0 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
                                        )}
                                        <Image
                                            src={getCourseImage(secondaryCourse)}
                                            alt={secondaryCourse.title}
                                            width={600}
                                            height={400}
                                            className={`rounded-xl w-full h-full object-cover ${
                                                imageLoaded[secondaryCourse.id] ? 'opacity-100' : 'opacity-0'
                                            } transition-opacity duration-300`}
                                            loading="lazy"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            onLoadingComplete={() => handleImageLoaded(secondaryCourse.id)}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="col-span-12 md:col-span-5 hidden md:block">
                                {tertiaryCourse && (
                                    <div className="relative w-full h-full">
                                        {!imageLoaded[tertiaryCourse.id] && (
                                            <div className="absolute inset-0 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
                                        )}
                                        <Image
                                            src={getCourseImage(tertiaryCourse)}
                                            alt={tertiaryCourse.title}
                                            width={600}
                                            height={400}
                                            className={`rounded-xl w-full h-full object-cover ${
                                                imageLoaded[tertiaryCourse.id] ? 'opacity-100' : 'opacity-0'
                                            } transition-opacity duration-300`}
                                            loading="lazy"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            onLoadingComplete={() => handleImageLoaded(tertiaryCourse.id)}
                                        />
                                    </div>
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
                                            ? tertiaryCourse.shortDescription
                                            : 'Deepen your skills with structured lessons, practice, and expert guidance to reach higher proficiency.'}
                                    </p>
                                    <p className="text-gray-600 dark:text-dark-400 mb-5">
                                        {tertiaryCourse
                                            ? tertiaryCourse.Homedescription
                                            : 'Ideal for learners aiming for advanced communication, exams, or professional fluency.'}
                                    </p>
                                    <div className="flex justify-between items-center flex-wrap gap-2">
                                        <h3 className="text-primary-500">{formatPrice(tertiaryCourse)}</h3>
                                        <Link
                                            href={tertiaryCourse ? `/course/${tertiaryCourse.slug}` : '/courses'}
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
