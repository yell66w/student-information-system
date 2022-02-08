import { NextPage } from "next";
import React from "react";
import { Enrollees } from "../types/entities";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

type Props = {
  enrollees: Enrollees[];
};

const EnrolleesTable: NextPage<Props> = ({ enrollees }) => {
  return (
    <Table variant="simple">
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
      <tbody>
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
                <Td>{enrollee.dateEnrolled}</Td>
              </Tr>
            ))
          : null}
      </tbody>
    </Table>
  );
};

export default EnrolleesTable;
