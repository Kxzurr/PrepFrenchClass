'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { RiStarFill, RiStarHalfFill } from '@remixicon/react';
import user01 from '../../../../assets/images/avatar/user-01.jpg';
import user02 from '../../../../assets/images/avatar/user-02.jpg';
import user03 from '../../../../assets/images/avatar/user-03.jpg';
import user04 from '../../../../assets/images/avatar/user-04.jpg';
import user05 from '../../../../assets/images/avatar/user-05.jpg';
import user06 from '../../../../assets/images/avatar/user-06.jpg';
import user07 from '../../../../assets/images/avatar/user-07.jpg';
import user08 from '../../../../assets/images/avatar/user-08.jpg';

interface TestimonialItem {
    avatar: StaticImageData;
    name: string;
    role: string;
    rating: number;
    testimonial: string;
    rotation: string;
    alt: string;
}

export default function LanguageTestimonialSection() {
    const testimonials: TestimonialItem[] = [
        {
            avatar: user01,
            name: 'Priya Sharma',
            role: 'Beginner French Student',
            rating: 5,
            testimonial: 'I started with zero knowledge of French, and within a few months I was confidently forming sentences and speaking in class. The structured approach made everything easy to understand.',
            rotation: 'md:ltr:rotate-[10deg] md:rtl:rotate-[-10deg]',
            alt: 'Photo of Priya Sharma, French student',
        },
        {
            avatar: user03,
            name: 'Jason Miller',
            role: 'TEF Canada Candidate',
            rating: 5,
            testimonial: 'The TEF Canada preparation was incredibly detailed. The mock tests and speaking corrections helped me improve my confidence and performance significantly.',
            rotation: 'md:ltr:rotate-[-5deg] md:rtl:rotate-[5deg]',
            alt: 'Photo of Jason Miller, TEF Canada student',
        },
        {
            avatar: user02,
            name: 'Ananya Patel',
            role: 'Working Professional',
            rating: 4.5,
            testimonial: 'As a full-time professional, I needed flexible online French classes. The trainers were supportive and made learning practical and manageable with my schedule.',
            rotation: 'md:ltr:rotate-[10deg] md:rtl:rotate-[-10deg]',
            alt: 'Photo of Ananya Patel, online French learner',
        },
        {
            avatar: user04,
            name: 'Robert Chen',
            role: 'TCF Canada Student',
            rating: 5,
            testimonial: 'The TCF Canada coaching focused on every module carefully. The speaking practice sessions were especially helpful for improving fluency and pronunciation.',
            rotation: 'md:ltr:rotate-[-5deg] md:rtl:rotate-[5deg]',
            alt: 'Photo of Robert Chen, TCF Canada student',
        },
        {
            avatar: user06,
            name: 'Fatima Khan',
            role: 'Intermediate French Learner',
            rating: 5,
            testimonial: 'I loved how interactive the classes were. We practiced real-life conversations, and I could see noticeable improvement in my listening and speaking skills.',
            rotation: 'md:ltr:rotate-[-5deg] md:rtl:rotate-[5deg]',
            alt: 'Photo of Fatima Khan, French language student',
        },
        {
            avatar: user05,
            name: 'Arjun Verma',
            role: 'Express Entry Applicant',
            rating: 4.5,
            testimonial: 'Learning French here helped me strengthen my Express Entry profile. The guidance was structured and goal-oriented without feeling overwhelming.',
            rotation: 'md:ltr:rotate-[10deg] md:rtl:rotate-[-10deg]',
            alt: 'Photo of Arjun Verma, Express Entry French student',
        },
        {
            avatar: user07,
            name: 'Sophia Laurent',
            role: 'Advanced French Student',
            rating: 5,
            testimonial: 'The advanced sessions helped refine my grammar and pronunciation. I feel much more confident communicating in professional settings now.',
            rotation: 'md:ltr:rotate-[-5deg] md:rtl:rotate-[5deg]',
            alt: 'Photo of Sophia Laurent, advanced French learner',
        },
        {
            avatar: user08,
            name: 'David Thompson',
            role: 'Online French Learner',
            rating: 5,
            testimonial: 'The online format is smooth and well-organized. The small batch size allowed for personal attention, which made a huge difference in my progress.',
            rotation: 'md:ltr:rotate-[10deg] md:rtl:rotate-[-10deg]',
            alt: 'Photo of David Thompson, online French class student',
        },
    ];

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<RiStarFill key={i} className="text-amber-300" />);
        }

        if (hasHalfStar) {
            stars.push(<RiStarHalfFill key="half" className="text-amber-300" />);
        }

        return stars;
    };

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                {/* Header */}
                <div className="max-w-2xl text-center mx-auto mb-15">
                    <h2 className="md:text-4xl text-primary-950 dark:text-primary-100 mb-2 leading-snug">
                        What Our French Students Say
                    </h2>
                    <p className="text-gray-600 dark:text-dark-400">
                        Hear from learners who have improved their French fluency, strengthened exam performance,
                        and gained confidence in real-world communication through our structured programs.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-12 gap-3">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div
                                className={`bg-white dark:bg-black shadow-xl rounded-xl border border-black/30 dark:border-white/30 p-6 ${testimonial.rotation} hover:rotate-0 transition-transform duration-500 h-full`}
                            >
                                <div className="flex gap-2 items-center mb-4">
                                    <div className="size-12 rounded-full overflow-hidden">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.alt}
                                            className="w-full h-full object-cover"
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                    <div>
                                        <h5>
                                            <Link href="#!" className="hover:text-primary-600 transition-colors">
                                                {testimonial.name}
                                            </Link>
                                        </h5>
                                        <p className="text-gray-600 dark:text-dark-400">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-3 text-amber-300">
                                    {renderStars(testimonial.rating)}
                                </div>
                                <p className="text-gray-600 dark:text-dark-400">{testimonial.testimonial}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
