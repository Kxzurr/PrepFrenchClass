'use client';

import { useState, useEffect } from 'react';
import PageHead from '@/src/common/PageHead';
import Filter from './Filter';
import CourseList from './CourseList';
import { transformApiCourseToUI } from '@/src/lib/courseTransform';
import { COURSES_PER_PAGE_LIST } from '@/src/constants/course';
import { Course } from '@/src/types/course';

interface Category {
  id: string;
  name: string;
}

interface CourseFilter {
  categoryId?: string;
  level?: string;
  search?: string;
}

const courseLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

export default function CourseListView() {
  const breadcrumbs = [
    { label: 'Home Page', href: '/' },
    { label: 'Courses' },
    { label: 'Course List View' },
  ];

  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          const cats = Array.isArray(data?.data) ? data.data : data;
          setCategories(cats);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', '1');
        params.append('limit', '1000'); // Get all courses for client-side filtering

        if (selectedCategories.length > 0) {
          params.append('categoryId', selectedCategories[0]); // API supports single category
        }

        if (selectedLevels.length > 0) {
          params.append('level', selectedLevels[0]); // API supports single level
        }

        const response = await fetch(`/api/courses?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          const rawCourses = Array.isArray(data.data) ? data.data : data.courses || [];
          const transformedCourses = rawCourses.map(transformApiCourseToUI);
          setCourses(transformedCourses);
          setError(null);
        } else {
          throw new Error('Failed to fetch courses');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategories, selectedLevels]);

  // Filter and pagination calculations
  const { totalCourses, totalPages, showingFrom, showingTo, displayedCourses } = (() => {
    const total = courses.length;
    const totalPages = Math.ceil(total / COURSES_PER_PAGE_LIST);
    const showingFrom = (currentPage - 1) * COURSES_PER_PAGE_LIST + 1;
    const showingTo = Math.min(currentPage * COURSES_PER_PAGE_LIST, total);
    const displayed = courses.slice(
      (currentPage - 1) * COURSES_PER_PAGE_LIST,
      currentPage * COURSES_PER_PAGE_LIST
    );

    return {
      totalCourses: total,
      totalPages,
      showingFrom,
      showingTo,
      displayedCourses: displayed,
    };
  })();

  // Filter handlers
  const handleCategoryChange = (value: string) => {
    setCurrentPage(1); // Reset to first page
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [value] // Single selection
    );
  };

  const handleLevelChange = (value: string) => {
    setCurrentPage(1); // Reset to first page
    setSelectedLevels((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [value] // Single selection
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <PageHead title="Course list view" breadcrumbs={breadcrumbs} />

      {/* Course list section */}
      <section className="lg:py-24 py-20">
        <div className="container max-w-[80rem]">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-12 gap-6">
            {/* Filter Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <Filter
                categories={categories.map((cat) => ({
                  id: cat.id,
                  label: cat.name,
                  value: cat.id,
                }))}
                levels={courseLevels}
                selectedCategories={selectedCategories}
                selectedLevels={selectedLevels}
                onCategoryChange={handleCategoryChange}
                onLevelChange={handleLevelChange}
                onClear={handleClearFilters}
              />
            </div>

            {/* Course List */}
            <CourseList
              courses={displayedCourses}
              currentPage={currentPage}
              totalPages={totalPages}
              totalCourses={totalCourses}
              showingFrom={showingFrom}
              showingTo={showingTo}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </div>
        </div>
      </section>
    </>
  );
}

