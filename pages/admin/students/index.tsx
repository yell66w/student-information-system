import {
  Flex,
  HStack,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import AdminBodyHeader from "../../../components/AdminBodyHeader";
import API_URL from "../../../lib/API";
import { Student } from "../../../types/entities";
type Props = {
  students: Student[];
};

const Students: NextPage<Props> = ({ students }) => {
  const router = useRouter();
  const onDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/student/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      await router.push("/admin/students");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <AdminBodyHeader
        title="Students"
        showCreateButton
        createTitle="Create a Student"
        createHref="/students/create"
      />
      <Table variant="simple" fontSize="sm" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Student #</Th>
            <Th>Name</Th>
            <Th>College</Th>
            <Th>Actions</Th>
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
                  <Td>
                    <HStack>
                      <Link
                        color="messenger.500"
                        href={`/admin/students/${student.id}/enroll`}
                      >
                        Enroll
                      </Link>
                      <Link
                        color="orange.500"
                        href={`/admin/students/${student.id}/edit`}
                      >
                        Edit
                      </Link>
                      <Link
                        color="red.500"
                        onClick={() => onDelete(student.id)}
                      >
                        Delete
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

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}students`);
  const students = await res.json();
  return {
    props: { students },
  };
};

export default Students;
