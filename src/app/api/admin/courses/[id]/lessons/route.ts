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

// Get lessons for a course (admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const lessons = await prisma.courseLesson.findMany({
      where: { courseId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, data: lessons });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}

// Create lesson for a course (admin)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, videoUrl, duration, order, published } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }

    // Ensure course exists
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    const lesson = await prisma.courseLesson.create({
      data: {
        courseId: id,
        title,
        description,
        videoUrl,
        duration,
        order: order ?? 0,
        published: published ?? true,
      },
    });

    return NextResponse.json({ success: true, data: lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create lesson" },
      { status: 500 }
    );
  }
}
