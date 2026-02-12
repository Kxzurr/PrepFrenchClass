'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightLine } from '@remixicon/react';
import bannerShape1 from '../../../../assets/images/banner-shape-1.webp';
import bannerShape2 from '../../../../assets/images/banner-shape-2.webp';
import bannerShape3 from '../../../../assets/images/banner-shape-3.webp';
import courseAboutBg from '../../../../assets/images/course/course-about-bg.jpg';

export default function AboutUsBanner() {
    return (
        <section className="lg:py-30 py-20 overflow-hidden bg-gradient-to-b from-primary-50 via-white to-transparent dark:bg-gradient-to-b dark:from-primary-950 dark:via-dark-950 dark:to-transparent">
            <div className="container">
                <div className="relative">
                    <Image
                        src={bannerShape2}
                        alt="shape"
                        className="absolute ltr:right-1/3 rtl:left-1/3 top-15 ltr:rotate-[-23deg] rtl:rotate-[23deg] animate-float-up delay-60 hidden md:block dark:invert"
                    />
                    <Image
                        src={bannerShape1}
                        alt="shape"
                        className="absolute ltr:-left-50 rtl:-right-50 rtl:scale-x-[-1] hidden md:block dark:invert"
                    />
                    <Image
                        src={bannerShape3}
                        alt="shape"
                        className="absolute bottom-0 ltr:-right-50 rtl:-left-50 ltr:rotate-[180deg] rtl:rotate-[-180deg] dark:invert"
                    />
                    <div className="max-w-3xl py-20">
                        <p className="text-gray-600 dark:text-dark-400 text-xl mb-4">
                            About Prep French Classes
                        </p>
                        <h2 className="lg:text-5xl text-primary-950 dark:text-primary-100 leading-snug">
                            Helping Students Speak French <br /> with Confidence and Clarity
                        </h2>
                    </div>
                </div>
            </div>
            <div
                className="bg-cover bg-center lg:py-50 py-20"
                style={{
                    backgroundImage: `url(${courseAboutBg.src})`,
                }}
            >
                <div className="container">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 2xl:col-span-4 2xl:col-end-13 md:col-span-7 md:col-end-13 lg:col-span-6 lg:col-end-13">
                            <div className="rounded-xl bg-white dark:bg-dark-950 lg:p-10 p-5 flex flex-col md:flex-row items-center gap-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex-1">
                                    <span className="bg-primary-600 rounded-full text-white p-1 px-3">Our Mission</span>
                                    <p className="text-gray-600 dark:text-dark-400 mb-6 leading-relaxed mt-7">
                                        We empower individuals worldwide to achieve their Canadian immigration dreams through expert French language training. Specializing in TEF, TCF, DELF, and DALF exam preparation, we provide proven strategies that help students score higher and secure their PR faster.
                                    </p>

                                    <Link
                                        href="#!"
                                        className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 group hover:text-primary-600"
                                    >
                                        Learn More About Us
                                        <RiArrowRightLine className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary-600" />
                                    </Link>
                                </div>
                                <div className="shrink-0 text-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900 rounded-full blur-2xl opacity-40"></div>
                                        <h2 className="text-[10rem] font-bold text-primary-600 relative z-10 leading-none">5</h2>
                                    </div>
                                    <p className="text-gray-600 dark:text-dark-400 mt-2">Years Helping Dreams</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

