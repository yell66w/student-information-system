import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Program } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import API_URL from "../../../lib/API";
type Props = {
  programs: Program[];
};

const Programs: NextPage<Props> = ({ programs }) => {
  return (
    <>
      <Flex mb={6} pb={3} borderBottom="1px" borderBottomColor="gray.300">
        <Text fontSize="2xl" fontWeight="bold">
          Programs
        </Text>
      </Flex>
      <Table variant="simple" fontSize="sm" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Abbreviation</Th>
          </Tr>
        </Thead>
        <Tbody>
          {programs
            ? programs.map((program) => (
                <Tr key={program.id}>
                  <Td>{program.id}</Td>
                  <Td>{program.name}</Td>
                  <Td>{program.acronym}</Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}programs`);
  const programs = await res.json();
  return {
    props: { programs },
  };
};

export default Programs;
