'use client';

import Image, { StaticImageData } from 'next/image';
import linkedin from '../../../../assets/images/brands/linkedin.png';
import github from '../../../../assets/images/brands/github.png';
import discord from '../../../../assets/images/brands/discord.png';
import gitlab from '../../../../assets/images/brands/gitlab.png';
import zoom from '../../../../assets/images/brands/zoom.png';
import figma from '../../../../assets/images/brands/figma.png';

interface BrandItem {
    name: string;
    image: StaticImageData;
    alt: string;
}

export default function AboutUsBrand() {
    const brands: BrandItem[] = [
        {
            name: 'LinkedIn',
            image: linkedin,
            alt: 'Brand 1',
        },
        {
            name: 'GitHub',
            image: github,
            alt: 'Brand 2',
        },
        {
            name: 'Discord',
            image: discord,
            alt: 'Brand 3',
        },
        {
            name: 'GitLab',
            image: gitlab,
            alt: 'Brand 4',
        },
        {
            name: 'Zoom',
            image: zoom,
            alt: 'Brand 5',
        },
        {
            name: 'Figma',
            image: figma,
            alt: 'Brand 6',
        },
    ];

    return (
        <section className="lg:pb-30 pb-20">
            <div className="container">
                <div className="max-w-2xl text-center mx-auto mb-12">
                    <h2 className="lg:text-4xl text-primary-950 dark:text-primary-100">
                        Trusted by 1000+ Students
                    </h2>
                </div>
                <div className="grid grid-cols-12 gap-6 items-center justify-items-center">
                    {brands.map((brand, index) => (
                        <div key={index} className="col-span-6 md:col-span-4 lg:col-span-2">
                            <Image
                                src={brand.image}
                                alt={brand.alt}
                                className="h-10 w-auto object-contain transition duration-400 ease-linear grayscale hover:grayscale-0 opacity-30 hover:opacity-100 dark:invert-100"
                                width={120}
                                height={40}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

