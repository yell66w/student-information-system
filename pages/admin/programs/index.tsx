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
import { Program } from "../../../types/entities";
type Props = {
  programs: Program[];
};

const Programs: NextPage<Props> = ({ programs }) => {
  const router = useRouter();
  const onDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/program/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      await router.push("/admin/programs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminBodyHeader title="Programs" />
      <Table variant="simple" fontSize="sm" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Abbreviation</Th>
            <Th>College</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {programs
            ? programs.map((program) => (
                <Tr key={program.id}>
                  <Td>{program.id}</Td>
                  <Td>{program.name}</Td>
                  <Td>{program.acronym}</Td>
                  <Td>{program.college.acronym}</Td>
                  <Td>
                    <HStack>
                      <Link
                        color="messenger.500"
                        href={`/admin/programs/${program.id}/courses`}
                      >
                        Courses
                      </Link>
                      {/* <Link
                        color="orange.500"
                        href={`/admin/programs/${program.id}/edit`}
                      >
                        Edit
                      </Link>
                      <Link
                        color="red.500"
                        onClick={() => onDelete(program.id)}
                      >
                        Delete
                      </Link> */}
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
  const res = await fetch(`${API_URL}programs`);
  const programs = await res.json();
  return {
    props: { programs },
  };
};

export default Programs;
