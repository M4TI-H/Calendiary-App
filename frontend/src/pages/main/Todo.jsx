import { Flex, VStack, Heading, Divider, Wrap, WrapItem, Text } from "@chakra-ui/react";
import TodoList from "./components/TodoList";

export default function Todo () {
  return (
    <VStack w="80vw" h="auto" mt="1rem" bg="#F8F9FA" borderTopRadius="xl" p="2">
      <Heading>Your to-dos</Heading>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" />

      <Flex flexDir="row" align="center" justify="center">
        <Wrap spacing="5" align="center" justify="center">
          <WrapItem>
            <Flex w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
              bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">Add new task list</Text>
            </Flex>
          </WrapItem>
          <WrapItem>
            <TodoList title={"Summer vacations"} date={"29 April 2025 10:56am"}/>
          </WrapItem>
        </Wrap>
      </Flex>

    </VStack>
  );
}