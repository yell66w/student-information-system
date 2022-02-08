import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AdminBodyHeader from "../../../../components/AdminBodyHeader";
import API_URL from "../../../../lib/API";
import { Student } from "../../../../types/entities";

type Props = {
  student: Student;
};
const Edit: NextPage<Props> = ({ student }) => {
  const [firstName, setFirstName] = useState(student.first_name);
  const [lastName, setLastName] = useState(student.last_name);
  const router = useRouter();
  const { id } = router.query;

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { first_name: firstName, last_name: lastName };
      console.log(id);
      await fetch(`${API_URL}/student/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/admin/students");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminBodyHeader title="Edit Student" />
      <form onSubmit={submitData}>
        <Flex direction="column" gap={4}>
          <FormControl>
            <FormLabel htmlFor="first_name">First name</FormLabel>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="first_name"
              placeholder="First name"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="last_name">Last name</FormLabel>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="last_name"
              placeholder="Last name"
            />
          </FormControl>
        </Flex>
        <Flex justifyContent="end">
          <Button mt={4} colorScheme="messenger" type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id) {
    const res = await fetch(`${API_URL}student/${params.id}`);
    const student = await res.json();
    return { props: { student } };
  }
  return { props: {} };
};

export default Edit;
