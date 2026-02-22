'use client';

import { useState } from 'react';
import { RiArrowDownSLine } from '@remixicon/react';
import CourseCard from '../CourseCard';
import Pagination from '../../../../common/Pagination';
import { CourseListProps } from '@/src/types/course';
import { sortOptions } from '@/src/data/courseFilters';

interface CourseListWithLoadingProps extends CourseListProps {
  loading?: boolean;
  selectedSort: string;
  onSortChange: (option: string) => void;
}

export default function CourseList({
  courses,
  currentPage,
  totalPages,
  totalCourses,
  showingFrom,
  showingTo,
  onPageChange,
  loading = false,
  selectedSort,
  onSortChange,
}: CourseListWithLoadingProps) {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const handleSortSelect = (option: string) => {
    onSortChange(option);
    setSortDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl bg-white dark:bg-dark-950 dark:shadow-dark-800/50 shadow-md border border-black/10 dark:border-white/10 overflow-hidden"
          >
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-4">
                <div className="h-full min-h-[200px] bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
              <div className="col-span-12 md:col-span-8">
                <div className="p-5 space-y-3">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
        <div className="text-center py-12 bg-gray-50 dark:bg-dark-900 rounded-lg">
          <p className="text-gray-600 dark:text-dark-400">No courses found matching your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
      {/* Header with Results Count and Sort */}
      <div className="flex justify-between items-center gap-2 mb-3 flex-wrap">
        <p className="text-gray-700 dark:text-dark-400">
          Showing <span className="font-semibold">{showingFrom}–{showingTo}</span> of{' '}
          <span className="font-semibold">{totalCourses}</span> Courses
        </p>

        <div className="relative dropdown group">
          <button
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="flex items-center gap-2 border border-black/10 dark:border-white/10 p-3 rounded-lg bg-white dark:bg-dark-950"
          >
            <span className="font-medium text-primary-950 dark:text-primary-100/80">
              Sort Courses by
            </span>
            <RiArrowDownSLine
              className={`text-sm transition-transform ${
                sortDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`dropdown-menu absolute top-full left-0 w-full bg-white dark:bg-dark-950 rounded-xl shadow-lg dark:shadow-dark-800/50 border border-black/10 dark:border-white/10 mt-2 z-50 transition-all duration-300 ${
              sortDropdownOpen
                ? 'opacity-100 visible'
                : 'opacity-0 invisible'
            }`}
          >
            <ul className="py-3 **:transition **:duration-300 **:ease-linear **:block text-15">
              {sortOptions.map((option: string) => (
                <li key={option}>
                  <button
                    onClick={() => handleSortSelect(option)}
                    className={`w-full text-left px-5 py-2 text-primary-950 dark:text-primary-100/80 hover:text-primary-600 transition ${
                      selectedSort === option ? 'text-primary-600' : ''
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="flex flex-col gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

