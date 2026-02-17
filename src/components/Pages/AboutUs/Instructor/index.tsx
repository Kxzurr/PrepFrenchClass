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
                                Our Story & Mission
                            </h2>

                            <p className="text-gray-600 mb-3 dark:text-white/50">
                                PrepFrench Classes was founded with one clear goal — to make French education affordable, practical, 
                                and accessible for students planning their future in Canada. Our founder was once an international 
                                student who immigrated to Canada eight years ago and understands firsthand the pressure of improving 
                                CRS scores, preparing for language exams, and balancing part-time work while studying.
                            </p>

                            <ul className="list-disc pl-5 text-gray-600 dark:text-white/50 mb-3 space-y-1">
                                <li>
                                    Structured programs focused on <span className="font-semibold text-primary-700">TEF & TCF Canada</span> success
                                </li>
                                <li>
                                    Small batch sizes for <span className="font-semibold text-primary-700">personalized attention</span>
                                </li>
                                <li>English to French and Hindi to French learning support</li>
                                <li>Clear, immigration-focused learning paths aligned with CRS goals</li>
                                <li>Regular practice sessions, mock exams, and performance tracking</li>
                            </ul>

                            <p className="text-gray-600 dark:text-white/50 mb-3">
                                We understand how important every CRS point is in Express Entry and how critical deadlines can be 
                                for PR applications and work permit extensions. That is why our teaching approach is structured, 
                                transparent, and built specifically for students and professionals in Canada.
                            </p>

                            <p className="text-gray-600 dark:text-white/50 mb-8">
                                At PrepFrench Classes, we are not just teaching French. We are supporting real immigration journeys 
                                with clarity, consistency, and honest guidance — no shortcuts, no unrealistic promises, just 
                                practical strategies and steady progress.
                            </p>
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
