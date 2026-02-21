import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        instructor: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
        pricing: true,
        lessons: {
          orderBy: { order: "asc" },
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        seo: true,
        content: true,
        faqs: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true,
            lessons: true,
          },
        },
      },
    });

    if (!course || course.status !== "PUBLISHED") {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // Build review rating breakdown (1-5 stars) based on all reviews for this course
    const allReviews = await prisma.courseReview.findMany({
      where: { courseId: course.id },
      select: { rating: true },
    });

    const totalReviews = allReviews.length;
    
    // Calculate average rating from all reviews
    const averageRating = totalReviews > 0
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    // Get rating breakdown stats
    const ratingStats = await prisma.courseReview.groupBy({
      by: ["rating"],
      where: { courseId: course.id },
      _count: { rating: true },
    });

    const breakdownBase = {
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    };

    const ratingBreakdown = ratingStats.reduce((acc: { five: number; four: number; three: number; two: number; one: number }, stat: { rating: number; _count: { rating: number } }) => {
      const percentage = totalReviews
        ? (stat._count.rating / totalReviews) * 100
        : 0;

      switch (stat.rating) {
        case 5:
          acc.five = percentage;
          break;
        case 4:
          acc.four = percentage;
          break;
        case 3:
          acc.three = percentage;
          break;
        case 2:
          acc.two = percentage;
          break;
        case 1:
          acc.one = percentage;
          break;
        default:
          break;
      }

      return acc;
    }, breakdownBase);

    return NextResponse.json({
      success: true,
      data: {
        ...course,
        rating: parseFloat(averageRating.toFixed(1)),
        ratingBreakdown,
      },
    });
  } catch (error: any) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch course",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
