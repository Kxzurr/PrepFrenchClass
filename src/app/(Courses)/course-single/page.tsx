'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * DEPRECATED: This page redirects to the dynamic course route.
 * All course data now comes from the backend database.
 * Use /course/[slug] instead for individual course pages.
 */
export default function CourseSinglePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to first course in database or showing a message
    // In production, you might want to:
    // 1. Fetch first course from API
    // 2. Redirect to /course/{slug}
    // For now, redirect to course-list-view
    router.push('/course-list-view');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="text-center">
        <p className="text-gray-600 dark:text-dark-400 mb-4">
          Redirecting to course list...
        </p>
      </div>
    </div>
  );
}


