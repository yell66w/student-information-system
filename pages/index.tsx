import { Flex } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import EnrolleesTable from "../components/EnrolleesTable";
import API_URL from "../lib/API";
import { Enrollees } from "../types/entities";
type Props = {
  enrollees: Enrollees[];
};

const Home: NextPage<Props> = ({ enrollees }) => {
  return (
    <Flex direction="column" p={6}>
      <div>Navbar</div>
      <EnrolleesTable enrollees={enrollees} />
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}enrollees`);
  const enrollees = await res.json();
  return {
    props: { enrollees },
  };
};

export default Home;
