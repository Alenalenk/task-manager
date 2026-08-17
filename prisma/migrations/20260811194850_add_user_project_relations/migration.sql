/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Project` table. All the data in the column will be lost.
  - The `status` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'TEAMLEAD', 'DEVELOPER', 'MANAGER', 'ANALYST', 'VIEWER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'IN_PROCESS', 'IN_TESTING', 'DONE', 'CLOSED');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "ownerId",
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';

-- DropEnum
DROP TYPE "ProjectStatus";

-- CreateTable
CREATE TABLE "UserOnProject" (
    "userId" INTEGER NOT NULL,
    "userRole" "UserRole" NOT NULL DEFAULT 'VIEWER',
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "UserOnProject_pkey" PRIMARY KEY ("projectId","userId")
);

-- CreateTable
CREATE TABLE "Task" (
    "authorId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NEW',
    "id" SERIAL NOT NULL,
    "dateStart" TIMESTAMP(3),
    "dateEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "authorId" INTEGER NOT NULL,
    "projectId" INTEGER,
    "taskId" INTEGER,
    "comment" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserOnProject" ADD CONSTRAINT "UserOnProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnProject" ADD CONSTRAINT "UserOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
