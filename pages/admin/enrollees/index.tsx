import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import type { GetServerSideProps, NextPage } from "next";
import AdminBodyHeader from "../../../components/AdminBodyHeader";
import API_URL from "../../../lib/API";
import { Enrollees } from "../../../types/entities";
type Props = {
  enrollees: Enrollees[];
};

const Enrollees: NextPage<Props> = ({ enrollees }) => {
  return (
    <>
      <AdminBodyHeader title="Enrollees" />
      <Table variant="simple" fontSize="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Student #</Th>
            <Th>Name</Th>
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
                  <Td>{enrollee.student.student_no}</Td>
                  <Td>
                    {enrollee.student.first_name} {enrollee.student.last_name}
                  </Td>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}enrollees`);
  const enrollees = await res.json();
  return {
    props: { enrollees },
  };
};

export default Enrollees;
