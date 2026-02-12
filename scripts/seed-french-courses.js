import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const frenchCourses = [
  {
    title: "9-10 Month Full TCF Canada (CLB 7, for PR)",
    slug: "9-10-month-full-tcf-canada-clb-7-pr",
    description: "This 9-10 month intensive program prepares students for the TCF Canada exam with a target of CLB 7 (approximately B2 level proficiency) required for Canadian permanent residency (PR). The course covers French language skills from the beginner level up to advanced, ensuring students build a strong foundation and progress to an upper-intermediate proficiency. Classes are delivered live online 5 days a week (about 20-22 hours of instruction per month), and recorded sessions are available for review or in case a class is missed. By the end of the program, students will be familiar with all sections of the TCF Canada exam and confident in their ability to achieve the required NCLC/CLB 7 scores.",
    shortDescription: "Comprehensive 9-10 month TCF Canada preparation targeting CLB 7 for Canadian PR",
    image: "/images/course/tcf-canada-full.jpg",
    level: "BEGINNER",
    language: "French",
    duration: 40,
    lessonsCount: 180,
    status: "PUBLISHED",
    featured: true,
    pricing: {
      originalPrice: 2999,
      discountedPrice: 2499,
      discountPercentage: 17,
      currency: "USD"
    },
    seo: {
      metaTitle: "TCF Canada Exam Preparation - CLB 7 | 9-10 Month Full Course",
      metaDescription: "Comprehensive 9-10 month TCF Canada preparation course targeting CLB 7 for Canadian PR. Live online classes, recorded sessions, mock tests, and personalized feedback.",
      metaKeywords: "TCF Canada, CLB 7, Canadian PR, French exam preparation, NCLC 7, B2 French"
    },
    content: {
      objectives: [
        "Develop all four language skills (listening, speaking, reading, writing) to an upper-intermediate B2 level",
        "Master essential French grammar and vocabulary to communicate effectively on everyday and formal topics",
        "Familiarize students with the TCF Canada exam format and question types (multiple-choice questions, writing tasks, speaking prompts) and teach test-taking strategies for each section",
        "Enable students to express complex ideas clearly in French, both orally and in writing, meeting the language criteria for Canadian immigration",
        "Build confidence through regular mock tests and feedback sessions, aiming to maximize scores in each section of the TCF Canada exam"
      ],
      prerequisites: [
        "Open to all learners, including beginners",
        "No prior knowledge of French is required",
        "Strong commitment to daily practice is expected",
        "Learners with basic French background will progress faster"
      ],
      highlights: [
        "Live online classes 5 days a week (20-22 hours/month)",
        "All classes recorded for review",
        "Covers A1 through B2 CEFR levels",
        "Experienced certified French instructors (DALF C1/C2 equivalent)",
        "Regular mock tests and personalized feedback",
        "Full TCF Canada exam format training"
      ],
      includes: [
        "180+ live online sessions",
        "All class recordings",
        "Full TCF Canada mock exams",
        "Personalized feedback on speaking and writing",
        "Study materials and practice resources",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "Complete French language skills from beginner to B2 level",
        "All TCF Canada exam sections: listening, reading, writing, speaking",
        "Test-taking strategies for multiple-choice questions",
        "Writing skills for all three TCF writing tasks (60-120, 120-150, 120-180 words)",
        "Speaking confidence for guided interview, role-play, and opinion expression",
        "Time management techniques for exam conditions"
      ],
      courseFeatures: [
        "Duration: 9-10 Months (Flexible Schedule)",
        "Level: Beginner to Upper-Intermediate (A1-B2)",
        "Mode: Live Online",
        "Includes: Certificate of Completion",
        "Bonus: Lifetime access to Recorded Sessions"
      ],
      whoThisIsFor: "This course is perfect for individuals planning to immigrate to Canada and need CLB 7 scores on the TCF Canada exam for their permanent residency application. No prior French knowledge required - we start from the basics and take you all the way to B2 proficiency.",
      highlightTip: "💡 Tip: With 20-22 hours of live instruction per month plus access to recordings, consistent attendance and daily practice will help you progress steadily from beginner to CLB 7 proficiency.",
      closingMessage: "Join thousands of successful students who have achieved their Canadian PR dreams through our comprehensive TCF Canada preparation program.",
      feeOneTitle: "Full Payment",
      feeOneDesc: "$2,499 USD (Save $500)",
      feeTwoTitle: "Monthly Installments",
      feeTwoDesc: "$299/month for 10 months"
    }
  },
  {
    title: "6 Month TCF Canada (CLB 5, for Work Permit Extension)",
    slug: "6-month-tcf-canada-clb-5-work-permit",
    description: "This 6-month course is designed for those aiming to achieve CLB 5 (approximately B1 level proficiency) on the TCF Canada exam, which is commonly required for programs like the Mobilité Francophone work permit extension. The program is accelerated and focuses on essential French skills needed to reach an intermediate level. Over 6 months, students will progress from basic French to lower-intermediate proficiency, roughly covering CEFR levels A1 through B1. Classes are live online 5 days a week (about 1 hour per session, ~20 hours per month), and recordings of each class are provided for review.",
    shortDescription: "Accelerated 6-month TCF Canada preparation targeting CLB 5 for work permit extension",
    image: "/images/course/tcf-canada-6month.jpg",
    level: "BEGINNER",
    language: "French",
    duration: 24,
    lessonsCount: 120,
    status: "PUBLISHED",
    featured: true,
    pricing: {
      originalPrice: 1799,
      discountedPrice: 1499,
      discountPercentage: 17,
      currency: "USD"
    },
    seo: {
      metaTitle: "TCF Canada CLB 5 - 6 Month Fast-Track Course",
      metaDescription: "Accelerated 6-month TCF Canada preparation targeting CLB 5 for Mobilité Francophone work permit extension. Live classes, recordings, and exam strategies.",
      metaKeywords: "TCF Canada, CLB 5, work permit extension, Mobilité Francophone, B1 French, fast-track French"
    },
    content: {
      objectives: [
        "Rapidly build core French skills to handle everyday situations and routine communications, aligning with a B1 (intermediate) proficiency",
        "Develop listening and reading comprehension sufficient to grasp the main idea of short conversations, announcements, or simple texts on familiar topics",
        "Enhance speaking abilities so students can participate in simple discussions, describe experiences and plans, and ask/answer questions in French with moderate ease",
        "Strengthen writing skills for practical tasks like writing emails, messages, or short paragraphs about familiar topics",
        "Prepare students for the TCF Canada exam format, with specific practice on question types and time management strategies suitable for achieving CLB 5"
      ],
      prerequisites: [
        "Open to beginners, but basic French knowledge (A1 level) is recommended",
        "Fast-paced course requiring commitment to additional self-study",
        "Consistent attendance essential due to compressed timeframe",
        "Students without prior French should be prepared for intensive learning"
      ],
      highlights: [
        "Live online classes 5 days a week (1 hour/session)",
        "All classes recorded for review",
        "Fast-track progression from A1 to B1",
        "Qualified instructors experienced in accelerated training",
        "TCF Canada exam-specific practice",
        "Full mock exam near course completion"
      ],
      includes: [
        "120+ live online sessions",
        "All class recordings",
        "TCF Canada practice materials",
        "Mock TCF exam with feedback",
        "Study materials for A1-B1 levels",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "Essential French skills from beginner to intermediate level",
        "TCF Canada exam format and question types",
        "Listening strategies for conversations and announcements",
        "Reading comprehension for everyday texts and notices",
        "Writing short messages and emails (80-120 words)",
        "Speaking in simple role-plays and expressing basic opinions"
      ],
      courseFeatures: [
        "Duration: 6 Months (Accelerated)",
        "Level: Beginner to Intermediate (A1-B1)",
        "Mode: Live Online",
        "Includes: Certificate of Completion",
        "Bonus: All Recorded Sessions Available"
      ],
      whoThisIsFor: "Perfect for individuals seeking Mobilité Francophone work permit extension or those who need CLB 5 scores quickly. Some basic French knowledge is helpful but not required. Due to the fast-paced nature, students must be ready for intensive learning and consistent commitment.",
      highlightTip: "💡 Tip: This accelerated 6-month program requires dedication. Plan for daily practice sessions beyond the live classes to reinforce learning and achieve CLB 5 proficiency.",
      closingMessage: "Fast-track your French learning and achieve your work permit extension goals with our proven accelerated TCF Canada program.",
      feeOneTitle: "Full Payment",
      feeOneDesc: "$1,499 USD (Save $300)",
      feeTwoTitle: "Monthly Installments",
      feeTwoDesc: "$269/month for 6 months"
    }
  },
  {
    title: "9-10 Month Full TEF Canada (CLB 7, for PR)",
    slug: "9-10-month-full-tef-canada-clb-7-pr",
    description: "This comprehensive 9-10 month program prepares students for the TEF Canada exam, targeting CLB 7 (B2 level proficiency) required for Canadian PR. The curriculum takes learners from the basics of French (A1) through to upper-intermediate (B2), ensuring all necessary language content is covered. Particular emphasis is placed on the format of the TEF exam, which is slightly different from TCF: TEF Canada is shorter (around 2 hours) and includes a combination of multiple-choice and open-ended questions. Classes are held live online 5 days per week (~20-22 hours per month), and all lessons are recorded.",
    shortDescription: "Comprehensive 9-10 month TEF Canada preparation targeting CLB 7 for Canadian PR",
    image: "/images/course/tef-canada-full.jpg",
    level: "BEGINNER",
    language: "French",
    duration: 40,
    lessonsCount: 180,
    status: "PUBLISHED",
    featured: true,
    pricing: {
      originalPrice: 2999,
      discountedPrice: 2499,
      discountPercentage: 17,
      currency: "USD"
    },
    seo: {
      metaTitle: "TEF Canada Exam Preparation - CLB 7 | 9-10 Month Full Course",
      metaDescription: "Comprehensive TEF Canada preparation course for CLB 7 targeting Canadian PR. Expert instructors, live classes, full exam practice, and personalized feedback.",
      metaKeywords: "TEF Canada, CLB 7, Canadian PR, French exam, B2 French, NCLC 7, TEF preparation"
    },
    content: {
      objectives: [
        "Guide students to an upper-intermediate (B2) level of French, enabling them to understand and communicate complex ideas effectively",
        "Cover all essential French grammar and vocabulary from A1 through B2, ensuring a solid foundation and comprehensive skill set",
        "Train students specifically for the TEF Canada exam structure with strategies tailored to each section",
        "Teach time management techniques for TEF's shorter duration (about 2 hours)",
        "Increase students' confidence through regular practice exams and personalized feedback, maximizing their potential CLB score"
      ],
      prerequisites: [
        "No prior French knowledge required (we begin at A1 level)",
        "Open to learners of all levels, including beginners",
        "Steady and intensive learning pace expected",
        "Commit to regular practice outside of class hours"
      ],
      highlights: [
        "Live online classes 5 days a week (20-22 hours/month)",
        "All lessons recorded for review",
        "Complete A1 to B2 coverage",
        "Expert instructors with TEF Canada specialization",
        "Full TEF Canada mock exams",
        "Personalized feedback on all four skills"
      ],
      includes: [
        "180+ live online sessions",
        "All class recordings",
        "Full TEF Canada mock exams",
        "Individual feedback on writing and speaking",
        "Comprehensive study materials (A1-B2)",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "Complete French proficiency from beginner to B2 level",
        "TEF Canada exam format: listening (60 questions), reading (50 questions)",
        "TEF writing: 2 tasks (short writing ~150 words, argumentative ~200-250 words)",
        "TEF speaking: Section A (5-min role-play) and Section B (10-min opinion discussion)",
        "Time management for TEF's 2-hour format",
        "Advanced grammar including subjunctive and conditional moods"
      ],
      courseFeatures: [
        "Duration: 9-10 Months (Comprehensive)",
        "Level: Beginner to Upper-Intermediate (A1-B2)",
        "Mode: Live Online",
        "Includes: Certificate of Completion",
        "Bonus: Lifetime access to Recorded Sessions"
      ],
      whoThisIsFor: "Ideal for individuals planning Canadian permanent residency who need CLB 7 on the TEF Canada exam. Perfect for complete beginners as we cover everything from A1 to B2. The comprehensive curriculum ensures you build strong fundamentals and progress confidently to advanced proficiency.",
      highlightTip: "💡 Tip: TEF Canada has a shorter test duration than TCF (around 2 hours vs 3+ hours). Our training focuses on quick decision-making and efficient time management specific to TEF's format.",
      closingMessage: "With intensive practice, expert instruction, and comprehensive coverage from A1 to B2, our TEF Canada program prepares you to achieve your Canadian PR goals.",
      feeOneTitle: "Full Payment",
      feeOneDesc: "$2,499 USD (Save $500)",
      feeTwoTitle: "Monthly Installments",
      feeTwoDesc: "$299/month for 10 months"
    }
  },
  {
    title: "6 Month TEF Canada (CLB 5, for Work Permit Extension)",
    slug: "6-month-tef-canada-clb-5-work-permit",
    description: "This 6-month accelerated course is tailored to students who need to achieve CLB 5 (approx. B1 level) on the TEF Canada exam, for purposes such as the Mobilité Francophone work permit extension. In half a year, the course revises fundamental French and pushes into intermediate territory, focusing on practical language skills and exam strategies. It condenses levels A1 to B1, highlighting the most important grammar and vocabulary needed to function at an intermediate level in French. Classes meet online 5 days a week (~1 hour each session, totaling about 20 hours per month).",
    shortDescription: "Accelerated 6-month TEF Canada preparation targeting CLB 5 for work permit extension",
    image: "/images/course/tef-canada-6month.jpg",
    level: "BEGINNER",
    language: "French",
    duration: 24,
    lessonsCount: 120,
    status: "PUBLISHED",
    featured: true,
    pricing: {
      originalPrice: 1799,
      discountedPrice: 1499,
      discountPercentage: 17,
      currency: "USD"
    },
    seo: {
      metaTitle: "TEF Canada CLB 5 - 6 Month Accelerated Course",
      metaDescription: "Fast-track 6-month TEF Canada preparation for CLB 5. Perfect for Mobilité Francophone work permit extension. Live classes and exam strategies.",
      metaKeywords: "TEF Canada, CLB 5, work permit, Mobilité Francophone, B1 French, accelerated French"
    },
    content: {
      objectives: [
        "Improve students' French proficiency from basic to intermediate (B1) within 6 months",
        "Reinforce key grammar points (present, past, future tenses; questions; basic connectors) and introduce intermediate structures",
        "Expand relevant vocabulary for common scenarios (daily life, travel, work basics, etc.)",
        "Provide targeted exam preparation for TEF Canada, practicing the specific format of all sections",
        "Develop test-taking strategies to maximize the CLB level students can achieve"
      ],
      prerequisites: [
        "At least basic foundation in French (A1 level or higher) required",
        "Not recommended for absolute beginners due to accelerated pace",
        "A2 level students will benefit greatly",
        "Intensive learning commitment required: consistent attendance and practice"
      ],
      highlights: [
        "Live online classes 5 days a week (1 hour/session)",
        "All classes recorded for review",
        "Fast-track A1 to B1 progression",
        "Expert instructors in short-term exam prep",
        "TEF-specific practice materials",
        "Full mock exam with detailed feedback"
      ],
      includes: [
        "120+ live online sessions",
        "All class recordings",
        "TEF Canada practice materials",
        "Full mock TEF exam",
        "Study materials for A1-B1 levels",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "French fundamentals refresher and intermediate skills",
        "TEF listening: 60 multiple-choice questions in 40 minutes",
        "TEF reading: 50 questions on various texts in 60 minutes",
        "TEF writing: 2 tasks (personal letter ~150 words, argumentative essay ~200 words)",
        "TEF speaking: Section A (5-min role-play) and Section B (10-min opinion)",
        "Exam strategies for quick decision-making and time management"
      ],
      courseFeatures: [
        "Duration: 6 Months (Accelerated)",
        "Level: Elementary to Intermediate (A1-B1)",
        "Mode: Live Online",
        "Includes: Certificate of Completion",
        "Bonus: All Recorded Sessions Available"
      ],
      whoThisIsFor: "Perfect for those seeking Mobilité Francophone work permit extension who already have at least A1-level French. The accelerated pace requires dedication but delivers results for students committed to achieving CLB 5 quickly.",
      highlightTip: "💡 Tip: Success in this accelerated program requires consistent attendance and independent practice. Dedicate time daily to homework and revision to keep pace with the intensive curriculum.",
      closingMessage: "Achieve your work permit extension goals efficiently with our proven 6-month TEF Canada accelerated program.",
      feeOneTitle: "Full Payment",
      feeOneDesc: "$1,499 USD (Save $300)",
      feeTwoTitle: "Monthly Installments",
      feeTwoDesc: "$269/month for 6 months"
    }
  },
  {
    title: "French A1 – Beginner French",
    slug: "french-a1-beginner",
    description: "The French A1 course is a 2-month beginner program designed for absolute beginners or those with minimal French background. It provides a solid introduction to the French language, covering fundamental grammar, essential vocabulary, pronunciation, and basic cultural context. The classes (approximately 1 hour per day, 5 days a week) are live and interactive, emphasizing communication from day one. By the end of the course, learners will achieve the A1 level as per CEFR, meaning they can understand and use everyday expressions and very simple phrases.",
    shortDescription: "2-month beginner French course covering fundamentals, pronunciation, and basic communication",
    image: "/images/course/french-a1.jpg",
    level: "BEGINNER",
    language: "French",
    duration: 8,
    lessonsCount: 40,
    status: "PUBLISHED",
    featured: false,
    pricing: {
      originalPrice: 599,
      discountedPrice: 499,
      discountPercentage: 17,
      currency: "USD"
    },
    seo: {
      metaTitle: "French A1 Beginner Course | 2 Months Online",
      metaDescription: "Learn French from scratch with our A1 beginner course. Live interactive classes, pronunciation training, essential grammar, and everyday vocabulary.",
      metaKeywords: "French A1, beginner French, learn French online, French basics, CEFR A1"
    },
    content: {
      objectives: [
        "Acquire correct French pronunciation of the alphabet and common sounds",
        "Learn fundamental grammar concepts (gender of nouns, singular/plural, basic verb conjugation)",
        "Build a beginner's vocabulary (~500 words) covering everyday topics",
        "Develop listening skills to recognize familiar words and basic phrases when people speak slowly",
        "Enable students to greet others, introduce themselves, and engage in very basic conversations"
      ],
      prerequisites: [
        "None - this course is for complete beginners",
        "Willingness to participate actively in class",
        "Small amount of practice homework regularly",
        "No prior linguistic knowledge required"
      ],
      highlights: [
        "Live interactive classes 1 hour/day, 5 days/week",
        "All classes recorded for review",
        "Focus on communication from day one",
        "Patient and encouraging instructors",
        "Cultural context included",
        "Fun learning through songs, visuals, and role-play"
      ],
      includes: [
        "40+ live online sessions",
        "All class recordings",
        "Beginner study materials",
        "Simple quizzes and assessments",
        "Cultural insights into French customs",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "French pronunciation and alphabet",
        "Basic grammar: noun genders, articles (le, la, un, une), present tense",
        "Essential vocabulary: numbers, days, time, family, food, places",
        "Greetings and courtesy phrases (Bonjour, Merci, S'il vous plaît)",
        "Simple sentences and basic questions",
        "Ordering in cafés and restaurants, asking for directions"
      ],
      courseFeatures: [
        "Duration: 2 Months",
        "Level: Complete Beginner (A1)",
        "Mode: Live Online Interactive",
        "Includes: Certificate of Completion",
        "Bonus: Recording of all sessions"
      ],
      whoThisIsFor: "Perfect for absolute beginners with no prior French knowledge. Whether you're learning for travel, work, or personal enrichment, this course provides a solid foundation in French basics through engaging, interactive lessons.",
      highlightTip: "💡 Tip: Practice pronunciation daily, even for just 10 minutes. French sounds are different from English, and regular practice will help you develop correct pronunciation habits from the start.",
      closingMessage: "Begin your French journey with confidence. Our supportive A1 course makes learning French accessible and enjoyable for everyone.",
      feeOneTitle: "Full Payment",
      feeOneDesc: "$499 USD (Save $100)",
      feeTwoTitle: "Split Payment",
      feeTwoDesc: "$269/month for 2 months"
    }
  },
  {
    title: "French A2 – Elementary French",
    slug: "french-a2-elementary",
    description: "The French A2 course is a 2-month program aimed at learners who have completed A1 (beginner level) and want to further expand their language skills. At A2, students strengthen their foundation and gain the ability to handle more complex everyday situations in French. This course deepens grammar knowledge (introducing past and future tenses), enlarges vocabulary, and improves students' ability to understand and communicate ideas in areas beyond the basics. By the end of the course, students will reach A2 proficiency.",
    shortDescription: "2-month elementary French course expanding grammar, vocabulary, and everyday communication skills",
    image: "/images/course/french-a2.jpg",
    level: "BEGINNER",
    language: "French",
    duration: 8,
    lessonsCount: 40,
    status: "PUBLISHED",
    featured: false,
    pricing: {
      originalPrice: 599,
      discountedPrice: 499,
      discountPercentage: 17,
      currency: "USD"
    },
    seo: {
      metaTitle: "French A2 Elementary Course | Build Your Skills",
      metaDescription: "Expand your French skills with our A2 course. Learn past and future tenses, daily life vocabulary, and handle everyday situations with confidence.",
      metaKeywords: "French A2, elementary French, A2 CEFR, French grammar, past tense French"
    },
    content: {
      objectives: [
        "Expand understanding of French grammar by introducing additional verb tenses (past and future)",
        "Increase vocabulary breadth to include travel, health, shopping, routines, and hobbies",
        "Improve listening comprehension so students can understand slow, clear speech on familiar subjects",
        "Enhance speaking skills to handle short social exchanges and describe aspects of their background",
        "Develop reading and writing abilities to deal with simple texts and write short personal messages"
      ],
      prerequisites: [
        "A1 level French knowledge required",
        "Comfortable with basic present tense sentences",
        "Knowledge of basic vocabulary (numbers, family, daily activities)",
        "Completion of our French A1 course or equivalent (60-80 hours of study)"
      ],
      highlights: [
        "Live classes 1 hour/day, 5 days/week",
        "All classes recorded",
        "Introduction to past and future tenses",
        "Expanded vocabulary themes",
        "Engaging instructor using immersive French",
        "Cultural insights and French songs/videos"
      ],
      includes: [
        "40+ live online sessions",
        "All class recordings",
        "A2 level study materials",
        "Reading and writing practice exercises",
        "Mock DELF A2 style practice",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "Past tenses: passé composé and imparfait",
        "Future tenses: futur proche and introduction to futur simple",
        "Object pronouns and reflexive verbs",
        "Comparatives and superlatives",
        "Daily routine, travel, housing, shopping vocabulary",
        "Describing past events and future plans"
      ],
      courseFeatures: [
        "Duration: 2 Months",
        "Level: Elementary (A2)",
        "Mode: Live Online",
        "Includes: Certificate of Completion",
        "Bonus: Mock DELF A2 Practice"
      ],
      whoThisIsFor: "Perfect for students who have completed A1 level and want to progress to elementary French. You'll learn to communicate in routine situations, describe your experiences, and handle everyday transactions in French.",
      highlightTip: "💡 Tip: Practice storytelling using past tenses daily. Try describing what you did yesterday or last weekend in French to build fluency with passé composé and imparfait.",
      closingMessage: "Build on your foundation and take your French to the next level. Our A2 course deepens your skills and prepares you for intermediate study.",
      feeOneTitle: "Full Payment",
      feeOneDesc: "$499 USD (Save $100)",
      feeTwoTitle: "Split Payment",
      feeTwoDesc: "$269/month for 2 months"
    }
  },
  {
    title: "French B1 – Intermediate French",
    slug: "french-b1-intermediate",
    description: "The French B1 course is a 3-month intermediate program for students who have a solid foundation in elementary French (A2 level). At B1, learners transition from understanding and responding to simple content to expressing themselves on broader topics and handling more complex interactions. This course focuses on enabling students to become independent users of French: they'll practice narrating events, explaining opinions, and dealing with situations likely to arise in daily life or travel.",
    shortDescription: "3-month intermediate French course for independent language use and complex interactions",
    image: "/images/course/french-b1.jpg",
    level: "INTERMEDIATE",
    language: "French",
    duration: 12,
    lessonsCount: 60,
    status: "PUBLISHED",
    featured: false,
    pricing: {
      originalPrice: 899,
      discountedPrice: 749,
      discountPercentage: 17,
      currency: "USD"
    },
    seo: {
      metaTitle: "French B1 Intermediate Course | 3 Months",
      metaDescription: "Achieve intermediate French proficiency with our B1 course. Learn subjunctive mood, advanced grammar, and express opinions on complex topics.",
      metaKeywords: "French B1, intermediate French, B1 CEFR, French subjunctive, CLB 6"
    },
    content: {
      objectives: [
        "Solidify and expand grammar knowledge to cover virtually all everyday French structures",
        "Expand vocabulary to include current events, work and study contexts, and abstract topics",
        "Develop listening comprehension to follow conversations or media on familiar topics",
        "Enhance speaking abilities to achieve greater fluency and spontaneity in conversations",
        "Improve reading and writing skills for intermediate-level content"
      ],
      prerequisites: [
        "Completion of French A2 level or equivalent required",
        "Good grasp of passé composé vs imparfait usage",
        "Comfortable with everyday vocabulary",
        "Able to form sentences and short paragraphs",
        "Course taught mostly in French"
      ],
      highlights: [
        "Live classes 5 days/week (1 hour/day)",
        "All classes recorded",
        "Introduction to subjunctive mood",
        "Vocabulary for abstract topics",
        "Group discussions and debates",
        "Short presentations practice"
      ],
      includes: [
        "60+ live online sessions",
        "All class recordings",
        "B1 level study materials",
        "Real French media (articles, audio clips)",
        "Mock DELF B1 exam practice",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "Complete mastery of all indicative tenses",
        "Introduction to subjunctive mood",
        "Relative clauses with qui, que, où, dont",
        "Double object pronouns (le lui, la leur)",
        "Conditional mood for hypotheticals",
        "Expressing opinions and participating in debates"
      ],
      courseFeatures: [
        "Duration: 3 Months",
        "Level: Intermediate (B1)",
        "Mode: Live Online",
        "Includes: Certificate of Completion",
        "Bonus: Mock DELF B1 Exam"
      ],
      whoThisIsFor: "Designed for students with solid elementary French (A2) who want to become independent French users. Perfect for those planning to travel, work, or study in French-speaking environments. Equivalent to CLB/NCLC 6.",
      highlightTip: "💡 Tip: At B1, think in French rather than translating from English. Practice expressing your daily thoughts in French, even simple ones, to build spontaneous speaking skills.",
      closingMessage: "Master intermediate French and become an independent language user. Our B1 course prepares you for most everyday situations in French-speaking environments.",
      feeOneTitle: "Full Payment",
      feeOneDesc: "$749 USD (Save $150)",
      feeTwoTitle: "Monthly Installments",
      feeTwoDesc: "$269/month for 3 months"
    }
  },
  {
    title: "French B2 – Upper-Intermediate French",
    slug: "french-b2-upper-intermediate",
    description: "The French B2 course is a 3-month upper-intermediate program intended for those who have completed the B1 level and aim to achieve a more advanced degree of proficiency. At B2, learners are expected to handle complex tasks and discussions in French with a high degree of fluency and accuracy. This course focuses on refining grammar (covering advanced structures like the full range of subjunctive uses, advanced conditionals, etc.), expanding vocabulary to a near-native range, and improving the ability to understand and produce detailed and structured language.",
    shortDescription: "3-month upper-intermediate French course for advanced proficiency and complex communication",
    image: "/images/course/french-b2.jpg",
    level: "ADVANCED",
    language: "French",
    duration: 12,
    lessonsCount: 60,
    status: "PUBLISHED",
    featured: false,
    pricing: {
      originalPrice: 899,
      discountedPrice: 749,
      discountPercentage: 17,
      currency: "USD"
    },
    seo: {
      metaTitle: "French B2 Upper-Intermediate Course | Advanced Proficiency",
      metaDescription: "Achieve advanced French proficiency with our B2 course. Master subjunctive, read authentic materials, and communicate like a near-native speaker.",
      metaKeywords: "French B2, upper-intermediate French, B2 CEFR, advanced French, CLB 7, CLB 8"
    },
    content: {
      objectives: [
        "Achieve confident control over advanced French grammar, including complex sentence structures",
        "Greatly expand lexicon to include specialized terminology and idioms",
        "Train students to understand main ideas and details of complex spoken French",
        "Enhance speaking skills to give clear, detailed descriptions and arguments on complex subjects",
        "Improve writing skills to produce well-structured, cohesive, and detailed texts"
      ],
      prerequisites: [
        "Completion of French B1 or equivalent proficiency required",
        "Comfortable reading and listening to straightforward French texts",
        "Able to write cohesive paragraphs or essays about familiar topics",
        "Can engage in extended conversations on everyday subjects",
        "Strong B1 foundation crucial for this challenging level"
      ],
      highlights: [
        "Live classes 5 days/week (20 hours/month)",
        "All lessons recorded",
        "Classes conducted entirely in French",
        "Authentic materials: news, literature, media",
        "Individualized feedback on fossilized errors",
        "Cultural nuance and idiomatic expressions"
      ],
      includes: [
        "60+ live online sessions",
        "All class recordings",
        "B2 level study materials",
        "Authentic French media materials",
        "Mock DELF B2 exam",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "Full range of subjunctive uses (doubt, emotion, necessity)",
        "Advanced conditional and hypothetical structures",
        "Complex relative pronouns (lequel, auquel, duquel)",
        "Gerund and present participle usage",
        "Idiomatic expressions and colloquialisms",
        "Formal and informal registers"
      ],
      courseFeatures: [
        "Duration: 3 Months",
        "Level: Upper-Intermediate (B2)",
        "Mode: Live Online (French immersion)",
        "Includes: Certificate of Completion",
        "Bonus: Mock DELF B2 Exam"
      ],
      whoThisIsFor: "For students with strong B1 foundation aiming for near-native proficiency. Perfect for those planning to work, study, or socialize comfortably with native French speakers. Equivalent to CLB/NCLC 7-8.",
      highlightTip: "💡 Tip: Immerse yourself in French media daily. Watch French news, read French articles, and listen to French podcasts to train your ear for natural, fast-paced French.",
      closingMessage: "Achieve near-native proficiency and function fully in French-speaking environments. Our B2 course prepares you for work, study, and social interactions at an advanced level.",
      feeOneTitle: "Full Payment",
      feeOneDesc: "$749 USD (Save $150)",
      feeTwoTitle: "Monthly Installments",
      feeTwoDesc: "$269/month for 3 months"
    }
  },
  {
    title: "1 Month TCF Canada Exam Prep (Intensive)",
    slug: "1-month-tcf-canada-exam-prep-intensive",
    description: "This 1-month intensive course is dedicated entirely to preparing for the TCF Canada exam. It is ideal for students who already have an intermediate to advanced level of French (roughly B1-B2) and need focused training on exam strategies, practice tests, and skill refinement to maximize their TCF Canada scores. The course is short but rigorous: live online classes run 5 days a week (around 1 hour per day), covering all exam sections (listening, reading, writing, speaking) in depth.",
    shortDescription: "Intensive 1-month TCF Canada exam preparation with strategies and practice tests",
    image: "/images/course/tcf-exam-prep.jpg",
    level: "INTERMEDIATE",
    language: "French",
    duration: 4,
    lessonsCount: 20,
    status: "PUBLISHED",
    featured: true,
    pricing: {
      originalPrice: 499,
      discountedPrice: 399,
      discountPercentage: 20,
      currency: "USD"
    },
    seo: {
      metaTitle: "1 Month TCF Canada Exam Prep | Intensive Course",
      metaDescription: "Intensive 1-month TCF Canada exam preparation. Master test strategies, time management, and maximize your scores with mock exams and personalized feedback.",
      metaKeywords: "TCF Canada exam prep, TCF intensive, exam strategies, TCF practice tests, CLB preparation"
    },
    content: {
      objectives: [
        "Provide comprehensive familiarity with the TCF Canada exam format, timing, and scoring",
        "Teach targeted strategies for multiple-choice listening and reading questions",
        "Offer extensive practice for the writing tasks (3 tasks in 60 minutes) with time management guidance",
        "Train students for the speaking test, focusing on all 3 parts",
        "Identify individual weaknesses through diagnostic tests and provide targeted practice",
        "Simulate real exam conditions through full-length mock exams"
      ],
      prerequisites: [
        "Solid intermediate level (B1/B2) in French highly recommended",
        "Course does not cover basic French instruction",
        "Comfortable with general French conversation, reading, and writing",
        "Near target level (e.g., B2 minus or B1 plus for CLB 7)",
        "Dedication to homework and practice essential"
      ],
      highlights: [
        "Live classes 5 days/week (1 hour/day)",
        "All classes recorded",
        "Diagnostic test at start",
        "Exam preparation specialist instructor",
        "Full TCF Canada mock exams",
        "Personalized feedback on all sections"
      ],
      includes: [
        "20+ live online sessions",
        "All class recordings",
        "Diagnostic and mock exams",
        "TCF Canada practice materials",
        "Personalized feedback reports",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "TCF listening strategies: 39 questions, progressive difficulty",
        "TCF reading strategies: skimming, scanning, identifying synonyms",
        "Writing Task 1: short messages (60-120 words)",
        "Writing Task 2: narrative/report (120-150 words)",
        "Writing Task 3: argumentative text (120-180 words)",
        "Speaking: interview, role-play (2min prep), opinion (4min no prep)"
      ],
      courseFeatures: [
        "Duration: 1 Month (Intensive)",
        "Level: B1-B2 Required",
        "Mode: Live Online",
        "Includes: Full Mock Exams",
        "Bonus: Diagnostic Test & Feedback"
      ],
      whoThisIsFor: "Perfect for students who already have intermediate-advanced French (B1-B2) and need focused exam preparation. Not suitable for beginners. Ideal for final preparation before taking the official TCF Canada exam.",
      highlightTip: "💡 Tip: This intensive course requires dedication beyond class time. Complete all practice exercises and essays for review to maximize your score improvement in just one month.",
      closingMessage: "Boost your TCF Canada scores with expert strategies and intensive practice. Our focused 1-month prep maximizes your exam potential.",
      feeOneTitle: "Full Payment Only",
      feeOneDesc: "$399 USD (Limited time offer)",
      feeTwoTitle: "",
      feeTwoDesc: ""
    }
  },
  {
    title: "1 Month TEF Canada Exam Prep (Intensive)",
    slug: "1-month-tef-canada-exam-prep-intensive",
    description: "This 1-month intensive program is aimed at students preparing for the TEF Canada exam who already possess strong intermediate or advanced French skills and need targeted exam training. Like the TCF prep, this course focuses on exam format familiarization, strategy development, and practice, but tailored to the specifics of TEF Canada – namely, its combination of multiple-choice and written/oral production tasks and slightly shorter test duration. Classes meet online 5 days a week (around 1 hour each day) for 4 weeks.",
    shortDescription: "Intensive 1-month TEF Canada exam preparation with format-specific strategies",
    image: "/images/course/tef-exam-prep.jpg",
    level: "INTERMEDIATE",
    language: "French",
    duration: 4,
    lessonsCount: 20,
    status: "PUBLISHED",
    featured: true,
    pricing: {
      originalPrice: 499,
      discountedPrice: 399,
      discountPercentage: 20,
      currency: "USD"
    },
    seo: {
      metaTitle: "1 Month TEF Canada Exam Prep | Intensive Course",
      metaDescription: "Intensive TEF Canada exam preparation in 1 month. Master test-taking strategies, practice all sections, and maximize your CLB scores.",
      metaKeywords: "TEF Canada exam prep, TEF intensive, exam strategies, TEF practice, CLB preparation"
    },
    content: {
      objectives: [
        "Make students completely familiar with TEF Canada exam structure and sections",
        "Teach effective techniques for fast processing of multiple-choice questions",
        "Provide intensive practice for the two writing tasks of TEF Canada",
        "Sharpen speaking abilities for Section A (5-min role-play) and Section B (10-min opinion)",
        "Identify and target students' weak spots with personalized strategies",
        "Simulate full TEF Canada exams to build endurance and time management"
      ],
      prerequisites: [
        "French level of roughly B2 or high B1 recommended",
        "Comfortable communicating in French on everyday topics with ease",
        "Some writing experience required",
        "Production-heavy tasks require fluent sentence construction",
        "Lower level students should take general French course first"
      ],
      highlights: [
        "Live classes 5 days/week (1 hour/day)",
        "All classes recorded",
        "Initial assessment/mini mock",
        "TEF Canada exam expert instructor",
        "Full TEF mock exam",
        "Individual feedback on all tasks"
      ],
      includes: [
        "20+ live online sessions",
        "All class recordings",
        "Initial assessment and full mock exam",
        "TEF Canada practice materials",
        "Personalized feedback reports",
        "Certificate of completion"
      ],
      whatYouWillLearn: [
        "TEF listening: 60 MC questions in 40 minutes",
        "TEF reading: 50 questions in 60 minutes",
        "Writing Task 1: formal/informal correspondence (~150 words)",
        "Writing Task 2: argumentative essay/letter (~200-250 words)",
        "Speaking Section A: information-seeking role-play (5 min)",
        "Speaking Section B: opinion monologue + discussion (10 min)"
      ],
      courseFeatures: [
        "Duration: 1 Month (Intensive)",
        "Level: B1-B2 Required",
        "Mode: Live Online",
        "Includes: Full Mock Exam",
        "Bonus: Initial Assessment"
      ],
      whoThisIsFor: "Designed for students with strong intermediate-advanced French (B1/B2) who need targeted TEF Canada exam preparation. Perfect for final preparation before the official exam. Not suitable for beginners or basic-level students.",
      highlightTip: "💡 Tip: TEF's shorter 2-hour format requires efficient time management. Practice under timed conditions regularly to build speed and confidence in all sections.",
      closingMessage: "Master the TEF Canada exam with intensive practice and expert strategies. Our focused 1-month program boosts your confidence and scores.",
      feeOneTitle: "Full Payment Only",
      feeOneDesc: "$399 USD (Limited time offer)",
      feeTwoTitle: "",
      feeTwoDesc: ""
    }
  }
];

