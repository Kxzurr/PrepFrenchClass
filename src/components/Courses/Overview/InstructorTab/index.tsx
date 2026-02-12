'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import {
    RiFacebookFill,
    RiTwitterXFill,
    RiInstagramFill,
    RiLinkedinFill,
} from '@remixicon/react';

interface Instructor {
    name: string;
    role: string;
    avatar: StaticImageData | string | undefined;
    avatarAlt: string;
    bio: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
}

interface InstructorTabProps {
    instructors: Instructor[];
}

export default function InstructorTab({ instructors }: InstructorTabProps) {
    return (
        <div>
            {instructors.map((instructor, index) => (
                <div
                    key={index}
                    className={`${index > 0 ? 'border-t border-black/10 dark:border-white/10' : ''} py-8`}
                >
                    <div className="flex items-center gap-5 mb-5">
                        <div className="size-25 relative">
                            <Image
                                src={instructor.avatar || '/images/avatar/default.jpg'}
                                alt={instructor.avatarAlt}
                                fill
                                className="object-cover rounded-full"
                                sizes="100px"
                            />
                        </div>
                        <div>
                            <h5 className="font-semibold text-primary-950 dark:text-primary-100/80">{instructor.name}</h5>
                            <p className="text-gray-600 dark:text-dark-400 text-sm">{instructor.role}</p>
                            <div className="flex items-center gap-2 mt-2">
                                {instructor.socialLinks.facebook && (
                                    <Link
                                        href={instructor.socialLinks.facebook}
                                        className="size-7 flex items-center justify-center border border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                        aria-label="Facebook"
                                    >
                                        <RiFacebookFill className="w-4 h-4" />
                                    </Link>
                                )}
                                {instructor.socialLinks.twitter && (
                                    <Link
                                        href={instructor.socialLinks.twitter}
                                        className="size-7 flex items-center justify-center border border-sky-500 rounded-full text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300"
                                        aria-label="Twitter"
                                    >
                                        <RiTwitterXFill className="w-4 h-4" />
                                    </Link>
                                )}
                                {instructor.socialLinks.instagram && (
                                    <Link
                                        href={instructor.socialLinks.instagram}
                                        className="size-7 flex items-center justify-center border border-red-600 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                                        aria-label="Instagram"
                                    >
                                        <RiInstagramFill className="w-4 h-4" />
                                    </Link>
                                )}
                                {instructor.socialLinks.linkedin && (
                                    <Link
                                        href={instructor.socialLinks.linkedin}
                                        className="size-7 flex items-center justify-center border border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                                        aria-label="LinkedIn"
                                    >
                                        <RiLinkedinFill className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-dark-400">{instructor.bio}</p>
                </div>
            ))}
        </div>
    );
}

