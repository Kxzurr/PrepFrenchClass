// Quick diagnostic script to check course ordering
// Run this in Node.js or your backend context

const { PrismaClient } = require('@prisma/client');

async function checkCourseOrdering() {
  const prisma = new PrismaClient();

  try {
    console.log('=== COURSE ORDERING DIAGNOSTIC ===\n');

    // 1. Check if displayOrder column exists
    console.log('1. Checking if displayOrder column exists in courses table...');
    const columnCheck = await prisma.$queryRaw`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'courses' AND column_name = 'displayOrder'
    `;
    console.log(columnCheck.length > 0 ? '✓ displayOrder column exists' : '✗ displayOrder column NOT FOUND\n');

    // 2. Check migration status
    console.log('\n2. Checking migration history...');
    const migrations = await prisma.$queryRaw`
      SELECT migration_name FROM _prisma_migrations 
      ORDER BY finished_at DESC 
      LIMIT 5
    `;
    console.log('Recent migrations:');
    migrations.forEach((m) => console.log(`  - ${m.migration_name}`));

    // 3. Check courses with displayOrder values
    console.log('\n3. Checking courses and their displayOrder values...');
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        displayOrder: true,
        createdAt: true,
      },
      take: 10,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    console.log(`Found ${courses.length} courses:`);
    courses.forEach((c) => {
      console.log(`  - ${c.title}: displayOrder=${c.displayOrder}`);
    });

    // 4. Check courses with NULL displayOrder
    console.log('\n4. Checking courses with NULL displayOrder...');
    const nullOrderCount = await prisma.course.count({
      where: { displayOrder: null }
    });
    console.log(`Courses with NULL displayOrder: ${nullOrderCount}`);

    // 5. Test the API query
    console.log('\n5. Testing ORDER BY query...');
    const testQuery = await prisma.course.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        title: true,
        displayOrder: true,
      },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      take: 5,
    });
    console.log('Query result (first 5 courses):');
    testQuery.forEach((c) => {
      console.log(`  - ${c.title}: order=${c.displayOrder}`);
    });

    console.log('\n=== DIAGNOSTIC COMPLETE ===');

  } catch (error) {
    console.error('Error during diagnostic:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCourseOrdering();
