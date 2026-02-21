'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiArrowRightUpLine, RiBookOpenLine, RiGlobalLine, RiSchoolLine, RiSparklingFill, RiGraduationCapLine, RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface ApiCategory {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    iconKey?: string | null;
    gradientFrom?: string | null;
    gradientTo?: string | null;
    _count?: { courses: number };
}

function getIcon(iconKey: string | null | undefined, index: number) {
    const key = iconKey || '';

    switch (key) {
        case 'book':
            return <RiBookOpenLine className="size-8" />;
        case 'global':
            return <RiGlobalLine className="size-8" />;
        case 'school':
            return <RiSchoolLine className="size-8" />;
        case 'graduation':
            return <RiGraduationCapLine className="size-8" />;
        case 'sparkling':
            return <RiSparklingFill className="size-8" />;
        default:
            // Fallback based on index for nicer defaults
            const icons = [
                <RiBookOpenLine key="book" className="size-8" />,
                <RiGlobalLine key="global" className="size-8" />,
                <RiSchoolLine key="school" className="size-8" />,
                <RiGraduationCapLine key="grad" className="size-8" />,
                <RiSparklingFill key="spark" className="size-8" />,
            ];
            return icons[index % icons.length];
    }
}

export default function LanguageCategorySection() {
    const [categories, setCategories] = useState<ApiCategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="lg:py-30 py-20 bg-gradient-to-r from-primary-600/60 to-primary-500/50">
            <div className="container">
                {/* Header */}
                <div className="max-w-2xl text-center mx-auto mb-12">
                    <h2 className="md:text-4xl mb-2 leading-snug text-primary-950 dark:text-primary-100">
                        Explore Our French Learning Programs
                    </h2>
                    <p className="text-gray-700 dark:text-dark-300">
                        Choose from specialized programs including TEF Canada (CLB 5 & CLB 7), TCF Canada preparation, A1–B2 level courses, and intensive 1-month exam prep batches. Whether your goal is Canada PR, work permit extension, or structured language progression, our live online programs are designed to deliver measurable results and real confidence in French.
                    </p>
                </div>

                {/* Swiper Carousel */}
                <div dir="ltr" className="swiper categoryswiper">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="mySwiper"
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={index}>
                                <div className="border border-white/20 rounded-2xl p-8 text-center bg-white/30 dark:bg-gray-800/40 backdrop-blur-md hover:shadow-xl">
                                    <div
                                        className={`bg-gradient-to-tr ${category.gradientFrom || 'from-blue-500'} ${category.gradientTo || 'to-blue-600'} text-white rounded-full size-23 flex items-center justify-center mx-auto mb-7 overflow-hidden`}
                                    >
                                        {category.image ? (
                                            <img 
                                                src={category.image} 
                                                alt={category.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            getIcon(category.iconKey, index)
                                        )}
                                    </div>
                                    <h3 className="mb-4">
                                        <Link href={`/courses?category=${category.slug}`} className="hover:text-primary-600 transition-colors">
                                            {category.name}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-700 dark:text-dark-300 mb-5">{category.description}</p>
                                    <Link
                                        href={`/courses?category=${category.slug}`}
                                        className="btn border border-black/60 dark:border-white/60 inline-flex items-center gap-3 rounded-full p-2 ps-7 relative group z-10 overflow-hidden hover:text-white"
                                    >
                                        {(category._count?.courses ?? 0)} Programs
                                        <span className="bg-primary-800 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                            <RiArrowRightUpLine className="text-white text-sm" />
                                        </span>
                                        <span className="absolute inset-0 h-full w-0 bg-primary-800 rounded-full transition-all duration-400 ease-out -z-10 group-hover:w-full"></span>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation */}
                    <div className="relative mt-15 py-3">
                        <div className="absolute top-8 left-0 h-px 2xl:w-[660px] xl:w-[530px] lg:w-[420px] bg-gradient-to-r from-transparent via-black/50 to-black dark:from-transparent dark:via-white/20 dark:to-white/30 hidden lg:block"></div>
                        <div className="absolute top-8 right-0 h-px 2xl:w-[660px] xl:w-[530px] lg:w-[420px] bg-gradient-to-l from-transparent via-black/50 to-black dark:from-transparent dark:via-white/20 dark:to-white/30 hidden lg:block"></div>

                        <div className="flex items-center gap-3 justify-center">
                            <div className="swiper-button-prev-custom cursor-pointer rounded-full border size-12 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-primary-600 hover:text-white hover:border-primary-600 hover:scale-[1.1]">
                                <RiArrowLeftLine className="size-6" />
                            </div>
                            <div className="swiper-button-next-custom cursor-pointer rounded-full border size-12 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-primary-600 hover:text-white hover:border-primary-600 hover:scale-[1.1]">
                                <RiArrowRightLine className="size-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
