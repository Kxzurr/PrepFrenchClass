import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getAllSlugs, getCategories, getPosts } from '@/src/lib/wp';
import { buildMetadataFromPost } from '@/src/lib/seo';
import PostContent from '@/src/components/Blog/SinglePost/PostContent';
import RelatedPosts from '@/src/components/Blog/SinglePost/RelatedPosts';
import Sidebar from '@/src/components/Blog/ListView/Sidebar';
import { MappedCategory, MappedPost } from '@/src/types/wp';

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    try {
        const { slug } = await params;
        const post = await getPost(slug);

        if (!post) {
            return {
                title: 'Post Not Found',
                description: 'The blog post you are looking for does not exist.',
            };
        }

        return buildMetadataFromPost(post);
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Error',
            description: 'An error occurred while loading the post.',
        };
    }
}

export async function generateStaticParams() {
    try {
        const slugs = await getAllSlugs();
        // Limit to first 50 for ISR, rest will be generated on demand
        return slugs.slice(0, 50).map((slug) => ({
            slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function SinglePostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    let post = null;
    let error = null;
    let sidebarCategories: MappedCategory[] = [];
    let sidebarRecentPosts: MappedPost[] = [];

    try {
        const { slug } = await params;
        post = await getPost(slug);
        
        // Fetch sidebar data in parallel
        if (post) {
            const [categories, postsResponse] = await Promise.all([
                getCategories(),
                getPosts(1, 5),
            ]);
            sidebarCategories = categories;
            sidebarRecentPosts = postsResponse.posts;
        }
    } catch (err) {
        console.error('Error loading post:', err);
        error = err;
    }

    if (error || !post) {
        notFound();
    }

    return (
        <>
            <section className="lg:py-30 py-20">
                <div className="container max-w-[80rem]">
                    <div className="grid grid-cols-12 2xl:gap-15 gap-6">
                        <PostContent post={post} />
                        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto">
                            <Sidebar categories={sidebarCategories} recentPosts={sidebarRecentPosts} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts Section */}
            <section className="lg:py-30 py-20 bg-gray-50 dark:bg-dark-900/50">
                <div className="container max-w-[80rem]">
                    <RelatedPosts currentPost={post} />
                </div>
            </section>
        </>
    );
}

