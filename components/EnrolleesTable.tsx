import { NextPage } from "next";
import React from "react";
import { Enrollees } from "../types/entities";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import dayjs from "dayjs";

type Props = {
  enrollees: Enrollees[];
};

const EnrolleesTable: NextPage<Props> = ({ enrollees }) => {
  return (
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
                <Td>{enrollee.student.college.acronym}</Td>
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
  );
};

export default EnrolleesTable;
