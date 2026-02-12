import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightSLine } from '@remixicon/react';
import feature1 from '../../../../assets/images/language/lng-features-1.avif';
import feature2 from '../../../../assets/images/language/lng-features-2.webp';
import feature3 from '../../../../assets/images/language/lng-features-3.webp';
import feature4 from '../../../../assets/images/language/lng-features-4.webp';

export default function LanguageWhyChooseSection() {
    return (
        <section className="lg:py-30 py-20 bg-white dark:bg-black">
            <div className="container">
                {/* Header */}
                <div className="grid grid-cols-12 gap-6 items-center mb-16">
                    <div className="col-span-12 lg:col-span-5">
                        <h2 className="md:text-4xl text-primary-950 dark:text-primary-100 leading-snug">
                            Why Choose Prep French Classes
                        </h2>
                        <p className="text-gray-600 dark:text-dark-400 mt-4">
                            We combine structured learning, expert trainers, and personalized guidance
                            to help you build real confidence in French — whether for career growth,
                            academics, or exam preparation.
                        </p>
                    </div>
                    <div className="col-span-12 lg:col-span-7 flex lg:justify-end">
                        <Link
                            href="courses"
                            className="btn btn-primary rounded-full inline-flex items-center gap-2 px-6 py-3"
                        >
                            Explore Our Programs
                            <RiArrowRightSLine className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-12 gap-8">

                    {/* Feature Card */}
                    <div className="col-span-12 xl:col-span-3 md:col-span-6">
                        <div className="rounded-2xl p-7 bg-primary-500/10 hover:shadow-xl transition-all duration-300 h-full">
                            <div className="mb-5 h-56 overflow-hidden rounded-xl">
                                <Image
                                    src={feature1}
                                    alt="Certified French language trainers"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h4 className="mb-3 font-semibold text-lg">
                                Certified & Experienced Trainers
                            </h4>
                            <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                                Learn from qualified instructors experienced in conversational French
                                and structured exam preparation including TEF Canada, TCF Canada,
                                and A1–C1 level programs.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-3 md:col-span-6">
                        <div className="rounded-2xl p-7 bg-primary-500/10 hover:shadow-xl transition-all duration-300 h-full">
                            <div className="mb-5 h-56 overflow-hidden rounded-xl">
                                <Image
                                    src={feature2}
                                    alt="Interactive French learning sessions"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h4 className="mb-3 font-semibold text-lg">
                                Structured & Interactive Lessons
                            </h4>
                            <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                                Clear grammar explanations, pronunciation correction,
                                speaking practice, and real-world communication exercises
                                designed to build confidence step by step.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-3 md:col-span-6">
                        <div className="rounded-2xl p-7 bg-primary-500/10 hover:shadow-xl transition-all duration-300 h-full">
                            <div className="mb-5 h-56 overflow-hidden rounded-xl">
                                <Image
                                    src={feature3}
                                    alt="Online French conversation practice"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h4 className="mb-3 font-semibold text-lg">
                                Small Batches & Personal Attention
                            </h4>
                            <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                                Limited batch sizes ensure direct instructor interaction,
                                continuous feedback, and active participation for faster
                                language improvement.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-3 md:col-span-6">
                        <div className="rounded-2xl p-7 bg-primary-500/10 hover:shadow-xl transition-all duration-300 h-full">
                            <div className="mb-5 h-56 overflow-hidden rounded-xl">
                                <Image
                                    src={feature4}
                                    alt="Flexible online French classes"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h4 className="mb-3 font-semibold text-lg">
                                Flexible Online Scheduling
                            </h4>
                            <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                                Weekday, weekend, and fast-track batches designed for
                                students and working professionals balancing multiple commitments.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
