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

// Bulk update course order
export async function POST(request: NextRequest) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { orders } = body; // Array of { id: string, displayOrder: number }

    if (!Array.isArray(orders)) {
      return NextResponse.json(
        { success: false, error: "Invalid request: orders must be an array" },
        { status: 400 }
      );
    }

    // Update course orders in a transaction
    const updatePromises = orders.map((item: { id: string; displayOrder: number }) =>
      prisma.course.update({
        where: { id: item.id },
        data: { displayOrder: item.displayOrder },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: "Course orders updated successfully",
    });
  } catch (error) {
    console.error("Error updating course orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update course orders" },
      { status: 500 }
    );
  }
}
