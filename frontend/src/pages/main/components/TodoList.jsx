import { Divider, Flex, Text, List } from '@chakra-ui/react';
import TodoTask from './TodoTask';

export default function TodoList({title, date}) {

  return(
    <Flex w="25rem" h="30rem" p="3" flexDir="column" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
    bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s"}}>
        
      <Text textAlign="center" fontSize="xl" fontWeight="semibold">{title}</Text>

      <Divider borderWidth="1px" w="90%" my="2"/>
      <List spacing="2">
        <TodoTask content={"Buy plane tickets"} due_date={"5 May 2025"}/>
        <TodoTask content={"Book hotel room"}/>
        <TodoTask content={"Pack luggage"}/>
        <TodoTask content={"Check out attractions"}/>
      </List>

      <Text fontSize="sm" color="#ADB5BD" mt="auto" ml="auto">{date}</Text>
    </Flex>
  );
}

