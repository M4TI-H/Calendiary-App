import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Flex, Text, VStack,Divider, Wrap, WrapItem, Heading, Button } from "@chakra-ui/react";
import { BiListUl, BiNote, BiCalendar, BiBody } from "react-icons/bi";
import Note from "./components/Note";

export default function Dashboard () {
  const { userData } = useOutletContext();


  return (
    <VStack w="80vw" h="auto" mt="1rem" bg="#F8F9FA" borderTopRadius="xl">
      <Flex w="100%" h="5rem" pl="5" justify="center" flexDir="column">
        <Heading fontSize="4xl" fontWeight="semibold">Welcome, {userData.name}</Heading>
        <Text fontSize="xl" ml="1">What are you up to today?</Text>
      </Flex>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" />

      <Flex w="auto" h="auto" flexDir="column" justify="center" pt="2" px="8" mb="4">
        <Heading fontSize="xl" pb="4" textAlign="center">Select action</Heading>
        <Wrap spacing="8" alignItems="center" justify="center">
          <WrapItem>
            <Flex as={ Link } to="/notes" w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
            _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <BiNote size="3rem"/>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">Create new note</Text>
            </Flex>
          </WrapItem>
          <WrapItem>
            <Flex as={ Link } to="/todo" w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
            _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <BiListUl size="3rem"/>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">Add new task</Text>
            </Flex>
          </WrapItem>
          <WrapItem>
            <Flex as={ Link } to="/calendar" w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
            _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <BiCalendar size="3rem"/>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">Check my plans</Text>
            </Flex>
          </WrapItem>
          <WrapItem>
            <Flex as={ Link } to="/wellness" w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
            _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <BiBody size="3rem"/>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">My well-being</Text>
            </Flex>
          </WrapItem>
        </Wrap>
      </Flex>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" />

      <Flex w="auto" h="auto" flexDir="column" justify="center" pt="2" px="8">
        <Heading fontSize="2xl" pb="4">Recent notes:</Heading>
        <Wrap spacing="8" alignItems="center" justify="center">
          <WrapItem>
            <Note title={"Test Note"} content={"This is test note."} date={"28 April 2025 7:00pm"} color={"yellow.300"}/>
          </WrapItem>
          <WrapItem>
            <Note title={"Test Note"} content={"This is test note."} date={"28 April 2025 7:00pm"} color={"yellow.300"}/>
          </WrapItem>
          <WrapItem>
            <Note title={"Test Note"} content={"This is test note."} date={"28 April 2025 7:00pm"} color={"yellow.300"}/>
          </WrapItem>
          <WrapItem>
            <Button as={ Link } to="/notes" bg="#212529" color="#F8F9FA" _hover={{bg: "#343A40"}}>Show all</Button>
          </WrapItem>
        </Wrap>
      </Flex>
      
    </VStack>
  );
}