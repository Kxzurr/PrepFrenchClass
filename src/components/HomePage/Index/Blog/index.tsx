import Image from 'next/image';
import Link from 'next/link';
import { RiGraduationCapLine, RiUserLine, RiCalendarLine } from '@remixicon/react';
import { CampusBlogPost } from '@/src/types/blog';
import campusBlog1 from '../../../../assets/images/campus/campus-blog-1.png';
import campusBlog2 from '../../../../assets/images/campus/campus-blog-2.jpg';
import campusBlog3 from '../../../../assets/images/campus/campus-blog-3.png';
import campusBlog4 from '../../../../assets/images/campus/campus-blog-4.png';

export default function CampusBlogSection() {
    const featuredPost: CampusBlogPost = {
        image: campusBlog1,
        category: 'TEF & TCF Preparation',
        author: 'Prep French Team',
        date: 'March 5, 2026',
        title: 'Complete Guide to TEF Canada & TCF Canada: Format, Scoring & Preparation Strategy',
        description:
            'Understand the exam structure, scoring system, and proven preparation techniques for TEF and TCF Canada. Learn how to improve your listening, speaking, reading, and writing performance step by step.',
        isLarge: true,
    };

    const recentPosts: CampusBlogPost[] = [
        {
            image: campusBlog2,
            category: 'French for Beginners',
            author: 'Prep French Team',
            date: 'March 2, 2026',
            title: 'How to Start Learning French from Scratch (A1 Level Roadmap)',
        },
        {
            image: campusBlog3,
            category: 'Exam Strategy',
            author: 'Prep French Team',
            date: 'February 25, 2026',
            title: 'Top Mistakes Students Make in the TEF Speaking Module',
        },
        {
            image: campusBlog4,
            category: 'Career & Immigration',
            author: 'Prep French Team',
            date: 'February 18, 2026',
            title: 'How French Language Skills Can Strengthen Your Express Entry Profile',
        },
    ];

    return (
        <section className="bg-gradient-to-l from-[#f7fee74f] via-[#f5f3ffc9] to-[#f7fee78a] dark:bg-gradient-to-l dark:from-[#1a2d1a] dark:via-[#2a2338] dark:to-[#1f331f] lg:py-30 py-20">
            <div className="container">
                <div className="max-w-2xl text-center mx-auto mb-12">
                    <p className="inline-flex gap-2 items-center border border-black/10 dark:border-white/10 p-1 pe-3 rounded-full mb-4">
                        <span className="rounded-full bg-primary-900 text-white size-8 inline-flex items-center justify-center">
                            <RiGraduationCapLine className="size-4" />
                        </span>
                        French Learning Blog
                    </p>
                    <h2 className="md:text-4xl leading-snug">
                        Latest French Learning Guides, Exam Tips & Success Strategies
                    </h2>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Featured Post - Large Card */}
                    <div className="col-span-12 xl:col-span-6">
                        <div className="border border-black/30 dark:border-white/30 rounded-xl p-2">
                            <div className="rounded-xl overflow-hidden h-100 relative group campus-blog-card">
                                <Image
                                    src={featuredPost.image}
                                    alt="TEF and TCF Canada preparation guide"
                                    className="w-full h-full object-cover"
                                    fill
                                />
                                <span className="absolute top-4 ltr:left-4 rtl:right-4 inline-block bg-primary-700 text-white rounded-lg p-1 px-3 text-[1rem]">
                                    {featuredPost.category}
                                </span>
                            </div>
                            <div className="p-5 pb-4">
                                <div className="flex items-center xl:gap-6 gap-3 flex-wrap mb-3">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-dark-400">
                                        <RiUserLine className="size-5" />
                                        <h6 className="font-medium">
                                            <Link href="#!" className="hover:text-primary-600 transition-colors">
                                                {featuredPost.author}
                                            </Link>
                                        </h6>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-dark-400">
                                        <RiCalendarLine className="size-5" />
                                        <p>{featuredPost.date}</p>
                                    </div>
                                </div>
                                <h3 className="leading-snug mb-2">
                                    <Link href="#!" className="hover:text-primary-600 transition-colors">
                                        {featuredPost.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-600 dark:text-dark-400">{featuredPost.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Posts - Small Cards */}
                    <div className="col-span-12 xl:col-span-6">
                        <div className="border border-black/30 dark:border-white/30 rounded-xl">
                            {recentPosts.map((post, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-wrap md:flex-nowrap items-center gap-4 ${
                                        index < recentPosts.length - 1
                                            ? 'border-b border-black/30 dark:border-white/30 pb-3'
                                            : 'pb-3'
                                    } p-2`}
                                >
                                    <div className="campus-blog-card rounded-xl overflow-hidden relative 2xl:w-75 xl:w-50 md:w-75 w-full h-46 md:shrink-0">
                                        <Image
                                            src={post.image}
                                            alt="French learning blog article"
                                            className="w-full h-full object-cover"
                                            width={200}
                                            height={184}
                                        />
                                        <span className="absolute top-4 ltr:left-4 rtl:right-4 inline-block bg-primary-700 text-white rounded-lg p-1 px-3 text-[1rem]">
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center 2xl:gap-6 gap-3 flex-wrap mb-4">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-dark-400">
                                                <RiUserLine className="size-5" />
                                                <h6 className="font-medium">
                                                    <Link href="#!" className="hover:text-primary-600 transition-colors">
                                                        {post.author}
                                                    </Link>
                                                </h6>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-dark-400">
                                                <RiCalendarLine className="size-5" />
                                                <p>{post.date}</p>
                                            </div>
                                        </div>
                                        <h4>
                                            <Link href="#!" className="hover:text-primary-600 transition-colors">
                                                {post.title}
                                            </Link>
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
