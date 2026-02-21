import Link from 'next/link';
import { RiArrowDownSLine } from '@remixicon/react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeadProps {
    title: string;
    breadcrumbs?: BreadcrumbItem[];
    description?: string;
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
    darkGradientFrom?: string;
    darkGradientVia?: string;
    darkGradientTo?: string;
    showChevron?: boolean;
    showBreadcrumbs?: boolean;
    backgroundImage?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
}

export default function PageHead({
    title,
    breadcrumbs = [],
    description,
    gradientFrom = 'from-primary-50',
    gradientVia = 'via-primary-100',
    gradientTo = 'to-primary-200',
    darkGradientFrom = 'dark:from-primary-900',
    darkGradientVia = 'dark:via-primary-800',
    darkGradientTo = 'dark:to-primary-700',
    showChevron = true,
    showBreadcrumbs = false,
    backgroundImage,
    backgroundPosition = 'center',
    backgroundSize = 'cover',
}: PageHeadProps) {
    return (
        <section
            className={`py-20 lg:py-30 bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} ${darkGradientFrom} ${darkGradientVia} ${darkGradientTo} relative overflow-hidden`}
            style={
                backgroundImage
                    ? {
                        backgroundImage: `url('${backgroundImage}')`,
                        backgroundPosition,
                        backgroundSize,
                        backgroundAttachment: 'fixed',
                    }
                    : undefined
            }
        >
            {/* Background Overlay for Image */}
            {backgroundImage && (
                <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-0"></div>
            )}

            

            <div className="container relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    {/* Breadcrumb Navigation */}
                    {showBreadcrumbs && (
                        <div className="flex gap-2 items-center justify-center mb-6 text-gray-200 dark:text-gray-300 flex-wrap">
                            {breadcrumbs.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {index > 0 && <span>/</span>}
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className="text-sm font-medium hover:text-white dark:hover:text-white transition-all duration-300"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <p className="text-sm font-medium">{item.label}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white">
                        {title}
                    </h1>

                    {/* Description */}
                    {description && (
                        <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                            {description}
                        </p>
                    )}

                    {/* Bouncing Chevron Icon */}
                    {showChevron && (
                        <RiArrowDownSLine className="w-8 h-8 mx-auto animate-bounce text-white mt-8" />
                    )}
                </div>
            </div>
        </section>
    );
}

