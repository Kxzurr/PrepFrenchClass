import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

async function checkAdminAccess() {
  const session = await auth() as any;
  if (!session?.user || session?.user?.role !== "ADMIN") {
    return false;
  }
  return true;
}

// Update lesson (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { lessonId } = await params;
    const body = await request.json();
    const { title, description, videoUrl, duration, monthNumber, order, published } = body;

    const existing = await prisma.courseLesson.findUnique({
      where: { id: lessonId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Lesson not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.courseLesson.update({
      where: { id: lessonId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(duration !== undefined && { duration }),
        ...(monthNumber !== undefined && { monthNumber }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

// Delete lesson (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { lessonId } = await params;

    const existing = await prisma.courseLesson.findUnique({
      where: { id: lessonId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Lesson not found" },
        { status: 404 }
      );
    }

    await prisma.courseLesson.delete({ where: { id: lessonId } });

    return NextResponse.json({ success: true, message: "Lesson deleted" });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
