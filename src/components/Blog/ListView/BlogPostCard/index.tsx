'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/src/types/blog';

export default function BlogPostCard({ post }: { post: BlogPost }) {
    const categoryColorClasses: Record<string, string> = {
        pink: 'hover:text-pink-600',
        blue: 'hover:text-blue-600',
        green: 'hover:text-green-600',
        rose: 'hover:text-rose-600',
        yellow: 'hover:text-yellow-600',
    };

    const categoryTextColorClasses: Record<string, string> = {
        pink: 'text-pink-600',
        blue: 'text-blue-600',
        green: 'text-green-600',
        rose: 'text-rose-600',
        yellow: 'text-yellow-600',
    };

    // Check if image is a string URL or StaticImageData
    const isStringImage = typeof post.image === 'string';
    const isStringAvatar = typeof post.authorAvatar === 'string';

    return (
        <div className="border-b border-black/10 dark:border-white/10 pb-6 dark:border-white/10">
            <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-4">
                    {isStringImage ? (
                        <img
                            src={post.image as unknown as string}
                            alt={post.imageAlt}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    ) : (
                        <Image
                            src={post.image as any}
                            alt={post.imageAlt}
                            className="w-full h-full object-cover rounded-xl"
                            width={400}
                            height={300}
                        />
                    )}
                </div>
                <div className="col-span-12 md:col-span-8">
                    <div className="lg:p-5 p-3">
                        <p className={`${categoryTextColorClasses[post.categoryColor] || 'text-gray-600'} font-medium mb-3`}>{post.category}</p>
                        <h5>
                            <Link
                                href={post.titleHref}
                                className={`${categoryColorClasses[post.categoryColor] || 'hover:text-primary-600'} transition-colors duration-300`}
                            >
                                {post.title}
                            </Link>
                        </h5>
                        <p className="text-gray-600 dark:text-dark-400 mt-2">{post.description}</p>
                        <div className="flex items-center gap-2 justify-between mt-5">
                            <div className="flex items-center gap-2">
                                <div className="size-11">
                                    {isStringAvatar ? (
                                        <img
                                            src={post.authorAvatar as unknown as string}
                                            alt={post.authorAvatarAlt}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <Image
                                            src={post.authorAvatar as any}
                                            alt={post.authorAvatarAlt}
                                            className="w-full h-full object-cover rounded-full"
                                            width={44}
                                            height={44}
                                        />
                                    )}
                                </div>
                                <div>
                                    <h6>{post.authorName}</h6>
                                    <p className="text-gray-600 dark:text-dark-400">{post.authorRole}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-dark-400">{post.readTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

