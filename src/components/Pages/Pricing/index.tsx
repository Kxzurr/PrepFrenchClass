'use client';

import Link from 'next/link';
import { RemixiconComponentType } from '@remixicon/react';
import {
    RiBookOpenLine,
    RiStarLine,
    RiVipCrownLine,
    RiCheckboxCircleLine,
    RiArrowRightLine,
} from '@remixicon/react';
import PageHead from '@/src/common/PageHead';

interface PricingFeature {
    text: string;
}

interface PricingPlan {
    id: string;
    name: string;
    description: string;
    price: string;
    period: string;
    note: string;
    icon: RemixiconComponentType;
    features: PricingFeature[];
    buttonText: string;
    buttonNote: string;
    href: string;
}

export default function Pricing() {
    const breadcrumbs = [
        { label: 'Home Page', href: '/' },
        { label: 'Pages' },
        { label: 'Pricing' },
    ];

    const plans: PricingPlan[] = [
        {
            id: '1',
            name: 'Basic Plan',
            description: 'Ideal for beginners starting their learning journey',
            price: '$29',
            period: '/month',
            note: 'Cancel anytime',
            icon: RiBookOpenLine,
            features: [
                { text: 'Access to basic courses' },
                { text: 'Community support' },
                { text: 'Downloadable notes' },
                { text: 'Limited progress tracking' },
                { text: 'Basic quizzes and assessments' },
            ],
            buttonText: 'Choose Plan',
            buttonNote: 'No credit card required',
            href: '#!',
        },
        {
            id: '2',
            name: 'Pro Learning Plan',
            description: 'Perfect for advanced learners and professionals',
            price: '$79',
            period: '/month',
            note: 'Billed annually or cancel anytime',
            icon: RiStarLine,
            features: [
                { text: 'Unlimited course access' },
                { text: '1-on-1 mentorship sessions' },
                { text: 'Downloadable resources' },
                { text: 'Career guidance and support' },
                { text: 'Official certificate of completion' },
            ],
            buttonText: 'Choose Plan',
            buttonNote: 'Free 14-day trial included',
            href: '#!',
        },
        {
            id: '3',
            name: 'Premium Elite Plan',
            description: 'For organizations and learners aiming for mastery',
            price: '$149',
            period: '/month',
            note: 'Includes exclusive corporate benefits',
            icon: RiVipCrownLine,
            features: [
                { text: 'All Pro Plan features' },
                { text: 'Dedicated success manager' },
                { text: 'Team performance dashboard' },
                { text: 'Custom learning paths' },
                { text: '24/7 premium support' },
            ],
            buttonText: 'Choose Plan',
            buttonNote: 'Custom enterprise pricing available',
            href: '#!',
        },
    ];

    return (
        <>
            <PageHead title="Pricing Plan" breadcrumbs={breadcrumbs} />

            {/* Pricing section */}
            <section className="lg:py-30 py-20">
                <div className="container max-w-[86rem]">
                    <div className="grid grid-cols-12 gap-6">
                        {plans.map((plan) => {
                            const IconComponent = plan.icon;
                            return (
                                <div key={plan.id} className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="relative md:p-10 p-6 ltr:md:rounded-tl-[8rem] ltr:md:rounded-br-[8rem] rtl:md:rounded-tr-[8rem] rtl:md:rounded-bl-[8rem] overflow-hidden border border-black/20 dark:border-white/20 bg-white dark:bg-dark-950 hover:border-primary-600 transition-all duration-300">
                                        <div className="absolute ltr:-right-18 rtl:-left-18 top-1/2 w-34 h-34 border-[8px] border-primary-600 rounded-xl rotate-45 opacity-30"></div>
                                        <div className="absolute -top-16 ltr:-right-16 rtl:-left-16 w-48 h-48 bg-gradient-to-br from-primary-200 via-primary-300 to-primary-400 rounded-full opacity-30 blur-3xl"></div>

                                        <div className="relative z-10">
                                            <div className="size-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6 shadow-inner mx-auto">
                                                <IconComponent className="w-7 h-7 text-primary-600" />
                                            </div>

                                            <div className="text-center">
                                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-1">
                                                    {plan.name}
                                                </h3>
                                                <p className="text-gray-600 dark:text-dark-400 mb-6">{plan.description}</p>
                                                <div className="mb-8">
                                                    <h2 className="text-5xl font-extrabold text-primary-700">
                                                        {plan.price}
                                                        <span className="text-lg font-medium text-gray-600 dark:text-dark-400">
                                                            {plan.period}
                                                        </span>
                                                    </h2>
                                                    <p className="text-gray-500 mt-2">{plan.note}</p>
                                                </div>
                                            </div>

                                            {/* Features List */}
                                            <ul className="space-y-4 mb-10 xl:ms-10">
                                                {plan.features.map((feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center gap-3 text-gray-600 dark:text-dark-400"
                                                    >
                                                        <RiCheckboxCircleLine className="text-primary-600 size-5" />
                                                        {feature.text}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="text-center">
                                                <Link
                                                    href={plan.href}
                                                    className="btn inline-flex gap-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-10 py-3 rounded-full hover:from-primary-700 hover:to-primary-600 transition-all duration-300"
                                                >
                                                    {plan.buttonText}
                                                    <RiArrowRightLine className="w-5 h-5" />
                                                </Link>
                                                <p className="text-gray-500 mt-4">{plan.buttonNote}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

