import { Suspense } from 'react';
import BlogListSection from './BlogListSection';

export default function BlogListView() {
    return (
        <>
            <Suspense fallback={<div className="py-20 text-center">Loading blog posts...</div>}>
                <BlogListSection />
            </Suspense>
        </>
    );
}

