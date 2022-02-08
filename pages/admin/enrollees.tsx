import { Flex, Text } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import EnrolleesTable from "../../components/EnrolleesTable";
import API_URL from "../../lib/API";
import { Enrollees } from "../../types/entities";
type Props = {
  enrollees: Enrollees[];
};

const Enrollees: NextPage<Props> = ({ enrollees }) => {
  return (
    <>
      <Flex mb={6} pb={3} borderBottom="1px" borderBottomColor="gray.300">
        <Text fontSize="2xl" fontWeight="bold">
          Enrollees
        </Text>
      </Flex>
      <EnrolleesTable enrollees={enrollees} />
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
