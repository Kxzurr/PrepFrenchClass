'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface StatusItem {
    target: number;
    label: string;
    hasOffset?: boolean;
}

export default function LanguageStatusSection() {
    const [counters, setCounters] = useState([0, 0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const statusItems: StatusItem[] = useMemo(
        () => [
            {
                target: 300,
                label: 'Students Trained for TEF & TCF Canada',
                hasOffset: false,
            },
            {
                target: 92,
                label: 'Students Improved CRS Score',
                hasOffset: true,
            },
            {
                target: 15,
                label: 'Certified French Trainers',
                hasOffset: true,
            },
            {
                target: 5,
                label: 'Years of Canada PR Coaching Experience',
                hasOffset: false,
            },
        ],
        []
    );

    const animateCounters = useCallback(() => {
        statusItems.forEach((item, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = item.target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= item.target) {
                    setCounters((prev) => {
                        const newCounters = [...prev];
                        newCounters[index] = item.target;
                        return newCounters;
                    });
                    clearInterval(timer);
                } else {
                    setCounters((prev) => {
                        const newCounters = [...prev];
                        newCounters[index] = Math.floor(current);
                        return newCounters;
                    });
                }
            }, duration / steps);
        });
    }, [statusItems]);

    useEffect(() => {
        const currentRef = sectionRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        animateCounters();
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasAnimated, animateCounters]);

    return (
        <section ref={sectionRef} className="relative lg:-mt-35 pt-20 lg:pt-0">
            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    {statusItems.map((item, index) => (
                        <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                            <div
                                className={`bg-white dark:bg-black rounded-full p-8 text-center shadow-xl dark:shadow-dark-900/50 size-50 flex items-center flex-col justify-center mx-auto ${
                                    item.hasOffset ? 'lg:mt-15' : ''
                                }`}
                            >
                                <h3 className="text-4xl mb-2 text-primary-700">
                                    {counters[index]}
                                    {index === 1 ? '%' : '+'}
                                </h3>
                                <p className="text-gray-600 dark:text-dark-400">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
