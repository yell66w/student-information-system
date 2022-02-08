import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import API_URL from "../../../lib/API";
import { Student } from "../../../types/entities";
type Props = {
  students: Student[];
};

const Students: NextPage<Props> = ({ students }) => {
  return (
    <>
      <Flex mb={6} pb={3} borderBottom="1px" borderBottomColor="gray.300">
        <Text fontSize="2xl" fontWeight="bold">
          Students
        </Text>
      </Flex>
      <Table variant="simple" fontSize="sm" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Student #</Th>
            <Th>Name</Th>
            <Th>College</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students
            ? students.map((student) => (
                <Tr key={student.id}>
                  <Td>{student.id}</Td>
                  <Td>{student.student_no}</Td>
                  <Td>
                    {student.first_name} {student.last_name}
                  </Td>
                  <Td>{student.college.name}</Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}students`);
  const students = await res.json();
  return {
    props: { students },
  };
};

export default Students;
