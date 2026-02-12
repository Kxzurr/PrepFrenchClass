'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { RiUserLine } from '@remixicon/react';
import lngTeacher1 from '../../../../assets/images/language/lng-teacher-1.jpg';
import lngTeacher2 from '../../../../assets/images/language/lng-teacher-2.jpg';
import lngTeacher3 from '../../../../assets/images/language/lng-teacher-3.jpg';
import lngTeacher4 from '../../../../assets/images/language/lng-teacher-4.jpg';

interface Instructor {
    id: string;
    name: string;
    role: string;
    image: StaticImageData;
    imageAlt: string;
    href: string;
}

export default function AboutUsInstructor() {
    const instructors: Instructor[] = [
        {
            id: '1',
            name: 'Claire Dubois',
            role: 'Senior French Language Trainer (DELF/DALF Specialist)',
            image: lngTeacher3,
            imageAlt: 'Claire Dubois - Senior French Language Trainer',
            href: '#!',
        },
        {
            id: '2',
            name: 'Arjun Mehta',
            role: 'TEF & TCF Canada Preparation Expert',
            image: lngTeacher4,
            imageAlt: 'Arjun Mehta - TEF & TCF Canada Expert',
            href: '#!',
        },
        {
            id: '3',
            name: 'Sophie Laurent',
            role: 'French Conversation & Pronunciation Coach',
            image: lngTeacher2,
            imageAlt: 'Sophie Laurent - French Conversation Coach',
            href: '#!',
        },
        {
            id: '4',
            name: 'Rohan Desai',
            role: 'French Grammar & Writing Specialist',
            image: lngTeacher1,
            imageAlt: 'Rohan Desai - French Grammar Specialist',
            href: '#!',
        },
    ];

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                <div className="grid grid-cols-12 gap-6 items-center">
                    {/* Left Column - Content */}
                    <div className="col-span-12 lg:col-span-6">
                        <h2 className="lg:text-4xl text-primary-950 dark:text-primary-100 mb-6 leading-snug">
                            Meet Our French Language Experts
                        </h2>
                        <p className="text-gray-600 mb-3 dark:text-white/50">
                            Our trainers are experienced French language professionals dedicated to helping students
                            achieve fluency and exam success. With structured teaching methods and real-world exposure,
                            they guide learners from beginner to advanced levels with clarity and confidence.
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white/50 mb-3 space-y-1">
                            <li>
                                Certified instructors specializing in <span className="font-semibold text-primary-700">TEF & TCF Canada</span>
                            </li>
                            <li>
                                Average of <span className="font-semibold text-primary-700">7+ years</span> of French teaching experience
                            </li>
                            <li>Personalized speaking corrections and detailed writing feedback</li>
                            <li>Regular mock tests and performance tracking for measurable improvement</li>
                        </ul>
                        <p className="text-gray-600 dark:text-white/50 mb-3">
                            Our mentors focus on building strong grammar foundations, accurate pronunciation,
                            and practical communication skills. Each session is interactive and results-driven,
                            ensuring students gain real confidence in speaking and understanding French.
                        </p>
                        <p className="text-gray-600 dark:text-white/50 mb-8">
                            Whether your goal is exam preparation, career growth, or personal development,
                            our instructors are committed to supporting your journey with consistency,
                            structure, and encouragement at every step.
                        </p>
                        <Link href="#!" className="btn btn-primary inline-flex items-center gap-1">
                            <RiUserLine className="size-5" />
                            Meet the Trainers
                        </Link>
                    </div>

                    {/* Right Column - Instructor Cards */}
                    <div className="col-span-12 lg:col-span-6 xl:col-span-5 xl:col-end-13">
                        <div className="grid grid-cols-12 gap-6">
                            {instructors.map((instructor) => (
                                <div key={instructor.id} className="col-span-12 md:col-span-6">
                                    <div className="relative h-75">
                                        <Image
                                            src={instructor.image}
                                            alt={instructor.imageAlt}
                                            className="w-full h-full object-cover rounded-xl"
                                            fill
                                        />
                                        <div className="absolute bottom-5 left-0 right-0 w-4/5 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg shadow-md mx-auto p-4 text-center">
                                            <Link
                                                href={instructor.href}
                                                className="font-semibold text-xl text-primary-950 dark:text-primary-100/80"
                                            >
                                                {instructor.name}
                                            </Link>
                                            <p className="text-gray-600 dark:text-dark-400 mt-1 text-sm">
                                                {instructor.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
