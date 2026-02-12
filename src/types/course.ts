import { StaticImageData } from 'next/image';

// Course Category Color Type
export type CourseCategoryColor = 'primary' | 'indigo' | 'blue' | 'orange' | 'purple' | 'green' | 'pink' | 'yellow';

// Main Course Type
export interface Course {
    id: string;
    image: StaticImageData;
    imageAlt: string;
    category: string;
    categoryColor: CourseCategoryColor;
    rating: number;
    reviewCount: number;
    title: string;
    titleHref: string;
    instructorName: string;
    instructorAvatar: StaticImageData;
    instructorAvatarAlt: string;
    lessonsCount: number;
    originalPrice: string;
    discountedPrice: string;
}

// Course List Props
export interface CourseListProps {
    courses: Course[];
    currentPage: number;
    totalPages: number;
    totalCourses: number;
    showingFrom: number;
    showingTo: number;
    onPageChange: (page: number) => void;
}

// Course Card Props (for List View)
export interface CourseCardProps {
    id: string;
    image: StaticImageData;
    imageAlt: string;
    category: string;
    categoryColor: CourseCategoryColor;
    rating: number;
    reviewCount: number;
    title: string;
    titleHref: string;
    instructorName: string;
    instructorAvatar: StaticImageData;
    instructorAvatarAlt: string;
    lessonsCount: number;
    originalPrice: string;
    discountedPrice: string;
}

// Course Grid Card Props
export interface CourseGridCardProps {
    id: string;
    image: StaticImageData;
    imageAlt: string;
    category: string;
    categoryColor: CourseCategoryColor;
    rating: number;
    reviewCount: number;
    title: string;
    titleHref: string;
    instructorName: string;
    instructorAvatar: StaticImageData;
    instructorAvatarAlt: string;
    lessonsCount: number;
    originalPrice: string;
    discountedPrice: string;
}

// Filter Option Type
export interface FilterOption {
    label: string;
    value: string;
}

// Course Color Classes Type
export interface CourseColorClasses {
    badge: string;
    border: string;
    hover: string;
    icon: string;
    titleHover: string;
    lessonIcon: string;
}

