/**
 * WordPress REST API Client
 * Handles all WordPress data fetching and mapping
 */

import { WPPost, WPPostsResponse, MappedPost, MappedCategory, WPCategory, WPAuthor } from '@/src/types/wp';

const WP_API_BASE = 'https://lavenderblush-camel-117734.hostingersite.com/wp-json/wp/v2';
const REVALIDATE_TIME = 3600; // 1 hour
const USE_DEMO_MODE = process.env.NEXT_PUBLIC_USE_DEMO_POSTS === 'true';

// Demo/fallback post for development
const DEMO_POST: MappedPost = {
    id: '1',
    title: 'Hello World - Demo Post',
    slug: 'hello-world',
    excerpt: 'This is a demo post showing how your blog will work once WordPress is connected.',
    content: '<h2>Welcome to Your Blog</h2><p>This demo post appears while we connect to your WordPress site.</p><p><strong>Next steps:</strong></p><ul><li>Verify your WordPress site is running</li><li>Enable the REST API in WordPress</li><li>Check that the domain is correct</li></ul><p>Once connected, your blog posts will load directly from WordPress!</p>',
    image: 'https://via.placeholder.com/800x400?text=Demo+Post',
    imageAlt: 'Demo Post',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    author: 'Demo Author',
    authorAvatar: 'https://via.placeholder.com/96',
    categories: ['Demo'],
    categoryColor: 'indigo',
    readTime: '2 Min Read',
};

const DEMO_POSTS: MappedPost[] = [
    DEMO_POST,
    {
        ...DEMO_POST,
        id: '2',
        title: 'Getting Started with Your Blog',
        slug: 'getting-started',
        excerpt: 'Learn how to set up and manage your WordPress blog integration.',
    },
];

// Category color mapping
const CATEGORY_COLORS: Record<string, string> = {
    'french': 'pink',
    'language': 'blue',
    'learning': 'green',
    'tutorial': 'rose',
    'tips': 'yellow',
    'default': 'indigo',
};


/**
 * Fetch posts from WordPress with pagination
 */
export async function getPosts(page: number = 1, perPage: number = 5): Promise<WPPostsResponse> {
    try {
        // Use demo mode if enabled
        if (USE_DEMO_MODE) {
            console.log('[DEMO MODE] Returning demo posts');
            return {
                posts: DEMO_POSTS,
                totalPages: 1,
                totalCount: DEMO_POSTS.length,
            };
        }

        const url = new URL(`${WP_API_BASE}/posts`);
        url.searchParams.append('_embed', 'true');
        url.searchParams.append('per_page', perPage.toString());
        url.searchParams.append('page', page.toString());
        url.searchParams.append('status', 'publish');

        const response = await fetch(url.toString(), {
            next: { revalidate: REVALIDATE_TIME },
        });

        if (!response.ok) {
            console.error('Failed to fetch posts from WordPress:', response.statusText);
            // Fallback to demo posts
            console.log('[FALLBACK] Using demo posts');
            return { 
                posts: DEMO_POSTS, 
                totalPages: 1, 
                totalCount: DEMO_POSTS.length 
            };
        }

        const posts: WPPost[] = await response.json();
        const totalCount = parseInt(response.headers.get('x-wp-total') || '0', 10);
        const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '0', 10);

        const mappedPosts = posts
            .map(post => {
                try {
                    return mapWPPost(post);
                } catch (error) {
                    console.error(`Error mapping post ${post.id}:`, error);
                    return null;
                }
            })
            .filter((post): post is MappedPost => post !== null);

        return {
            posts: mappedPosts.length > 0 ? mappedPosts : DEMO_POSTS,
            totalPages: mappedPosts.length > 0 ? totalPages : 1,
            totalCount: mappedPosts.length > 0 ? totalCount : DEMO_POSTS.length,
        };
    } catch (error) {
        console.error('Error fetching WordPress posts:', error);
        // Fallback to demo posts
        console.log('[FALLBACK] Using demo posts due to error');
        return { 
            posts: DEMO_POSTS, 
            totalPages: 1, 
            totalCount: DEMO_POSTS.length 
        };
    }
}

/**
 * Fetch a single post by slug
 */
