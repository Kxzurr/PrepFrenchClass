'use client';

import { useState, useMemo } from 'react';
import Pagination from '@/src/common/Pagination';
import { blogPosts } from '@/src/data/blogPosts';
import { POSTS_PER_PAGE_GRID } from '@/src/constants/blog';

export default function AuthorPosts() {
    const [currentPage, setCurrentPage] = useState(1);

    // Filter posts by author (Ethan Walker) - using first 6 posts as example
    const authorPosts = useMemo(() => {
        return blogPosts.slice(0, 6);
    }, []);

    // Calculate pagination
    const { totalPages, currentPosts } = useMemo(() => {
        const totalPages = Math.ceil(authorPosts.length / POSTS_PER_PAGE_GRID);
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE_GRID;
        const endIndex = startIndex + POSTS_PER_PAGE_GRID;
        const currentPosts = authorPosts.slice(startIndex, endIndex);

        return { totalPages, currentPosts };
    }, [authorPosts, currentPage]);

    return (
        <section className="lg:pb-30 pb-20">
            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    {currentPosts.map((post) => (
                        <BlogGridCard key={post.id} post={post} />
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

