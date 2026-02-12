'use client';

import { useState } from 'react';
import Image from 'next/image';
import bannerShape1 from '@/src/assets/images/banner-shape-1.webp';
import bannerShape2 from '@/src/assets/images/banner-shape-2.webp';
import bannerShape3 from '@/src/assets/images/banner-shape-3.webp';
import bannerShape4 from '@/src/assets/images/banner-shape-4.png';

export default function BannerSection() {
    const [searchQuery, setSearchQuery] = useState('');

    const popularTopics = ['Getting Started', 'Chat', 'Documentation'];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search functionality
        console.log('Searching for:', searchQuery);
    };

    return (
        <section className="py-40 pb-25 bg-gradient-to-r from-green-50 via-emerald-50 to-lime-100 dark:from-green-900 dark:via-emerald-900 dark:to-lime-900 relative">
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
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-primary-950 dark:text-primary-100 lg:text-5xl mb-4 font-bold leading-snug">
                        Help Center
                    </h2>
                    <p className="text-gray-600 dark:text-dark-400">
                        Find answers to your questions, explore popular topics, or contact our support team for further
                        assistance.
                    </p>
                    <form onSubmit={handleSearch} className="relative flex items-center mt-7">
                        <input
                            type="text"
                            placeholder="Search for help articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-4 ltr:pl-12 ltr:pr-32 rtl:pr-12 rtl:pl-32 rounded-full border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-950"
                        />
                        <button
                            type="submit"
                            className="btn absolute ltr:right-2 rtl:left-2 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white dark:text-black font-medium rounded-full transition-all"
                        >
                            Search
                        </button>
                    </form>
                    <div className="flex items-center gap-5 mt-5 justify-center flex-wrap">
                        <p className="text-gray-600 dark:text-dark-400">Popular topics :</p>
                        {popularTopics.map((topic, index) => (
                            <span
                                key={index}
                                className="bg-primary-200/50 text-primary-700 dark:text-primary-900 rounded-full px-4 p-2"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

