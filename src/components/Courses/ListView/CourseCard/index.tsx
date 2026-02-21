'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RiBookOpenLine, RiHeartLine, RiHeartFill } from '@remixicon/react';
import { RiStarFill, RiStarHalfFill, RiStarLine } from '@remixicon/react';
import { useState } from 'react';
import { CourseCardProps } from '@/src/types/course';
import { courseColorClasses } from '@/src/data/courseColors';

export default function CourseCard({
    image,
    imageAlt,
    category,
    categoryColor,
    rating,
    reviewCount,
    title,
    titleHref,
    shortDescription,
    lessonsCount,
    originalPrice,
    discountedPrice,
}: CourseCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const colors = courseColorClasses[categoryColor] || courseColorClasses['primary'];

    // Handle both StaticImageData and string image sources
    const imageSource = typeof image === 'string' ? image : (image || '/images/placeholder-course.jpg');

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<RiStarFill key={`full-${i}`} className="size-4 text-amber-400" />);
        }
        if (hasHalfStar) {
            stars.push(<RiStarHalfFill key="half" className="size-4 text-amber-400" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<RiStarLine key={`empty-${i}`} className="size-4 text-amber-400" />);
        }

        return stars;
    };

    return (
        <div className="rounded-xl bg-white dark:bg-dark-950 dark:shadow-dark-800/50 shadow-md border border-black/10 dark:border-white/10 overflow-hidden">
            <div className="grid grid-cols-12">
                {/* Image Column */}
                <div className="col-span-12 md:col-span-4">
                    <div className="relative h-full min-h-[200px] md:min-h-full">
                        <Image
                            src={imageSource}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="flex justify-between items-center p-5 absolute w-full top-0 left-0">
                            <p className={`${colors.badge} p-1 px-3 text-sm rounded-sm text-white`}>
                                {category}
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`bg-white ${colors.border} rounded-full p-2 ${colors.hover} transition duration-300`}
                            >
                                {isFavorite ? (
                                    <RiHeartFill className={`${colors.icon} size-5 hover:scale-110 transition-transform duration-300`} />
                                ) : (
                                    <RiHeartLine className={`${colors.icon} size-5 hover:scale-110 transition-transform duration-300`} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Column */}
                <div className="col-span-12 md:col-span-8">
                    <div className="p-5">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-5">
                            <div className="text-amber-400 flex items-center gap-0.5">
                                {renderStars()}
                            </div>
                            <p className="text-gray-600 dark:text-dark-400">
                                {rating} ({reviewCount} reviews)
                            </p>
                        </div>

                        {/* Title */}
                        <h4>
                            <Link
                                href={titleHref}
                                className={`text-gray-800 dark:text-dark-400 ${colors.titleHover} transition-colors duration-300`}
                            >
                                {title}
                            </Link>
                        </h4>

                        {/* Short Description */}
                        {shortDescription && (
                            <div className="mt-4 border-b border-black/10 dark:border-white/10 pb-4 mb-4">
                                <p className="text-gray-600 dark:text-dark-400 text-sm line-clamp-2">
                                    {shortDescription}
                                </p>
                            </div>
                        )}

                        {/* Sessions and Price */}
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center">
                                <RiBookOpenLine className={`${colors.lessonIcon} w-5 h-5`} />
                                <p className="text-gray-600 dark:text-dark-400">
                                    {lessonsCount} Sessions
                                </p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="text-gray-600 dark:text-dark-400 line-through">
                                    {originalPrice}
                                </p>
                                <p className="font-semibold text-red-600">
                                    {discountedPrice}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
