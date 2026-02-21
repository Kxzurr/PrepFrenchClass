import PageHead from '@/src/common/PageHead';
import CategorySection from './CategorySection';

export default function BlogCategory() {
    const breadcrumbs = [
        { label: 'Home Page', href: '/' },
        { label: 'Blog' },
        { label: 'Post Category' },
    ];

    return (
        <>
            <PageHead title="Post Category" breadcrumbs={breadcrumbs} />
            <CategorySection />
        </>
    );
}

