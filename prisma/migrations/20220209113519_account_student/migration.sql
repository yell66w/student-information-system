/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "studentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Account_studentId_key" ON "Account"("studentId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
