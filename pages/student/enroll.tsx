import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
  Link,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AdminBodyHeader from "../../components/AdminBodyHeader";
import API_URL from "../../lib/API";
import { Course } from "../../types/entities";

type Props = {
  courses: Course[];
};

const Enroll: NextPage<Props> = ({ courses }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const id = session?.user.student.id;

  const onEnroll = async (
    e: React.SyntheticEvent,
    { courseId }: { courseId: string | number }
  ) => {
    e.preventDefault();
    try {
      const body = { studentId: id, courseId };
      await fetch(`${API_URL}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push(`/my-courses`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminBodyHeader title="Courses" />
      <Table variant="simple" fontSize="sm" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>College</Th>
            <Th>Program</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses
            ? courses.map((course) => (
                <Tr key={course.id}>
                  <Td>{course.id}</Td>
                  <Td>{course.code}</Td>
                  <Td>{course.name}</Td>
                  <Td>{course.program.college.acronym}</Td>
                  <Td>{course.program.acronym}</Td>
                  <Td>
                    <HStack>
                      <Link
                        color="green.500"
                        onClick={(e) => onEnroll(e, { courseId: course.id })}
                        href={`/admin/students/${id}/enroll`}
                      >
                        Enroll Now
                      </Link>
                    </HStack>
                  </Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const course_res = await fetch(`${API_URL}courses`);
  const courses = await course_res.json();
  return { props: { courses } };
};

export default Enroll;
