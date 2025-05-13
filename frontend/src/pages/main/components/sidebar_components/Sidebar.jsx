import { VStack, HStack, Text, Divider } from '@chakra-ui/react';
import { BiSolidDashboard, BiListUl, BiNote, BiCalendar, BiBody, BiLogOut, BiCog, BiBookmarks } from "react-icons/bi";
import SidebarBtn from './SidebarBtn';
import LogoutBtn from './LogoutBtn.jsx';

export default function Sidebar({narrowScreen}) {

  return(
    <VStack maxW="14rem" w={{base: "10rem", lg: "100%"}} minH="100vh" maxH="100%" pos="sticky" top="0" align="flex-start" bg="#F8F9FA">
      <HStack w="inherit" h="10vh" justifyContent="center">
        <Text fontSize="lg" fontWeight="semibold" color="#2b2d42">Calendiary</Text>
      </HStack>

      <Divider w="inherit" borderY="1px solid #ADB5BD" />

      <VStack w="inherit" spacing={1} alignItems="center">
        <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD"
          alignSelf="flex-start" ml={{base: "1rem", lg: "2rem"}}>Navigation</Text>
        
        <SidebarBtn content={"Dashboard"} icon={<BiSolidDashboard />} link={"/"}/>
        <SidebarBtn content={"Notes"} icon={<BiNote />} link={"/notes"}/>
        <SidebarBtn content={"To do list"} icon={<BiListUl />} link={"/todo"}/>
        <SidebarBtn content={"Calendar"} icon={<BiCalendar />} link={"/calendar"}/>
        <SidebarBtn content={"Wellness Log"} icon={<BiBody />} link={"/wellness"}/>
      </VStack>

      <Divider w="inherit" borderY="1px solid #ADB5BD" />

      <VStack w="inherit" spacing={1} alignItems="center" mt="auto" mb="1rem">
        <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD"
          alignSelf="flex-start" ml={{base: "1rem", lg: "2rem"}}>Account</Text>

        <SidebarBtn content={"Bookmarks"} icon={<BiBookmarks />} link={"/"}/>
        <SidebarBtn content={"Settings"} icon={<BiCog />} link={"/"}/>
        <LogoutBtn icon={<BiLogOut />}/>

      </VStack>
    </VStack>
  );
}