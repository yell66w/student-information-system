import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import AdminBodyHeader from "../../../../components/AdminBodyHeader";
import API_URL from "../../../../lib/API";
import { Program } from "../../../../types/entities";
type Props = {
  program: Program;
};

const Courses: NextPage<Props> = ({ program }) => {
  const courses = program?.courses;
  return (
    <>
      <AdminBodyHeader
        title={`${program.name}`}
        showCreateButton
        createTitle="Create a Course"
      />
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
                  <Td>{program.college.acronym}</Td>
                  <Td>{program.acronym}</Td>
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
    const res = await fetch(`${API_URL}program/${params.id}`);
    const program = await res.json();
    return {
      props: { program },
    };
  }
  return {
    props: {},
  };
};

export default Courses;
