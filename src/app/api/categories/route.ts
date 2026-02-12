import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            courses: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    // Filter and map to count only published courses
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const publishedCount = await prisma.$queryRaw<[{count: bigint}]>`
          SELECT COUNT(*) as count
          FROM course_categories cc
          INNER JOIN courses c ON cc."courseId" = c.id
          WHERE cc."categoryId" = ${category.id}
          AND c.status = 'PUBLISHED'
        `;
        
        return {
          ...category,
          _count: {
            courses: Number(publishedCount[0]?.count || 0),
          },
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: categoriesWithCount,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
