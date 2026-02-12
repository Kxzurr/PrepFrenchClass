'use client';

import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page
            pages.push(1);

            // Show ellipsis if current page is far from start
            if (currentPage > 3) {
                pages.push('ellipsis-start');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }

            // Show ellipsis if current page is far from end
            if (currentPage < totalPages - 2) {
                pages.push('ellipsis-end');
            }

            // Show last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center mt-15 gap-2 text-sm font-medium flex-wrap">
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-800 rounded-md hover:bg-primary-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <RiArrowLeftLine className="w-4 h-4" />
                <span>Previous</span>
            </button>

            {/* Page Numbers */}
            {renderPageNumbers().map((page, index) => {
                if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                    return (
                        <span key={`ellipsis-${index}`} className="px-2">
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        className={`px-3 py-1.5 border border-gray-300 dark:border-gray-800 rounded-md hover:bg-primary-500 hover:text-white transition ${
                            currentPage === page
                                ? 'bg-primary-500 text-white'
                                : ''
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-800 rounded-md hover:bg-primary-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>Next</span>
                <RiArrowRightLine className="w-4 h-4" />
            </button>
        </div>
    );
}

