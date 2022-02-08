-- AlterTable
CREATE SEQUENCE "student_student_no_seq";
ALTER TABLE "Student" ALTER COLUMN "student_no" SET DEFAULT nextval('student_student_no_seq');
ALTER SEQUENCE "student_student_no_seq" OWNED BY "Student"."student_no";
