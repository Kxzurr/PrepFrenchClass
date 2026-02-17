import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightUpLine } from '@remixicon/react';
import lngAdmission from '../../../../assets/images/language/lng-admission.png';
import lngAbout from '../../../../assets/images/language/space.jpg';
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
                           PrepFrench Classes specializes in structured French training for Canada immigration and academic goals. With focused TEF Canada, TCF Canada, and A1–B2 level programs, our live online classes combine expert instruction, small batch sizes, and exam-oriented strategies to deliver measurable progress, higher CLB scores, and real confidence in French.
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-12 items-center gap-6">
                    {/* Left Column */}
                    <div className="col-span-12 lg:col-span-4">
                        <p className="text-gray-600 dark:text-dark-400 mb-6">
                           Whether you are learning French for Canada PR, work permit pathways, career advancement, or preparing for TEF Canada and TCF Canada, our mission is to guide you with structured lessons and personalized support. We focus on strong grammar foundations, intensive speaking practice, exam-focused strategies, and measurable CLB improvement at every stage.
                        </p>
                        <Link
                            href="about-us"
                            className="btn btn-primary inline-flex items-center gap-3 rounded-full p-2 ps-7 relative group z-10 overflow-hidden"
                        >
                            Discover Our Approach
                            <span className="bg-primary-800 size-10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                <RiArrowRightUpLine className="size-5" />
                            </span>
                            <span className="absolute inset-0 h-full w-0 bg-primary-800 rounded-full transition-all duration-400 ease-out -z-10 group-hover:w-full"></span>
                        </Link>
                        <div className="flex items-center gap-3 mt-9">
                            <h3 className="text-4xl">350+</h3>
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
                            <h4 className="mb-2 mt-4 leading-snug">Multilingual Learning Batches</h4>
                            <p className="text-gray-600 dark:text-dark-400">
                                Join English-to-French and Hindi-to-French live batches designed for clearer understanding and faster progress. Our structured programs ensure concepts are explained in your preferred support language while building strong, independent fluency in French.
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
                            <h3 className="mb-2 leading-snug">A Structured & Results-Focused Learning Environment</h3>
                            <p className="text-gray-600 dark:text-dark-400">
                               Our live online academy combines interactive practice, real exam simulations, small batches (max 6 students), and continuous performance tracking. We focus not only on helping you clear TEF and TCF exams, but on building confident, practical French communication that delivers measurable results.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
