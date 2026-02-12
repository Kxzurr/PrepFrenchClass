import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting database seed...");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.upsert({
        where: { email: "admin@prepfrench.com" },
        update: {},
        create: {
            email: "admin@prepfrench.com",
            name: "Admin User",
            password: adminPassword,
            role: "ADMIN",
        },
    });
    console.log("✓ Admin user created:", admin.email);

    // Create homepage categories matching frontend design
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: "beginner-french-a1-a2" },
            update: {},
            create: {
                name: "Beginner French (A1–A2)",
                slug: "beginner-french-a1-a2",
                description:
                    "Start your French journey with strong foundations in grammar, vocabulary, pronunciation, and everyday conversations.",
                iconKey: "book",
                gradientFrom: "from-blue-500",
                gradientTo: "to-blue-600",
            },
        }),
        prisma.category.upsert({
            where: { slug: "intermediate-french-b1-b2" },
            update: {},
            create: {
                name: "Intermediate French (B1–B2)",
                slug: "intermediate-french-b1-b2",
                description:
                    "Build fluency and confidence through structured speaking practice, comprehension training, and real-life dialogues.",
                iconKey: "global",
                gradientFrom: "from-pink-400",
                gradientTo: "to-pink-600",
            },
        }),
        prisma.category.upsert({
            where: { slug: "advanced-french-c1-level" },
            update: {},
            create: {
                name: "Advanced French (C1 Level)",
                slug: "advanced-french-c1-level",
                description:
                    "Refine advanced grammar, pronunciation, and professional communication skills for academic and career growth.",
                iconKey: "school",
                gradientFrom: "from-purple-400",
                gradientTo: "to-purple-600",
            },
        }),
        prisma.category.upsert({
            where: { slug: "tef-canada-preparation" },
            update: {},
            create: {
                name: "TEF Canada Preparation",
                slug: "tef-canada-preparation",
                description:
                    "Structured preparation for TEF Canada exam covering listening, reading, writing, and speaking modules.",
                iconKey: "graduation",
                gradientFrom: "from-green-400",
                gradientTo: "to-green-600",
            },
        }),
        prisma.category.upsert({
            where: { slug: "tcf-canada-coaching" },
            update: {},
            create: {
                name: "TCF Canada Coaching",
                slug: "tcf-canada-coaching",
                description:
                    "Comprehensive TCF Canada training with mock tests, pronunciation guidance, and personalized feedback.",
                iconKey: "sparkling",
                gradientFrom: "from-red-400",
                gradientTo: "to-red-600",
            },
        }),
        prisma.category.upsert({
            where: { slug: "french-for-professionals" },
            update: {},
            create: {
                name: "French for Professionals",
                slug: "french-for-professionals",
                description:
                    "Specialized French training for workplace communication, interviews, presentations, and career advancement.",
                iconKey: "global",
                gradientFrom: "from-yellow-400",
                gradientTo: "to-yellow-600",
            },
        }),
    ]);
    console.log("✓ Categories created:", categories.length);

    // Create a sample instructor
    const instructorPassword = await bcrypt.hash("instructor123", 10);
    const instructorUser = await prisma.user.upsert({
        where: { email: "instructor@prepfrench.com" },
        update: {},
        create: {
            email: "instructor@prepfrench.com",
            name: "Michel Dupont",
            password: instructorPassword,
            role: "INSTRUCTOR",
        },
    });

    const instructor = await prisma.instructor.upsert({
        where: { userId: instructorUser.id },
        update: {},
        create: {
            userId: instructorUser.id,
            firstName: "Michel",
            lastName: "Dupont",
            bio: "Native French speaker with 10+ years of teaching experience",
            expertise: "French language, TEF preparation, Business French",
            isVerified: true,
        },
    });
    console.log("✓ Instructor created:", instructor.id);

    // Create sample courses
    const courses = await Promise.all([
        (async () => {
            const pricing = await prisma.coursePrice.create({
                data: {
                    originalPrice: 99.99,
                    discountedPrice: 79.99,
                    discountPercentage: 20,
                    currency: "USD",
                },
            });

            return prisma.course.upsert({
                where: { slug: "french-basics-for-beginners" },
                update: {},
                create: {
                    title: "French Basics for Beginners",
                    slug: "french-basics-for-beginners",
                    description:
                        "Master the fundamentals of French language including grammar, vocabulary, and pronunciation. Perfect for absolute beginners.",
                    shortDescription: "Learn French from scratch with our comprehensive beginner course",
                    image: "/images/courses/french-basics.jpg",
                    categoryId: categories[0].id, // Beginner French (A1–A2)
                    instructorId: instructor.id,
                    pricingId: pricing.id,
                    level: "BEGINNER",
                    language: "English",
                    duration: 8,
                    lessonsCount: 24,
                    rating: 4.8,
                    status: "PUBLISHED",
                    featured: true,
                },
            });
        })(),
        (async () => {
            const pricing = await prisma.coursePrice.create({
                data: {
                    originalPrice: 129.99,
                    discountedPrice: 99.99,
                    discountPercentage: 23,
                    currency: "USD",
                },
            });

            return prisma.course.upsert({
                where: { slug: "tef-canada-complete-preparation" },
                update: {},
                create: {
                    title: "TEF Canada Complete Preparation",
                    slug: "tef-canada-complete-preparation",
                    description: "Comprehensive preparation program for TEF Canada exam with practice tests, speaking sessions, and vocabulary building.",
                    shortDescription: "Complete guide to passing TEF Canada with high scores",
                    image: "/images/courses/tef-canada.jpg",
                    categoryId: categories[3].id, // TEF Canada Preparation
                    instructorId: instructor.id,
                    pricingId: pricing.id,
                    level: "INTERMEDIATE",
                    language: "English",
                    duration: 12,
                    lessonsCount: 45,
                    rating: 4.9,
                    status: "PUBLISHED",
                    featured: true,
                },
            });
        })(),
        (async () => {
            const pricing = await prisma.coursePrice.create({
                data: {
                    originalPrice: 89.99,
                    discountedPrice: null,
                    discountPercentage: 0,
                    currency: "USD",
                },
            });

            return prisma.course.upsert({
                where: { slug: "advanced-french-conversation" },
                update: {},
                create: {
                    title: "Advanced French Conversation",
                    slug: "advanced-french-conversation",
                    description: "Take your French fluency to the next level with advanced conversation techniques and cultural insights.",
                    shortDescription: "Master advanced French speaking and listening skills",
                    image: "/images/courses/advanced-french.jpg",
                    categoryId: categories[2].id, // Advanced French (C1 Level)
                    instructorId: instructor.id,
                    pricingId: pricing.id,
                    level: "ADVANCED",
                    language: "English",
                    duration: 10,
                    lessonsCount: 30,
                    rating: 4.7,
                    status: "PUBLISHED",
                    featured: false,
                },
            });
        })(),
    ]);
    console.log("✓ Courses created:", courses.length);

    // Create sample lessons for first course
    if (courses[0]) {
        const lessons = await Promise.all([
            prisma.courseLesson.create({
                data: {
                    courseId: courses[0].id,
                    title: "Introduction to French Alphabet",
                    description: "Learn the French alphabet and basic pronunciation rules",
                    order: 1,
                    duration: 25,
                },
            }),
            prisma.courseLesson.create({
                data: {
                    courseId: courses[0].id,
                    title: "Basic Greetings and Introductions",
                    description: "Master essential greetings and how to introduce yourself in French",
                    order: 2,
                    duration: 30,
                },
            }),
            prisma.courseLesson.create({
                data: {
                    courseId: courses[0].id,
                    title: "Numbers and Counting",
                    description: "Learn French numbers and basic counting",
                    order: 3,
                    duration: 20,
                },
            }),
        ]);
        console.log("✓ Lessons created for first course:", lessons.length);
    }

    // Create SEO metadata for courses
    await prisma.courseSEO.upsert({
        where: { courseId: courses[0].id },
        update: {},
        create: {
            courseId: courses[0].id,
            metaTitle: "French Basics for Beginners - Learn French Online",
            metaDescription: "Master French fundamentals with our comprehensive beginner course. Learn grammar, vocabulary, and pronunciation.",
            metaKeywords: "learn french, french basics, french for beginners, online french course",
            ogTitle: "French Basics for Beginners",
            ogDescription: "Start learning French today with our interactive beginner course",
            ogImage: "/images/courses/french-basics-og.jpg",
        },
    });

    console.log("✅ Database seeding completed successfully!");
    console.log("\n📝 Credentials:");
    console.log("   Admin Email: admin@prepfrench.com");
    console.log("   Admin Password: admin123");
    console.log("\n🔗 Access URLs:");
    console.log("   Courses: http://localhost:3000/course-grid-view");
    console.log("   Admin Panel: http://localhost:3000/admin");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
