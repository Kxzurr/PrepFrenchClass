'use client';

import Image from 'next/image';
import lngTeacher1 from '../../../../assets/images/language/lng-teacher-1.jpg';

export default function AboutUsInstructor() {
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


                    {/* Right Column - Single Image */}
                    <div className="col-span-12 lg:col-span-6 xl:col-span-5 xl:col-end-13">
                        <div className="relative h-75">
                            <Image
                                src={lngTeacher1}
                                alt="PrepFrench instructor"
                                className="w-full h-full object-cover rounded-xl"
                                fill
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
