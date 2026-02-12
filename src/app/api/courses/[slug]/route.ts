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
        category: true,
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
    const ratingStats = await prisma.courseReview.groupBy({
      by: ["rating"],
      where: { courseId: course.id },
      _count: { rating: true },
    });

    const totalRatings = ratingStats.reduce(
      (sum, stat) => sum + stat._count.rating,
      0
    );

    const breakdownBase = {
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    };

    const ratingBreakdown = ratingStats.reduce((acc, stat) => {
      const percentage = totalRatings
        ? (stat._count.rating / totalRatings) * 100
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
