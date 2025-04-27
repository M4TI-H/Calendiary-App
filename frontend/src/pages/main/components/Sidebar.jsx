import { useNavigate } from 'react-router-dom';
import { Flex, Button, VStack, Text, Divider } from '@chakra-ui/react';
import { BiSolidDashboard, BiListUl, BiNote, BiCalendar, BiBody, BiLogOut, BiCog } from "react-icons/bi";

export default function Sidebar() {
  const navigate = useNavigate();


  return(
    <VStack maxW="18rem" minW="10rem" w="100%" h="100vh" position="fixed" bg="#F8F9FA">
      <Flex w="100%" h="20vh" bg="lightblue">

      </Flex>
      <VStack w="100%" spacing={1} alignItems="center">
        <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD"
          left="0" alignSelf="flex-start" ml="2rem">Navigation</Text>
        <Button w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiSolidDashboard />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Dashboard</Button>
        <Button w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiNote  />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Notes</Button>
        <Button w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiListUl />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        To do list</Button>
        <Button w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiCalendar />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Calendar</Button>
        <Button w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiBody />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Wellness Log</Button>
      </VStack>

      <Divider w="100%" color="#ADB5BD" borderWidth="1px"  />

      <VStack w="100%" spacing={1} alignItems="center" mt="3rem">
        <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD"
        left="0" alignSelf="flex-start" ml="2rem">Account</Text>

        <Button w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiCog  />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Settings</Button>
        <Button w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiNote  />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        coś jeszcze</Button>
        <Button w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiLogOut  />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Log out</Button>

      </VStack>
    </VStack>
  );
}