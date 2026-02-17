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
                            We deliver immigration-focused French training with small batches, multilingual support (English-to-French & Hindi-to-French), and clear CLB-target strategies. Our approach is practical, transparent, and results-driven built to help you improve faster, score higher in TEF/TCF, and strengthen your Canadian immigration profile with confidence.
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
                                Immigration-Focused French Specialists
                            </h4>
                            <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                                Dedicated TEF & TCF Canada training with clear CLB 5 and CLB 7 score strategies designed specifically for Express Entry and Canadian immigration pathways
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
                               GTA-Based, Canada-Oriented Approach
                            </h4>
                            <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                               Supporting students across Toronto, Mississauga, and the Greater Toronto Area with programs aligned to real Canadian immigration and career goals.

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
                               
                                Performance Tracking & Score Improvement Plans

                            </h4>
                            <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                               Regular mock exams, speaking evaluations, and structured feedback systems to ensure measurable improvement and exam readiness.

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
                                
                                Clear Roadmap from A1 to CLB 7

                            </h4>
                            <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                               Step-by-step progression plans covering foundational grammar, advanced speaking skills, and targeted exam strategies to help you move confidently from beginner levels to immigration-ready proficiency.

                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
