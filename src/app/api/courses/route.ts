import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

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
      where.categoryId = categoryId;
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

    return NextResponse.json({
      success: true,
      data: courses,
      pagination: {
        page,
        limit,
        totalCourses,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
