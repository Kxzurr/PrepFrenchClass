'use client';

import Link from 'next/link';
import {
    RiMusic2Line,
    RiHeadphoneLine,
    RiBookOpenLine,
    RiSchoolLine,
    RiRestaurantLine,
    RiBookReadLine,
    RiHeartLine,
    RiCameraLine,
    RiPaletteLine,
    RiLeafLine,
    RiGlobalLine,
    RiShoppingBagLine,
    RiWeightLine,
    RiCpuLine,
    RiClapperboardLine,
    RiMegaphoneLine,
} from '@remixicon/react';
import { PostCategory } from '@/src/types/blog';

export default function CategorySection() {
    const categories: PostCategory[] = [
        {
            id: '1',
            name: 'Dance',
            postCount: 14,
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
            href: '/post-list-view',
        },
        {
            id: '2',
            name: 'Music',
            postCount: 20,
            icon: RiHeadphoneLine,
            color: {
                bg: 'bg-indigo-200',
                text: 'text-indigo-700',
                hoverBorder: 'hover:border-indigo-400',
                hoverText: 'hover:text-indigo-600',
                darkBg: 'dark:bg-indigo-900',
                darkText: 'dark:text-indigo-400',
                darkHoverBorder: 'dark:hover:border-indigo-700',
            },
            href: '/post-list-view',
        },
        {
            id: '3',
            name: 'Language',
            postCount: 18,
            icon: RiBookOpenLine,
            color: {
                bg: 'bg-emerald-200',
                text: 'text-emerald-700',
                hoverBorder: 'hover:border-emerald-400',
                hoverText: 'hover:text-emerald-600',
                darkBg: 'dark:bg-emerald-900',
                darkText: 'dark:text-emerald-400',
                darkHoverBorder: 'dark:hover:border-emerald-700',
            },
            href: '/post-list-view',
        },
        {
            id: '4',
            name: 'Campus & University',
            postCount: 25,
            icon: RiSchoolLine,
            color: {
                bg: 'bg-blue-200',
                text: 'text-blue-700',
                hoverBorder: 'hover:border-blue-400',
                hoverText: 'hover:text-blue-600',
                darkBg: 'dark:bg-blue-900',
                darkText: 'dark:text-blue-400',
                darkHoverBorder: 'dark:hover:border-blue-700',
            },
            href: '/post-list-view',
        },
        {
            id: '5',
            name: 'Food',
            postCount: 22,
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
            href: '/post-list-view',
        },
        {
            id: '6',
            name: 'Education',
            postCount: 20,
            icon: RiBookReadLine,
            color: {
                bg: 'bg-cyan-200',
                text: 'text-cyan-700',
                hoverBorder: 'hover:border-cyan-400',
                hoverText: 'hover:text-cyan-600',
                darkBg: 'dark:bg-cyan-900',
                darkText: 'dark:text-cyan-400',
                darkHoverBorder: 'dark:hover:border-cyan-700',
            },
            href: '/post-list-view',
        },
        {
            id: '7',
            name: 'Lifestyle',
            postCount: 15,
            icon: RiHeartLine,
            color: {
                bg: 'bg-purple-200',
                text: 'text-purple-700',
                hoverBorder: 'hover:border-purple-400',
                hoverText: 'hover:text-purple-600',
                darkBg: 'dark:bg-purple-900',
                darkText: 'dark:text-purple-400',
                darkHoverBorder: 'dark:hover:border-purple-700',
            },
            href: '/post-list-view',
        },
        {
            id: '8',
            name: 'Photography',
            postCount: 12,
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
            href: '/post-list-view',
        },
        {
            id: '9',
            name: 'Art & Design',
            postCount: 19,
            icon: RiPaletteLine,
            color: {
                bg: 'bg-rose-200',
                text: 'text-rose-700',
                hoverBorder: 'hover:border-rose-400',
                hoverText: 'hover:text-rose-600',
                darkBg: 'dark:bg-rose-900',
                darkText: 'dark:text-rose-400',
                darkHoverBorder: 'dark:hover:border-rose-700',
            },
            href: '/post-list-view',
        },
        {
            id: '10',
            name: 'Environment',
            postCount: 10,
            icon: RiLeafLine,
            color: {
                bg: 'bg-green-200',
                text: 'text-green-700',
                hoverBorder: 'hover:border-green-400',
                hoverText: 'hover:text-green-600',
                darkBg: 'dark:bg-green-900',
                darkText: 'dark:text-green-400',
                darkHoverBorder: 'dark:hover:border-green-700',
            },
            href: '/post-list-view',
        },
        {
            id: '11',
            name: 'Travel',
            postCount: 16,
            icon: RiGlobalLine,
            color: {
                bg: 'bg-teal-200',
                text: 'text-teal-700',
                hoverBorder: 'hover:border-teal-400',
                hoverText: 'hover:text-teal-600',
                darkBg: 'dark:bg-teal-900',
                darkText: 'dark:text-teal-400',
                darkHoverBorder: 'dark:hover:border-teal-700',
            },
            href: '/post-list-view',
        },
        {
            id: '12',
            name: 'Fashion',
            postCount: 21,
            icon: RiShoppingBagLine,
            color: {
                bg: 'bg-fuchsia-200',
                text: 'text-fuchsia-700',
                hoverBorder: 'hover:border-fuchsia-400',
                hoverText: 'hover:text-fuchsia-600',
                darkBg: 'dark:bg-fuchsia-900',
                darkText: 'dark:text-fuchsia-400',
                darkHoverBorder: 'dark:hover:border-fuchsia-700',
            },
            href: '/post-list-view',
        },
        {
            id: '13',
            name: 'Fitness',
            postCount: 24,
            icon: RiWeightLine,
            color: {
                bg: 'bg-lime-200',
                text: 'text-lime-700',
                hoverBorder: 'hover:border-lime-400',
                hoverText: 'hover:text-lime-600',
                darkBg: 'dark:bg-lime-900',
                darkText: 'dark:text-lime-400',
                darkHoverBorder: 'dark:hover:border-lime-700',
            },
            href: '/post-list-view',
        },
        {
            id: '14',
            name: 'Technology',
            postCount: 30,
            icon: RiCpuLine,
            color: {
                bg: 'bg-sky-200',
                text: 'text-sky-700',
                hoverBorder: 'hover:border-sky-400',
                hoverText: 'hover:text-sky-600',
                darkBg: 'dark:bg-sky-900',
                darkText: 'dark:text-sky-400',
                darkHoverBorder: 'dark:hover:border-sky-700',
            },
            href: '/post-list-view',
        },
        {
            id: '15',
            name: 'Film & Media',
            postCount: 17,
            icon: RiClapperboardLine,
            color: {
                bg: 'bg-amber-200',
                text: 'text-amber-700',
                hoverBorder: 'hover:border-amber-400',
                hoverText: 'hover:text-amber-600',
                darkBg: 'dark:bg-amber-900',
                darkText: 'dark:text-amber-400',
                darkHoverBorder: 'dark:hover:border-amber-700',
            },
            href: '/post-list-view',
        },
        {
            id: '16',
            name: 'News & Updates',
            postCount: 14,
            icon: RiMegaphoneLine,
            color: {
                bg: 'bg-red-200',
                text: 'text-red-700',
                hoverBorder: 'hover:border-red-400',
                hoverText: 'hover:text-red-600',
                darkBg: 'dark:bg-red-900',
                darkText: 'dark:text-red-400',
                darkHoverBorder: 'dark:hover:border-red-700',
            },
            href: '/post-list-view',
        },
    ];

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <div
                                key={category.id}
                                className={`rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center ${category.color.hoverBorder} ${category.color.darkHoverBorder} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                            >
                                <div
                                    className={`size-12 ${category.color.bg} ${category.color.darkBg} ${category.color.text} ${category.color.darkText} flex items-center justify-center rounded-xl mb-4 mx-auto`}
                                >
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <h4 className="mb-2">
                                    <Link
                                        href={category.href}
                                        className={`${category.color.hoverText} transition-colors duration-300 text-primary-950 dark:text-primary-100`}
                                    >
                                        {category.name}
                                    </Link>
                                </h4>
                                <p className="text-gray-600 dark:text-dark-400">{category.postCount} Posts</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

