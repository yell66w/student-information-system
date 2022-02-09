import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AdminBodyHeader from "../../../../components/AdminBodyHeader";
import API_URL from "../../../../lib/API";
import { Course, Student } from "../../../../types/entities";

type Props = {
  student: Student;
  courses: Course[];
};
const Enroll: NextPage<Props> = ({ student, courses }) => {
  const router = useRouter();
  const [courseId, setCourseId] = useState("");
  const { id } = router.query;

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { studentId: id, courseId };
      console.log(id);
      await fetch(`${API_URL}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push(`/admin/students/${id}/courses`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminBodyHeader title="Enroll Student" />
      <form onSubmit={submitData}>
        <Flex direction="column" gap={4}>
          <FormControl>
            <FormLabel htmlFor="last_name">Name</FormLabel>
            <Input
              value={student.first_name + " " + student.last_name}
              id="last_name"
              placeholder="Last name"
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="course">Course</FormLabel>
            <Select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              placeholder="Select course to enroll"
            >
              {courses
                ? courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))
                : null}
            </Select>
          </FormControl>
        </Flex>
        <Flex justifyContent="end">
          <Button mt={4} colorScheme="messenger" type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id) {
    const student_res = await fetch(`${API_URL}student/${params.id}`);
    const course_res = await fetch(`${API_URL}courses`);
    const student = await student_res.json();
    const courses = await course_res.json();

    return { props: { student, courses } };
  }
  return { props: {} };
};

export default Enroll;
