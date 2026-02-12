'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface StatusItem {
    target: number;
    suffix: string;
    label: string;
    isRating?: boolean;
}

export default function AboutUsStatus() {
    const [counters, setCounters] = useState([0, 0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const statusItems: StatusItem[] = useMemo(
        () => [
            {
                target: 5000,
                suffix: '+',
                label: 'Students Trained',
            },
            {
                target: 25,
                suffix: '+',
                label: 'French Batches Running',
            },
            {
                target: 12,
                suffix: '+',
                label: 'Certified French Trainers',
            },
            {
                target: 4.9,
                suffix: '/5',
                label: 'Student Satisfaction Rating',
                isRating: true,
            },
        ],
        []
    );

    const animateCounters = useCallback(() => {
        statusItems.forEach((item, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = item.target / steps;
            const stepDuration = duration / steps;

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
                        if (item.isRating) {
                            newCounters[index] = Number(current.toFixed(1));
                        } else {
                            newCounters[index] = Math.floor(current);
                        }
                        return newCounters;
                    });
                }
            }, stepDuration);
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

    const formatValue = (value: number, suffix: string, isRating?: boolean) => {
        if (isRating) {
            return `${value.toFixed(1)}${suffix}`;
        }
        if (suffix === '+') {
            if (value >= 1000) {
                return `${(value / 1000).toFixed(0)}K${suffix}`;
            }
            return `${Math.floor(value)}${suffix}`;
        }
        return `${Math.floor(value)}${suffix}`;
    };

    return (
        <section ref={sectionRef} className="py-10 bg-primary-950 text-white">
            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    {statusItems.map((item, index) => (
                        <div key={index} className="col-span-12 lg:col-span-3 md:col-span-6">
                            <div className="text-center">
                                <h2 className="text-6xl mb-2">
                                    {formatValue(counters[index], item.suffix, item.isRating)}
                                </h2>
                                <p className="text-gray-200">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
