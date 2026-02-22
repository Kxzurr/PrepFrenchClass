import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Force dynamic rendering to prevent static generation
export const dynamic = "force-dynamic";
// Disable caching at the route level
export const revalidate = 0;

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
    const requestedSortBy = searchParams.get("sortBy");
    const allowedSortFields = new Set(["createdAt", "title"]);
    
    // Use custom displayOrder as default sort unless featured filter is applied or specific sort requested
    let sortBy: string;
    let order: "asc" | "desc";
    
    if (featured === "true") {
      // If featured filter is applied, use createdAt as default
      sortBy = "createdAt";
      order = "desc";
    } else if (requestedSortBy) {
      // If specific sort is requested, use it
      sortBy = allowedSortFields.has(requestedSortBy) ? requestedSortBy : "createdAt";
      order = (searchParams.get("order") || "desc") as "asc" | "desc";
    } else {
      // Use custom displayOrder as default
      sortBy = "displayOrder";
      order = "asc";
    }

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

    // Build orderBy based on sorting preference
    let orderBy: any;
    if (sortBy === "displayOrder") {
      // Sort by custom order first, then by creation date for unordered courses
      orderBy = [
        { displayOrder: "asc" as const },
        { createdAt: "desc" as const }
      ];
    } else if (sortBy === "createdAt") {
      orderBy = { createdAt: order };
    } else if (sortBy === "title") {
      orderBy = { title: order };
    } else {
      orderBy = { createdAt: "desc" };
    }

    // Get courses with minimal fields
    const courses = await prisma.course.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDescription: true,
        image: true,
        createdAt: true,
        displayOrder: true,
        level: true,
        language: true,
        duration: true,
        lessonsCount: true,
        categories: {
          include: {
            category: {
              select: { id: true, name: true },
            },
          },
        },
        pricing: {
          select: {
            originalPrice: true,
            discountedPrice: true,
            currency: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true,
            lessons: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalCourses / limit);

    const courseIds = courses.map((course) => course.id);
    const ratingRows = await prisma.courseReview.groupBy({
      by: ["courseId"],
      where: { courseId: { in: courseIds } },
      _avg: { rating: true },
    });
    const ratingMap = new Map(
      ratingRows.map((row) => [row.courseId, row._avg.rating || 0])
    );

    const response = NextResponse.json({
      success: true,
      data: courses.map((course) => ({
        ...course,
        rating: parseFloat((ratingMap.get(course.id) || 0).toFixed(1)),
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
      "no-cache, no-store, must-revalidate"
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
