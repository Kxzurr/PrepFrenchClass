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

// Get course content (admin)
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
    const content = await prisma.courseContent.findUnique({
      where: { courseId: id },
    });

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error("Error fetching course content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch course content" },
      { status: 500 }
    );
  }
}

// Upsert course content (admin)
export async function PUT(
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
    const {
      whatYouWillLearn,
      courseFeatures,
      keyBenefits,
      toolsResources,
      prerequisites,
      objectives,
      highlights,
      includes,
      whoThisIsFor,
      highlightTip,
      closingMessage,
      sidebarImage,
      videoUrl,
      feeOneTitle,
      feeOneDesc,
      feeTwoTitle,
      feeTwoDesc,
    } = body;

    const data: any = {
      whoThisIsFor: whoThisIsFor ?? null,
      highlightTip: highlightTip ?? null,
      closingMessage: closingMessage ?? null,
      sidebarImage: sidebarImage ?? null,
      videoUrl: videoUrl ?? null,
      feeOneTitle: feeOneTitle ?? null,
      feeOneDesc: feeOneDesc ?? null,
      feeTwoTitle: feeTwoTitle ?? null,
      feeTwoDesc: feeTwoDesc ?? null,
    };

    if (whatYouWillLearn !== undefined) {
      data.whatYouWillLearn = whatYouWillLearn;
    }
    if (courseFeatures !== undefined) {
      data.courseFeatures = courseFeatures;
    }
    if (keyBenefits !== undefined) {
      data.keyBenefits = keyBenefits;
    }
    if (toolsResources !== undefined) {
      data.toolsResources = toolsResources;
    }
    if (prerequisites !== undefined) {
      data.prerequisites = prerequisites;
    }
    if (objectives !== undefined) {
      data.objectives = objectives;
    }
    if (highlights !== undefined) {
      data.highlights = highlights;
    }
    if (includes !== undefined) {
      data.includes = includes;
    }

    const existing = await prisma.courseContent.findUnique({
      where: { courseId: id },
    });

    const content = existing
      ? await prisma.courseContent.update({
          where: { courseId: id },
          data,
        })
      : await prisma.courseContent.create({
          data: {
            courseId: id,
            ...data,
          },
        });

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error("Error updating course content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update course content" },
      { status: 500 }
    );
  }
}
