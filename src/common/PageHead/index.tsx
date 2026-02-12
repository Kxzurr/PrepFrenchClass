import Image from 'next/image';
import Link from 'next/link';
import { RiArrowDownSLine } from '@remixicon/react';
import bannerShape1 from '../../assets/images/banner-shape-1.webp';
import bannerShape2 from '../../assets/images/banner-shape-2.webp';
import bannerShape3 from '../../assets/images/banner-shape-3.webp';
import bannerShape4 from '../../assets/images/banner-shape-4.png';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeadProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
    darkGradientFrom?: string;
    darkGradientVia?: string;
    darkGradientTo?: string;
    showChevron?: boolean;
}

export default function PageHead({
    title,
    breadcrumbs,
    gradientFrom = 'from-primary-50',
    gradientVia = 'via-primary-100',
    gradientTo = 'to-primary-200',
    darkGradientFrom = 'dark:from-primary-900',
    darkGradientVia = 'dark:via-primary-800',
    darkGradientTo = 'dark:to-primary-700',
    showChevron = true,

}: PageHeadProps) {
    return (
        <section
            className={`py-40 pb-25 bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} ${darkGradientFrom} ${darkGradientVia} ${darkGradientTo} relative`}
        >
            

            <div className="container">
                <div className="text-center">
                    {/* Title */}
                    <h2 className="md:text-6xl mb-5 leading-snug text-primary-950 dark:text-primary-100">
                        {title}
                    </h2>

                    {/* Breadcrumb Navigation 
                    <div className="flex gap-2 items-center justify-center mb-8 text-gray-600 dark:text-dark-400 flex-wrap">
                        {breadcrumbs.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {index > 0 && <span>/</span>}
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="text-md hover:text-primary-600 transition-all duration-300"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <p className="text-md">{item.label}</p>
                                )}
                            </div>
                        ))}
                    </div>*/}

                    {/* Bouncing Chevron Icon */}
                    {showChevron && (
                        <RiArrowDownSLine className="w-9 h-9 mx-auto animate-bounce text-primary-950 dark:text-primary-100" />
                    )}
                </div>
            </div>
        </section>
    );
}

