import PageHead from '@/src/common/PageHead';
import TagSection from './TagSection';

export default function PostTag() {
    const breadcrumbs = [
        { label: 'Home Page', href: '/' },
        { label: 'Blog' },
        { label: 'Post Tag' },
    ];

    return (
        <>
            <PageHead title="Post Tag" breadcrumbs={breadcrumbs} />
            <TagSection />
        </>
    );
}

