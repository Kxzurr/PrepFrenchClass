/**
 * SEO Metadata Helper
 * Generates Next.js metadata from WordPress post data
 */

import { Metadata } from 'next';
import { MappedPost } from '@/src/types/wp';

/**
 * Strip HTML and decode HTML entities
 */
export function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .trim();
}

/**
 * Build metadata from a blog post
 */
export function buildMetadataFromPost(post: MappedPost): Metadata {
    try {
        const title = stripHtml(post?.title || 'Untitled');
        const description = stripHtml(post?.excerpt || '');
        const url = `https://www.prepfrenchclass.com/Blog/${post?.slug || 'post'}`;

        // Safely handle publishedTime - post.date is already formatted, we need original ISO string
        // For now, use current date as fallback
        let publishedTime = new Date().toISOString();
        
        return {
            title: `${title} | Prep French Class Blog`,
            description: description.substring(0, 155) || 'Learn French with our expert blog posts.',
            keywords: [(post?.categories || []), 'French', 'Learning', 'Education'].flat().join(', '),
            authors: [{ name: post?.author || 'Prep French Class' }],
            openGraph: {
                type: 'article',
                title,
                description: description.substring(0, 155) || 'Learn French with our expert blog posts.',
                url,
                images: post?.image ? [
                    {
                        url: post.image,
                        width: 1200,
                        height: 630,
                        alt: post.imageAlt || 'Post Image',
                    },
                ] : [],
                publishedTime,
                authors: [post?.author || 'Prep French Class'],
                tags: post?.categories || [],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description: description.substring(0, 155) || 'Learn French with our expert blog posts.',
                images: post?.image ? [post.image] : [],
            },
        };
    } catch (error) {
        console.error('Error building metadata:', error);
        return {
            title: 'Blog Post | Prep French Class',
            description: 'Learn French with our expert blog posts.',
        };
    }
}

/**
 * Build metadata for blog listing page
 */
export function buildBlogListMetadata(): Metadata {
    return {
        title: 'Blog | Prep French Class',
        description: 'Learn French with our expert blog posts covering grammar, culture, conversation tips, and more.',
        keywords: 'French, Learning, Blog, Education, Language Learning',
        openGraph: {
            type: 'website',
            title: 'Blog | Prep French Class',
            description: 'Learn French with our expert blog posts covering grammar, culture, conversation tips, and more.',
            url: 'https://www.prepfrenchclass.com/Blog',
            images: [
                {
                    url: 'https://www.prepfrenchclass.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Prep French Class Blog',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blog | Prep French Class',
            description: 'Learn French with our expert blog posts covering grammar, culture, conversation tips, and more.',
        },
    };
}
