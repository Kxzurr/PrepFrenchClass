import { FilterOption } from '@/src/types/course';

export const courseCategories: FilterOption[] = [
    { label: 'TEF Canada Preparation', value: 'tef-canada' },
    { label: 'TCF Canada Preparation', value: 'tcf-canada' },
    { label: 'French Speaking Practice', value: 'french-speaking' },
    { label: 'French Grammar Mastery', value: 'french-grammar' },
    { label: 'Pronunciation & Accent Training', value: 'french-pronunciation' },
    { label: 'Intensive French Bootcamp', value: 'intensive-french' },
    { label: 'French for Professionals', value: 'professional-french' },
];

export const courseLevels: FilterOption[] = [
    { label: 'Beginner (A1–A2)', value: 'beginner' },
    { label: 'Intermediate (B1–B2)', value: 'intermediate' },
    { label: 'Advanced (C1–C2)', value: 'advanced' },
];

export const sortOptions = [
    'Default Order',
    'Newest First',
    'Most Popular',
    'Top Rated',
    'Price (Low - High)',
    'Price (High - Low)',
];
