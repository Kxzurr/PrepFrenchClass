'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    RiCodeSSlashLine,
    RiMusic2Line,
    RiGlobalLine,
    RiRestaurantLine,
    RiPaletteLine,
    RiCameraLine,
    RiMovieLine,
    RiBarChartBoxLine,
    RiCpuLine,
    RiRunLine,
    RiArrowRightLine,
    type RemixiconComponentType,
} from '@remixicon/react';
import bannerShape1 from '../../../assets/images/banner-shape-1.webp';
import bannerShape2 from '../../../assets/images/banner-shape-2.webp';
import bannerShape3 from '../../../assets/images/banner-shape-3.webp';
import bannerShape4 from '../../../assets/images/banner-shape-4.png';
import courseCgVector from '../../../assets/images/course/course-cg-vector.png';
import courseCertificate from '../../../assets/images/course/course-certificate.png';
import courseVector from '../../../assets/images/course/course-vector.png';

interface Category {
    id: string;
    name: string;
    courseCount: number;
    icon: RemixiconComponentType;
    color: {
        bg: string;
        text: string;
        hoverBorder: string;
        hoverText: string;
        darkBg: string;
        darkText: string;
        darkHoverBorder: string;
    };
}

export default function CourseCategory() {
    const [searchQuery, setSearchQuery] = useState('');

    const categories: Category[] = [
        {
            id: '1',
            name: 'Web Development',
            courseCount: 15,
            icon: RiCodeSSlashLine,
            color: {
                bg: 'bg-blue-200',
                text: 'text-blue-700',
                hoverBorder: 'hover:border-blue-400',
                hoverText: 'hover:text-blue-600',
                darkBg: 'dark:bg-blue-900',
                darkText: 'dark:text-blue-400',
                darkHoverBorder: 'dark:hover:border-blue-700',
            },
        },
        {
            id: '2',
            name: 'Music & Sound',
            courseCount: 12,
            icon: RiMusic2Line,
            color: {
                bg: 'bg-pink-200',
                text: 'text-pink-700',
                hoverBorder: 'hover:border-pink-400',
                hoverText: 'hover:text-pink-600',
                darkBg: 'dark:bg-pink-900',
                darkText: 'dark:text-pink-400',
                darkHoverBorder: 'dark:hover:border-pink-700',
            },
        },
        {
            id: '3',
            name: 'Language Learning',
            courseCount: 20,
            icon: RiGlobalLine,
            color: {
                bg: 'bg-emerald-200',
                text: 'text-emerald-700',
                hoverBorder: 'hover:border-emerald-400',
                hoverText: 'hover:text-emerald-600',
                darkBg: 'dark:bg-emerald-900',
                darkText: 'dark:text-emerald-400',
                darkHoverBorder: 'dark:hover:border-emerald-700',
            },
        },
        {
            id: '4',
            name: 'Cooking & Culinary',
            courseCount: 10,
            icon: RiRestaurantLine,
            color: {
                bg: 'bg-orange-200',
                text: 'text-orange-700',
                hoverBorder: 'hover:border-orange-400',
                hoverText: 'hover:text-orange-600',
                darkBg: 'dark:bg-orange-900',
                darkText: 'dark:text-orange-400',
                darkHoverBorder: 'dark:hover:border-orange-700',
            },
        },
        {
            id: '5',
            name: 'Art & Design',
            courseCount: 18,
            icon: RiPaletteLine,
            color: {
                bg: 'bg-purple-200',
                text: 'text-purple-700',
                hoverBorder: 'hover:border-purple-400',
                hoverText: 'hover:text-purple-600',
                darkBg: 'dark:bg-purple-900',
                darkText: 'dark:text-purple-400',
                darkHoverBorder: 'dark:hover:border-purple-700',
            },
        },
        {
            id: '6',
            name: 'Photography',
            courseCount: 8,
            icon: RiCameraLine,
            color: {
                bg: 'bg-yellow-200',
                text: 'text-yellow-700',
                hoverBorder: 'hover:border-yellow-400',
                hoverText: 'hover:text-yellow-600',
                darkBg: 'dark:bg-yellow-900',
                darkText: 'dark:text-yellow-400',
                darkHoverBorder: 'dark:hover:border-yellow-700',
            },
        },
        {
            id: '7',
            name: 'Dancing & Performance',
            courseCount: 14,
            icon: RiMovieLine,
            color: {
                bg: 'bg-cyan-100',
                text: 'text-cyan-600',
                hoverBorder: 'hover:border-cyan-400',
                hoverText: 'hover:text-cyan-600',
                darkBg: 'dark:bg-cyan-900',
                darkText: 'dark:text-cyan-400',
                darkHoverBorder: 'dark:hover:border-cyan-700',
            },
        },
        {
            id: '8',
            name: 'Business & Marketing',
            courseCount: 14,
            icon: RiBarChartBoxLine,
            color: {
                bg: 'bg-rose-200',
                text: 'text-rose-700',
                hoverBorder: 'hover:border-rose-400',
                hoverText: 'hover:text-rose-600',
                darkBg: 'dark:bg-rose-900',
                darkText: 'dark:text-rose-400',
                darkHoverBorder: 'dark:hover:border-rose-700',
            },
        },
        {
            id: '9',
            name: 'AI & Machine Learning',
            courseCount: 11,
            icon: RiCpuLine,
            color: {
                bg: 'bg-lime-200',
                text: 'text-lime-700',
                hoverBorder: 'hover:border-lime-400',
                hoverText: 'hover:text-lime-600',
                darkBg: 'dark:bg-lime-900',
                darkText: 'dark:text-lime-400',
                darkHoverBorder: 'dark:hover:border-lime-700',
            },
        },
        {
            id: '10',
            name: 'Fitness & Health',
            courseCount: 9,
            icon: RiRunLine,
            color: {
                bg: 'bg-red-200',
                text: 'text-red-700',
                hoverBorder: 'hover:border-red-400',
                hoverText: 'hover:text-red-600',
                darkBg: 'dark:bg-red-900',
                darkText: 'dark:text-red-400',
                darkHoverBorder: 'dark:hover:border-red-700',
            },
        },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search functionality
        console.log('Searching for:', searchQuery);
    };

    return (
        <>
            {/* Banner section */}
            <section className="lg:pt-40 lg:pb-0 py-20 bg-gradient-to-r from-green-50 via-emerald-50 to-lime-100 dark:from-green-900 dark:via-emerald-900 dark:to-lime-900 relative">
                <Image
                    src={bannerShape3}
                    alt="shape"
                    className="absolute bottom-0 ltr:right-0 rtl:left-0 ltr:rotate-[180deg] rtl:rotate-[-180deg] dark:invert"
                />
                <Image
                    src={bannerShape1}
                    alt="shape"
                    className="absolute ltr:left-0 rtl:right-0 rtl:scale-x-[-1] hidden md:block dark:invert"
                />
                <Image
                    src={bannerShape2}
                    alt="shape"
                    className="absolute ltr:left-1/4 rtl:right-1/4 bottom-30 ltr:rotate-[-23deg] rtl:rotate-[23deg] animate-float-up delay-60 hidden md:block dark:invert"
                />
                <Image
                    src={bannerShape4}
                    alt="shape"
                    className="absolute ltr:right-1/4 rtl:left-1/4 top-20 ltr:rotate-[23deg] rtl:rotate-[-23deg] opacity-30 animate-float-down delay-600 hidden md:block dark:invert"
                />
                <div className="container">
                    <div className="flex gap-10 justify-center items-center flex-wrap md:flex-nowrap">
                        <div className="w-75 relative">
                            <Image
                                src={courseCgVector}
                                alt="vector"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-primary-950 dark:text-primary-100 lg:text-5xl mb-3 leading-snug">
                                Explore Course Categories
                            </h2>
                            <p className="text-gray-600 dark:text-dark-400 mb-6">
                                Discover the perfect course to boost your knowledge and career.
                            </p>
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for a course..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-950 py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    className="absolute ltr:right-2 rtl:left-2 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-full transition-all"
                                >
                                    Find Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category section */}
            <section className="lg:py-30 py-20">
                <div className="container">
                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <div
                                    key={category.id}
                                    className={`rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center ${category.color.hoverBorder} ${category.color.darkHoverBorder} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                                >
                                    <div
                                        className={`size-12 ${category.color.bg} ${category.color.darkBg} ${category.color.text} ${category.color.darkText} flex items-center justify-center rounded-xl mb-4 mx-auto transition-colors duration-300`}
                                    >
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <h5 className="mb-2">
                                        <Link
                                            href="#!"
                                            className={`text-gray-800 dark:text-gray-300 ${category.color.hoverText} transition-colors duration-300 truncate`}
                                        >
                                            {category.name}
                                        </Link>
                                    </h5>
                                    <p className="text-gray-600 dark:text-dark-400">{category.courseCount} Courses</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Certificate section */}
            <section className="lg:pb-30 pb-20">
                <div className="container">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {/* Certificate Card */}
                        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-cyan-100 dark:bg-gradient-to-br dark:from-green-950 dark:to-cyan-900 p-6 pb-0 max-w-120">
                            <div className="grid grid-cols-12 gap-6 items-center">
                                <div className="col-span-12 md:col-span-6">
                                    <h2 className="font-medium mb-8 text-gray-800 dark:text-gray-200 leading-snug">
                                        Earn a <strong className="font-bold">Certificate</strong>
                                    </h2>
                                    <Link
                                        href="#!"
                                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-5 py-2 rounded-xl inline-flex items-center gap-2 transition"
                                    >
                                        View Program
                                        <RiArrowRightLine className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <Image
                                        src={courseCertificate}
                                        alt="certificate"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Courses Card */}
                        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-rose-100 dark:bg-gradient-to-br dark:from-orange-950 dark:to-rose-900 p-6 pb-0 max-w-120">
                            <div className="grid grid-cols-12 gap-6 items-center">
                                <div className="col-span-12 md:col-span-6">
                                    <h2 className="font-medium mb-8 text-gray-800 dark:text-gray-200 leading-snug">
                                        Discover Our <strong className="font-bold">Courses</strong>
                                    </h2>
                                    <Link
                                        href="#!"
                                        className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-xl inline-flex items-center gap-2 transition"
                                    >
                                        Browse Courses
                                        <RiArrowRightLine className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <Image
                                        src={courseVector}
                                        alt="top courses"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

