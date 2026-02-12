import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightUpLine } from '@remixicon/react';
import lngAdmission from '../../../../assets/images/language/lng-admission.png';
import lngAbout from '../../../../assets/images/language/lng-about.png';
import lngTeacher1 from '../../../../assets/images/language/lng-teacher-1.jpg';
import lngTeacher2 from '../../../../assets/images/language/lng-teacher-2.jpg';
import lngTeacher3 from '../../../../assets/images/language/lng-teacher-3.jpg';
import lngTeacher4 from '../../../../assets/images/language/lng-teacher-4.jpg';

export default function LanguageAboutSection() {
    const teachers = [
        { image: lngTeacher1, alt: 'Certified French Language Trainer' },
        { image: lngTeacher2, alt: 'Experienced TEF Canada Instructor' },
        { image: lngTeacher3, alt: 'French Speaking Coach' },
        { image: lngTeacher4, alt: 'TCF Canada Preparation Expert' },
    ];

    return (
        <section className="relative lg:py-30 py-20">
            <div className="container">
                {/* Header */}
                <div className="grid grid-cols-12 gap-3 items-center mb-12">
                    <div className="col-span-12 lg:col-span-5 xl:col-span-4">
                        <h2 className="md:text-4xl text-primary-950 dark:text-primary-100 leading-snug">
                            About Prep French Classes
                        </h2>
                    </div>
                    <div className="col-span-12 lg:col-span-6 lg:col-end-13 xl:col-span-4 xl:col-end-13">
                        <p className="text-gray-600 dark:text-dark-400">
                            Prep French Classes is dedicated to helping learners build real fluency and confidence in French.
                            With structured programs, expert trainers, and interactive online sessions, we make learning
                            practical, engaging, and results-driven.
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-12 items-center gap-6">
                    {/* Left Column */}
                    <div className="col-span-12 lg:col-span-4">
                        <p className="text-gray-600 dark:text-dark-400 mb-6">
                            Whether you're learning French for career growth, academic opportunities, travel,
                            or preparing for exams like TEF Canada and TCF Canada, our mission is to guide you
                            with clarity, structure, and personalized attention. We focus on strong fundamentals,
                            real conversation practice, and measurable progress at every level.
                        </p>
                        <Link
                            href="#!"
                            className="btn btn-primary inline-flex items-center gap-3 rounded-full p-2 ps-7 relative group z-10 overflow-hidden"
                        >
                            Discover Our Approach
                            <span className="bg-primary-800 size-10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                <RiArrowRightUpLine className="size-5" />
                            </span>
                            <span className="absolute inset-0 h-full w-0 bg-primary-800 rounded-full transition-all duration-400 ease-out -z-10 group-hover:w-full"></span>
                        </Link>
                        <div className="flex items-center gap-3 mt-9">
                            <h3 className="text-4xl">100+</h3>
                            <p className="text-gray-600 dark:text-dark-400">Students Trained in French</p>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-3">
                        {/* Enrollment Card */}
                        <div className="rounded-xl bg-primary-500/10 p-6">
                            <Image
                                src={lngAdmission}
                                alt="French course enrollment"
                                className="dark:invert"
                            />
                            <h4 className="mb-2 mt-4 leading-snug">Open Enrollment</h4>
                            <p className="text-gray-600 dark:text-dark-400">
                                Join our upcoming French batches with flexible schedules for students,
                                working professionals, and PR applicants.
                            </p>
                        </div>

                        {/* Faculty Card */}
                        <div className="rounded-xl bg-primary-500/10 p-6 mt-6">
                            <div className="flex items-center -space-x-3 mb-3">
                                {teachers.map((teacher, index) => (
                                    <Link
                                        key={index}
                                        href="#!"
                                        className="rounded-full overflow-hidden size-12 outline-3 outline-white dark:outline-black"
                                    >
                                        <Image
                                            src={teacher.image}
                                            alt={teacher.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>
                                ))}
                            </div>
                            <h4 className="mb-2 mt-4 leading-snug">Certified French Trainers</h4>
                            <p className="text-gray-600 dark:text-dark-400">
                                Learn from experienced instructors specializing in conversational French,
                                exam preparation, and structured level-based training from A1 to C1.
                            </p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-5">
                        <div className="bg-primary-500/10 p-6 rounded-xl">
                            <div className="mb-4 h-79">
                                <Image
                                    src={lngAbout}
                                    alt="Online French language academy"
                                    className="rounded-xl w-full h-full object-cover"
                                    width={600}
                                    height={316}
                                />
                            </div>
                            <h3 className="mb-2 leading-snug">A Structured & Supportive Learning Environment</h3>
                            <p className="text-gray-600 dark:text-dark-400">
                                Our academy combines modern online learning tools, interactive practice sessions,
                                small batch sizes, and continuous feedback. We help learners not just pass exams,
                                but genuinely communicate with confidence in French.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
