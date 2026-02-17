import Link from 'next/link';
import { RiArrowRightUpLine } from '@remixicon/react';
import lngBg from '../../../../assets/images/language/cta.jpg';

export default function LanguageCTASection() {
    return (
        <section
            className="lg:py-50 py-20 bg-cover bg-fixed relative text-white"
            style={{
                backgroundImage: `url(${lngBg.src})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute bg-black/40 inset-0 w-full h-full"></div>

            {/* Content */}
            <div className="container relative z-10">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-7 xl:col-span-6">
                        <h2 className="md:text-6xl leading-snug mb-4">
                            Start Your French Journey with Confidence
                        </h2>
                        <p className="mb-7 text-gray-200">
                            oin PrepFrench Classes and elevate your French through guided live sessions, practical conversation drills, and goal-oriented preparation. Whether you are targeting Canada PR, extending your work permit, or advancing academically or professionally, our programs are designed to help you progress efficiently and achieve tangible results.
                        </p>
                        <Link
                            href="contact"
                            className="btn btn-primary inline-flex items-center gap-3 rounded-full p-2 ps-7 relative group z-10 overflow-hidden"
                        >
                            Book a Free Demo Class
                            <span className="bg-primary-800 size-10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                                <RiArrowRightUpLine className="size-5" />
                            </span>
                            <span className="absolute inset-0 h-full w-0 bg-primary-800 rounded-full transition-all duration-400 ease-out -z-10 group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
