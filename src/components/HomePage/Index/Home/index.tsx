import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightUpLine } from '@remixicon/react';
import lngHomeGirl from '../../../../assets/images/language/lng-home-girl.png';
import lngHomeMan from '../../../../assets/images/language/lng-home-man.png';
import lngHandwriting from '../../../../assets/images/language/lng-handwriting.png';

export default function LanguageHomeSection() {
    return (
        <section className="lg:py-40 py-20 relative bg-primary-500/10 lg:[clip-path:ellipse(75%_100%_at_50%_0%)]">
{/* Decorative Circle */}

            <div className="container">
                <div className="grid grid-cols-12 2xl:gap-10 gap-6">
                    {/* Left Column - Girl Image */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="-mt-30 hidden lg:block">
                            <Image
                                src={lngHomeGirl}
                                alt="student preparing for TEF Canada exam"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Center Column - Main Content */}
                    <div className="col-span-12 lg:col-span-6">
                        <div className="text-center">
                            <span className="border rounded-full p-1 px-3 inline-flex items-center gap-2 mb-7">
                                <Image
                                    src={lngHandwriting}
                                    alt="French learning icon"
                                />
                                French for Canada PR & Immigration
                            </span>

                            <h1 className="xl:text-6xl md:text-6xl lg:text-4xl text-primary-700 mb-6 leading-snug">
                                Learn French for Canada PR – TEF & TCF Expert Online Classes
                            </h1>

                            <p className="text-gray-600 dark:text-dark-400 mb-9">
                                Boost your CRS score and strengthen your Express Entry profile with structured French training 
                                designed specifically for TEF Canada and TCF Canada exams. Prep French Classes offers expert-led 
                                online coaching, real exam simulations, speaking practice, pronunciation correction, and 
                                personalized guidance to help you achieve Canada Permanent Residency faster and confidently.
                            </p>

                            <Link
                                href="#!"
                                className="btn btn-primary inline-flex items-center gap-3 rounded-full p-2 ps-7 relative group z-10 overflow-hidden"
                            >
                                Book Free TEF/TCF Demo Class
                                <span className="bg-primary-800 size-10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                    <RiArrowRightUpLine className="size-5" />
                                </span>
                                <span className="absolute inset-0 h-full w-0 bg-primary-800 rounded-full transition-all duration-400 ease-out -z-10 group-hover:w-full"></span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Man Image */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="mt-30 hidden lg:block">
                            <Image
                                src={lngHomeMan}
                                alt="student attending online French class for Canada PR"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
