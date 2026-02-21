'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogPostCard from '../BlogPostCard';
import Sidebar from '../Sidebar';
import Pagination from '@/src/common/Pagination';
import { getPosts, searchPosts, getPostsByCategory, getCategories } from '@/src/lib/wp';
import { MappedPost, MappedCategory } from '@/src/types/wp';
import { POSTS_PER_PAGE_LIST } from '@/src/constants/blog';

export default function BlogListSection() {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<MappedPost[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [categories, setCategories] = useState<MappedCategory[]>([]);
    const [recentPosts, setRecentPosts] = useState<MappedPost[]>([]);

    // Fetch sidebar data once
    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                const [categoriesData, recentPostsData] = await Promise.all([
                    getCategories(),
                    getPosts(1, 5).then(res => res.posts),
                ]);
                setCategories(categoriesData);
                setRecentPosts(recentPostsData);
            } catch (error) {
                console.error('Error fetching sidebar data:', error);
            }
        };

        fetchSidebarData();
    }, []);

    // Get search query and category from URL params
    useEffect(() => {
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        setSearchQuery(search);
        setCategoryFilter(category);
        setCurrentPage(1);
    }, [searchParams]);

    // Fetch posts based on search, category, or default
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            setNoResults(false);
            let response;

            try {
                if (searchQuery) {
                    response = await searchPosts(searchQuery, currentPage, POSTS_PER_PAGE_LIST);
                } else if (categoryFilter) {
                    response = await getPostsByCategory(categoryFilter, currentPage, POSTS_PER_PAGE_LIST);
                } else {
                    response = await getPosts(currentPage, POSTS_PER_PAGE_LIST);
                }

                setPosts(response.posts);
                setTotalPages(response.totalPages);
                if (response.posts.length === 0 && (searchQuery || categoryFilter)) {
                    setNoResults(true);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPosts([]);
                setTotalPages(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage, searchQuery, categoryFilter]);

    // Convert MappedPost to BlogPost format for the card component
    const blogPosts = useMemo(() => {
        return posts.map(post => ({
            id: post.id,
            image: post.image as any,
            imageAlt: post.imageAlt,
            category: post.categories[0] || 'General',
            categoryColor: post.categoryColor,
            title: post.title,
            titleHref: `/Blog/${post.slug}`,
            description: post.excerpt,
            authorName: post.author,
            authorAvatar: post.authorAvatar as any,
            authorAvatarAlt: `${post.author} Avatar`,
            authorRole: 'Contributor',
            readTime: post.readTime,
        }));
    }, [posts]);

    const pageTitle = searchQuery 
        ? `Search results for: "${searchQuery}"` 
        : categoryFilter 
        ? `Posts in: ${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}` 
        : 'All Posts';

    return (
        <section className="lg:py-30 py-20">
            <div className="container max-w-[80rem]">
                {/* Page Title for Filtered Views */}
                {(searchQuery || categoryFilter) && (
                    <div className="mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                        <h1 className="text-3xl font-bold text-primary-950 dark:text-primary-100">{pageTitle}</h1>
                        {noResults && (
                            <p className="text-gray-600 dark:text-dark-400 mt-2">No posts found.</p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-12 2xl:gap-15 gap-6">
                    {/* Main Content - Blog Posts */}
                    <div className="col-span-12 lg:col-span-8">
                        {isLoading ? (
                            <div className="space-y-6">
                                {[...Array(POSTS_PER_PAGE_LIST)].map((_, i) => (
                                    <div key={i} className="animate-pulse border-b border-black/10 dark:border-white/10 pb-6">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-4 bg-gray-300 dark:bg-gray-700 rounded-xl h-40" />
                                            <div className="col-span-12 md:col-span-8 space-y-3">
                                                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-20 rounded" />
                                                <div className="bg-gray-300 dark:bg-gray-700 h-6 w-full rounded" />
                                                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-full rounded" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : blogPosts.length > 0 ? (
                            <div className="space-y-6">
                                {blogPosts.map((post) => (
                                    <BlogPostCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600 dark:text-dark-400 text-lg">
                                    {noResults 
                                        ? "No posts found matching your criteria." 
                                        : "No blog posts available."}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto">
                        <Sidebar categories={categories} recentPosts={recentPosts} />
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && !isLoading && !noResults && (
                    <div className="mt-15">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

