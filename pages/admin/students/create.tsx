import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { College } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminBodyHeader from "../../../components/AdminBodyHeader";
import API_URL from "../../../lib/API";
import { Program } from "../../../types/entities";

type Props = {
  colleges: College[];
};

const Create: NextPage<Props> = ({ colleges }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [collegeId, setCollegeId] = useState<string>("");
  const [programId, setProgramId] = useState<string>("");
  const router = useRouter();

  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const getPrograms = async () => {
      const res = await fetch(`${API_URL}/programs?collegeId=${collegeId}`);
      const programs_data = await res.json();
      setPrograms(programs_data);
    };
    if (collegeId) {
      setPrograms([]);
      setProgramId("");
      getPrograms();
    }
  }, [collegeId]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!firstName || !lastName || !collegeId || !programId) {
        throw "Missing fields.";
      }
      const body = {
        first_name: firstName,
        last_name: lastName,
        collegeId,
        programId,
      };
      await fetch(`${API_URL}/student`, {
        method: "POST",
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
      <AdminBodyHeader title="Create A Student" />
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
          <FormControl>
            <FormLabel htmlFor="college">College</FormLabel>
            <Select
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              placeholder="Select college"
            >
              {colleges
                ? colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))
                : null}
            </Select>
          </FormControl>

          {programs.length > 0 ? (
            <FormControl>
              <FormLabel htmlFor="program">Program</FormLabel>
              <Select
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                placeholder="Select program"
              >
                {programs
                  ? programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))
                  : null}
              </Select>
            </FormControl>
          ) : null}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const colleges_res = await fetch(`${API_URL}colleges`);
  const colleges = await colleges_res.json();
  return { props: { colleges } };
};

export default Create;
