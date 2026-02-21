import Link from 'next/link';
import { getPostsByCategory } from '@/src/lib/wp';
import { MappedPost } from '@/src/types/wp';

interface RelatedPostsProps {
    currentPost: MappedPost;
}

export default async function RelatedPosts({ currentPost }: RelatedPostsProps) {
    if (!currentPost.categories || currentPost.categories.length === 0) {
        return null;
    }

    // Get the first category of the current post
    const category = currentPost.categories[0];

    let relatedPosts: MappedPost[] = [];
    
    try {
        const response = await getPostsByCategory(category.toLowerCase(), 1, 3);
        relatedPosts = response.posts
            .filter(post => post.slug !== currentPost.slug)
            .slice(0, 3);
    } catch (error) {
        console.error('Error fetching related posts:', error);
        return null;
    }

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <div className="mt-12 pt-12 border-t border-black/10 dark:border-white/10">
            <h3 className="text-2xl font-bold text-primary-950 dark:text-primary-100 mb-8">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                    <Link key={post.id} href={`/Blog/${post.slug}`}>
                        <div className="group cursor-pointer">
                            <div className="overflow-hidden rounded-lg mb-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.imageAlt}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="inline-block bg-primary-500/10 text-primary-700 dark:text-primary-300 text-xs px-3 py-1 rounded-lg font-medium">
                                    {post.categories[0] || 'General'}
                                </span>
                                <h4 className="font-semibold text-primary-950 dark:text-primary-100 group-hover:text-primary-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-dark-400">
                                    {post.date} · {post.readTime}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
