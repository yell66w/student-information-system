-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_programId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnCourses" DROP CONSTRAINT "StudentsOnCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnCourses" DROP CONSTRAINT "StudentsOnCourses_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnCourses" ADD CONSTRAINT "StudentsOnCourses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnCourses" ADD CONSTRAINT "StudentsOnCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
