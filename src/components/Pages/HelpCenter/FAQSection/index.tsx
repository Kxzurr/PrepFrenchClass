'use client';

import { useState } from 'react';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';

interface FAQ {
    question: string;
    answer: string;
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FAQ[] = [
        {
            question: 'How can I contact customer support?',
            answer:
                'You can reach our support team through the "Contact Us" form on the Help Center page or by emailing <strong>support@example.com</strong>. Our team typically responds within 24 hours.',
        },
        {
            question: 'How do I reset my password?',
            answer:
                'To reset your password, click on the "Forgot Password?" link on the login page. You\'ll receive an email with a secure link to set a new password.',
        },
        {
            question: 'How can I update my profile information?',
            answer:
                'Go to your account dashboard and click on <strong>Settings → Profile</strong>. From there, you can update your name, email address, and other personal details.',
        },
        {
            question: "What should I do if I don't receive account verification email?",
            answer:
                'First, check your spam or junk mail folder. If the email isn\'t there, request a new one from the login page or contact our support team to verify your account manually.',
        },
        {
            question: 'How can I track my support requests?',
            answer:
                'All your open and past support tickets can be viewed from the <strong>My Requests</strong> section in your account dashboard. You\'ll also receive email updates for each request.',
        },
        {
            question: 'Can I delete or deactivate my account?',
            answer:
                'Yes, you can request to delete or temporarily deactivate your account through the <strong>Account Settings</strong> page. Please note that deletion is permanent and cannot be undone.',
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="lg:pb-30 pb-20">
            <div className="container">
                <div className="max-w-2xl text-center mx-auto mb-12">
                    <h2 className="lg:text-4xl mb-4 text-primary-950 dark:text-primary-100 leading-snug">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 dark:text-dark-400">
                        Find answers to common questions about your account, billing, and support options.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="accordion-btn w-full flex justify-between items-center p-4 font-semibold hover:bg-primary-500/10 dark:text-gray-300 transition-all duration-300"
                            >
                                <span className="text-left">{faq.question}</span>
                                {openIndex === index ? (
                                    <RiSubtractLine className="icon w-5 h-5 flex-shrink-0" />
                                ) : (
                                    <RiAddLine className="icon w-5 h-5 flex-shrink-0" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="accordion-content p-4 text-gray-600 dark:text-dark-400 leading-relaxed">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: faq.answer.replace(
                                                /<strong>(.*?)<\/strong>/g,
                                                '<strong class="font-semibold text-gray-800 dark:text-gray-200">$1</strong>'
                                            ),
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

