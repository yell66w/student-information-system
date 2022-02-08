import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Flex direction="column" letterSpacing="wide" gap={6}>
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
          fontWeight="medium"
          fontSize="sm"
          textTransform="uppercase"
          gap={6}
        >
          <Link href="/">Home</Link>
          <Link href="/admin/enrollees">Admin</Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
