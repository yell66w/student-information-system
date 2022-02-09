import { Button, Flex, Heading, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Flex
      alignItems="center"
      minH="75vh"
      justifyContent="center"
      gap={6}
      direction="column"
    >
      <Heading>Welcome to Telmo University</Heading>

      {session ? (
        <HStack>
          {session?.user.role === "STUDENT" ? (
            <Button onClick={() => router.push("/student/enroll")}>
              Enroll Now
            </Button>
          ) : null}
        </HStack>
      ) : null}
    </Flex>
  );
};

export default Home;
