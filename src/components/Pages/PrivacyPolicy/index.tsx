import PageHead from '@/src/common/PageHead';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export default function PrivacyPolicy() {
    const breadcrumbs = [
        { label: 'Home Page', href: '/' },
        { label: 'Pages' },
        { label: 'Privacy Policy' },
    ];

    return (
        <>
            <PageHead title="Privacy Policy" breadcrumbs={breadcrumbs} />
            <PrivacyPolicyContent />
        </>
    );
}

