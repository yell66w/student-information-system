import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import type { GetServerSideProps, NextPage } from "next";
import AdminBodyHeader from "../../../../components/AdminBodyHeader";
import API_URL from "../../../../lib/API";
import { Enrollees } from "../../../../types/entities";
type Props = {
  enrollees: Enrollees[];
};

const Courses: NextPage<Props> = ({ enrollees }) => {
  const student = enrollees[0]?.student;

  return (
    <>
      <AdminBodyHeader title={`${student.first_name} ${student.last_name}`} />
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
          {enrollees
            ? enrollees.map((enrollee) => (
                <Tr key={enrollee.id}>
                  <Td>{enrollee.id}</Td>
                  <Td>{enrollee.course.program.college.acronym}</Td>
                  <Td>{enrollee.course.program.acronym}</Td>
                  <Td>{enrollee.course.code}</Td>
                  <Td>{enrollee.course.name}</Td>
                  <Td>
                    {dayjs(enrollee.dateEnrolled).format("YYYY-MM-DD HH:MM:ss")}
                  </Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id) {
    const res = await fetch(`${API_URL}student/${params.id}/courses`);
    const enrollees = (await res.json()) as Enrollees[];
    return {
      props: { enrollees },
    };
  }
  return {
    props: {},
  };
};

export default Courses;
