import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

async function checkAdminAccess() {
  const session = await auth();
  if (!session?.user || (session.user as any)?.role !== "ADMIN") {
    return false;
  }
  return true;
}

// Get all courses (admin)
export async function GET(request: NextRequest) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        category: true,
        instructor: {
          include: {
            user: {
              select: { name: true, email: true, image: true },
            },
          },
        },
        pricing: true,
        _count: {
          select: {
            enrollments: true,
            reviews: true,
            lessons: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    const total = await prisma.course.count({ where });

    return NextResponse.json({
      success: true,
      data: courses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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

// Create course (admin)
export async function POST(request: NextRequest) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      shortDescription,
      image,
      categoryId,
      instructorId,
      level,
      language,
      duration,
      lessonsCount,
      pricing,
      seo,
      status,
      featured,
    } = body;

    if (!title || !slug || !description || !categoryId || !instructorId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existingCourse = await prisma.course.findUnique({
      where: { slug },
    });

    if (existingCourse) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 400 }
      );
    }

    // Create pricing first
    const coursePrice = await prisma.coursePrice.create({
      data: {
        originalPrice: pricing?.originalPrice || 0,
        discountedPrice: pricing?.discountedPrice,
        discountPercentage: pricing?.discountPercentage || 0,
        currency: pricing?.currency || "USD",
      },
    });

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        shortDescription,
        image,
        categoryId,
        instructorId,
        level: level || "BEGINNER",
        language: language || "English",
        duration,
        lessonsCount: lessonsCount || 0,
        status: status || "DRAFT",
        featured: !!featured,
        pricingId: coursePrice.id,
      },
      include: {
        category: true,
        instructor: true,
        pricing: true,
      },
    });

    // Create SEO metadata if provided
    if (seo) {
      await prisma.courseSEO.create({
        data: {
          courseId: course.id,
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          metaKeywords: seo.metaKeywords,
          ogImage: seo.ogImage,
          ogTitle: seo.ogTitle,
          ogDescription: seo.ogDescription,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create course" },
      { status: 500 }
    );
  }
}
