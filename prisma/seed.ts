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
            where: { name: "Beginner French (A1–A2)" },
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
            where: { name: "Intermediate French (B1–B2)" },
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
            where: { name: "Advanced French (C1 Level)" },
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
            where: { name: "TEF Canada Preparation" },
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
            where: { name: "TCF Canada Coaching" },
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
            where: { name: "French for Professionals" },
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

    const defaultPricing = {
        originalPrice: 199.99,
        discountedPrice: 149.99,
        discountPercentage: 25,
        currency: "USD",
    };
    
    // Map course slugs to uploaded images
    const courseImageMap: Record<string, string> = {
        "french-basics-for-beginners": "/uploads/courses/1770888567942-group-of-international-people-listening-to-teacher-2026-01-08-23-19-46-utc.jpg.jpg",
        "tef-canada-complete-preparation": "/uploads/courses/1770888613964-rear-side-of-audiences-sitting-and-listening-the-s-2026-01-05-06-07-16-utc.jpg.jpg",
        "advanced-french-conversation": "/uploads/courses/1770888625462-photo-of-multiethnic-group-of-concentrated-young-s-2026-01-09-14-38-25-utc.jpg.jpg",
        "tcf-canada-full-clb7": "/uploads/courses/1770888639071-portrait-of-an-attractive-young-female-student-sta-2026-01-09-10-53-41-utc.jpg.jpg",
        "tcf-canada-6-month-clb5": "/uploads/courses/1770888644631-middle-aged-female-student-preparing-for-exam-in-p-2026-01-08-06-40-21-utc.jpg.jpg",
        "tef-canada-full-clb7": "/uploads/courses/1770888702192-group-of-students-listening-to-their-teacher-2026-01-08-07-57-29-utc.jpg.jpg",
        "tef-canada-6-month-clb5": "/uploads/courses/1770888714209-female-university-student-writing-an-exam-in-the-c-2026-01-07-02-28-32-utc.jpg.jpg",
        "french-a1-beginner": "/uploads/courses/1770888747799-black-senior-student-man-writing-while-attending-a-2026-01-06-10-27-26-utc.jpg.jpg",
        "french-a2-elementary": "/uploads/courses/1770888817779-young-businesswoman-writing-notes-while-participat-2026-01-07-00-09-31-utc.jpg.jpg",
        "french-b1-intermediate": "/uploads/courses/1770888834131-university-hallway-and-portrait-of-man-and-studen-2026-01-09-09-21-29-utc.jpg.jpg",
        "french-b2-upper-intermediate": "/uploads/courses/1770888910350-teacher-explaining-individually-to-university-stud-2026-01-07-02-22-20-utc.jpg.jpg",
        "tcf-canada-1-month-prep": "/uploads/courses/1770888921169-class-of-university-students-using-laptops-in-lect-2026-01-05-22-56-50-utc.jpg.jpg",
        "tef-canada-1-month-prep": "/uploads/courses/1770888931764-writing-lecture-2026-01-09-08-17-22-utc.jpg.jpg",
    };
    
    const defaultImage = "/uploads/courses/1770888940919-group-of-students-listening-to-teacher-at-lecture-2026-01-08-06-24-47-utc.jpg.jpg";
    const featuredSlugs = new Set([
        "tcf-canada-full-clb7",
        "tef-canada-full-clb7",
        "french-a1-beginner",
    ]);

    const createCourseWithContent = async (data: {
        title: string;
        slug: string;
        description: string;
        shortDescription: string;
        categoryId?: string;
        level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
        duration: string | null;
        lessonsCount?: number;
        content?: {
            whatYouWillLearn?: string[];
            courseFeatures?: string[];
            keyBenefits?: string[];
            toolsResources?: string[];
            prerequisites?: string[];
            objectives?: string[];
            highlights?: string[];
            includes?: string[];
            whoThisIsFor?: string | null;
            highlightTip?: string | null;
            closingMessage?: string | null;
            sidebarImage?: string | null;
            videoUrl?: string | null;
            feeOneTitle?: string | null;
            feeOneDesc?: string | null;
            feeTwoTitle?: string | null;
            feeTwoDesc?: string | null;
        };
    }) => {
        const pricing = await prisma.coursePrice.create({
            data: defaultPricing,
        });

        const course = await prisma.course.upsert({
            where: { slug: data.slug },
            update: {},
            create: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                shortDescription: data.shortDescription,
                image: courseImageMap[data.slug] || defaultImage,
                instructorId: instructor.id,
                pricingId: pricing.id,
                level: data.level,
                language: "English",
                duration: data.duration ? parseFloat(data.duration) : null,
                lessonsCount: data.lessonsCount || 0,
                rating: 0,
                status: "PUBLISHED",
                featured: featuredSlugs.has(data.slug),
            },
        });

        // Create course category relationship separately if categoryId provided
        if (data.categoryId) {
            await prisma.courseCategory.upsert({
                where: { courseId_categoryId: { courseId: course.id, categoryId: data.categoryId } },
                update: {},
                create: { courseId: course.id, categoryId: data.categoryId },
            });
        }

        if (data.content) {
            await prisma.courseContent.upsert({
                where: { courseId: course.id },
                update: data.content,
                create: {
                    courseId: course.id,
                    ...data.content,
                },
            });
        }

        return course;
    };

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

            const course = await prisma.course.upsert({
                where: { slug: "french-basics-for-beginners" },
                update: {},
                create: {
                    title: "French Basics for Beginners",
                    slug: "french-basics-for-beginners",
                    description:
                        "Master the fundamentals of French language including grammar, vocabulary, and pronunciation. Perfect for absolute beginners.",
                    shortDescription: "Learn French from scratch with our comprehensive beginner course",
                    image: courseImageMap["french-basics-for-beginners"],
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

            await prisma.courseCategory.upsert({
                where: { courseId_categoryId: { courseId: course.id, categoryId: categories[0].id } },
                update: {},
                create: { courseId: course.id, categoryId: categories[0].id },
            });

            return course;
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

            const course = await prisma.course.upsert({
                where: { slug: "tef-canada-complete-preparation" },
                update: {},
                create: {
                    title: "TEF Canada Complete Preparation",
                    slug: "tef-canada-complete-preparation",
                    description: "Comprehensive preparation program for TEF Canada exam with practice tests, speaking sessions, and vocabulary building.",
                    shortDescription: "Complete guide to passing TEF Canada with high scores",
                    image: courseImageMap["tef-canada-complete-preparation"],
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

            await prisma.courseCategory.upsert({
                where: { courseId_categoryId: { courseId: course.id, categoryId: categories[3].id } },
                update: {},
                create: { courseId: course.id, categoryId: categories[3].id },
            });

            return course;
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

            const course = await prisma.course.upsert({
                where: { slug: "advanced-french-conversation" },
                update: {},
                create: {
                    title: "Advanced French Conversation",
                    slug: "advanced-french-conversation",
                    description: "Take your French fluency to the next level with advanced conversation techniques and cultural insights.",
                    shortDescription: "Master advanced French speaking and listening skills",
                    image: courseImageMap["advanced-french-conversation"],
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

            await prisma.courseCategory.upsert({
                where: { courseId_categoryId: { courseId: course.id, categoryId: categories[2].id } },
                update: {},
                create: { courseId: course.id, categoryId: categories[2].id },
            });

            return course;
        })(),
        createCourseWithContent({
            title: "9-10 Month Full TCF Canada (CLB 7)",
            slug: "tcf-canada-full-clb7",
            description:
                "A 9-10 month intensive program that prepares learners for the TCF Canada exam with a CLB 7 target. Covers A1 to B2 skills, exam strategies, and mock tests with live online classes five days per week and recorded sessions for review.",
            shortDescription: "Full TCF Canada prep to reach CLB 7 (B2) with live classes and mock exams.",
            categoryId: categories[4].id,
            level: "INTERMEDIATE",
            duration: 200,
            content: {
                whatYouWillLearn: [
                    "Listening, speaking, reading, and writing to B2 (CLB 7)",
                    "Core grammar and vocabulary from A1 to B2",
                    "TCF Canada exam format and question strategies",
                    "Confidence through mock tests and feedback",
                ],
                courseFeatures: [
                    "Beginner to upper-intermediate progression (A1-B2)",
                    "Live online classes 5 days per week",
                    "Recorded sessions for review",
                    "Ongoing mock exams and feedback",
                ],
                prerequisites: [
                    "Open to beginners",
                    "Commitment to daily practice",
                ],
                objectives: [
                    "Develop all four skills to an upper-intermediate B2 level",
                    "Master essential grammar and vocabulary for formal topics",
                    "Learn TCF Canada task formats and test strategies",
                    "Express complex ideas clearly in French",
                ],
                highlights: [
                    "Exam-focused speaking and writing practice",
                    "Full-length mock tests with feedback",
                ],
                includes: [
                    "Live classes",
                    "Recorded sessions",
                    "Mock exams",
                    "Personalized feedback",
                ],
                whoThisIsFor: "Learners aiming for Canadian PR with a CLB 7 requirement.",
                highlightTip: "Plan daily practice outside class for steady progress.",
            },
        }),
        createCourseWithContent({
            title: "6 Month TCF Canada (CLB 5)",
            slug: "tcf-canada-6-month-clb5",
            description:
                "A 6-month accelerated program targeting CLB 5 (B1) for TCF Canada. Covers A1 to B1 content, essential exam practice, and live online classes five days per week with recordings available.",
            shortDescription: "Accelerated TCF Canada course targeting CLB 5 (B1).",
            categoryId: categories[4].id,
            level: "INTERMEDIATE",
            duration: 120,
            content: {
                whatYouWillLearn: [
                    "Core French skills up to B1",
                    "Everyday communication for work and daily life",
                    "TCF Canada question types and timing",
                ],
                courseFeatures: [
                    "A1 to B1 coverage in 6 months",
                    "Live online classes 5 days per week",
                    "Recorded sessions for review",
                ],
                prerequisites: [
                    "Open to beginners; basic French helps",
                    "Extra self-study recommended due to pace",
                ],
                objectives: [
                    "Reach intermediate B1 proficiency",
                    "Improve listening and reading for common topics",
                    "Build practical speaking and writing skills",
                    "Prepare for TCF Canada CLB 5 targets",
                ],
                highlights: [
                    "Focused exam practice for CLB 5",
                    "Time management strategies for test sections",
                ],
                includes: [
                    "Live classes",
                    "Recorded sessions",
                    "Mock exam practice",
                ],
                whoThisIsFor: "Learners preparing for work permit extension with CLB 5 goals.",
            },
        }),
        createCourseWithContent({
            title: "9-10 Month Full TEF Canada (CLB 7)",
            slug: "tef-canada-full-clb7",
            description:
                "A 9-10 month TEF Canada preparation program targeting CLB 7. Covers A1 to B2 content, TEF-specific exam strategies, and live online classes five days per week with recordings.",
            shortDescription: "Comprehensive TEF Canada prep to reach CLB 7 (B2).",
            categoryId: categories[3].id,
            level: "INTERMEDIATE",
            duration: 200,
            content: {
                whatYouWillLearn: [
                    "French proficiency from A1 to B2",
                    "TEF Canada exam structure and strategies",
                    "Advanced speaking and writing techniques",
                ],
                courseFeatures: [
                    "Step-by-step A1 to B2 progression",
                    "TEF-specific listening and reading practice",
                    "Writing tasks and speaking interview drills",
                ],
                prerequisites: [
                    "Open to beginners",
                    "Consistent practice outside class",
                ],
                objectives: [
                    "Reach upper-intermediate B2 proficiency",
                    "Master TEF task formats and timing",
                    "Build confidence with mock exams",
                ],
                highlights: [
                    "Focused training on TEF writing and speaking",
                    "Mock TEF exams with detailed feedback",
                ],
                includes: [
                    "Live classes",
                    "Recorded sessions",
                    "Mock exams",
                    "Personalized feedback",
                ],
                whoThisIsFor: "Learners targeting Canadian PR with TEF CLB 7 goals.",
            },
        }),
        createCourseWithContent({
            title: "6 Month TEF Canada (CLB 5)",
            slug: "tef-canada-6-month-clb5",
            description:
                "A 6-month accelerated TEF Canada course for CLB 5 goals. Covers A1 to B1 essentials, TEF-specific exam practice, and live online classes five days per week with recordings.",
            shortDescription: "Accelerated TEF Canada prep targeting CLB 5 (B1).",
            categoryId: categories[3].id,
            level: "INTERMEDIATE",
            duration: 120,
            content: {
                whatYouWillLearn: [
                    "Practical French skills up to B1",
                    "TEF listening and reading strategies",
                    "Exam-ready speaking and writing basics",
                ],
                courseFeatures: [
                    "A1 to B1 focus in a fast-track format",
                    "TEF role-play and opinion practice",
                    "Timed reading and listening drills",
                ],
                prerequisites: [
                    "A1 foundation recommended",
                    "Intensive pace requires steady attendance",
                ],
                objectives: [
                    "Reach B1 proficiency for CLB 5 targets",
                    "Improve exam timing and accuracy",
                    "Build confidence for TEF speaking tasks",
                ],
                highlights: [
                    "Full mock TEF exam near course end",
                    "Detailed feedback on writing and speaking",
                ],
                includes: [
                    "Live classes",
                    "Recorded sessions",
                    "Mock exams",
                ],
                whoThisIsFor: "Learners preparing for TEF CLB 5 for work permit extension.",
            },
        }),
        createCourseWithContent({
            title: "French A1 - Beginner French (2 months)",
            slug: "french-a1-beginner",
            description:
                "A 2-month beginner course for absolute beginners. Covers pronunciation, basic grammar, essential vocabulary, and everyday conversation with live online classes five days per week and recordings.",
            shortDescription: "Beginner French foundations with speaking practice from day one.",
            categoryId: categories[0].id,
            level: "BEGINNER",
            duration: 40,
            content: {
                whatYouWillLearn: [
                    "French alphabet and pronunciation basics",
                    "Present tense of common verbs",
                    "Everyday greetings and simple questions",
                ],
                courseFeatures: [
                    "Grammar foundations and basic sentence structure",
                    "Core vocabulary for daily life",
                    "Interactive speaking practice",
                ],
                prerequisites: ["No prior French required"],
                objectives: [
                    "Build a solid A1 foundation",
                    "Communicate in simple everyday situations",
                    "Understand basic spoken French",
                ],
                includes: [
                    "Live classes",
                    "Recorded sessions",
                    "Practice activities",
                ],
                whoThisIsFor: "Absolute beginners starting French from scratch.",
            },
        }),
        createCourseWithContent({
            title: "French A2 - Elementary French (2 months)",
            slug: "french-a2-elementary",
            description:
                "A 2-month A2 course for learners who completed A1. Focuses on past and future tenses, expanded vocabulary, and everyday communication through live online classes and recordings.",
            shortDescription: "Expand your French skills with A2 grammar and speaking practice.",
            categoryId: categories[0].id,
            level: "BEGINNER",
            duration: 40,
            content: {
                whatYouWillLearn: [
                    "Passe compose, imparfait, and near future",
                    "Daily-life vocabulary for travel and shopping",
                    "Short conversations and messages",
                ],
                courseFeatures: [
                    "Grammar expansion beyond A1",
                    "Role-plays for common situations",
                    "Reading and listening practice",
                ],
                prerequisites: ["A1 level or equivalent"],
                objectives: [
                    "Handle routine tasks in French",
                    "Describe past and future events",
                    "Write short messages and emails",
                ],
                includes: [
                    "Live classes",
                    "Recorded sessions",
                    "Structured practice",
                ],
                whoThisIsFor: "Learners progressing beyond A1 to A2 proficiency.",
            },
        }),
        createCourseWithContent({
            title: "French B1 - Intermediate French (3 months)",
            slug: "french-b1-intermediate",
            description:
                "A 3-month intermediate course for A2 graduates. Builds confidence in conversation, expands grammar to all common tenses, and develops reading and writing skills with live online classes and recordings.",
            shortDescription: "Gain independence in French with B1 speaking and writing skills.",
            categoryId: categories[1].id,
            level: "INTERMEDIATE",
            duration: 60,
            content: {
                whatYouWillLearn: [
                    "Confident use of past, present, and future tenses",
                    "Intermediate vocabulary for work and daily life",
                    "Structured speaking and writing",
                ],
                courseFeatures: [
                    "Listening with longer dialogues",
                    "Role-plays and discussions",
                    "Writing letters and short essays",
                ],
                prerequisites: ["A2 level or equivalent"],
                objectives: [
                    "Handle most everyday situations",
                    "Explain opinions with reasons",
                    "Write coherent short texts",
                ],
                includes: [
                    "Live classes",
                    "Recorded sessions",
                    "Feedback on speaking and writing",
                ],
                whoThisIsFor: "Learners aiming for independent B1 use of French.",
            },
        }),
        createCourseWithContent({
            title: "French B2 - Upper-Intermediate French (3 months)",
            slug: "french-b2-upper-intermediate",
            description:
                "A 3-month upper-intermediate course for B1 learners. Covers advanced grammar, richer vocabulary, and fluency in speaking and writing with authentic materials and live online classes.",
            shortDescription: "Reach B2 fluency with advanced grammar and real-world practice.",
            categoryId: categories[1].id,
            level: "INTERMEDIATE",
            duration: 60,
            content: {
                whatYouWillLearn: [
                    "Advanced grammar including subjunctive and conditionals",
                    "Fluent discussion of complex topics",
                    "Structured essays and reports",
                ],
                courseFeatures: [
                    "Authentic reading and listening materials",
                    "Debates, presentations, and discussions",
                    "Advanced writing with cohesion",
                ],
                prerequisites: ["B1 level or equivalent"],
                objectives: [
                    "Communicate fluently on complex topics",
                    "Write clear, detailed texts",
                    "Understand most spoken French in context",
                ],
                includes: [
                    "Live classes",
                    "Recorded sessions",
                    "Detailed feedback",
                ],
                whoThisIsFor: "Learners targeting strong B2 proficiency for work or study.",
            },
        }),
        createCourseWithContent({
            title: "1 Month TCF Canada Exam Prep (Intensive)",
            slug: "tcf-canada-1-month-prep",
            description:
                "A 1-month intensive TCF Canada preparation course focused on exam strategies, timed practice, and feedback for all sections: listening, reading, writing, and speaking.",
            shortDescription: "Intensive TCF exam strategies and mock tests in 1 month.",
            categoryId: categories[4].id,
            level: "INTERMEDIATE",
            duration: 20,
            content: {
                whatYouWillLearn: [
                    "TCF exam format, timing, and scoring",
                    "Strategies for listening and reading",
                    "Writing task structure and speaking techniques",
                ],
                courseFeatures: [
                    "Full mock exams under timed conditions",
                    "Targeted feedback on writing and speaking",
                    "Question-type drills and strategy reviews",
                ],
                prerequisites: ["Intermediate French (B1/B2) recommended"],
                objectives: [
                    "Maximize TCF scores with exam strategies",
                    "Improve speed and accuracy",
                    "Build confidence for test day",
                ],
                includes: [
                    "Mock exams",
                    "Personalized feedback",
                    "Strategy workshops",
                ],
                whoThisIsFor: "Learners close to target level who need focused TCF prep.",
            },
        }),
        createCourseWithContent({
            title: "1 Month TEF Canada Exam Prep (Intensive)",
            slug: "tef-canada-1-month-prep",
            description:
                "A 1-month intensive TEF Canada preparation course focused on exam format, strategies, timed practice, and feedback for listening, reading, writing, and speaking.",
            shortDescription: "Intensive TEF exam strategies and mock tests in 1 month.",
            categoryId: categories[3].id,
            level: "INTERMEDIATE",
            duration: 20,
            content: {
                whatYouWillLearn: [
                    "TEF exam structure and timing",
                    "Listening and reading tactics for speed",
                    "Writing task planning and speaking drills",
                ],
                courseFeatures: [
                    "Timed practice for all sections",
                    "Mock TEF exam with review",
                    "Feedback on speaking and writing",
                ],
                prerequisites: ["High B1 or B2 level recommended"],
                objectives: [
                    "Strengthen exam performance quickly",
                    "Apply time management strategies",
                    "Improve confidence and accuracy",
                ],
                includes: [
                    "Mock exams",
                    "Personalized feedback",
                    "Strategy sessions",
                ],
                whoThisIsFor: "Learners preparing for TEF Canada with limited time.",
            },
        }),
    ]);
    console.log("✓ Courses created:", courses.length);

    // Create test students for reviews
    const testStudents = await Promise.all([
        prisma.user.upsert({
            where: { email: "student1@prepfrench.com" },
            update: {},
            create: {
                email: "student1@prepfrench.com",
                name: "Sarah Johnson",
                role: "STUDENT",
            },
        }),
        prisma.user.upsert({
            where: { email: "student2@prepfrench.com" },
            update: {},
            create: {
                email: "student2@prepfrench.com",
                name: "Ahmed Khan",
                role: "STUDENT",
            },
        }),
        prisma.user.upsert({
            where: { email: "student3@prepfrench.com" },
            update: {},
            create: {
                email: "student3@prepfrench.com",
                name: "Maria Garcia",
                role: "STUDENT",
            },
        }),
        prisma.user.upsert({
            where: { email: "student4@prepfrench.com" },
            update: {},
            create: {
                email: "student4@prepfrench.com",
                name: "David Chen",
                role: "STUDENT",
            },
        }),
    ]);
    console.log("✓ Test students created:", testStudents.length);

    // Sample reviews data - 2-4 reviews per course with realistic content
    const reviewsData = [
        // Beginner French
        {
            courseIndex: 0,
            rating: 5,
            title: "Amazing course for beginners!",
            comment: "Michel is an excellent teacher. Very clear explanations and engaging lessons. I've made great progress in just a few weeks!",
            userId: testStudents[0].id,
        },
        {
            courseIndex: 0,
            rating: 4,
            title: "Great foundation course",
            comment: "The course structure is well-organized and easy to follow. Would appreciate more pronunciation practice, but overall very good.",
            userId: testStudents[1].id,
        },
        {
            courseIndex: 0,
            rating: 5,
            title: "Highly recommended!",
            comment: "This course gave me the confidence to start speaking French. The lessons are practical and applicable to real life.",
            userId: testStudents[2].id,
        },
        // TEF Canada Complete
        {
            courseIndex: 1,
            rating: 5,
            title: "Perfect for TEF preparation",
            comment: "Comprehensive coverage of all TEF exam sections. The mock tests are incredibly helpful and the feedback is constructive.",
            userId: testStudents[0].id,
        },
        {
            courseIndex: 1,
            rating: 4,
            title: "Excellent practice materials",
            comment: "Great course for exam prep. Lots of practice questions and explanations. Really helped me understand the exam format.",
            userId: testStudents[3].id,
        },
        {
            courseIndex: 1,
            rating: 5,
            title: "Worth every penny",
            comment: "I improved my TEF score significantly after taking this course. Michel's strategies for time management were game-changing.",
            userId: testStudents[1].id,
        },
        // Advanced French Conversation
        {
            courseIndex: 2,
            rating: 5,
            title: "Dramatically improved my French",
            comment: "This is the most engaging conversation course I've taken. Real-world scenarios and excellent feedback on pronunciation.",
            userId: testStudents[2].id,
        },
        {
            courseIndex: 2,
            rating: 4,
            title: "Great for advanced learners",
            comment: "High-quality instruction with challenging topics. Some lessons were quite intense but that helped me progress faster.",
            userId: testStudents[3].id,
        },
        // TCF Canada Full
        {
            courseIndex: 3,
            rating: 5,
            title: "Best TCF course available",
            comment: "Comprehensive and well-structured. The instructor knows exactly what TCF examiners are looking for. Highly recommend!",
            userId: testStudents[0].id,
        },
        {
            courseIndex: 3,
            rating: 5,
            title: "Aced my TCF exam",
            comment: "Thanks to this course, I achieved a CLB 9! The detailed grammar explanations and speaking practice were invaluable.",
            userId: testStudents[2].id,
        },
        // TCF Canada 6-Month
        {
            courseIndex: 4,
            rating: 4,
            title: "Solid preparation course",
            comment: "The 6-month structure allows time for proper practice. Good pace and effective teaching methods.",
            userId: testStudents[1].id,
        },
        {
            courseIndex: 4,
            rating: 5,
            title: "Life-changing course",
            comment: "Started from A2 level and now I'm at B2. This course provided the guidance and practice I needed to progress significantly.",
            userId: testStudents[3].id,
        },
        // TEF Canada Full
        {
            courseIndex: 5,
            rating: 5,
            title: "Excellent TEF preparation",
            comment: "Very thorough course covering all aspects of TEF. Michel provides personalized feedback which really helps improve weak areas.",
            userId: testStudents[0].id,
        },
        {
            courseIndex: 5,
            rating: 4,
            title: "Comprehensive and thorough",
            comment: "This course leaves no stone unturned. Great material and excellent instructor. Only wish there were more live sessions.",
            userId: testStudents[2].id,
        },
        // TEF Canada 6-Month
        {
            courseIndex: 6,
            rating: 5,
            title: "Perfect pace for learning",
            comment: "The 6-month format is perfect. It allowed me to balance the course with work while thoroughly mastering the material.",
            userId: testStudents[1].id,
        },
        {
            courseIndex: 6,
            rating: 5,
            title: "Transformed my French skills",
            comment: "I went from beginner to TEF-ready in 6 months. The structured curriculum and expert guidance made all the difference.",
            userId: testStudents[3].id,
        },
        // French A1 Beginner
        {
            courseIndex: 7,
            rating: 4,
            title: "Great introduction to French",
            comment: "Good foundational course. Clear explanations and good variety of exercises. Helped me get comfortable with basics.",
            userId: testStudents[0].id,
        },
        {
            courseIndex: 7,
            rating: 5,
            title: "Loved every lesson!",
            comment: "The instructor makes learning fun and engaging. I actually look forward to each lesson!",
            userId: testStudents[2].id,
        },
        // French A2 Elementary
        {
            courseIndex: 8,
            rating: 5,
            title: "Builds confidence",
            comment: "Perfect follow-up to A1. By the end, I could have simple conversations in French. Very encouraging course!",
            userId: testStudents[1].id,
        },
        {
            courseIndex: 8,
            rating: 4,
            title: "Solid A2 level course",
            comment: "Good structured progression. Some topics could use more practice, but overall excellent value.",
            userId: testStudents[3].id,
        },
        // French B1 Intermediate
        {
            courseIndex: 9,
            rating: 5,
            title: "Excellent intermediate course",
            comment: "Takes your French to the next level. Challenging but very rewarding. Great teaching methods!",
            userId: testStudents[0].id,
        },
        {
            courseIndex: 9,
            rating: 5,
            title: "Finally speaking fluently!",
            comment: "This course really helped me break through the intermediate plateau. Feeling confident in conversations now.",
            userId: testStudents[2].id,
        },
        // French B2 Upper Intermediate
        {
            courseIndex: 10,
            rating: 5,
            title: "Professional-level French",
            comment: "Now I can confidently communicate in professional settings. This course prepared me perfectly for my new job!",
            userId: testStudents[1].id,
        },
        {
            courseIndex: 10,
            rating: 5,
            title: "Nearly fluent!",
            comment: "Amazing course for upper-intermediate learners. Complex topics explained clearly. Worth the investment!",
            userId: testStudents[3].id,
        },
        // TCF Canada 1-Month
        {
            courseIndex: 11,
            rating: 4,
            title: "Intensive and effective",
            comment: "Perfect for last-minute exam prep. Covered everything I needed in just 1 month. Very efficient course design.",
            userId: testStudents[0].id,
        },
        {
            courseIndex: 11,
            rating: 5,
            title: "Crash course done right",
            comment: "Thought 1 month wouldn't be enough, but this intensive course really packed in the essentials. Great results!",
            userId: testStudents[2].id,
        },
        // TEF Canada 1-Month
        {
            courseIndex: 12,
            rating: 5,
            title: "Incredible intensive prep",
            comment: "Managed to improve my TEF score by two levels in just one month! The intensity and focus paid off massively.",
            userId: testStudents[1].id,
        },
        {
            courseIndex: 12,
            rating: 4,
            title: "Demanding but rewarding",
            comment: "This is not for the faint-hearted, but if you're committed, you'll see results. Very comprehensive for one month.",
            userId: testStudents[3].id,
        },
    ];

    // Create all reviews
    let reviewsCreated = 0;
    for (const reviewData of reviewsData) {
        const course = courses[reviewData.courseIndex];
        if (course) {
            await prisma.courseReview.upsert({
                where: {
                    userId_courseId: {
                        userId: reviewData.userId,
                        courseId: course.id,
                    },
                },
                update: {},
                create: {
                    courseId: course.id,
                    userId: reviewData.userId,
                    instructorId: instructor.id,
                    rating: reviewData.rating,
                    title: reviewData.title,
                    comment: reviewData.comment,
                    helpful: Math.floor(Math.random() * 15),
                },
            });
            reviewsCreated++;
        }
    }
    console.log("✓ Course reviews created:", reviewsCreated);

    // Create sample lessons for first course
    if (courses[0]) {
        const lessons = await Promise.all([
            prisma.courseLesson.create({
                data: {
                    courseId: courses[0].id,
                    title: "Introduction to French Alphabet",
                    description: "Learn the French alphabet and basic pronunciation rules",
                    order: 1,
                    duration: "25",
                },
            }),
            prisma.courseLesson.create({
                data: {
                    courseId: courses[0].id,
                    title: "Basic Greetings and Introductions",
                    description: "Master essential greetings and how to introduce yourself in French",
                    order: 2,
                    duration: "30",
                },
            }),
            prisma.courseLesson.create({
                data: {
                    courseId: courses[0].id,
                    title: "Numbers and Counting",
                    description: "Learn French numbers and basic counting",
                    order: 3,
                    duration: "20",
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
    console.log("   Instructor Email: instructor@prepfrench.com");
    console.log("   Instructor Password: instructor123");
    console.log("\n👥 Test Student Accounts (for viewing reviews):");
    console.log("   student1@prepfrench.com (Sarah Johnson)");
    console.log("   student2@prepfrench.com (Ahmed Khan)");
    console.log("   student3@prepfrench.com (Maria Garcia)");
    console.log("   student4@prepfrench.com (David Chen)");
    console.log("\n🔗 Access URLs:");
    console.log("   Courses: http://localhost:3000/course-grid-view");
    console.log("   Admin Panel: http://localhost:3000/admin");
    console.log("\n📊 Database Statistics:");
    console.log("   ✓ Courses: 13");
    console.log("   ✓ Categories: 6");
    console.log("   ✓ Reviews: 26 (2-4 per course)");
    console.log("   ✓ Users: 6 (1 admin + 1 instructor + 4 students)");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
