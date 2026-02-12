import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateCategoryData() {
  try {
    // Check if there's any data in course_categories table
    const existingRelations = await prisma.courseCategory.count();
    
    if (existingRelations > 0) {
      console.log(`✓ Category relations already exist (${existingRelations} records). No migration needed.`);
      return;
    }

    // Get all courses (the migration may have already run, so categoryId won't exist)
    console.log('Checking for courses that need category migration...');
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    console.log(`Found ${courses.length} courses.`);
    
    // Since the migration already ran and dropped categoryId,
    // we need to manually assign categories to courses
    // For now, we'll just report that courses exist without categories
    
    const coursesWithoutCategories = await prisma.course.findMany({
      where: {
        categories: {
          none: {},
        },
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (coursesWithoutCategories.length > 0) {
      console.log(`\n⚠ Warning: ${coursesWithoutCategories.length} courses have no categories:`);
      coursesWithoutCategories.forEach(course => {
        console.log(`  - ${course.title} (ID: ${course.id})`);
      });
      console.log('\nYou can assign categories to these courses via the admin panel.');
    } else {
      console.log('✓ All courses have categories assigned.');
    }

  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrateCategoryData()
  .then(() => {
    console.log('\n✓ Migration check complete.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Migration failed:', error);
    process.exit(1);
  });
