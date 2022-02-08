import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Navbar />
      <Flex direction="column" px={12}>
        {children}
      </Flex>
    </>
  );
};

export default Layout;