async function main() {
  console.log('Starting French courses seeding...');

  // First, check if we need to create a default category and instructor
  let category = await prisma.category.findFirst({
    where: { name: 'French Language' }
  });

  if (!category) {
    console.log('Creating French Language category...');
    category = await prisma.category.create({
      data: {
        name: 'French Language',
        slug: 'french-language',
        description: 'Comprehensive French language courses from beginner to advanced, including TCF and TEF Canada exam preparation'
      }
    });
    console.log('✓ Category created');
  } else {
    console.log('✓ French Language category already exists');
  }

  let instructor = await prisma.instructor.findFirst({
    where: {
      user: {
        email: 'french.instructor@example.com'
      }
    }
  });

  if (!instructor) {
    console.log('Creating default French instructor...');
    const user = await prisma.user.create({
      data: {
        name: 'French Department',
        email: 'french.instructor@example.com',
        password: 'dummy-password-change-this',
        role: 'INSTRUCTOR'
      }
    });

    instructor = await prisma.instructor.create({
      data: {
        userId: user.id,
        firstName: 'French',
        lastName: 'Department',
        bio: 'Expert French instructors certified with DALF C1/C2 or equivalent, specializing in TCF and TEF Canada exam preparation.',
        socialLinks: {
          website: 'https://example.com',
          linkedin: 'https://linkedin.com/company/example'
        }
      }
    });
    console.log('✓ Instructor created');
  } else {
    console.log('✓ Instructor already exists');
  }

  // Create all courses
  for (const courseData of frenchCourses) {
    console.log(`\nCreating course: ${courseData.title}...`);

    try {
      // First create the pricing
      const pricing = await prisma.coursePrice.create({
        data: {
          originalPrice: courseData.pricing.originalPrice,
          discountedPrice: courseData.pricing.discountedPrice,
          discountPercentage: courseData.pricing.discountPercentage,
          currency: courseData.pricing.currency
        }
      });

      // Then create the course with all relations
      const course = await prisma.course.create({
        data: {
          title: courseData.title,
          slug: courseData.slug,
          description: courseData.description,
          shortDescription: courseData.shortDescription,
          image: courseData.image,
          level: courseData.level,
          language: courseData.language,
          duration: courseData.duration,
          lessonsCount: courseData.lessonsCount,
          status: courseData.status,
          featured: courseData.featured,
          categoryId: category.id,
          instructorId: instructor.id,
          pricingId: pricing.id,
          seo: {
            create: {
              metaTitle: courseData.seo.metaTitle,
              metaDescription: courseData.seo.metaDescription,
              metaKeywords: courseData.seo.metaKeywords
            }
          },
          content: {
            create: {
              whatYouWillLearn: courseData.content.whatYouWillLearn || [],
              courseFeatures: courseData.content.courseFeatures || [],
              keyBenefits: courseData.content.keyBenefits || [],
              toolsResources: courseData.content.toolsResources || [],
              prerequisites: courseData.content.prerequisites || [],
              objectives: courseData.content.objectives || [],
              highlights: courseData.content.highlights || [],
              includes: courseData.content.includes || [],
              whoThisIsFor: courseData.content.whoThisIsFor || null,
              highlightTip: courseData.content.highlightTip || null,
              closingMessage: courseData.content.closingMessage || null,
              sidebarImage: courseData.content.sidebarImage || null,
              videoUrl: courseData.content.videoUrl || null,
              feeOneTitle: courseData.content.feeOneTitle || null,
              feeOneDesc: courseData.content.feeOneDesc || null,
              feeTwoTitle: courseData.content.feeTwoTitle || null,
              feeTwoDesc: courseData.content.feeTwoDesc || null
            }
          }
        }
      });

      console.log(`✓ Created course: ${course.title} (ID: ${course.id})`);
    } catch (error) {
      console.error(`✗ Error creating course ${courseData.title}:`, error.message);
      if (error.code) console.error(`   Error code: ${error.code}`);
    }
  }

  console.log('\n✅ Seeding completed!');
  console.log(`Total courses created: ${(await prisma.course.count({ where: { language: 'French' } }))}`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
