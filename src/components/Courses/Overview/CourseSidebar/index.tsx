'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import {
    RiPlayFill,
    RiCloseLine,
    RiBankCardLine,
    RiTimeLine,
    RiVideoLine,
    RiStackLine,
    RiGlobalLine,
    RiCalendarLine,
} from '@remixicon/react';

interface CourseSidebarProps {
    previewImage: StaticImageData | string;
    previewImageAlt: string;
    videoUrl: string;
    price: string;
    originalPrice: string;
    duration: string;
    lessons: string;
    level: string;
    language: string;
    hindiBatchDate?: string;
    englishBatchDate?: string;
    includesItems?: string[];
}

export default function CourseSidebar({
    previewImage,
    previewImageAlt,
    videoUrl,
    price,
    originalPrice,
    duration,
    lessons,
    level,
    language,
    hindiBatchDate,
    englishBatchDate,
    includesItems,
}: CourseSidebarProps) {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    useEffect(() => {
        if (isVideoModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVideoModalOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsVideoModalOpen(false);
            }
        };

        if (isVideoModalOpen) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isVideoModalOpen]);

    return (
        <>
            <div className="sticky top-21 bg-white dark:bg-dark-950 p-4 rounded-xl shadow-md dark:shadow-dark-800/50">
                <div className="relative">
                    <Image
                        src={previewImage}
                        alt={previewImageAlt}
                        className="rounded-xl w-full h-auto"
                        width={400}
                        height={250}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={() => setIsVideoModalOpen(true)}
                            className="bg-white/80 hover:bg-white text-primary-600 rounded-full p-4 transition shadow-lg"
                            aria-label="Play video"
                        >
                            <RiPlayFill className="w-7 h-7" />
                        </button>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex items-end gap-2 mb-4">
                        <h3>{price}</h3>
                        <p className="text-gray-600 dark:text-dark-400 line-through">{originalPrice}</p>
                    </div>

                    <Link
                        href="/contact"
                        className="btn btn-primary rounded-lg w-full flex items-center justify-center gap-2"
                    >
                        <RiBankCardLine className="w-5 h-5" />
                        Inquiry Now
                    </Link>

                    <h5 className="mb-4 mt-5">This course includes:</h5>

                    {[
                        { icon: RiTimeLine, label: 'Duration:', value: duration },
                        { icon: RiVideoLine, label: 'Lessons:', value: lessons },
                        { icon: RiStackLine, label: 'Level:', value: level },
                        { icon: RiGlobalLine, label: 'Language:', value: language },
                    ].map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                className="border-b border-black/10 dark:border-white/10 py-5 flex items-center justify-between gap-2 last:border-0"
                            >
                                <div className="flex items-center gap-2">
                                    <IconComponent className="text-primary-500 w-5 h-5" />
                                    <p className="text-gray-600 dark:text-dark-400">{item.label}</p>
                                </div>
                                <p className="text-gray-600 dark:text-dark-400">{item.value}</p>
                            </div>
                        );
                    })}

                    {/* Batch Dates */}
                    {(hindiBatchDate || englishBatchDate) && (
                        <div className="border-t border-black/10 dark:border-white/10 pt-4 mt-4">
                            <h6 className="font-medium mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                                <RiCalendarLine className="text-primary-500 w-5 h-5" />
                                Next Batches:
                            </h6>
                            {hindiBatchDate && (
                                <div className="mb-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Hindi to French Batch</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{hindiBatchDate}</p>
                                </div>
                            )}
                            {englishBatchDate && (
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">English to French Batch</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{englishBatchDate}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Additional Includes from Backend */}
                    {includesItems && includesItems.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                            <h6 className="font-medium mb-3 text-gray-900 dark:text-white">Also Included:</h6>
                            <ul className="space-y-2">
                                {includesItems.map((item, index) => (
                                    <li key={index} className="text-gray-600 dark:text-dark-400 text-sm flex items-start gap-2">
                                        <span className="text-primary-500 mt-1">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-xl overflow-hidden relative w-[90%] max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsVideoModalOpen(false)}
                            className="absolute top-3 right-3 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 z-10"
                            aria-label="Close video"
                        >
                            <RiCloseLine className="w-5 h-5" />
                        </button>
                        <div className="aspect-video">
                            <iframe
                                src={videoUrl}
                                className="w-full h-full"
                                title="Course Preview"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

