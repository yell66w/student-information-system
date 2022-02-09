import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import AdminBodyHeader from "../../../components/AdminBodyHeader";
import API_URL from "../../../lib/API";
import { Course } from "../../../types/entities";
type Props = {
  courses: Course[];
};

const Courses: NextPage<Props> = ({ courses }) => {
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
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}courses`);
  const courses = await res.json();
  return {
    props: { courses },
  };
};

export default Courses;
