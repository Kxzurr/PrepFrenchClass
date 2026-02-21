import PageHead from '@/src/common/PageHead';
import ContactSection from './ContactSection';

export default function Contact() {


    return (
        <>
            <PageHead 
                title="Get in Touch" 
                description="We're here to help! Contact us to learn more about our French courses, TEF Canada, and TCF Canada preparation programs. Book your free live demo class today."
                backgroundImage="/uploads/contact.jpg"
            />
            <ContactSection />
        </>
    );
}

