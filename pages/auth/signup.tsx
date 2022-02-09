import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import API_URL from "../../lib/API";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        throw "Missing fields.";
      }
      const body = { username, password };
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
      <Flex h="70vh" alignItems="center" justifyContent="center">
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

  return {
    props: { session },
  };
};

export default SignUp;
