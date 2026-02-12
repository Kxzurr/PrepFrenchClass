import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CourseOverview from '@/src/components/Courses/Overview';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

async function getCourse(slug: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/courses/${slug}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error fetching course:', error);
        return null;
    }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const course = await getCourse(slug);

    if (!course) {
        return {
            title: 'Course Not Found',
        };
    }

    return {
        title: course.seo?.metaTitle || course.title,
        description: course.seo?.metaDescription || course.shortDescription || course.description.substring(0, 160),
        keywords: course.seo?.metaKeywords,
        openGraph: {
            title: course.seo?.ogTitle || course.title,
            description: course.seo?.ogDescription || course.shortDescription,
            images: [
                {
                    url: course.seo?.ogImage || course.image,
                    width: 1200,
                    height: 630,
                    alt: course.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: course.title,
            description: course.shortDescription || course.description.substring(0, 160),
            images: [course.image],
        },
    };
}

export default async function CoursePage({ params }: Props) {
    const { slug } = await params;
    const course = await getCourse(slug);

    if (!course) {
        notFound();
    }

    return <CourseOverview courseData={course} />;
}
