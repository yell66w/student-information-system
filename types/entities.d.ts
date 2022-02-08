import { College, Program } from "@prisma/client";

export type Enrollees = {
  id: number;
  courseId: number;
  studentId: number;
  dateEnrolled: Date;
  student: Student;
  course: Course;
};

export type Student = {
  id: number;
  student_no: number;
  first_name: string;
  last_name: string;
  collegeId: number;
  college: College;
};

export type Course = {
  id: number;
  name: string;
  code: string;
  program: Program;
  programId: number;
};
