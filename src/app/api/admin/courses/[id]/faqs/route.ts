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

// Get FAQs for a course (admin)
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

    const faqs = await prisma.courseFAQ.findMany({
      where: { courseId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    console.error("Error fetching course FAQs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch course FAQs" },
      { status: 500 }
    );
  }
}

// Create FAQ for a course (admin)
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
    const { question, answer, order } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const faq = await prisma.courseFAQ.create({
      data: {
        courseId: id,
        question,
        answer,
        order: order ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
