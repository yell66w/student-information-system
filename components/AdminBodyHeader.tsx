import { Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  title: string;
  createTitle?: string;
  showCreateButton?: boolean;
  createHref?: string;
};
const AdminBodyHeader = ({
  title,
  createTitle = "Create",
  showCreateButton = false,
  createHref = "",
}: Props) => {
  const router = useRouter();
  return (
    <Flex
      justifyContent="space-between"
      mb={6}
      pb={3}
      borderBottom="1px"
      borderBottomColor="gray.300"
      alignItems="center"
    >
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
      {showCreateButton ? (
        <Button
          onClick={() => router.push(`/admin/${createHref}`)}
          colorScheme="messenger"
        >
          {createTitle}
        </Button>
      ) : null}
    </Flex>
  );
};

export default AdminBodyHeader;
