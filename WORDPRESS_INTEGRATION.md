# WordPress Headless CMS Integration Guide

## Overview

This document explains the WordPress headless CMS integration for your Next.js blog. The blog now fetches content from your WordPress REST API at `https://lavenderblush-camel-117734.hostingersite.com/wp-json/wp/v2`.

## Architecture

### Files Created/Modified

#### 1. **Types** (`src/types/wp.ts`)
Defines TypeScript interfaces for WordPress REST API responses:
- `WPPost` - WordPress post structure
- `WPCategory` - WordPress category structure  
- `WPAuthor` - WordPress author structure
- `WPFeaturedMedia` - Featured image data
- `MappedPost` - Internal mapped format for components
- `MappedCategory` - Internal mapped category format

#### 2. **API Layer** (`src/lib/wp.ts`)
Core WordPress data fetching functions:
- `getPosts(page, perPage)` - Fetch paginated posts with embedded data
- `getPost(slug)` - Fetch single post by slug
- `getAllSlugs()` - Get all post slugs for static generation
- `getCategories()` - Fetch all categories
- `getPostsByCategory(slug, page, perPage)` - Fetch posts by category
- `stripHtml()` - Utility to clean HTML from content

**Key Features:**
- Uses Next.js `next: { revalidate }` for ISR (Incremental Static Regeneration)
- Automatic data mapping to match component requirements
- Error handling with graceful fallbacks
- Pagination support

#### 3. **SEO Helper** (`src/lib/seo.ts`)
Functions for metadata generation:
- `stripHtml()` - Remove HTML tags and decode entities
- `buildMetadataFromPost()` - Generate Next.js Metadata from post data
- `buildBlogListMetadata()` - Generate metadata for blog listing page

#### 4. **Blog Pages**

##### List Page (`src/app/(Blog)/Blog/page.tsx`)
- Server component with async metadata generation
- Uses `buildBlogListMetadata()` for SEO

##### Single Post Page (`src/app/(Blog)/Blog/[slug]/page.tsx`)
- Dynamic route with static generation
- `generateStaticParams()` creates static pages for first 50 posts
- Remaining posts generated on-demand via ISR
- `generateMetadata()` creates post-specific SEO tags
- Returns 404 for non-existent posts

#### 5. **Components Modified**

##### `BlogListSection` (`src/components/Blog/ListView/BlogListSection/index.tsx`)
- Changed from using static local data to fetching from WordPress
- Client component with `useEffect` for data fetching
- Handles pagination via WordPress API
- Shows loading skeleton while fetching
- Converts `MappedPost[]` to `BlogPost[]` format

##### `BlogPostCard` (`src/components/Blog/ListView/BlogPostCard/index.tsx`)
- Updated to handle both static images and URL strings
- Uses native `<img>` for URLs (from WordPress)
- Uses Next.js `Image` component for static assets

##### `PostContent` (`src/components/Blog/SinglePost/PostContent/index.tsx`)
- Now accepts `post` prop of type `MappedPost`
- Displays dynamic post content with fallbacks
- Uses `dangerouslySetInnerHTML` for WordPress HTML content
- Shows author info and tags dynamically

## Data Flow

```
WordPress REST API
       ↓
lib/wp.ts (getPosts/getPost)
       ↓
Data Mapping (MappedPost)
       ↓
Components (BlogListSection/PostContent)
       ↓
UI Rendering
```

## Features Implemented

### ✅ Pagination
- Blog list fetches 5 posts per page (configurable in constants)
- Pagination component handles navigation
- WordPress API headers provide total page count

### ✅ Static Generation
- First 50 posts: Static at build time
- Remaining posts: Generated on-demand (ISR)
- Revalidation every 1 hour

### ✅ Categories Support
- `getPostsByCategory()` fetches posts filtered by category
- Category colors mapped via slug
- Can be extended for category listing pages

### ✅ SEO
- Metadata generation from post data
- Open Graph tags for social sharing
- Twitter Card integration
- Proper HTML encoding

### ✅ Error Handling
- Graceful fallback if WordPress API is down
- Returns empty arrays instead of crashing build
- Shows "No posts found" message

## Category Color Mapping

Colors are mapped by category slug in `lib/wp.ts`:

```typescript
const CATEGORY_COLORS: Record<string, string> = {
    'french': 'pink',
    'language': 'blue',
    'learning': 'green',
    'tutorial': 'rose',
    'tips': 'yellow',
    'default': 'indigo',
};
```

Customize these colors by editing the mapping.

## Configuration

### WordPress API Base URL
Edit `src/lib/wp.ts`:
```typescript
const WP_API_BASE = 'https://lavenderblush-camel-117734.hostingersite.com/wp-json/wp/v2';
```

### Revalidation Time
Edit `src/lib/wp.ts`:
```typescript
const REVALIDATE_TIME = 3600; // 1 hour
```

### Posts Per Page
Edit `src/constants/blog.ts`:
```typescript
export const POSTS_PER_PAGE_LIST = 5;
```

## Features for Future Enhancement

### Already Structured For:
- **Categories Page**: Use `getPostsByCategory()` to create `/blog/category/[slug]/page.tsx`
- **Search**: Filter results client-side from fetched posts
- **Tags**: WordPress returns tags; can be used similarly to categories
- **Author Pages**: `WPAuthor` interface ready for author archives
- **Comments**: WordPress API has comments endpoint

### Pre-built Utils:
- `stripHtml()` - Available in both wp.ts and seo.ts
- Category mapping system
- Read time calculation (200 words/min average)

## Testing the Integration

### Test Blog List
1. Navigate to `/Blog`
2. Should display WordPress posts
3. Refresh to test pagination

### Test Single Post
1. Click on any post from the list
2. URL should be `/Blog/{post-slug}`  
3. Content should render dynamically
4. Check page source for meta tags

### Test Error Handling
Temporarily change the API URL to test error handling:
- Blog list shows "No posts found"
- Single post shows 404 page
- Build doesn't crash

## Production Considerations

- **ISR**: Blog can generate thousands of posts efficiently
- **Revalidation**: Posts update within 1 hour of publishing
- **Bandwidth**: Only fetches `title, content, excerpt, slug, featured_image` + author data
- **Caching**: Uses Next.js fetch caching + revalidate
- **Performance**: Embedded media improves API response efficiency

## Troubleshooting

### Posts Not Showing
1. Verify WordPress domain is accessible
2. Check that posts are published (not draft)
3. Verify REST API is enabled on WordPress
4. Check browser DevTools → Network for API requests

### Images Not Loading  
- WordPress featured images must have `source_url`
- Check WordPress media library settings
- Verify image permissions

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check `npm run build` output for specific errors

## File Structure

```
src/
├── types/
│   └── wp.ts (WordPress types)
├── lib/
│   ├── wp.ts (API functions)
│   └── seo.ts (SEO helpers)
├── app/(Blog)/
│   └── Blog/
│       ├── page.tsx (List page)
│       └── [slug]/
│           └── page.tsx (Single post)
└── components/Blog/
    ├── ListView/
    │   └── BlogListSection/ (Updated for WP)
    │   └── BlogPostCard/ (Updated for WP)
    └── SinglePost/
        └── PostContent/ (Updated for WP)
```

## Summary

Your blog is now fully connected to WordPress! The integration is:
- **Production-ready** with error handling
- **SEO-optimized** with dynamic metadata
- **Performance-focused** with static generation & ISR
- **Extensible** for future features like categories and authors
