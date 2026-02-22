'use client';

import { useState } from 'react';
import {
    RiAddLine,
    RiSubtractLine,
    RiCalendar2Line,
} from '@remixicon/react';

interface CourseLesson {
    id: string;
    title: string;
    duration?: string;
    monthNumber?: number;
}

interface CurriculumTabProps {
    lessons?: CourseLesson[];
}

// Default lessons for fallback
const defaultLessons: CourseLesson[] = [
    { id: '1', title: 'Welcome to the Course & Learning Journey', duration: 'Tech', monthNumber: 1 },
    { id: '2', title: 'Understanding the Course Structure', duration: 'Science', monthNumber: 1 },
    { id: '3', title: 'How to Access Materials & Live Sessions', duration: 'Arts', monthNumber: 2 },
    { id: '4', title: 'Introduction to Basic Concepts', duration: 'Module 1', monthNumber: 2 },
    { id: '5', title: 'Building Your First Project Step-by-Step', duration: 'Advanced', monthNumber: 3 },
];

export default function CurriculumTab({ lessons = defaultLessons }: CurriculumTabProps) {
    const [openMonths, setOpenMonths] = useState<number[]>([1]);

    // Group lessons by month number
    const lessonsByMonth = new Map<number | string, CourseLesson[]>();
    
    lessons.forEach((lesson) => {
        const month = lesson.monthNumber ?? 'TBD';
        if (!lessonsByMonth.has(month)) {
            lessonsByMonth.set(month, []);
        }
        lessonsByMonth.get(month)!.push(lesson);
    });

    // Sort months
    const sortedMonths = Array.from(lessonsByMonth.keys()).sort((a, b) => {
        if (a === 'TBD') return 1;
        if (b === 'TBD') return -1;
        return Number(a) - Number(b);
    });

    const toggleMonth = (month: number | string) => {
        const monthNum = typeof month === 'number' ? month : -1;
        setOpenMonths((prev) =>
            prev.includes(monthNum) ? prev.filter((m) => m !== monthNum) : [...prev, monthNum]
        );
    };

    return (
        <div className="space-y-4">
            {sortedMonths.map((month) => {
                const monthLessons = lessonsByMonth.get(month) || [];
                const monthNum = typeof month === 'number' ? month : -1;
                const isOpen = openMonths.includes(monthNum);
                const IconComponent = isOpen ? RiSubtractLine : RiAddLine;
                const monthTitle = month === 'TBD' ? 'Month To Be Determined' : `Month ${month}`;

                return (
                    <div
                        key={month}
                        className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleMonth(month)}
                            className="w-full flex justify-between items-center p-4 font-semibold text-gray-800 dark:text-gray-200 hover:bg-primary-500/10 transition-all duration-300"
                        >
                            <div className="flex items-center gap-2">
                                <RiCalendar2Line className="w-5 h-5 text-primary-500" />
                                <span>{monthTitle}</span>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    ({monthLessons.length} {monthLessons.length === 1 ? 'lesson' : 'lessons'})
                                </span>
                            </div>
                            <IconComponent className="w-5 h-5" />
                        </button>
                        {isOpen && (
                            <div className="p-4 text-gray-600 dark:text-dark-400 leading-relaxed">
                                {monthLessons.map((lesson, index) => (
                                    <div key={lesson.id} className="flex justify-between items-center p-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center text-sm font-semibold">
                                                {index + 1}
                                            </span>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{lesson.title}</p>
                                        </div>
                                        {lesson.duration && (
                                            <span className="text-xs text-primary-600 dark:text-primary-400 whitespace-nowrap ml-4">
                                                {lesson.duration}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

