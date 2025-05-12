import { Link, useNavigate } from 'react-router-dom';
import { Flex, Button, VStack, HStack, Text, Divider, Image } from '@chakra-ui/react';
import { BiSolidDashboard, BiListUl, BiNote, BiCalendar, BiBody, BiLogOut, BiCog, BiBookmarks } from "react-icons/bi";
import SidebarBtn from './SidebarBtn';
import LogoutBtn from './LogoutBtn.jsx';

export default function Sidebar() {
  
  return(
    <VStack maxW="12rem" minW="10rem" w="18rem" h="100vh" position="sticky" top="0" bg="#F8F9FA">
      <HStack w="100%" h="10vh" justifyContent="center">
        <Image src="logo.png" maxH="5rem"/>
        <Text fontSize="lg" fontWeight="semibold" color="#2b2d42">Calendiary</Text>
      </HStack>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" />

      <VStack w="100%" spacing={1} alignItems="center">
        <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD"
          left="0" alignSelf="flex-start" ml="2rem">Navigation</Text>
        
        <SidebarBtn content={"Dashboard"} icon={<BiSolidDashboard />} link={"/"}/>
        <SidebarBtn content={"Notes"} icon={<BiNote />} link={"/notes"}/>
        <SidebarBtn content={"To do list"} icon={<BiListUl />} link={"/todo"}/>
        <SidebarBtn content={"Calendar"} icon={<BiCalendar />} link={"/calendar"}/>
        <SidebarBtn content={"Wellness Log"} icon={<BiBody />} link={"/wellness"}/>
      </VStack>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" />

      <VStack w="100%" spacing={1} alignItems="center" mt="auto" mb="1rem">
        <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD"
        left="0" alignSelf="flex-start" ml="2rem">Account</Text>

        <SidebarBtn content={"Bookmarks"} icon={<BiBookmarks />} link={"/"}/>
        <SidebarBtn content={"Settings"} icon={<BiCog />} link={"/"}/>
        <LogoutBtn icon={<BiLogOut />}/>

      </VStack>
    </VStack>
  );
}