import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { RiLinkedinFill, RiTwitterXLine, RiFacebookFill, RiInstagramLine } from '@remixicon/react';
import lngTeacher1 from '../../../../assets/images/language/lng-teacher-1.jpg';
import lngTeacher2 from '../../../../assets/images/language/lng-teacher-2.jpg';
import lngTeacher3 from '../../../../assets/images/language/lng-teacher-3.jpg';
import lngTeacher4 from '../../../../assets/images/language/lng-teacher-4.jpg';

interface SocialLink {
    icon: React.ReactNode;
    href: string;
}

interface FacultyMember {
    image: StaticImageData;
    name: string;
    title: string;
    alt: string;
    socialLinks: SocialLink[];
}

export default function LanguageFacultySection() {
    const facultyMembers: FacultyMember[] = [
        {
            image: lngTeacher1,
            name: 'Anjali Sharma',
            title: 'Senior French Trainer (A1–C1 Levels)',
            alt: 'Anjali Sharma, Senior French Language Trainer',
            socialLinks: [
                { icon: <RiLinkedinFill className="size-5" />, href: '#!' },
                { icon: <RiTwitterXLine className="size-5" />, href: '#!' },
                { icon: <RiFacebookFill className="size-5" />, href: '#!' },
                { icon: <RiInstagramLine className="size-5" />, href: '#!' },
            ],
        },
        {
            image: lngTeacher2,
            name: 'Rahul Mehta',
            title: 'TEF Canada Preparation Specialist',
            alt: 'Rahul Mehta, TEF Canada French Instructor',
            socialLinks: [
                { icon: <RiLinkedinFill className="size-5" />, href: '#!' },
                { icon: <RiTwitterXLine className="size-5" />, href: '#!' },
                { icon: <RiFacebookFill className="size-5" />, href: '#!' },
                { icon: <RiInstagramLine className="size-5" />, href: '#!' },
            ],
        },
        {
            image: lngTeacher3,
            name: 'Priya Kapoor',
            title: 'TCF Canada & Speaking Coach',
            alt: 'Priya Kapoor, TCF Canada Speaking Coach',
            socialLinks: [
                { icon: <RiLinkedinFill className="size-5" />, href: '#!' },
                { icon: <RiTwitterXLine className="size-5" />, href: '#!' },
                { icon: <RiFacebookFill className="size-5" />, href: '#!' },
                { icon: <RiInstagramLine className="size-5" />, href: '#!' },
            ],
        },
        {
            image: lngTeacher4,
            name: 'Ritwik Singh',
            title: 'French Pronunciation & Fluency Mentor',
            alt: 'Ritwik Singh, French Fluency Mentor',
            socialLinks: [
                { icon: <RiLinkedinFill className="size-5" />, href: '#!' },
                { icon: <RiTwitterXLine className="size-5" />, href: '#!' },
                { icon: <RiFacebookFill className="size-5" />, href: '#!' },
                { icon: <RiInstagramLine className="size-5" />, href: '#!' },
            ],
        },
    ];

    return (
        <section className="lg:py-30 py-20 bg-gradient-to-r from-primary-600/60 to-primary-500/50">
            <div className="container">
                {/* Header */}
                <div className="max-w-2xl text-center mx-auto mb-12">
                    <h2 className="md:text-4xl mb-2 leading-snug text-primary-950 dark:text-primary-100">
                        Meet Our French Language Experts
                    </h2>
                    <p className="text-gray-700 dark:text-dark-300">
                        Our experienced French instructors specialize in structured level-based learning,
                        TEF Canada preparation, TCF Canada coaching, and real-world fluency development.
                    </p>
                </div>

                {/* Faculty Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {facultyMembers.map((member, index) => (
                        <div key={index} className="col-span-12 lg:col-span-3 md:col-span-6">
                            <div className="rounded-xl overflow-hidden h-90 relative group">
                                <Image
                                    src={member.image}
                                    alt={member.alt}
                                    className="w-full h-full object-cover"
                                    width={400}
                                    height={360}
                                />
                                {/* Social Media Links - Appear on Hover */}
                                <div className="flex items-center justify-center gap-4 bg-white dark:bg-black rounded-xl p-3 px-5 absolute left-0 right-0 mx-auto w-max group-hover:opacity-100 group-hover:-translate-y-18 opacity-0 transition-all duration-300">
                                    {member.socialLinks.map((social, socialIndex) => (
                                        <Link
                                            key={socialIndex}
                                            href={social.href}
                                            className="hover:text-primary-600 transition-all duration-300"
                                        >
                                            {social.icon}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <h3>
                                    <Link href="#!" className="hover:text-primary-600 transition-colors">
                                        {member.name}
                                    </Link>
                                </h3>
                                <p className="text-gray-600 dark:text-dark-300">{member.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
