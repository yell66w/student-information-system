import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

const AdminLayout: NextPage = ({ children }) => {
  return (
    <>
      <Flex minH="100vh" direction="column" letterSpacing="wide" gap={6}>
        <Navbar />
        <Flex direction="row" px={12} gap={6}>
          <Flex
            minH="100vh"
            borderRight="1px"
            borderColor="gray.300"
            w="56"
            direction="column"
            gap={6}
            py={6}
          >
            <Link href="/admin/colleges">Colleges</Link>
            <Link href="/admin/programs">Programs</Link>
            <Link href="/admin/courses">Courses</Link>
            <Link href="/admin/students">Students</Link>
            <Link href="/admin/enrollees">Enrollees</Link>
          </Flex>
          <Flex w="full" px={6} direction="column" py={6} h="full">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminLayout;
