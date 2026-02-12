'use client';

import { useState } from 'react';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';

interface FAQItem {
    id?: string;
    question: string;
    answer: string;
}

interface FAQTabProps {
    faqs?: FAQItem[];
}

export default function FAQTab({ faqs }: FAQTabProps) {
    const [openFAQs, setOpenFAQs] = useState<number[]>([]);

    const defaultFaqs: FAQItem[] = [
        {
            question: 'What is included in the course materials?',
            answer: 'The course includes detailed video lessons, downloadable PDFs, assignments, and access to our private learning community for discussions and support.',
        },
        {
            question: 'How long do I have access to the course?',
            answer: "Once you enroll, you'll have lifetime access to all course content, including any future updates or bonus materials added later.",
        },
        {
            question: 'Do I need any prior experience to join this course?',
            answer: "Not at all! The course is designed for all levels — whether you're a complete beginner or looking to enhance your existing skills.",
        },
        {
            question: 'Will I get a certificate after completing the course?',
            answer: "Yes! Upon successful completion of the course and assessments, you'll receive a digital certificate that you can showcase on LinkedIn or your portfolio.",
        },
        {
            question: 'Can I learn at my own pace?',
            answer: 'Absolutely! The course is completely self-paced, so you can watch lessons and complete assignments according to your schedule.',
        },
    ];

    const faqItems = faqs && faqs.length > 0 ? faqs : defaultFaqs;

    const toggleFAQ = (index: number) => {
        setOpenFAQs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
    };

    return (
        <div className="space-y-4">
            {faqItems.map((faq, index) => {
                const isOpen = openFAQs.includes(index);
                const IconComponent = isOpen ? RiSubtractLine : RiAddLine;

                return (
                    <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center p-4 font-semibold text-gray-800 dark:text-gray-200 hover:bg-primary-500/10 transition-all duration-300"
                        >
                            {faq.question}
                            <IconComponent className="w-5 h-5" />
                        </button>
                        {isOpen && (
                            <div className="p-4 text-gray-600 dark:text-dark-400 leading-relaxed">{faq.answer}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

