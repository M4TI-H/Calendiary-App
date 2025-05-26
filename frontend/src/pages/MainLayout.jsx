import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { VStack, HStack, useBreakpointValue, Text, Divider } from '@chakra-ui/react';
import axios from 'axios';
import Sidebar from './main/components/sidebar_components/Sidebar';
import CompactNavigation from './main/components/sidebar_components/CompactNavigation';
import CalendarPanel from './main/components/CalendarPanel';
import CompactCalendarPanel from './main/components/CompactCalendarPanel';

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
  <>
    {narrowScreen &&
      <CompactCalendarPanel />
    }
    <HStack w="full" h="100vh" bg="#d5bdaf" spacing="0" justify="center" align="center" overflow="hidden">
      {narrowScreen ? 
      <CompactNavigation narrowScreen={narrowScreen}/>
      :
      <Sidebar narrowScreen={narrowScreen}/>
      }
      <Outlet context={{ userData, narrowScreen }}/>
    
    {!narrowScreen &&
    <CalendarPanel />
    } 
    </HStack>
  </>
  );
}