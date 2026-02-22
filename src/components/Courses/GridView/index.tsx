'use client';

import { useState, useEffect, useRef } from 'react';
import PageHead from '@/src/common/PageHead';
import Filter from '../ListView/Filter';
import { transformApiCourseToUI } from '@/src/lib/courseTransform';
import { COURSES_PER_PAGE_LIST } from '@/src/constants/course';
import { Course } from '@/src/types/course';
import Pagination from '@/src/common/Pagination';
import Image from 'next/image';
import Link from 'next/link';
import { RiStarFill, RiStarHalfFill, RiStarLine, RiHeartLine, RiHeartFill } from '@remixicon/react';

interface Category {
  id: string;
  name: string;
}

const courseLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
const levelMap: Record<string, string> = {
  Beginner: 'BEGINNER',
  Intermediate: 'INTERMEDIATE',
  Advanced: 'ADVANCED',
};

export default function CourseGridView() {
  const breadcrumbs = [
    { label: 'Home Page', href: '/' },
    { label: 'Courses' },
    { label: 'Course Grid View' },
  ];

  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const inFlightRef = useRef(false);
  const cacheRef = useRef(
    new Map<
      string,
      { data: Course[]; totalCourses: number; totalPages: number; timestamp: number }
    >()
  );
  const CACHE_TTL_MS = 5 * 1000; // 5 second cache to ensure course order updates appear quickly

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch courses
  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const fetchCourses = async () => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append('page', String(currentPage));
        params.append('limit', String(COURSES_PER_PAGE_LIST * 3));
        // Don't specify sortBy to use the default ordering (displayOrder)

        if (selectedCategories.length > 0) {
          params.append('categoryId', selectedCategories[0]);
        }

        if (selectedLevels.length > 0) {
          const apiLevel = levelMap[selectedLevels[0]];
          if (apiLevel) {
            params.append('level', apiLevel);
          }
        }

        const cacheKey = params.toString();
        const cached = cacheRef.current.get(cacheKey);
        const now = Date.now();

        if (cached && now - cached.timestamp < CACHE_TTL_MS) {
          if (isActive) {
            setCourses(cached.data);
            setTotalCourses(cached.totalCourses);
            setTotalPages(cached.totalPages);
            setError(null);
            setLoading(false);
          }
          inFlightRef.current = false;
          return;
        }

        const response = await fetch(`/api/courses?${params.toString()}`, {
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        const rawCourses = Array.isArray(data.data) ? data.data : data.courses || [];
        const transformedCourses = rawCourses.map(transformApiCourseToUI);
        const pagination = data.pagination || {};
        const nextTotal = pagination.totalCourses || transformedCourses.length;
        const nextTotalPages = pagination.totalPages || 1;

        cacheRef.current.set(cacheKey, {
          data: transformedCourses,
          totalCourses: nextTotal,
          totalPages: nextTotalPages,
          timestamp: now,
        });

        if (isActive) {
          setCourses(transformedCourses);
          setTotalCourses(nextTotal);
          setTotalPages(nextTotalPages);
          setError(null);
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        console.error('Error fetching courses:', err);
        if (isActive) {
          setError('Failed to load courses. Please try again later.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
        inFlightRef.current = false;
      }
    };

    fetchCourses();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [selectedCategories, selectedLevels, currentPage]);

  // Pagination
  const showingFrom = totalCourses === 0
    ? 0
    : (currentPage - 1) * COURSES_PER_PAGE_LIST * 3 + 1;
  const showingTo = Math.min(currentPage * COURSES_PER_PAGE_LIST * 3, totalCourses);
  const displayedCourses = courses;

  const handleCategoryChange = (value: string) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [value]
    );
  };

  const handleLevelChange = (value: string) => {
    setCurrentPage(1);
    setSelectedLevels((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [value]
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

  const toggleFavorite = (courseId: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<RiStarFill key={`full-${i}`} className="size-4 text-amber-400" />);
    }
    if (hasHalfStar) {
      stars.push(<RiStarHalfFill key="half" className="size-4 text-amber-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<RiStarLine key={`empty-${i}`} className="size-4 text-amber-400" />);
    }

    return stars;
  };

  const GridCourseImage = ({ src, alt }: { src: string; alt: string }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className="relative h-48 bg-gray-200">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 33vw"
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>
    );
  };

  return (
    <>
      <PageHead title="Course grid view" breadcrumbs={breadcrumbs} />

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

            {/* Grid View */}
            <div className="col-span-12 lg:col-span-9">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-white dark:bg-dark-950 shadow-md dark:shadow-dark-800/50 border border-black/10 dark:border-white/10 overflow-hidden"
                    >
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="flex justify-between">
                          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayedCourses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-dark-900 rounded-lg">
                  <p className="text-gray-600 dark:text-dark-400">No courses found matching your filters.</p>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-gray-700 dark:text-dark-400">
                    Showing <span className="font-semibold">{showingFrom}–{showingTo}</span> of{' '}
                    <span className="font-semibold">{totalCourses}</span> Courses
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {displayedCourses.map((course) => (
                      <div
                        key={course.id}
                        className="rounded-xl bg-white dark:bg-dark-950 shadow-md dark:shadow-dark-800/50 border border-black/10 dark:border-white/10 overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        {/* Image */}
                        <div className="relative">
                          <GridCourseImage
                            src={typeof course.image === 'string' ? course.image : course.image.toString()}
                            alt={course.imageAlt}
                          />
                          <div className="flex justify-between items-start p-3 absolute w-full">
                            <div className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
                              {course.category}
                            </div>
                            <button
                              onClick={() => toggleFavorite(course.id)}
                              className="bg-white rounded-full p-2 hover:bg-gray-100 transition"
                            >
                              {favorites.has(course.id) ? (
                                <RiHeartFill className="text-primary-600 size-5" />
                              ) : (
                                <RiHeartLine className="text-gray-600 size-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex gap-0.5">
                              {renderStars(course.rating)}
                            </div>
                            <span className="text-xs text-gray-600 dark:text-dark-400">
                              ({course.reviewCount})
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="mb-3">
                            <Link
                              href={course.titleHref}
                              className="font-semibold text-gray-800 dark:text-dark-400 hover:text-primary-600 transition line-clamp-2"
                            >
                              {course.title}
                            </Link>
                          </h3>

                          {/* Short Description */}
                          {course.shortDescription && (
                            <div className="mb-4 pb-4 border-b border-black/10 dark:border-white/10">
                              <p className="text-xs text-gray-600 dark:text-dark-400 line-clamp-2">
                                {course.shortDescription}
                              </p>
                            </div>
                          )}

                          {/* Lessons & Price */}
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-dark-400">
                              {course.lessonsCount} Sessions
                            </span>
                            <div className="flex gap-2">
                              <span className="text-xs text-gray-500 line-through">
                                {course.originalPrice}
                              </span>
                              <span className="font-semibold text-red-600">
                                {course.discountedPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
