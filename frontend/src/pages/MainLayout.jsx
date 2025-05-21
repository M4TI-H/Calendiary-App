import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { VStack, HStack, useBreakpointValue, Text, Divider } from '@chakra-ui/react';
import axios from 'axios';
import Sidebar from './main/components/sidebar_components/Sidebar';
import CompactNavigation from './main/components/sidebar_components/CompactNavigation';

export default function MainLayout() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    name: ""
  });
  const narrowScreen = useBreakpointValue({base: true, md: false});
  const token = localStorage.getItem("accessToken");
  
  function fetchUserData() {
    axios.get('http://localhost:8000/user/get_user_data', {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
    })
    .then((res) => {
      setUserData({...userData, email: res.data.user.email, name: res.data.user.nickname});
    })
    .catch((err) => {
      console.error(` error: ${err.message}`);
    })
  }
  
  //fetch user data 
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, []);

  return (
    <HStack w="full" h="100vh" bg="#d5bdaf" spacing="0" justify="center" align="center" overflow="hidden">
      {narrowScreen ? 
      <CompactNavigation narrowScreen={narrowScreen}/>
      :
      <Sidebar narrowScreen={narrowScreen}/>
      }
      <Outlet context={{ userData, narrowScreen }}/>

      <VStack maxW="18rem" maxH="54rem" w={{base: "10rem", lg: "100%"}} h="100%" 
        align="flex-start" p="5"
        bg="#F8F9FA" borderRightRadius="3xl" filter="auto" brightness="95%">
        <Text fontSize="xl" fontWeight="bold" color="#212529">Calendar</Text>
        
        <Divider w="100%" borderY="1px solid #ADB5BD"/>
        <VStack w="100%" h="8rem">
          <HStack justify="space-between" w="100%" align="end">
            <Text fontSize="lg" fontWeight="semibold" color="#212529">Today</Text>
            <Text fontSize="sm" fontWeight="medium" color="#ADB5BD">May 14, 2025</Text>
          </HStack>
          <Text fontSize="sm" color="#ADB5BD">No tasks for today!</Text>
        </VStack>

        <VStack w="100%" h="8rem">
          <HStack justify="space-between" w="100%" align="end">
            <Text fontSize="lg" fontWeight="semibold" color="#212529">Thursday</Text>
            <Text fontSize="sm" fontWeight="medium" color="#ADB5BD">May 15, 2025</Text>
          </HStack>
          <Text fontSize="sm"  color="#ADB5BD">No tasks for Thursday!</Text>
        </VStack>
      </VStack>

    </HStack>
  );
}