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

// Get single course (admin)
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

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        instructor: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
        pricing: true,
        seo: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

// Update course
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
      title,
      slug,
      description,
      shortDescription,
      Homedescription,
      image,
      categoryIds,
      instructorId,
      level,
      language,
      duration,
      lessonsCount,
      hindiBatchDate,
      englishBatchDate,
      pricing,
      seo,
      status,
      featured,
      displayOrder,
    } = body;

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        pricing: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // Check slug uniqueness (if changed)
    if (slug && slug !== course.slug) {
      const existingCourse = await prisma.course.findUnique({
        where: { slug },
      });
      if (existingCourse) {
        return NextResponse.json(
          { success: false, error: "Slug already exists" },
          { status: 400 }
        );
      }
    }

    // Ensure pricing exists and update it if provided
    let pricingId = course.pricingId;
    if (pricing) {
      const discount = pricing.discountPercentage || 0;
      if (pricingId) {
        // Update existing pricing row
        await prisma.coursePrice.update({
          where: { id: pricingId },
          data: {
            originalPrice: pricing.originalPrice,
            discountedPrice: pricing.discountedPrice,
            discountPercentage: discount,
            currency: pricing.currency || "USD",
          },
        });
      } else {
        // Legacy course without pricing: create one and attach
        const createdPrice = await prisma.coursePrice.create({
          data: {
            originalPrice: pricing.originalPrice,
            discountedPrice: pricing.discountedPrice,
            discountPercentage: discount,
            currency: pricing.currency || "USD",
          },
        });
        pricingId = createdPrice.id;
      }
    }

    // Update categories if provided
    if (categoryIds && Array.isArray(categoryIds)) {
      // Delete existing category relations
      await prisma.courseCategory.deleteMany({
        where: { courseId: id },
      });

      // Create new category relations
      await prisma.courseCategory.createMany({
        data: categoryIds.map((catId: string) => ({
          courseId: id,
          categoryId: catId,
        })),
      });
    }

    // Update course
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description && { description }),
        ...(shortDescription && { shortDescription }),
        ...(Homedescription && { Homedescription }),
        ...(image && { image }),
        ...(instructorId && { instructorId }),
        ...(level && { level }),
        ...(language && { language }),
        ...(duration !== undefined && { duration }),
        ...(lessonsCount !== undefined && { lessonsCount }),
        ...(hindiBatchDate !== undefined && { hindiBatchDate: hindiBatchDate ? new Date(hindiBatchDate) : null }),
        ...(englishBatchDate !== undefined && { englishBatchDate: englishBatchDate ? new Date(englishBatchDate) : null }),
        ...(status && { status }),
        ...(featured !== undefined && { featured }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(pricingId && { pricingId }),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        instructor: true,
        pricing: true,
      },
    });

    // Update SEO metadata if provided
    if (seo) {
      const existingSeo = await prisma.courseSEO.findUnique({
        where: { courseId: id },
      });

      if (existingSeo) {
        await prisma.courseSEO.update({
          where: { courseId: id },
          data: {
            metaTitle: seo.metaTitle,
            metaDescription: seo.metaDescription,
            metaKeywords: seo.metaKeywords,
            ogImage: seo.ogImage,
            ogTitle: seo.ogTitle,
            ogDescription: seo.ogDescription,
          },
        });
      } else {
        await prisma.courseSEO.create({
          data: {
            courseId: id,
            metaTitle: seo.metaTitle,
            metaDescription: seo.metaDescription,
            metaKeywords: seo.metaKeywords,
            ogImage: seo.ogImage,
            ogTitle: seo.ogTitle,
            ogDescription: seo.ogDescription,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update course" },
      { status: 500 }
    );
  }
}

// Delete course
export async function DELETE(
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

    // Check if course exists (and fetch pricing/SEO ids if present)
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        seo: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // Manually clean up dependent records to be safe with older DB constraints
    await prisma.courseLesson.deleteMany({ where: { courseId: id } });
    await prisma.courseFAQ.deleteMany({ where: { courseId: id } });
    await prisma.courseContent.deleteMany({ where: { courseId: id } });
    await prisma.courseEnrollment.deleteMany({ where: { courseId: id } });
    await prisma.courseReview.deleteMany({ where: { courseId: id } });

    // Delete SEO if exists
    if (course.seo) {
      await prisma.courseSEO.delete({ where: { courseId: id } });
    }

    // Finally delete the course itself
    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    const message = (error as any)?.message || String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
