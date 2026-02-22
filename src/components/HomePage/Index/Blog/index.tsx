'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiGraduationCapLine, RiUserLine, RiCalendarLine } from '@remixicon/react';
import campusBlog1 from '../../../../assets/images/campus/campus-blog-1.png';

interface BlogPost {
    id: number;
    title: string;
    category: string;
    author: string;
    date: string;
    description: string;
    link: string;
    image: string | null;
}

export default function CampusBlogSection() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [retryTick, setRetryTick] = useState(0);

    useEffect(() => {
        let isActive = true;
        const controller = new AbortController();

        const fetchBlogPosts = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await fetch('/api/blog', {
                    cache: 'no-store',
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error('Invalid blog data');
                }
                if (isActive) {
                    setPosts(data);
                }
            } catch (error) {
                if (!isActive) return;
                if ((error as Error).name === 'AbortError') return;
                console.error('Error fetching blog posts:', error);
                setPosts([]);
                setError('Unable to load blog posts right now.');
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        fetchBlogPosts();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, [retryTick]);

    if (loading) {
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
                        <h2 className="md:text-4xl leading-snug">Loading blog posts...</h2>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
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
                        <h2 className="md:text-4xl leading-snug">Blog posts unavailable</h2>
                        <p className="text-gray-600 dark:text-dark-400 mt-3">{error}</p>
                        <button
                            type="button"
                            onClick={() => setRetryTick((prev) => prev + 1)}
                            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2 text-white hover:bg-primary-700 transition"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) {
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
                        <h2 className="md:text-4xl leading-snug">No blog posts yet</h2>
                        <p className="text-gray-600 dark:text-dark-400 mt-3">Please check back soon.</p>
                    </div>
                </div>
            </section>
        );
    }

    const featuredPost = posts[0] ? {
        ...posts[0],
        image: posts[0].image ? posts[0].image : campusBlog1,
        isLarge: true,
    } : null;

    const recentPosts = posts.slice(1, 4) || [];

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
                    {featuredPost && (
                        <div className="col-span-12 xl:col-span-6">
                            <div className="border border-black/30 dark:border-white/30 rounded-xl p-2">
                                <div className="rounded-xl overflow-hidden h-100 relative group campus-blog-card bg-gray-200 dark:bg-gray-700">
                                    {featuredPost.image && typeof featuredPost.image === 'string' ? (
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 dark:bg-gray-600" />
                                    )}
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
                                        <Link href={featuredPost.link} className="hover:text-primary-600 transition-colors">
                                            {featuredPost.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 dark:text-dark-400">{featuredPost.description}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Posts - Small Cards */}
                    {recentPosts.length > 0 && (
                        <div className="col-span-12 xl:col-span-6">
                            <div className="border border-black/30 dark:border-white/30 rounded-xl">
                                {recentPosts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        className={`flex flex-wrap md:flex-nowrap items-center gap-4 ${
                                            index < recentPosts.length - 1
                                                ? 'border-b border-black/30 dark:border-white/30 pb-3'
                                                : 'pb-3'
                                        } p-2`}
                                    >
                                        <div className="campus-blog-card rounded-xl overflow-hidden relative 2xl:w-75 xl:w-50 md:w-75 w-full h-46 md:shrink-0 bg-gray-200 dark:bg-gray-700">
                                            {post.image ? (
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-300 dark:bg-gray-600" />
                                            )}
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
                                                <Link href={post.link} className="hover:text-primary-600 transition-colors">
                                                    {post.title}
                                                </Link>
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
