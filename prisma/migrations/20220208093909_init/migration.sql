/*
  Warnings:

  - A unique constraint covering the columns `[student_no]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `student_no` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "student_no",
ADD COLUMN     "student_no" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_no_key" ON "Student"("student_no");
