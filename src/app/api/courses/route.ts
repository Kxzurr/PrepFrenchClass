import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const IMAGE_WIDTH = 800;
const IMAGE_QUALITY = 80;

const buildOptimizedImageUrl = (url: string) => {
  if (!url) return url;
  if (url.includes("res.cloudinary.com")) {
    return url.replace(
      "/upload/",
      `/upload/f_auto,q_auto,w_${IMAGE_WIDTH},c_fill/`
    );
  }
  if (url.includes("lavenderblush-camel-117734.hostingersite.com")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}w=${IMAGE_WIDTH}&quality=${IMAGE_QUALITY}`;
  }
  return url;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const level = searchParams.get("level");
    const featured = searchParams.get("featured");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = (searchParams.get("order") || "desc") as "asc" | "desc";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: "PUBLISHED",
    };

    if (categoryId) {
      where.categories = {
        some: {
          categoryId: categoryId,
        },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (level) {
      where.level = level;
    }

    if (featured === "true") {
      where.featured = true;
    }

    // Get total count
    const totalCourses = await prisma.course.count({ where });

    // Get courses with relations
    const courses = await prisma.course.findMany({
      where,
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
        _count: {
          select: {
            enrollments: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        [sortBy]: order,
      },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalCourses / limit);

    // Calculate average rating for each course from reviews
    const coursesWithRatings = await Promise.all(
      courses.map(async (course) => {
        const reviews = await prisma.courseReview.findMany({
          where: { courseId: course.id },
          select: { rating: true },
        });

        const averageRating = reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0;

        return {
          ...course,
          rating: parseFloat(averageRating.toFixed(1)),
        };
      })
    );

    const response = NextResponse.json({
      success: true,
      data: coursesWithRatings.map((course) => ({
        ...course,
        imageOptimized: buildOptimizedImageUrl(course.image),
      })),
      pagination: {
        page,
        limit,
        totalCourses,
        totalPages,
      },
    });
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );
    return response;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
