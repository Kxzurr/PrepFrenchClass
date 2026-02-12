export async function GET() {
  try {
    const response = await fetch('https://prepfrenchclass.com/blog/wp-json/wp/v2/posts?per_page=10&_embed=true');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    const posts = await response.json();

    const formattedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      category: post.categories?.[0]?.name || 'Blog',
      author: post._embedded?.author?.[0]?.name || 'Prep French Team',
      date: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
      link: post.link,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));

    return Response.json(formattedPosts, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return Response.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
