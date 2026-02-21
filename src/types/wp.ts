/**
 * WordPress REST API Types
 */

export interface WPFeaturedMedia {
    id: number;
    date: string;
    slug: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    description: {
        rendered: string;
    };
    caption: {
        rendered: string;
    };
    alt_text: string;
    media_details?: {
        width: number;
        height: number;
        file: string;
        image_meta: Record<string, unknown>;
        sizes: Record<
            string,
            {
                file: string;
                width: number;
                height: number;
                mime_type: string;
                source_url: string;
            }
        >;
    };
    source_url: string;
}

export interface WPCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
    _links: Record<string, unknown>;
}

export interface WPAuthor {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: Record<string, string>;
}

export interface WPPost {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    excerpt: {
        rendered: string;
        protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    categories: number[];
    tags: number[];
    _embedded?: {
        'wp:featuredmedia'?: WPFeaturedMedia[];
        'wp:term'?: Array<WPCategory[] | WPAuthor[]>;
        author?: WPAuthor[];
    };
}

export interface WPPostsResponse {
    posts: MappedPost[];
    totalPages: number;
    totalCount: number;
}

// Mapped types for component consumption
export interface MappedPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    imageAlt: string;
    date: string;
    author: string;
    authorAvatar: string;
    categories: string[];
    categoryColor: string;
    readTime: string;
}

export interface MappedCategory {
    id: string;
    name: string;
    slug: string;
    count: number;
    color: string;
}
