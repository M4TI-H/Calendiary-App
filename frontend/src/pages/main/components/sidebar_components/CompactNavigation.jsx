import { VStack, HStack, Text, Divider, IconButton } from '@chakra-ui/react';
import { BiSolidDashboard, BiListUl, BiNote, BiCalendar, BiBody, BiLogOut, BiCog, BiBookmarks } from "react-icons/bi";
import SidebarBtn from './SidebarBtn.jsx';
import LogoutBtn from './LogoutBtn.jsx';

export default function CompactNavigation({narrowScreen}) {

  return(
    <HStack w="100vw" h="6%" bottom="0" bg="#F8F9FA" pos="fixed" justify="space-evenly" zIndex="99">
      <SidebarBtn content={"Dashboard"} icon={<BiSolidDashboard />} link={"/"} narrowScreen={narrowScreen}/>
      <SidebarBtn content={"Bookmarks"} icon={<BiBookmarks />} link={"/"} narrowScreen={narrowScreen}/>
      <SidebarBtn content={"Settings"} icon={<BiCog />} link={"/"} narrowScreen={narrowScreen}/>
      <LogoutBtn icon={<BiLogOut />} narrowScreen={narrowScreen}/>
    </HStack>
  );
}