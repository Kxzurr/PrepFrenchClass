import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany({
    where: {
      language: 'French'
    },
    include: {
      category: true,
      pricing: true,
      content: true
    }
  });

  console.log(`\nFound ${courses.length} French language courses:`);
  courses.forEach((course, index) => {
    console.log(`\n${index + 1}. ${course.title}`);
    console.log(`   Slug: ${course.slug}`);
    console.log(`   Level: ${course.level}`);
    console.log(`   Duration: ${course.duration} weeks`);
    console.log(`   Lessons: ${course.lessonsCount}`);
    console.log(`   Status: ${course.status}`);
    console.log(`   Featured: ${course.featured}`);
    console.log(`   Price: $${course.pricing?.discountedPrice || course.pricing?.originalPrice}`);
  });

  console.log('\n');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
