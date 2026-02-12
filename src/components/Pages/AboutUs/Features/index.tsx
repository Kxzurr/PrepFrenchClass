'use client';

import Link from 'next/link';
import {
    RiGraduationCapLine,
    RiPaletteLine,
    RiHeadphoneLine,
    RiTimeLine,
    RemixiconComponentType,
} from '@remixicon/react';

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: RemixiconComponentType;
    href: string;
}

export default function AboutUsFeatures() {
    const features: Feature[] = [
        {
            id: '1',
            title: 'Certified French Trainers',
            description:
                'Learn from experienced and certified French instructors who specialize in TEF, TCF Canada, and structured language progression from A1 to C2.',
            icon: RiGraduationCapLine,
            href: '#!',
        },
        {
            id: '2',
            title: 'Structured Learning Method',
            description:
                'Our step-by-step curriculum focuses on grammar clarity, vocabulary building, pronunciation improvement, and real-life conversation practice.',
            icon: RiPaletteLine,
            href: '#!',
        },
        {
            id: '3',
            title: 'Personalized Guidance',
            description:
                'Receive individual feedback, speaking corrections, mock tests, and performance tracking to ensure measurable progress at every stage.',
            icon: RiHeadphoneLine,
            href: '#!',
        },
        {
            id: '4',
            title: 'Flexible Online Batches',
            description:
                'Choose from weekday, weekend, and intensive batches designed for working professionals, students, and exam aspirants.',
            icon: RiTimeLine,
            href: '#!',
        },
    ];

    return (
        <section className="lg:pb-30 pb-20">
            <div className="container">
                <div className="grid grid-cols-12 gap-6 mb-19 items-center">
                    <div className="col-span-12 lg:col-span-6">
                        <h2 className="lg:text-4xl text-primary-950 dark:text-primary-100 leading-snug">
                            Why Students Choose <br /> Prep French Classes
                        </h2>
                    </div>
                    <div className="col-span-12 lg:col-span-4 lg:col-end-13">
                        <p className="text-gray-600 dark:text-dark-400">
                            We combine structured methodology, expert instruction, and consistent practice
                            to help learners build strong French communication skills and exam confidence.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-5">
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <div key={feature.id} className="col-span-12 lg:col-span-3 md:col-span-6">
                                <div className="relative bg-primary-100 dark:bg-primary-900 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 mt-10 lg:mt-0">
                                    <div className="rotate-45 w-17 h-17 bg-primary-100 dark:bg-primary-900 rounded-md flex items-center justify-center mx-auto -mt-15 outline outline-white outline-7 dark:outline-dark-950">
                                        <IconComponent className="-rotate-45 w-6 h-6 text-primary-600" />
                                    </div>

                                    <div className="relative z-10 text-center mt-10">
                                        <h4 className="text-primary-950 dark:text-primary-100">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-700 dark:text-dark-400 leading-relaxed mt-2">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
