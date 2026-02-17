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
            title: '98% Class Attendance Rate',
            description:
                'High-engagement live sessions that keep students consistent, motivated, and steadily moving toward their French goals.',
            icon: RiGraduationCapLine,
            href: '#!',
        },
        {
            id: '2',
            title: 'Maximum 6 Students per Batch',
            description:
                'A focused learning environment where every student speaks, participates actively, and receives direct interaction in each class.',
            icon: RiPaletteLine,
            href: '#!',
        },
        {
            id: '3',
            title: 'Dedicated Speaking Practice in Every Session',
            description:
                'Regular conversation drills and pronunciation refinement built into each class to strengthen real communication ability.',
            icon: RiHeadphoneLine,
            href: '#!',
        },
        {
            id: '4',
            title: 'Students Across 10+ Nationalities',
            description:
                'A diverse community of PR applicants, international students, and skilled professionals preparing for opportunities across Canada.',
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
                            Our programs are built around clear score goals, limited class sizes, and focused preparation techniques. With hands-on speaking drills, module-wise exam strategy, and continuous guidance, students gain the accuracy, confidence, and readiness needed to perform strongly in TEF/TCF Canada and advance their Canadian immigration plans.
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
