'use client';

import { useState, useMemo, useEffect, startTransition } from 'react';
import Pagination from '@/src/common/Pagination';
import BlogPostCard from '@/src/components/Blog/ListView/BlogPostCard';
import { blogPosts } from '@/src/data/blogPosts';
import { POSTS_PER_PAGE_GRID } from '@/src/constants/blog';

interface SearchResultsProps {
    searchQuery: string;
}

export default function SearchResults({ searchQuery }: SearchResultsProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Filter posts based on search query
    const filteredPosts = useMemo(() => {
        if (!searchQuery.trim()) {
            return blogPosts;
        }

        const query = searchQuery.toLowerCase();
        return blogPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(query) ||
                post.category.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.authorName.toLowerCase().includes(query) ||
                post.authorRole.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    // Reset to page 1 when search query changes
    useEffect(() => {
        startTransition(() => {
            setCurrentPage(1);
        });
    }, [searchQuery]);

    // Calculate pagination
    const { totalPages, currentPosts } = useMemo(() => {
        const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE_GRID);
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE_GRID;
        const endIndex = startIndex + POSTS_PER_PAGE_GRID;
        const currentPosts = filteredPosts.slice(startIndex, endIndex);

        return { totalPages, currentPosts };
    }, [filteredPosts, currentPage]);

    if (searchQuery && filteredPosts.length === 0) {
        return (
            <section className="lg:py-30 py-20">
                <div className="container">
                    <div className="text-center py-20">
                        <p className="text-gray-600 dark:text-dark-400 text-lg">
                            No posts found matching &quot;{searchQuery}&quot;
                        </p>
                        <p className="text-gray-500 dark:text-dark-500 mt-2">
                            Try searching with different keywords
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                {searchQuery && (
                    <div className="mb-6">
                        <p className="text-gray-600 dark:text-dark-400">
                            Found <span className="font-semibold text-primary-600">{filteredPosts.length}</span> result
                            {filteredPosts.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                        </p>
                    </div>
                )}
                <div className="grid grid-cols-12 gap-6">
                    {currentPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-15">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

