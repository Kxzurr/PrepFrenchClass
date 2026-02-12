/*
  Warnings:

  - You are about to drop the column `categoryId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- DropIndex
DROP INDEX "courses_categoryId_idx";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "course_categories" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_categories_courseId_idx" ON "course_categories"("courseId");

-- CreateIndex
CREATE INDEX "course_categories_categoryId_idx" ON "course_categories"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "course_categories_courseId_categoryId_key" ON "course_categories"("courseId", "categoryId");

-- AddForeignKey
ALTER TABLE "course_categories" ADD CONSTRAINT "course_categories_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_categories" ADD CONSTRAINT "course_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
