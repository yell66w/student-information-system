/*
  Warnings:

  - The primary key for the `StudentsOnCourses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "StudentsOnCourses" DROP CONSTRAINT "StudentsOnCourses_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StudentsOnCourses_pkey" PRIMARY KEY ("id");
