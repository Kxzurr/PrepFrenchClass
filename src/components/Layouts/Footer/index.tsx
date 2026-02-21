'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RiFacebookFill, RiTwitterXLine, RiLinkedinFill, RiInstagramLine } from '@remixicon/react';
import Button from '../../../common/Button';
import lightLogo from '../../../assets/images/light-logo.png';

interface FooterLink {
    label: string;
    href: string;
}

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [learningLinks, setLearningLinks] = useState<FooterLink[]>([
        { label: 'All French Courses', href: '/courses' },
        { label: 'TEF Canada Preparation', href: '/course-category/tef' },
        { label: 'TCF Canada Preparation', href: '/course-category/tcf' },
        { label: 'Beginner to Advanced Levels', href: '/courses' },
        { label: 'Pricing & Batches', href: '/courses' },
    ]);

    const companyLinks: FooterLink[] = [
        { label: 'About Us', href: '/about-us' },
        { label: 'Blog', href: '/Blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
    ];

    // Fetch courses from backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses?limit=5');
                if (response.ok) {
                    const data = await response.json();
                    const courses = Array.isArray(data.data) ? data.data : data.courses || [];
                    
                    if (courses.length > 0) {
                        const courseLinks = courses
                            .filter((course: Record<string, unknown>) => course?.id && course?.title)
                            .slice(0, 5)
                            .map((course: Record<string, unknown>) => ({
                                label: String(course.title),
                                href: `/course/${course.slug || course.id}`,
                            }));
                        
                        if (courseLinks.length > 0) {
                            setLearningLinks(courseLinks);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching courses for footer:', error);
                // Keep default links if fetch fails
            }
        };

        fetchCourses();
    }, []);

    const socialLinks = [
        { icon: RiFacebookFill, href: '#!' },
        { icon: RiTwitterXLine, href: '#!' },
        { icon: RiLinkedinFill, href: '#!' },
        { icon: RiInstagramLine, href: '#!' },
    ];

    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle newsletter subscription
    };

    return (
        <footer className="relative bg-primary-950 text-white overflow-hidden">
            <div className="pointer-events-none absolute -top-24 right-1/4 size-[28rem] rounded-full bg-primary-500/20 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-[24rem] rounded-full bg-lime-400/10 blur-3xl"></div>

            <div className="container mx-auto">
                <div className="grid grid-cols-12 py-16 gap-y-6 md:py-24 lg:py-28 md:gap-11 xl:gap-6 2xl:gap-10">

                    {/* Logo and Social Links */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                        <Link href="/">
                            <Image
                                src={lightLogo}
                                alt="Prep French Classes Logo"
                                width={140}
                                height={32}
                                className="w-35"
                            />
                        </Link>
                        <p className="text-gray-300 mb-6 mt-7">
                            Prep French Classes offers structured online French programs for beginners,
                            professionals, and TEF/TCF Canada aspirants. Build fluency, confidence,
                            and exam readiness with expert guidance.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        className="bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary-950 transition duration-300 ease-linear size-10 rounded-full"
                                    >
                                        <IconComponent className="text-lg" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                        <h4 className="mb-4">Company</h4>
                        <ul className="space-y-4 text-gray-300">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="relative hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Learning Links */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-2">
                        <h4 className="mb-4">Courses</h4>
                        <ul className="space-y-4 text-gray-300">
                            {learningLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="relative hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-5 md:p-6 lg:p-8">
                            <h4 className="mb-2">Join Our French Learning Community</h4>
                            <p className="text-gray-300 mb-4 break-words text-sm sm:text-base">
                                Get French learning tips, exam updates, and exclusive batch announcements delivered to your inbox.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                                <input
                                    type="email"
                                    className="form-input h-12 bg-transparent border border-white/10 shadow-none focus:outline-none focus:ring-1 focus:ring-primary-500 placeholder-white/60 text-white w-full sm:flex-1 rounded-md px-3"
                                    placeholder="Enter your email"
                                    aria-label="Email"
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full sm:w-auto shrink-0 h-12 rounded-md px-6"
                                >
                                    Subscribe
                                </Button>
                            </form>
                            <p className="text-sm text-gray-300 mt-3">
                                No spam. Only valuable French learning insights.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 py-6">
                    <div className="text-center text-gray-300">
                        <span>
                            &copy; {currentYear} Prep French Classes. All rights reserved.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
