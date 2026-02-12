import Image from 'next/image';
import processImg1 from '../../../../assets/images/language/lng-process-1.webp';
import processImg2 from '../../../../assets/images/language/lng-process-2.webp';
import helloImg from '../../../../assets/images/language/lng-hello.webp';
import squareImg from '../../../../assets/images/language/lng-square.webp';

export default function LanguageProcessSection() {
    return (
        <section className="bg-primary-500/50 lg:py-24 py-16 rounded-4xl 2xl:mx-20 mx-2 overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-12 gap-6 items-center">

                    {/* LEFT IMAGES */}
                    <div className="col-span-12 xl:col-span-6 md:mx-auto xl:mx-0">
                        <div className="relative">
                            <Image
                                src={processImg1}
                                alt="Student learning French online"
                                className="relative z-10 w-72"
                            />

                            <div className="-mt-100 ms-52 relative z-10 hidden md:block">
                                <Image
                                    src={processImg2}
                                    alt="Interactive French class session"
                                    className="w-80"
                                />
                                <Image
                                    src={helloImg}
                                    alt="Bonjour illustration"
                                    className="absolute -top-8 ltr:left-20 rtl:right-20 w-16"
                                />
                            </div>

                            <div className="absolute bottom-10 ltr:-left-12 rtl:-right-12 opacity-25 animate-floatLR hidden md:block">
                                <Image
                                    src={squareImg}
                                    alt="Decorative shape"
                                    className="w-40 dark:invert"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="col-span-12 xl:col-span-6">
                        <h2 className="lg:text-4xl text-primary-950 dark:text-primary-100 mb-4 leading-snug">
                            Your Step-by-Step Journey to French Fluency
                        </h2>

                        <p className="text-black/60 dark:text-white/60 mb-8 leading-relaxed">
                            At Prep French Classes, we follow a structured and practical
                            approach to help you build confidence from your very first lesson.
                            Whether you're starting as a beginner or preparing for TEF/TCF exams,
                            each stage is designed to deliver steady and measurable progress.
                        </p>

                        {/* STEP 01 */}
                        <div className="flex gap-5 mb-6">
                            <div className="bg-white flex items-center justify-center rounded-full size-14 shadow-md flex-shrink-0">
                                <div className="bg-primary-500 flex items-center justify-center rounded-full size-10">
                                    <h5 className="text-white font-semibold text-sm">01</h5>
                                </div>
                            </div>
                            <div>
                                <h4 className="mb-1 font-semibold text-lg">
                                    Choose Your Level
                                </h4>
                                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                                    Take a quick assessment to determine your level (A1–C1)
                                    and join the right batch for structured growth.
                                </p>
                            </div>
                        </div>

                        {/* STEP 02 */}
                        <div className="flex gap-5 mb-6">
                            <div className="bg-white flex items-center justify-center rounded-full size-14 shadow-md flex-shrink-0">
                                <div className="bg-primary-500 flex items-center justify-center rounded-full size-10">
                                    <h5 className="text-white font-semibold text-sm">02</h5>
                                </div>
                            </div>
                            <div>
                                <h4 className="mb-1 font-semibold text-lg">
                                    Learn with Expert Trainers
                                </h4>
                                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                                    Attend live interactive sessions focused on grammar clarity,
                                    pronunciation improvement, vocabulary building, and
                                    real-life conversation practice.
                                </p>
                            </div>
                        </div>

                        {/* STEP 03 */}
                        <div className="flex gap-5 mb-6">
                            <div className="bg-white flex items-center justify-center rounded-full size-14 shadow-md flex-shrink-0">
                                <div className="bg-primary-500 flex items-center justify-center rounded-full size-10">
                                    <h5 className="text-white font-semibold text-sm">03</h5>
                                </div>
                            </div>
                            <div>
                                <h4 className="mb-1 font-semibold text-lg">
                                    Practice & Strengthen Fluency
                                </h4>
                                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                                    Participate in guided speaking sessions, listening exercises,
                                    structured assignments, and mock tests (for TEF/TCF learners)
                                    to reinforce real confidence.
                                </p>
                            </div>
                        </div>

                        {/* STEP 04 */}
                        <div className="flex gap-5">
                            <div className="bg-white flex items-center justify-center rounded-full size-14 shadow-md flex-shrink-0">
                                <div className="bg-primary-500 flex items-center justify-center rounded-full size-10">
                                    <h5 className="text-white font-semibold text-sm">04</h5>
                                </div>
                            </div>
                            <div>
                                <h4 className="mb-1 font-semibold text-lg">
                                    Achieve Your Goal
                                </h4>
                                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                                    Whether your goal is career growth, academic admission,
                                    exam success, or confident communication — we guide you
                                    until you reach your target.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
