import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { College } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import AdminBodyHeader from "../../../components/AdminBodyHeader";
import API_URL from "../../../lib/API";
type Props = {
  colleges: College[];
};

const Colleges: NextPage<Props> = ({ colleges }) => {
  return (
    <>
      <AdminBodyHeader title="Colleges" />
      <Table variant="simple" fontSize="sm" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Abbreviation</Th>
          </Tr>
        </Thead>
        <Tbody>
          {colleges
            ? colleges.map((college) => (
                <Tr key={college.id}>
                  <Td>{college.id}</Td>
                  <Td>{college.name}</Td>
                  <Td>{college.acronym}</Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}colleges`);
  const colleges = await res.json();
  return {
    props: { colleges },
  };
};

export default Colleges;
