-- AlterTable
ALTER TABLE "course_content" ADD COLUMN     "feeOneDesc" TEXT,
ADD COLUMN     "feeOneTitle" TEXT,
ADD COLUMN     "feeTwoDesc" TEXT,
ADD COLUMN     "feeTwoTitle" TEXT,
ADD COLUMN     "highlights" JSONB,
ADD COLUMN     "includes" JSONB,
ADD COLUMN     "objectives" JSONB,
ADD COLUMN     "prerequisites" JSONB,
ADD COLUMN     "sidebarImage" TEXT,
ADD COLUMN     "videoUrl" TEXT;
