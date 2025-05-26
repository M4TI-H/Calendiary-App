import { VStack, HStack, Text, Image, Divider } from '@chakra-ui/react';
import { BiSolidDashboard, BiListUl, BiNote, BiCalendar, BiBody, BiLogOut, BiCog } from "react-icons/bi";
import SidebarBtn from './SidebarBtn';
import LogoutBtn from './LogoutBtn.jsx';

export default function Sidebar() {

  return(
    <VStack maxW="14rem" maxH="54rem" w={{base: "10rem", lg: "100%"}} h="100%" align="flex-start" bg="#F8F9FA" borderLeftRadius="3xl">
      
      <HStack w="inherit" h="10vh" justifyContent="center" spacing="0">
        <Image src="logo.png" h="60%"/>
        <Text fontSize="lg" fontWeight="bold" color="#2b2d42">Calendiary</Text>
      </HStack>

      <VStack w="inherit" spacing={1} h="full">
        <Text fontSize="xs" fontWeight="semibold" color="#ADB5BD" 
          alignSelf="flex-start" ml={{base: "4", lg: "4"}}>Navigation</Text>
        
        <SidebarBtn content={"Dashboard"} icon={<BiSolidDashboard />} link={"/"}/>
        <SidebarBtn content={"Notes"} icon={<BiNote />} link={"/notes"}/>
        <SidebarBtn content={"To do list"} icon={<BiListUl />} link={"/todo"}/>
        <SidebarBtn content={"Calendar"} icon={<BiCalendar />} link={"/calendar"}/>
        <SidebarBtn content={"Wellness Log"} icon={<BiBody />} link={"/wellness"}/>
        <SidebarBtn content={"Settings"} icon={<BiCog />} link={"/"}/>

        <LogoutBtn icon={<BiLogOut />}/>
      </VStack>

    </VStack>
  );
}