export async function getPost(slug: string): Promise<MappedPost | null> {
    try {
        if (!slug || typeof slug !== 'string') {
            console.warn('Invalid slug provided to getPost');
            return null;
        }

        // Use demo mode if enabled
        if (USE_DEMO_MODE) {
            const demoPost = DEMO_POSTS.find(p => p.slug === slug);
            if (demoPost) {
                console.log(`[DEMO MODE] Returning demo post: ${slug}`);
                return demoPost;
            }
        }

        const url = new URL(`${WP_API_BASE}/posts`);
        url.searchParams.append('slug', slug);
        url.searchParams.append('_embed', 'true');

        const response = await fetch(url.toString(), {
            next: { revalidate: REVALIDATE_TIME },
        });

        if (!response.ok) {
            console.error(`WordPress API error: ${response.status} ${response.statusText}`);
            // Fallback to demo post
            console.log(`[FALLBACK] Using demo post for slug: ${slug}`);
            return DEMO_POST;
        }

        const posts: WPPost[] = await response.json();
        if (!Array.isArray(posts) || posts.length === 0) {
            console.warn(`No post found with slug: ${slug}`);
            return DEMO_POST; // Return demo post as fallback
        }

        const post = posts[0];
        if (!post || typeof post !== 'object') {
            console.warn(`Invalid post object received for slug: ${slug}`);
            return DEMO_POST; // Return demo post as fallback
        }

        try {
            return mapWPPost(post);
        } catch (mapError) {
            console.error(`Error mapping WordPress post (slug: ${slug}):`, mapError);
            return DEMO_POST; // Return demo post as fallback
        }
    } catch (error) {
        console.error(`Error fetching post from WordPress (slug: ${slug}):`, error);
        // Return demo post as fallback
        console.log(`[FALLBACK] Using demo post due to error`);
        return DEMO_POST;
    }
}

/**
 * Get all post slugs for static generation
 */
export async function getAllSlugs(): Promise<string[]> {
    try {
        // Use demo mode if enabled
        if (USE_DEMO_MODE) {
            console.log('[DEMO MODE] Returning demo slugs');
            return DEMO_POSTS.map(p => p.slug);
        }

        const url = new URL(`${WP_API_BASE}/posts`);
        url.searchParams.append('per_page', '100');
        url.searchParams.append('status', 'publish');
        url.searchParams.append('_fields', 'slug');

        let slugs: string[] = [];
        let page = 1;
        let hasMore = true;
        let maxPages = 50; // Safety limit to prevent infinite loops

        while (hasMore && page <= maxPages) {
            try {
                url.searchParams.set('page', page.toString());
                const response = await fetch(url.toString(), {
                    next: { revalidate: REVALIDATE_TIME },
                });

                if (!response.ok) {
                    console.warn(`WordPress API returned ${response.status} status on page ${page}`);
                    break;
                }

                const posts: Array<{ slug?: string }> = await response.json();
                if (!Array.isArray(posts) || posts.length === 0) {
                    hasMore = false;
                } else {
                    const validSlugs = posts
                        .map(p => p?.slug)
                        .filter((slug): slug is string => typeof slug === 'string' && slug.trim().length > 0);
                    slugs = [...slugs, ...validSlugs];
                    page++;
                }
            } catch (pageError) {
                console.error(`Error fetching page ${page} of post slugs:`, pageError);
                break;
            }
        }

        if (slugs.length === 0) {
            console.warn('No slugs fetched from WordPress, using demo slugs as fallback');
            return DEMO_POSTS.map(p => p.slug);
        }

        console.log(`Successfully fetched ${slugs.length} post slugs from WordPress`);
        return slugs;
    } catch (error) {
        console.error('Error fetching post slugs from WordPress:', error);
        // Fallback to demo posts
        console.log('[FALLBACK] Using demo slugs due to error');
        return DEMO_POSTS.map(p => p.slug);
    }
}

/**
 * Fetch categories
 */
export async function getCategories(): Promise<MappedCategory[]> {
    try {
        const url = new URL(`${WP_API_BASE}/categories`);
        url.searchParams.append('per_page', '100');
        url.searchParams.append('hide_empty', 'true');

        const response = await fetch(url.toString(), {
            next: { revalidate: REVALIDATE_TIME },
        });

        if (!response.ok) {
            return [];
        }

        const categories: WPCategory[] = await response.json();
        return categories.map(mapWPCategory);
    } catch (error) {
        console.error('Error fetching categories from WordPress:', error);
        return [];
    }
}

/**
 * Fetch posts by category slug
 */
export async function getPostsByCategory(
    categorySlug: string,
    page: number = 1,
    perPage: number = 5
): Promise<WPPostsResponse> {
    try {
        // First, get the category ID
        const categoryUrl = new URL(`${WP_API_BASE}/categories`);
        categoryUrl.searchParams.append('slug', categorySlug);

        const categoryResponse = await fetch(categoryUrl.toString(), {
            next: { revalidate: REVALIDATE_TIME },
        });

        if (!categoryResponse.ok) {
            return { posts: [], totalPages: 0, totalCount: 0 };
        }

        const categories: WPCategory[] = await categoryResponse.json();
        if (categories.length === 0) {
            return { posts: [], totalPages: 0, totalCount: 0 };
        }

        const categoryId = categories[0].id;

        // Now fetch posts for that category
        const url = new URL(`${WP_API_BASE}/posts`);
        url.searchParams.append('categories', categoryId.toString());
        url.searchParams.append('_embed', 'true');
        url.searchParams.append('per_page', perPage.toString());
        url.searchParams.append('page', page.toString());
        url.searchParams.append('status', 'publish');

        const response = await fetch(url.toString(), {
            next: { revalidate: REVALIDATE_TIME },
        });

        if (!response.ok) {
            return { posts: [], totalPages: 0, totalCount: 0 };
        }

        const posts: WPPost[] = await response.json();
        const totalCount = parseInt(response.headers.get('x-wp-total') || '0', 10);
        const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '0', 10);

        const mappedPosts = posts
            .map(post => {
                try {
                    return mapWPPost(post);
                } catch (error) {
                    console.error(`Error mapping post ${post.id}:`, error);
                    return null;
                }
            })
            .filter((post): post is MappedPost => post !== null);

        return {
            posts: mappedPosts,
            totalPages,
            totalCount,
        };
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        return { posts: [], totalPages: 0, totalCount: 0 };
    }
}

