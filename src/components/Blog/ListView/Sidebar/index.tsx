'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { RiSearchLine, RiCloseLine } from '@remixicon/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MappedCategory, MappedPost } from '@/src/types/wp';

interface SidebarProps {
    categories?: MappedCategory[];
    recentPosts?: MappedPost[];
}

export default function Sidebar({ categories = [], recentPosts = [] }: SidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const router = useRouter();

    // Filter recent posts based on search query
    const filteredPosts = useMemo(() => {
        if (!searchQuery.trim()) return [];
        
        const query = searchQuery.toLowerCase();
        return recentPosts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query)
        ).slice(0, 5); // Limit to 5 results
    }, [searchQuery, recentPosts]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSearchDropdown(false);
            router.push(`/Blog?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handlePostClick = (slug: string) => {
        setSearchQuery('');
        setShowSearchDropdown(false);
        router.push(`/Blog/${slug}`);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setShowSearchDropdown(false);
    };

    const commonTags = ['WordPress', 'Blog', 'Learning', 'Tips', 'Tutorial', 'Development', 'Guide', 'News'];

    return (
        <div className="col-span-12 lg:col-span-4">
            {/* Search */}
            <div className="relative mb-8">
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchDropdown(true);
                            }}
                            onFocus={() => searchQuery && setShowSearchDropdown(true)}
                            className="w-full border border-gray-300 dark:border-gray-800 rounded-xl bg-gray-500/10 py-3 ltr:pl-5 ltr:pr-12 rtl:pr-5 rtl:pl-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute ltr:right-12 rtl:left-12 top-1/2 -translate-y-1/2 hover:text-red-600 transition-colors"
                            >
                                <RiCloseLine className="w-5 h-5 text-gray-400" />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="absolute ltr:right-6 rtl:left-6 top-1/2 -translate-y-1/2 hover:text-primary-700 transition-colors"
                        >
                            <RiSearchLine className="w-5 h-5 text-primary-600" />
                        </button>
                    </div>

                    {/* Search Dropdown */}
                    {showSearchDropdown && searchQuery && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-950 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
                            {filteredPosts.length > 0 ? (
                                <div className="max-h-96 overflow-y-auto">
                                    {filteredPosts.map((post) => (
                                        <button
                                            key={post.id}
                                            type="button"
                                            onClick={() => handlePostClick(post.slug)}
                                            className="w-full text-left px-4 py-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-900 transition-colors last:border-b-0"
                                        >
                                            <div className="flex gap-3">
                                                {post.image && (
                                                    <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-700">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={post.image}
                                                            alt={post.imageAlt}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-2">
                                                        {post.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {post.categories[0] || 'General'} · {post.date}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-4 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
                                    No posts found matching "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}
                </form>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
                <div className="mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                    <h2 className="lg:text-2xl mb-5 text-primary-950 dark:text-primary-100">Categories</h2>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/Blog?category=${category.slug}`}
                                className="text-md font-medium flex justify-between items-center text-gray-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                            >
                                {category.name}
                                <span className="bg-primary-500/10 px-2 py-1 rounded text-sm">({category.count})</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
                <div className="mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                    <h2 className="lg:text-2xl mb-5 text-primary-950 dark:text-primary-100">Recent Posts</h2>

                    {recentPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className={index < recentPosts.length - 1 ? 'border-b border-black/10 dark:border-white/10 pb-5 mb-5' : 'pt-5'}
                        >
                            <span className="bg-primary-500/10 text-primary-700 dark:text-primary-300 rounded-lg mb-3 px-3 py-1 font-medium inline-block text-xs">
                                {post.categories[0] || 'General'}
                            </span>
                            <h5>
                                <Link
                                    href={`/Blog/${post.slug}`}
                                    className="block hover:text-primary-600 transition-colors duration-300 text-primary-950 dark:text-primary-100 font-medium text-sm"
                                >
                                    {post.title}
                                </Link>
                            </h5>
                            <p className="text-gray-600 dark:text-dark-400 text-xs mt-2">
                                {post.date} · {post.readTime}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Tags */}
            <div className="pb-6 border-b border-black/10 dark:border-white/10">
                <h2 className="lg:text-2xl mb-5 text-primary-950 dark:text-primary-100">Tags</h2>
                <div className="flex flex-wrap gap-3">
                    {commonTags.map((tag, index) => (
                        <Link
                            key={index}
                            href={`/Blog?search=${encodeURIComponent(tag)}`}
                            className="px-4 py-2 bg-primary-500/10 dark:text-gray-300 text-gray-700 rounded-lg hover:bg-primary-600 hover:text-white transition-all duration-300 text-sm"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

