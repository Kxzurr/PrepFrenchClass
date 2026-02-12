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

// Get all instructors (admin)
export async function GET() {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const instructors = await prisma.instructor.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: instructors });
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch instructors" },
      { status: 500 }
    );
  }
}

// Create instructor (admin) by linking to existing user
export async function POST(request: NextRequest) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { email, firstName, lastName, bio, avatar, expertise, socialLinks } = body;

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User with this email does not exist" },
        { status: 400 }
      );
    }

    const existingInstructor = await prisma.instructor.findUnique({
      where: { userId: user.id },
    });

    if (existingInstructor) {
      return NextResponse.json(
        { success: false, error: "Instructor already exists for this user" },
        { status: 400 }
      );
    }

    const instructor = await prisma.instructor.create({
      data: {
        userId: user.id,
        firstName,
        lastName,
        bio,
        avatar,
        expertise,
        socialLinks,
      },
    });

    return NextResponse.json({ success: true, data: instructor });
  } catch (error) {
    console.error("Error creating instructor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create instructor" },
      { status: 500 }
    );
  }
}