/**
 * Map WordPress Post to our internal MappedPost format
 */
function mapWPPost(post: WPPost): MappedPost {
    try {
        const featured = post?._embedded?.['wp:featuredmedia']?.[0];
        const authors = post?._embedded?.author || [];
        const author = (Array.isArray(authors) ? authors[0] : undefined) as WPAuthor | undefined;
        const categories = post?._embedded?.['wp:term']?.[0] || [];
        
        const categorySlug = (Array.isArray(categories) ? (categories[0] as WPCategory)?.slug : undefined) || 'general';
        const categoryColor = CATEGORY_COLORS[categorySlug] || CATEGORY_COLORS['default'];

        // Safe content access with multiple fallbacks
        const contentRendered = post?.content?.rendered || '';
        const excerptRendered = post?.excerpt?.rendered || '';
        
        // Calculate read time (rough estimate: 200 words per minute)
        const cleanText = String(contentRendered).replace(/<[^>]*>/g, '').trim();
        const wordCount = cleanText ? cleanText.split(/\s+/).length : 0;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        // Strip HTML from excerpt
        const excerpt = stripHtml(excerptRendered || contentRendered).substring(0, 200) || 'No preview available';
        
        // Safe date parsing with fallback
        let formattedDate = 'Date unknown';
        try {
            if (post?.date) {
                const dateObj = new Date(post.date);
                if (!isNaN(dateObj.getTime())) {
                    formattedDate = dateObj.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                }
            }
        } catch (dateError) {
            console.warn('Error parsing post date:', dateError);
        }

        return {
            id: String(post?.id || Math.random()),
            title: post?.title?.rendered || 'Untitled Post',
            slug: String(post?.slug || 'unknown'),
            excerpt,
            content: String(contentRendered),
            image: featured?.source_url || 'https://via.placeholder.com/400x300?text=No+Image',
            imageAlt: featured?.alt_text || post?.title?.rendered || 'Post Image',
            date: formattedDate,
            author: author?.name || 'Unknown Author',
            authorAvatar: author?.avatar_urls?.['96'] || 'https://via.placeholder.com/96',
            categories: Array.isArray(categories) ? categories.map((cat: any) => cat?.name || 'Uncategorized').filter(Boolean) : [],
            categoryColor,
            readTime: `${readTime} Min Read`,
        };
    } catch (error) {
        console.error('Fatal error in mapWPPost:', error);
        throw error; // Re-throw so getPost can handle it
    }
}

/**
 * Map WordPress Category to our internal MappedCategory format
 */
function mapWPCategory(category: WPCategory): MappedCategory {
    const slug = category.slug.toLowerCase();
    const color = CATEGORY_COLORS[slug] || CATEGORY_COLORS['default'];

    return {
        id: category.id.toString(),
        name: category.name,
        slug: category.slug,
        count: category.count,
        color,
    };
}

/**
 * Search posts by keyword
 */
export async function searchPosts(
    keyword: string,
    page: number = 1,
    perPage: number = 5
): Promise<WPPostsResponse> {
    if (!keyword || keyword.trim().length === 0) {
        return { posts: [], totalPages: 0, totalCount: 0 };
    }

    try {
        const url = new URL(`${WP_API_BASE}/posts`);
        url.searchParams.append('search', keyword);
        url.searchParams.append('_embed', 'true');
        url.searchParams.append('per_page', perPage.toString());
        url.searchParams.append('page', page.toString());
        url.searchParams.append('status', 'publish');

        const response = await fetch(url.toString(), {
            next: { revalidate: REVALIDATE_TIME },
        });

        if (!response.ok) {
            return { posts: [], totalPages: 0, totalCount: 0 };
        }

        const posts: WPPost[] = await response.json();
        const totalCount = parseInt(response.headers.get('x-wp-total') || '0', 10);
        const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '0', 10);

        const mappedPosts = posts
            .map(post => {
                try {
                    return mapWPPost(post);
                } catch (error) {
                    console.error(`Error mapping search result ${post.id}:`, error);
                    return null;
                }
            })
            .filter((post): post is MappedPost => post !== null);

        return {
            posts: mappedPosts,
            totalPages,
            totalCount,
        };
    } catch (error) {
        console.error('Error searching posts from WordPress:', error);
        return { posts: [], totalPages: 0, totalCount: 0 };
    }
}

/**
 * Strip HTML tags from string
 */
export function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .trim();
}
