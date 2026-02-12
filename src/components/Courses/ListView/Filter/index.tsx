'use client';

import { RiCloseCircleLine } from '@remixicon/react';

interface FilterOption {
    label: string;
    value: string;
    id?: string;
}

interface FilterProps {
    categories: FilterOption[];
    levels: string[];
    selectedCategories: string[];
    selectedLevels: string[];
    onCategoryChange: (value: string) => void;
    onLevelChange: (value: string) => void;
    onClear: () => void;
}

export default function Filter({
    categories,
    levels,
    selectedCategories,
    selectedLevels,
    onCategoryChange,
    onLevelChange,
    onClear,
}: FilterProps) {
    return (
        <div className="bg-white dark:bg-dark-950 rounded-xl shadow-md dark:shadow-dark-800/50 p-5 border border-black/10 dark:border-white/10 sticky top-21">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-semibold dark:text-dark-400 text-gray-800">Filter</h3>
                <button
                    onClick={onClear}
                    className="text-sm text-gray-600 dark:text-dark-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                    <RiCloseCircleLine className="w-4 h-4" />
                    Clear
                </button>
            </div>

            {/* Category */}
            {categories.length > 0 && (
                <div className="border-t border-gray-100 dark:border-gray-900 pt-4 mb-5">
                    <p className="text-sm font-semibold text-gray-600 dark:text-dark-400 uppercase mb-3">
                        Course Category
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        {categories.map((category) => (
                            <li key={category.id || category.value}>
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.id || category.value)}
                                        onChange={() => onCategoryChange(category.id || category.value)}
                                        className="w-4 h-4 accent-primary-600 rounded checked:bg-primary-500 checked:border-primary-500 focus:ring-transparent"
                                    />
                                    {category.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Level */}
            {levels.length > 0 && (
                <div className="border-t border-gray-100 dark:border-gray-900 pt-4">
                    <p className="text-sm font-semibold text-gray-600 dark:text-dark-400 uppercase mb-3">Level</p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        {levels.map((level) => (
                            <li key={level}>
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={selectedLevels.includes(level)}
                                        onChange={() => onLevelChange(level)}
                                        className="w-4 h-4 accent-primary-600 rounded checked:bg-primary-500 checked:border-primary-500 focus:ring-transparent"
                                    />
                                    {level}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


