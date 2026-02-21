import PageHead from '@/src/common/PageHead';
import SinglePostSection from './SinglePostSection';

export default function SinglePost() {
    const breadcrumbs = [
        { label: 'Home Page', href: '/' },
        { label: 'Blog' },
        { label: 'Single Post' },
    ];

    return (
        <>
            <PageHead title="Single Post" breadcrumbs={breadcrumbs} />
            <SinglePostSection />
        </>
    );
}

