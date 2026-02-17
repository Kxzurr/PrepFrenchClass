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
            role: 'Student at Humber College',
            rating: 5,
            testimonial: 'I joined the 6-month TCF Canada (CLB 5) batch because I needed points for my work permit extension. Honestly, I was very nervous about speaking. The regular speaking practice helped a lot. I didn’t score perfect, but I reached my target CLB and that’s what mattered for my PR profile.',
            rotation: 'md:ltr:rotate-[10deg] md:rtl:rotate-[-10deg]',
            alt: 'Photo of Priya Sharma, French student',
        },
        {
            avatar: user03,
            name: 'Rahul Desai',
            role: 'Part-time at Subway, Mississauga',
            rating: 5,
            testimonial: 'I started A1 with almost zero French. Grammar was confusing in the beginning but the Hindi-to-French explanations made it much easier. Now I can introduce myself and manage small conversations. Small batches really helped because sir corrected everyone properly',
            rotation: 'md:ltr:rotate-[-5deg] md:rtl:rotate-[5deg]',
            alt: 'Photo of Jason Miller, TEF Canada student',
        },
        {
            avatar: user02,
            name: 'Li Wei',
            role: 'International Student',
            rating: 4.5,
            testimonial: 'I enrolled in B1 after completing A2 elsewhere. Here the grammar explanations are clearer and more practical. We practice real situations, not just textbook examples. I still make mistakes sometimes but I feel more comfortable speaking now.',
            rotation: 'md:ltr:rotate-[10deg] md:rtl:rotate-[-10deg]',
            alt: 'Photo of Ananya Patel, online French learner',
        },
        {
            avatar: user04,
            name: 'Sofia Rossi',
            role: 'Marketing Professional',
            rating: 5,
            testimonial: 'As someone working full time, I needed serious but structured training. The 6-month TEF batch kept me consistent. The teachers push you but in a good way. My speaking fluency improved a lot and I finally feel ready to apply for PR.',
            rotation: 'md:ltr:rotate-[-5deg] md:rtl:rotate-[5deg]',
            alt: 'Photo of Robert Chen, TCF Canada student',
        },
        {
            avatar: user06,
            name: 'Ahmed Hassan',
            role: 'IT Professional',
            rating: 5,
            testimonial: 'The TCF Canada coaching was structured and organized. Every module had clear strategy. Listening was my weak area but after weekly practice tests I gained confidence. I achieved CLB 7 overall which helped my immigration profile.',
            rotation: 'md:ltr:rotate-[-5deg] md:rtl:rotate-[5deg]',
            alt: 'Photo of Fatima Khan, French language student',
        },
        {
            avatar: user05,
            name: 'Maria González',
            role: 'Hospitality Worker',
            rating: 4.5,
            testimonial: 'I joined the A2 course to improve my communication at work. Classes are interactive and friendly. I like that we actually speak in class, not just read from slides. My pronunciation is much better now, even my manager noticed.',
            rotation: 'md:ltr:rotate-[10deg] md:rtl:rotate-[-10deg]',
            alt: 'Photo of Arjun Verma, Express Entry French student',
        },
        {
            avatar: user07,
            name: 'Karan Singh',
            role: 'Express Entry Applicant, Toronto',
            rating: 5,
            testimonial: 'I had already studied French before but needed focused exam strategy. The 1-month TEF prep batch was straight to the point. They don’t waste time. Lots of exam tips and timed practice. Helped me improve my writing score especially.',
            rotation: 'md:ltr:rotate-[-5deg] md:rtl:rotate-[5deg]',
            alt: 'Photo of Sophia Laurent, advanced French learner',
        },
        {
            avatar: user08,
            name: 'Anjali Mehta',
            role: 'Student at Algoma University',
            rating: 5,
            testimonial: 'The 9-month TEF Canada (CLB 7) program was intense but worth it. The mock speaking sessions were very close to real exam style. I improved from basic level to CLB 7 in speaking and listening. It definitely boosted my CRS score.',
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
                        Discover how learners have improved their CLB scores, performed confidently in TEF and TCF Canada exams, and strengthened their Express Entry profiles through our focused, immigration-oriented French programs.
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
