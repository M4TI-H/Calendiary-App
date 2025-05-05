import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Flex, Box, HStack } from '@chakra-ui/react';
import axios from 'axios';
import Sidebar from './main/components/Sidebar';

export default function MainLayout() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
      email: "",
      name: ""
    })
    
    //fetch user data 
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
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
      else {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    }, []);


  return (
    <HStack w="100vw" h="100vh" bg="#2a9d8f" direction="row" justify="space-between" spacing="0"
    bgImage={{ base: "none", md: "url('background.png')" }}  bgRepeat="no-repeat" bgSize="cover" bgPosition="center" bgAttachment="fixed">
      <Sidebar />
      <Flex flex="1" w="100%" h="100%" justifyContent="center">
          <Outlet context={{ userData }}/>
        </Flex>
    </HStack>
  );
}