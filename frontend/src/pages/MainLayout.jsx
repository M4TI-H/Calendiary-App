import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Flex, HStack, useBreakpointValue } from '@chakra-ui/react';
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
    <HStack align="flex-start" w="full" minH="100vh" bg="#2a9d8f" bgImage={{ base: "none", md: "url('background.png')" }} bgRepeat="no-repeat" bgSize="cover" 
      bgPosition="center" bgAttachment="fixed" spacing="0">
      {narrowScreen ? 
      <CompactNavigation narrowScreen={narrowScreen}/>
      :
      <>
      <Sidebar narrowScreen={narrowScreen}/>
      </>
      }
      <Flex flex="1" h="100%" justifyContent="center">
        <Outlet context={{ userData, narrowScreen }}/>
      </Flex>

    </HStack>
  );
}