-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "gradientFrom" TEXT,
ADD COLUMN     "gradientTo" TEXT,
ADD COLUMN     "iconKey" TEXT;

-- CreateTable
CREATE TABLE "course_content" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "whatYouWillLearn" JSONB,
    "courseFeatures" JSONB,
    "keyBenefits" JSONB,
    "toolsResources" JSONB,
    "whoThisIsFor" TEXT,
    "highlightTip" TEXT,
    "closingMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_faqs" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_content_courseId_key" ON "course_content"("courseId");

-- CreateIndex
CREATE INDEX "course_faqs_courseId_idx" ON "course_faqs"("courseId");

-- AddForeignKey
ALTER TABLE "course_content" ADD CONSTRAINT "course_content_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
