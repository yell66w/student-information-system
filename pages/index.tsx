import type { GetServerSideProps, NextPage } from "next";
import API_URL from "../lib/API";
import { Enrollees } from "../types/entities";
type Props = {
  enrollees: Enrollees[];
};

const Home: NextPage<Props> = ({ enrollees }) => {
  return <div>Home</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}enrollees`);
  const enrollees = await res.json();
  return {
    props: { enrollees },
  };
};

export default Home;
