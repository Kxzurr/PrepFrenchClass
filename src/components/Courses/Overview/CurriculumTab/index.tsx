'use client';

import { useState } from 'react';
import {
    RiAddLine,
    RiSubtractLine,
    RiPlayCircleLine,
    RiBookOpenLine,
} from '@remixicon/react';

interface CourseLesson {
    id: string;
    title: string;
    duration?: number;
}

interface CurriculumTabProps {
    lessons?: CourseLesson[];
}

// Default lessons for fallback
const defaultLessons: CourseLesson[] = [
    { id: '1', title: 'Welcome to the Course & Learning Journey', duration: 370 },
    { id: '2', title: 'Understanding the Course Structure', duration: 505 },
    { id: '3', title: 'How to Access Materials & Live Sessions', duration: 580 },
    { id: '4', title: 'Introduction to Basic Concepts', duration: 605 },
    { id: '5', title: 'Building Your First Project Step-by-Step', duration: 738 },
];

export default function CurriculumTab({ lessons = defaultLessons }: CurriculumTabProps) {
    const [openModules, setOpenModules] = useState<number[]>([0]);

    // Group lessons into modules (5 lessons per module)
    const modulesPerGroup = 5;
    const modules = [];
    
    for (let i = 0; i < lessons.length; i += modulesPerGroup) {
        const moduleTitle = i === 0 ? 'Course Introduction & Fundamentals' : `Module ${Math.floor(i / modulesPerGroup)}: Advanced Topics`;
        modules.push({
            title: moduleTitle,
            lessons: lessons.slice(i, i + modulesPerGroup),
        });
    }

    const toggleModule = (index: number) => {
        setOpenModules((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const formatDuration = (seconds?: number) => {
        if (!seconds) return 'Duration TBD';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <div className="space-y-4">
            {modules.map((module, index) => {
                const isOpen = openModules.includes(index);
                const IconComponent = isOpen ? RiSubtractLine : RiAddLine;

                return (
                    <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleModule(index)}
                            className="w-full flex justify-between items-center p-4 font-semibold text-gray-800 dark:text-gray-200 hover:bg-primary-500/10 transition-all duration-300"
                        >
                            {module.title}
                            <IconComponent className="w-5 h-5" />
                        </button>
                        {isOpen && (
                            <div className="p-4 text-gray-600 dark:text-dark-400 leading-relaxed">
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <div key={lesson.id} className="flex justify-between items-center p-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                                        <div className="flex items-center gap-3">
                                            <RiPlayCircleLine className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                            <p className="text-sm">{lesson.title}</p>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                                            {formatDuration(lesson.duration)}
                                        </span>
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

