import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import AdminBodyHeader from "../components/AdminBodyHeader";
import API_URL from "../lib/API";
import { Student } from "../types/entities";
type Props = {
  student: Student;
};
const Courses: NextPage<Props> = ({ student }) => {
  return (
    <>
      <AdminBodyHeader title={`${student?.first_name} ${student?.last_name}`} />
      <Table variant="simple" fontSize="sm" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>College</Th>
            <Th>Program</Th>
            <Th>Course Code</Th>
            <Th>Course Name</Th>
            <Th>Date Enrolled</Th>
          </Tr>
        </Thead>
        <Tbody>
          {student
            ? student.courses.map((studentOnCourse) => (
                <Tr key={studentOnCourse.id}>
                  <Td>{studentOnCourse.id}</Td>
                  <Td>{studentOnCourse.course.program.college.acronym}</Td>
                  <Td>{studentOnCourse.course.program.acronym}</Td>
                  <Td>{studentOnCourse.course.code}</Td>
                  <Td>{studentOnCourse.course.name}</Td>
                  <Td>
                    {dayjs(studentOnCourse.dateEnrolled).format(
                      "YYYY-MM-DD HH:MM:ss"
                    )}
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

  let student;
  const res = await fetch(`${API_URL}student/${session.user.id}`);
  student = await res.json();
  return {
    props: { student },
  };
};

export default Courses;
