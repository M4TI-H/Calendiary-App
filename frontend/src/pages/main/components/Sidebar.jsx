import { Link, useNavigate } from 'react-router-dom';
import { Flex, Button, VStack, HStack, Text, Divider, Image } from '@chakra-ui/react';
import { BiSolidDashboard, BiListUl, BiNote, BiCalendar, BiBody, BiLogOut, BiCog, BiBookmarks } from "react-icons/bi";

export default function Sidebar() {
  const navigate = useNavigate();

  function handleUserLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  return(
    <VStack maxW="14rem" minW="10rem" w="100%" h="100vh" position="fixed" bg="#F8F9FA">
      <HStack w="100%" h="10vh" justifyContent="center">
        <Image src="logo.png" maxH="8vh"/>
        <Text fontSize="lg" fontWeight="semibold" color="#2b2d42">Calendiary</Text>
      </HStack>

      <Divider w="100%" color="#ADB5BD" borderWidth="1px" />

      <VStack w="100%" spacing={1} alignItems="center">
        <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD"
          left="0" alignSelf="flex-start" ml="2rem">Navigation</Text>
        <Button as={Link} to="/" w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiSolidDashboard />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Dashboard</Button>
        <Button as={Link} to="/notes" w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiNote />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Notes</Button>
        <Button as={Link} to="/todo" w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiListUl />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        To do list</Button>
        <Button as={Link} to="/calendar" w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiCalendar />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Calendar</Button>
        <Button as={Link} to="/wellness" w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiBody />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Wellness Log</Button>
      </VStack>

      <Divider w="100%" color="#ADB5BD" borderWidth="1px" />

      <VStack w="100%" spacing={1} alignItems="center" mt="auto" mb="1rem">
        <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD"
        left="0" alignSelf="flex-start" ml="2rem">Account</Text>
        <Button as={Link} to="/" w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiBookmarks />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Bookmarks</Button>
        <Button as={Link} to="/" w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiCog />} borderRadius="10px" bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}}>
        Settings</Button>
        <Button onClick={handleUserLogout} w="95%" h="3rem" pl="2rem" justifyContent="flex-start" color="#2b2d42"
          leftIcon={<BiLogOut />} borderRadius="10px" bg="none" _hover={{bg: "rgba(193, 18, 31, 0.5)", color: "#780000"}}>
        Log out</Button>

      </VStack>
    </VStack>
  );
}