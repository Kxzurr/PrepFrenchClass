'use client';

interface CourseOverviewTabProps {
    description?: string;
    whatYouWillLearnItems?: string[];
    courseFeatureItems?: string[];
    whoThisIsFor?: string;
    keyBenefitItems?: string[];
    toolsResourcesItems?: string[];
    prerequisitesItems?: string[];
    objectivesItems?: string[];
    highlightsItems?: string[];
    includesItems?: string[];
    highlightTip?: string;
    closingMessage?: string;
    feeOneTitle?: string;
    feeOneDesc?: string;
    feeTwoTitle?: string;
    feeTwoDesc?: string;
}

export default function CourseOverviewTab({
    description,
    whatYouWillLearnItems,
    courseFeatureItems,
    whoThisIsFor,
    keyBenefitItems,
    toolsResourcesItems,
    prerequisitesItems,
    objectivesItems,
    highlightsItems,
    includesItems,
    highlightTip,
    closingMessage,
    feeOneTitle,
    feeOneDesc,
    feeTwoTitle,
    feeTwoDesc,
}: CourseOverviewTabProps) {
    // Use provided description or fallback to default
    const courseDescription = description || `Unlock your potential with this immersive course designed to help you gain hands-on skills and real-world experience.
Whether you're learning a new language, mastering music, exploring dance, or diving into culinary arts — this course
provides structured guidance, live practice, and personal mentorship. Learn from industry professionals through interactive sessions, group discussions, and creative projects that enhance your
knowledge and practical ability. Build confidence and progress at your own pace in a supportive learning environment.`;

    const learnItems =
        whatYouWillLearnItems && whatYouWillLearnItems.length > 0
            ? whatYouWillLearnItems
            : [
                  'Master essential techniques through guided lessons and real examples.',
                  'Enhance creativity and problem-solving with practical projects.',
                  'Understand the theory, culture, and background of your learning field.',
                  'Receive personalized feedback from professional mentors.',
                  'Build confidence through live sessions, workshops, and group tasks.',
              ];

    const featuresItems =
        courseFeatureItems && courseFeatureItems.length > 0
            ? courseFeatureItems
            : [
                  'Duration: 8–12 Weeks (Flexible Schedule)',
                  'Level: Beginner to Intermediate',
                  'Mode: Online or On-Campus',
                  'Includes: Certificate of Completion',
                  'Bonus: Lifetime access to Recorded Sessions & Study Materials',
              ];

    const benefitsItems =
        keyBenefitItems && keyBenefitItems.length > 0
            ? keyBenefitItems
            : [
                  'Get one-on-one mentorship and constructive feedback.',
                  'Join a global learning community for collaboration and networking.',
                  'Access exclusive course materials and downloadable resources.',
                  'Participate in live Q&A sessions and interactive challenges.',
                  'Earn a verified certificate to showcase your expertise.',
              ];

    const toolsItems =
        toolsResourcesItems && toolsResourcesItems.length > 0
            ? toolsResourcesItems
            : [
                  '🎧 Music Sheets / Audio Practice Files',
                  '📘 Grammar & Vocabulary PDFs',
                  '🍳 Recipe & Cooking Technique Guides',
                  '💃 Step-by-Step Dance Tutorials',
                  '🧠 Quizzes & Progress Trackers',
                  '🎓 Certification & Project Submission Portal',
              ];

    const whoText =
        whoThisIsFor ||
        'This course is perfect for students, working professionals, or hobbyists who want to expand their skills and creativity.\nNo prior experience is required — only your enthusiasm to learn, experiment, and grow in your chosen domain.';

    const tipText =
        highlightTip ||
        '💡 Tip: Stay consistent and engage with your instructors and peers. The more you participate, the faster you\'ll see real improvement in your learning journey.';

    const closingText =
        closingMessage ||
        '"Learning never stops — whether it\'s mastering a melody, a new language, or a new recipe, every step brings you closer to your best version."';

    return (
        <div>
            <div className="mb-8">
                <h4 className="mb-4">Course Overview</h4>
                <p className="text-gray-600 dark:text-dark-400 mb-3 whitespace-pre-wrap">
                    {courseDescription}
                </p>
            </div>

            {/* Learning & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                    <h4 className="mb-3">What You&apos;ll Learn</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {learnItems.map((item, index) => (
                            <li key={index} className="text-gray-600 dark:text-dark-400">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="mb-3">Course Features</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {featuresItems.map((item, index) => (
                            <li key={index} className="text-gray-600 dark:text-dark-400">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Who it's for */}
            <h4 className="mb-4">Who This Course is For</h4>
            <p className="leading-relaxed mb-6 text-gray-600 dark:text-dark-400">
                {whoText}
            </p>

            {/* Key Benefits */}
            <h4 className="mb-4">Key Benefits</h4>
            <ul className="list-disc list-inside space-y-2 mb-8">
                {benefitsItems.map((item, index) => (
                    <li key={index} className="text-gray-600 dark:text-dark-400">
                        {item}
                    </li>
                ))}
            </ul>

            {/* Tools */}
            <div className="mb-8">
                <h4 className="mb-4">Tools & Resources Included</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {toolsItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-primary-500/10 p-4 rounded-lg border border-primary-100 dark:border-primary-950 text-gray-800 dark:text-gray-300"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Highlight Tip */}
            <div className="bg-primary-500/10 border-l-4 border-primary-500 p-4 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                    {tipText}
                </p>
            </div>

            {/* Prerequisites - Only show if data exists */}
            {prerequisitesItems && prerequisitesItems.length > 0 && (
                <div className="mt-8">
                    <h4 className="mb-4">Prerequisites</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {prerequisitesItems.map((item, index) => (
                            <li key={index} className="text-gray-600 dark:text-dark-400">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Objectives - Only show if data exists */}
            {objectivesItems && objectivesItems.length > 0 && (
                <div className="mt-8">
                    <h4 className="mb-4">Course Objectives</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {objectivesItems.map((item, index) => (
                            <li key={index} className="text-gray-600 dark:text-dark-400">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Highlights - Only show if data exists */}
            {highlightsItems && highlightsItems.length > 0 && (
                <div className="mt-8">
                    <h4 className="mb-4">Course Highlights</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {highlightsItems.map((item, index) => (
                            <li key={index} className="text-gray-600 dark:text-dark-400">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Fee Structure - Only show if data exists */}
            {(feeOneTitle || feeTwoTitle) && (
                <div className="mt-8">
                    <h4 className="mb-4">Fee Structure</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feeOneTitle && (
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {feeOneTitle}
                                </h5>
                                <p className="text-gray-600 dark:text-dark-400">
                                    {feeOneDesc || 'Contact for pricing'}
                                </p>
                            </div>
                        )}
                        {feeTwoTitle && (
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {feeTwoTitle}
                                </h5>
                                <p className="text-gray-600 dark:text-dark-400">
                                    {feeTwoDesc || 'Contact for pricing'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Closing Message */}
            <div className="mt-6">
                <p className="text-gray-600 dark:text-dark-400 italic">
                    {closingText}
                </p>
            </div>
        </div>
    );
}

