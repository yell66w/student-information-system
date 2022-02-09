import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Flex direction="column" letterSpacing="wide" gap={6}>
        <Navbar />
        <Flex direction="column" px={12}>
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
