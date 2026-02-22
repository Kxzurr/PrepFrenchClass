// Initialize course orders if they haven't been set
import { prisma } from '@/src/lib/prisma';

async function initializeCourseOrders() {
  try {
    console.log('Initializing course display orders...');

    // Get all courses that don't have a displayOrder
    const coursesWithoutOrder = await prisma.course.findMany({
      where: { displayOrder: null },
      orderBy: { createdAt: 'asc' },
    });

    console.log(`Found ${coursesWithoutOrder.length} courses without order`);

    // Assign displayOrder based on creation date
    for (let i = 0; i < coursesWithoutOrder.length; i++) {
      await prisma.course.update({
        where: { id: coursesWithoutOrder[i].id },
        data: { displayOrder: i + 1 },
      });
      console.log(`✓ Set ${coursesWithoutOrder[i].title} to position ${i + 1}`);
    }

    console.log('\n✓ All courses initialized with display orders');

    // Show final state
    const allCourses = await prisma.course.findMany({
      select: { id: true, title: true, displayOrder: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    console.log('\nFinal Course Order:');
    allCourses.forEach((c: any) => {
      console.log(`  ${c.displayOrder || 'NULL'}: ${c.title}`);
    });

  } catch (error) {
    console.error('Error initializing orders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeCourseOrders();
