import { Metadata } from 'next';
import { buildBlogListMetadata } from '@/src/lib/seo';
import BlogListView from "@/src/components/Blog/ListView";

export async function generateMetadata(
    props: { searchParams: Promise<{ search?: string; category?: string }> }
): Promise<Metadata> {
    const searchParams = await props.searchParams;
    const search = searchParams.search || '';
    const category = searchParams.category || '';

    if (search) {
        return {
            title: `Search Results: "${search}" | Blog`,
            description: `Search results for "${search}" in our blog posts.`,
        };
    }

    if (category) {
        const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
        return {
            title: `${displayCategory} Category | Blog`,
            description: `Browse all blog posts in the ${displayCategory} category.`,
        };
    }

    return buildBlogListMetadata();
}

export default function PostListViewPage() {
    return (
        <>
            <BlogListView />
        </>
    );
}

