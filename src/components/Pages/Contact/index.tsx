import PageHead from '@/src/common/PageHead';
import ContactSection from './ContactSection';

export default function Contact() {
    const breadcrumbs = [
        { label: 'Home Page', href: '/' },
        { label: 'Pages' },
        { label: 'Contact' },
    ];

    return (
        <>
            <PageHead title="Contact" breadcrumbs={breadcrumbs} />
            <ContactSection />
        </>
    );
}

