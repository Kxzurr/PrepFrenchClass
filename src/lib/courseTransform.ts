import { Course } from "@/src/types/course";

/**
 * Transform API course data to UI Course type
 * Maps database fields to the format expected by UI components
 */
export function transformApiCourseToUI(apiCourse: any): Course {
  // Handle both old (single category) and new (multiple categories) formats
  const firstCategory = apiCourse.category 
    ? apiCourse.category 
    : apiCourse.categories?.[0]?.category;
  
  const categoryName = firstCategory?.name || "Uncategorized";
  const categoryId = firstCategory?.id || "";

  return {
    id: apiCourse.id,
    image: apiCourse.image || "/images/placeholder-course.jpg",
    imageAlt: apiCourse.title,
    category: categoryName,
    categoryColor: getCategoryColor(categoryId),
    rating: apiCourse.rating || 0,
    reviewCount: apiCourse._count?.reviews || 0,
    title: apiCourse.title,
    titleHref: `/course/${apiCourse.slug}`,
    instructorName: apiCourse.instructor?.firstName 
      ? `${apiCourse.instructor.firstName} ${apiCourse.instructor.lastName || ""}`
      : "Unknown Instructor",
    instructorAvatar: apiCourse.instructor?.avatar || "/images/avatar/default.jpg",
    instructorAvatarAlt: apiCourse.instructor?.firstName || "Instructor",
    lessonsCount: apiCourse._count?.lessons || 0,
    originalPrice: `$${apiCourse.pricing?.originalPrice || 0}`,
    discountedPrice: `$${apiCourse.pricing?.discountedPrice || apiCourse.pricing?.originalPrice || 0}`,
  };
}

/**
 * Get category color based on category ID or name
 * Cycles through available color options
 */
function getCategoryColor(
  categoryId: string
): "primary" | "indigo" | "blue" | "orange" | "purple" | "green" | "pink" | "yellow" {
  const colors: Array<"primary" | "indigo" | "blue" | "orange" | "purple" | "green" | "pink" | "yellow"> = [
    "primary",
    "indigo",
    "blue",
    "orange",
    "purple",
    "green",
    "pink",
    "yellow",
  ];
  
  // Use category ID hash for consistent colors
  const hash = categoryId.charCodeAt(0) || 0;
  return colors[hash % colors.length];
}
