'use client';

import { useState } from 'react';
import { RiSearchLine } from '@remixicon/react';

interface SearchBannerProps {
    onSearch: (query: string) => void;
}

export default function SearchBanner({ onSearch }: SearchBannerProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <section className="py-40 pb-25 bg-gradient-to-r from-green-50 via-emerald-50 to-lime-100 dark:from-green-900 dark:via-emerald-900 dark:to-lime-900 relative">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center mb-9">
                    <h2 className="text-4xl font-bold text-primary-950 dark:text-primary-100 mb-3 leading-snug">
                        Search Blog Posts
                    </h2>
                    <p className="text-gray-600 dark:text-dark-400">
                        Find articles, tutorials, and insights across all categories.
                    </p>
                </div>
                <div className="max-w-xl mx-auto mb-12">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search posts by title, category, or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border border-gray-300 dark:border-white/20 rounded-full bg-gray-500/10 py-3 ltr:pl-5 ltr:pr-12 rtl:pr-5 rtl:pl-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300"
                        />
                        <button
                            type="submit"
                            className="absolute ltr:right-2 rtl:left-2 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-full transition-all flex items-center gap-2"
                        >
                            <RiSearchLine className="w-4 h-4" />
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

