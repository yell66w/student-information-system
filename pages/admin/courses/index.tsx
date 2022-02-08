import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Course } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import API_URL from "../../../lib/API";
type Props = {
  courses: Course[];
};

const Courses: NextPage<Props> = ({ courses }) => {
  return (
    <>
      <Flex mb={6} pb={3} borderBottom="1px" borderBottomColor="gray.300">
        <Text fontSize="2xl" fontWeight="bold">
          Courses
        </Text>
      </Flex>
      <Table variant="simple" fontSize="sm" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Code</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses
            ? courses.map((course) => (
                <Tr key={course.id}>
                  <Td>{course.id}</Td>
                  <Td>{course.name}</Td>
                  <Td>{course.code}</Td>
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
