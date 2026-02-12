import { BlogCategory, RecentPost } from '@/src/types/blog';
import { blogPosts } from './blogPosts';

// Generate categories from blog posts
export const blogCategories: BlogCategory[] = [
    { name: 'Dance', count: 8, href: '/post-list-view', hoverColor: 'hover:text-primary-600' },
    { name: 'Music', count: 12, href: '/post-list-view', hoverColor: 'hover:text-red-600' },
    { name: 'Language', count: 10, href: '/post-list-view', hoverColor: 'hover:text-indigo-600' },
    { name: 'Campus University', count: 6, href: '/post-list-view', hoverColor: 'hover:text-yellow-600' },
    { name: 'Food', count: 9, href: '/post-list-view', hoverColor: 'hover:text-orange-600' },
    { name: 'Learning', count: 11, href: '/post-list-view', hoverColor: 'hover:text-green-600' },
];

// Generate recent posts from blog posts data
export const recentPosts: RecentPost[] = blogPosts.slice(0, 3).map((post) => {
    const categoryColors: Record<string, { bg: string; text: string }> = {
        pink: { bg: 'bg-pink-100 dark:bg-pink-900', text: 'text-pink-700 dark:text-pink-400' },
        blue: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-400' },
        green: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-400' },
        rose: { bg: 'bg-rose-100 dark:bg-rose-900', text: 'text-rose-700 dark:text-rose-400' },
        yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-700 dark:text-yellow-400' },
        indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-700 dark:text-indigo-400' },
    };

    const colors = categoryColors[post.categoryColor] || { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-700 dark:text-gray-400' };

    return {
        category: post.category,
        categoryBg: colors.bg,
        categoryText: colors.text,
        title: post.title,
        href: post.titleHref,
        date: 'October 12, 2025', // This could be added to BlogPost type if needed
        readTime: post.readTime,
    };
});

export const blogTags = [
    'Dance',
    'Music',
    'Language',
    'Learning',
    'University',
    'Campus',
    'Creativity',
    'Food',
    'Education',
    'Workshops',
];

