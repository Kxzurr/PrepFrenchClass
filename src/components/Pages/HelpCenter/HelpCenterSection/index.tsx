'use client';

import Link from 'next/link';
import { RemixiconComponentType } from '@remixicon/react';
import {
    RiRocketLine,
    RiDownloadLine,
    RiCodeSSlashLine,
    RiLockLine,
    RiSettings3Line,
    RiErrorWarningLine,
    RiBox3Line,
    RiQuestionLine,
} from '@remixicon/react';

interface HelpCategory {
    id: string;
    title: string;
    description: string;
    icon: RemixiconComponentType;
    iconColor: string;
    href: string;
}

export default function HelpCenterSection() {
    const categories: HelpCategory[] = [
        {
            id: '1',
            title: 'Getting Started',
            description:
                'Learn the basics of our platform create an account, explore features, and set up your first project quickly.',
            icon: RiRocketLine,
            iconColor: 'text-blue-500',
            href: '#!',
        },
        {
            id: '2',
            title: 'Installation Guide',
            description:
                'Step-by-step instructions to install our tools or SDKs on your local environment or server.',
            icon: RiDownloadLine,
            iconColor: 'text-green-500',
            href: '#!',
        },
        {
            id: '3',
            title: 'API Reference',
            description:
                'Explore detailed API documentation with endpoints, parameters, and response examples for developers.',
            icon: RiCodeSSlashLine,
            iconColor: 'text-purple-500',
            href: '#!',
        },
        {
            id: '4',
            title: 'Authentication',
            description:
                'Learn how to authenticate users, manage tokens, and secure your API connections effectively.',
            icon: RiLockLine,
            iconColor: 'text-red-500',
            href: '#!',
        },
        {
            id: '5',
            title: 'Configuration',
            description:
                'Customize your environment, set API keys, and manage configurations for a smooth workflow.',
            icon: RiSettings3Line,
            iconColor: 'text-orange-500',
            href: '#!',
        },
        {
            id: '6',
            title: 'Error Handling',
            description:
                'Understand common API errors, troubleshooting steps, and how to implement proper error responses.',
            icon: RiErrorWarningLine,
            iconColor: 'text-pink-500',
            href: '#!',
        },
        {
            id: '7',
            title: 'SDK & Libraries',
            description:
                'Integrate our SDKs and client libraries for JavaScript, Python, or other platforms easily.',
            icon: RiBox3Line,
            iconColor: 'text-teal-500',
            href: '#!',
        },
        {
            id: '8',
            title: 'FAQs & Support',
            description:
                'Have a question? Check out our FAQs or get in touch with the support team for assistance.',
            icon: RiQuestionLine,
            iconColor: 'text-yellow-500',
            href: '#!',
        },
    ];

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                <div className="grid grid-cols-12 gap-6 mt-15">
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <div key={category.id} className="col-span-12 lg:col-span-4 xl:col-span-3 md:col-span-6">
                                <div className="rounded-xl border border-black/20 p-6 hover:shadow-lg transition-all dark:border-white/20 h-full">
                                    <IconComponent className={`w-7 h-7 ${category.iconColor} mb-5`} />
                                    <h4>
                                        <Link
                                            href={category.href}
                                            className="text-primary-950 dark:text-primary-100 hover:text-primary-600 transition-colors"
                                        >
                                            {category.title}
                                        </Link>
                                    </h4>
                                    <p className="text-gray-600 dark:text-dark-400 mt-3">{category.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

