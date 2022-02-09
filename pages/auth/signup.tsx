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
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import API_URL from "../../lib/API";
import { Program } from "../../types/entities";

type Props = {
  colleges: College[];
};
const SignUp: NextPage<Props> = ({ colleges }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [collegeId, setCollegeId] = useState<string>("");
  const [programId, setProgramId] = useState<string>("");
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
      if (
        !username ||
        !password ||
        !firstName ||
        !lastName ||
        !collegeId ||
        !programId
      ) {
        throw "Missing fields.";
      }
      const body = {
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        collegeId,
        programId,
      };
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) signIn();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex h="100vh" py={6} alignItems="center" justifyContent="center">
        <form onSubmit={submitData}>
          <Flex
            color="gray.500"
            p={12}
            border="1px"
            borderColor="gray.300"
            borderRadius="lg"
            direction="column"
            gap={4}
          >
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="username">
                Username
              </FormLabel>
              <Input
                fontSize="sm"
                color="black"
                bg="white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                placeholder="Username"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="password">
                Password
              </FormLabel>
              <Input
                type="password"
                fontSize="sm"
                color="black"
                bg="white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Password"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="first_name">
                First name
              </FormLabel>
              <Input
                fontSize="sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="first_name"
                placeholder="First name"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="last_name">
                Last name
              </FormLabel>
              <Input
                fontSize="sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="last_name"
                placeholder="Last name"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="college">
                College
              </FormLabel>
              <Select
                fontSize="sm"
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
                <FormLabel fontSize="sm" htmlFor="program">
                  Program
                </FormLabel>
                <Select
                  fontSize="sm"
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

            <Flex mt={3}>
              <Button
                type="submit"
                fontSize="sm"
                bg="gray.100"
                color="gray.500"
                w="full"
              >
                Sign up
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const colleges_res = await fetch(`${API_URL}colleges`);
  const colleges = await colleges_res.json();

  return {
    props: { colleges, session },
  };
};

export default SignUp;
