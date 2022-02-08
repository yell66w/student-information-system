import type { GetServerSideProps, NextPage } from "next";
import EnrolleesTable from "../../components/EnrolleesTable";
import API_URL from "../../lib/API";
import { Enrollees } from "../../types/entities";
type Props = {
  enrollees: Enrollees[];
};

const Enrollees: NextPage<Props> = ({ enrollees }) => {
  return <EnrolleesTable enrollees={enrollees} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}enrollees`);
  const enrollees = await res.json();
  return {
    props: { enrollees },
  };
};

export default Enrollees;
