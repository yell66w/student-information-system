import { Flex, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="messenger.500"
      color="white"
      py={6}
      px={12}
    >
      <Flex>
        <Text fontSize="lg" textTransform="uppercase" fontWeight="bold">
          Telmo University
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        fontWeight="medium"
        fontSize="sm"
        textTransform="uppercase"
        gap={6}
      >
        <Link href="/">Home</Link>
        {session ? (
          session.user.role === "ADMIN" ? (
            <Link href="/admin">Admin</Link>
          ) : null
        ) : null}

        {session ? (
          <>
            <Text
              cursor="pointer"
              fontWeight="bold"
              variant="solid"
              colorScheme="messenger"
              onClick={() => signOut()}
            >
              Logout
            </Text>
          </>
        ) : (
          <>
            <Text
              cursor="pointer"
              fontWeight="bold"
              variant="solid"
              colorScheme="messenger"
              onClick={() => signIn()}
            >
              Sign In
            </Text>
            <Text
              cursor="pointer"
              fontWeight="bold"
              variant="solid"
              colorScheme="messenger"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
