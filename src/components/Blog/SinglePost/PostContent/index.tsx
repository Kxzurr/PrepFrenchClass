'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    RiCalendarLine,
    RiTimeLine,
    RiDoubleQuotesL,
    RiMessageLine,
    RiFacebookLine,
    RiTwitterLine,
    RiInstagramLine,
    RiLinkedinLine,
} from '@remixicon/react';
import { MappedPost } from '@/src/types/wp';

interface PostContentProps {
    post?: MappedPost;
}

export default function PostContent({ post }: PostContentProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        comment: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Handle form submission
        console.log('Comment submitted:', formData);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Comment posted successfully!');
            setFormData({
                name: '',
                email: '',
                website: '',
                comment: '',
            });
        }, 1000);
    };

    // Use post data if available, otherwise use fallback
    const postTitle = post?.title || '5 Proven Strategies to Stay Motivated While Learning Online';
    const postImage = post?.image || null;
    const postImageAlt = post?.imageAlt || 'Post Image';
    const postAuthor = post?.author || 'Sophia Turner';
    const postAuthorAvatar = post?.authorAvatar || null;
    const postDate = post?.date || 'October 12, 2025';
    const postReadTime = post?.readTime || '5 Min Read';
    const postCategories = post?.categories || ['Learning'];
    const postContent = post?.content || '';

    const tags = postCategories.length > 0 ? postCategories : ['Learning', 'Dance', 'Campus', 'Cooking', 'Study', 'Music'];

    return (
        <div className="col-span-12 lg:col-span-8">
            {postImage ? (
                <img
                    src={postImage}
                    alt={postImageAlt}
                    className="rounded-xl lg:h-120 w-full object-cover"
                />
            ) : (
                <div className="rounded-xl lg:h-120 w-full bg-gray-300 dark:bg-gray-700" />
            )}
            <div className="mt-4">
                <h2 className="leading-snug">
                    <Link href="#!" className="text-primary-950 dark:text-primary-100 hover:text-primary-600 transition-colors">
                        {postTitle}
                    </Link>
                </h2>
                <div className="flex items-center mt-4 lg:gap-6 mb-5 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        {postAuthorAvatar ? (
                            <img
                                src={postAuthorAvatar}
                                alt={postAuthor}
                                className="size-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="size-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                        )}
                        <Link
                            href="#!"
                            className="font-md font-medium text-gray-600 dark:text-dark-400 hover:text-primary-600 transition-colors"
                        >
                            {postAuthor}
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <RiCalendarLine className="w-4 h-4 text-primary-600" />
                        <p className="text-gray-600 dark:text-dark-400">{postDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <RiTimeLine className="w-4 h-4 text-primary-600" />
                        <p className="text-gray-600 dark:text-dark-400">{postReadTime}</p>
                    </div>
                </div>

                {postContent ? (
                    <div
                        className="text-gray-600 dark:text-dark-400 prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: postContent }}
                    />
                ) : (
                    <p className="text-gray-600 dark:text-dark-400">
                        Online education has opened endless opportunities, but staying consistent is the real challenge.
                        Whether you&apos;re learning a new language, mastering a musical instrument, or taking a university
                        course remotely — discipline and routine make all the difference. The flexibility of online learning
                        can be both a gift and a distraction, and without structure, it&apos;s easy to lose focus or motivation.
                        Setting clear goals, maintaining a regular study schedule, and creating a calm, distraction-free
                        environment help build lasting habits. Consistent effort always outshines quick bursts of enthusiasm.
                    </p>
                )}

                <div className="bg-primary-100 dark:bg-primary-900 p-6 my-5 flex items-start gap-4 rounded-xl">
                    <RiDoubleQuotesL className="w-7 h-7 text-primary-600 shrink-0" />
                    <div>
                        <p className="text-gray-700 dark:text-dark-400 italic">
                            &quot;The future belongs to those who learn more skills and combine them in creative ways for
                            success and growth ahead.&quot;
                        </p>
                        <h6 className="mt-3 text-primary-950 dark:text-primary-100">― Robert Greene</h6>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-7 flex-wrap">
                    <h5 className="text-primary-950 dark:text-primary-100">Tags :</h5>
                    {tags.map((tag, index) => (
                        <Link
                            key={index}
                            href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                            className="px-4 py-2 border border-black/20 dark:border-white/20 text-gray-600 dark:text-dark-400 rounded-full hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all duration-300"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>

                <div className="border-t border-b border-black/20 dark:border-white/20 py-7 mt-9 flex items-center gap-5 flex-wrap md:flex-nowrap">
                    <div className="size-35 shrink-0">
                        {postAuthorAvatar ? (
                            <img
                                src={postAuthorAvatar}
                                alt={postAuthor}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-full" />
                        )}
                    </div>
                    <div>
                        <Link href="#!" className="font-semibold text-xl text-primary-950 dark:text-primary-100 hover:text-primary-600 transition-colors">
                            {postAuthor}
                        </Link>
                        <p className="text-gray-600 dark:text-dark-400 mt-2">
                            {postAuthor} is a passionate contributor sharing expertise and insights on learning and personal development.
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <Link
                                href="#!"
                                className="size-7 flex items-center justify-center border border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                            >
                                <RiFacebookLine className="w-4 h-4" />
                            </Link>
                            <Link
                                href="#!"
                                className="size-7 flex items-center justify-center border border-sky-500 rounded-full text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300"
                            >
                                <RiTwitterLine className="w-4 h-4" />
                            </Link>
                            <Link
                                href="#!"
                                className="size-7 flex items-center justify-center border border-red-600 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                            >
                                <RiInstagramLine className="w-4 h-4" />
                            </Link>
                            <Link
                                href="#!"
                                className="size-7 flex items-center justify-center border border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                            >
                                <RiLinkedinLine className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-9">
                    <h2 className="text-primary-950 dark:text-primary-100/80 mb-6">Leave a comment</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 dark:border-gray-800 rounded-lg px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 dark:border-gray-800 rounded-lg px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="Website"
                                className="w-full border border-gray-300 dark:border-gray-800 rounded-lg px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <textarea
                                id="comment"
                                name="comment"
                                rows={5}
                                value={formData.comment}
                                onChange={handleChange}
                                placeholder="Write your comment..."
                                className="w-full border border-gray-300 dark:border-gray-800 rounded-lg px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RiMessageLine className="size-5" />
                            {isSubmitting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

