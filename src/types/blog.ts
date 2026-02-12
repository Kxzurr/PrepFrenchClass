import { StaticImageData } from 'next/image';
import { RemixiconComponentType } from '@remixicon/react';

// Main Blog Post Type
export interface BlogPost {
    id: string;
    image: StaticImageData;
    imageAlt: string;
    category: string;
    categoryColor: string;
    title: string;
    titleHref: string;
    description: string;
    authorName: string;
    authorAvatar: StaticImageData;
    authorAvatarAlt: string;
    authorRole: string;
    readTime: string;
}

// Sidebar Types
export interface BlogCategory {
    name: string;
    count: number;
    href: string;
    hoverColor: string;
}

export interface RecentPost {
    category: string;
    categoryBg: string;
    categoryText: string;
    title: string;
    href: string;
    date: string;
    readTime: string;
}

// HomePage Blog Post Variations
export interface MusicBlogPost {
    image: StaticImageData;
    title: string;
    date: string;
    author: string;
    alt: string;
    imageHref: string;
}

export interface LanguageBlogPost {
    image: StaticImageData;
    badge: string;
    category: string;
    title: string;
    description?: string;
    location?: string;
    alt: string;
    imageHref: string;
}

export interface CampusBlogPost {
    image: StaticImageData;
    category: string;
    author: string;
    date: string;
    title: string;
    description?: string;
    isLarge?: boolean;
}

// Post Category Type
export interface PostCategory {
    id: string;
    name: string;
    postCount: number;
    icon: RemixiconComponentType;
    color: {
        bg: string;
        text: string;
        hoverBorder: string;
        hoverText: string;
        darkBg: string;
        darkText: string;
        darkHoverBorder: string;
    };
    href: string;
}

// Post Tag Hover Color Type
export interface TagHoverColor {
    border: string;
    text: string;
    bg: string;
}

// Post Tag Type
export interface PostTag {
    name: string;
    href: string;
    hoverColor: TagHoverColor;
}

// Tag Group Type
export interface TagGroup {
    letter: string;
    tags: PostTag[];
}

// Author Type
export interface Author {
    id: string;
    name: string;
    role: string;
    avatar: StaticImageData;
    avatarAlt: string;
    bio: string;
    stats: {
        publishedPosts: number;
        followers: string;
        yearsOfBlogging: number;
        awardsWon: number;
    };
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
}

