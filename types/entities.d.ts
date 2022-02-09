import { College } from "@prisma/client";

export type Enrollees = {
  id: number;
  courseId: number;
  studentId: number;
  dateEnrolled: Date;
  student: Student;
  course: Course;
};

export type StudentOnCourses = {
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
  program: Program;
  programId: number;
  courses: StudentOnCourses[];
};

export type Course = {
  id: number;
  name: string;
  code: string;
  program: Program;
  programId: number;
};

export type Program = {
  id: number;
  name: string;
  acronym: string;
  collegeId: number;
  college: College;
  courses: Course[];
};
