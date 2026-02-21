'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHead from '@/src/common/PageHead';
import Filter from './Filter';
import CourseList from './CourseList';
import { transformApiCourseToUI } from '@/src/lib/courseTransform';
import { COURSES_PER_PAGE_LIST } from '@/src/constants/course';

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
const levelMap: Record<string, string> = {
  Beginner: 'BEGINNER',
  Intermediate: 'INTERMEDIATE',
  Advanced: 'ADVANCED',
};

export default function CourseListView() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  
  const breadcrumbs = [
    { label: 'Home Page', href: '/' },
    { label: 'Courses' },
    { label: 'Course List View' },
  ];

  // State
  const [rawCourses, setRawCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState('Newest First');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          const cats = Array.isArray(data?.data) ? data.data : data;
          setCategories(cats);
          
          // If URL has category slug, set it as selected
          if (categorySlug && cats.length > 0) {
            const matchedCategory = cats.find((cat: any) => cat.slug === categorySlug);
            if (matchedCategory) {
              setSelectedCategories([matchedCategory.id]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, [categorySlug]);

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
          const apiLevel = levelMap[selectedLevels[0]];
          if (apiLevel) {
            params.append('level', apiLevel); // API supports single level
          }
        }

        const response = await fetch(`/api/courses?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          const rawCourses = Array.isArray(data.data) ? data.data : data.courses || [];
          setRawCourses(rawCourses);
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

  const getCoursePrice = (course: any) =>
    course.pricing?.discountedPrice ?? course.pricing?.originalPrice ?? 0;

  const sortedRawCourses = (() => {
    const list = [...rawCourses];
    switch (selectedSort) {
      case 'Most Popular':
        return list.sort(
          (a, b) => (b._count?.enrollments || 0) - (a._count?.enrollments || 0)
        );
      case 'Top Rated':
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'Price (Low - High)':
        return list.sort((a, b) => getCoursePrice(a) - getCoursePrice(b));
      case 'Price (High - Low)':
        return list.sort((a, b) => getCoursePrice(b) - getCoursePrice(a));
      case 'Newest First':
      default:
        return list.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
    }
  })();

  const courses = sortedRawCourses.map(transformApiCourseToUI);

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
      <PageHead title="French Courses for Canada PR | TEF & TCF Preparation Classes" 
       backgroundImage="/uploads/abstract-blur-restaurant.jpg" />

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
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
            />
          </div>
        </div>
      </section>
    </>
  );
}

