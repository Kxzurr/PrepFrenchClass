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

// Update FAQ (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ faqId: string }> }
) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { faqId } = await params;
    const body = await request.json();
    const { question, answer, order } = body;

    const existing = await prisma.courseFAQ.findUnique({ where: { id: faqId } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.courseFAQ.update({
      where: { id: faqId },
      data: {
        ...(question !== undefined && { question }),
        ...(answer !== undefined && { answer }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

// Delete FAQ (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ faqId: string }> }
) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { faqId } = await params;

    const existing = await prisma.courseFAQ.findUnique({ where: { id: faqId } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 }
      );
    }

    await prisma.courseFAQ.delete({ where: { id: faqId } });

    return NextResponse.json({ success: true, message: "FAQ deleted" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
