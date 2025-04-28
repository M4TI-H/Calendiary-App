import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Flex, HStack } from '@chakra-ui/react';
import Sidebar from './main/components/Sidebar';

export default function MainLayout() {
    const navigate = useNavigate();
    
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
      }
      else {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    }, []);

  return (
    <HStack w="100vw" h="100vh" bg="#2a9d8f" overflowX="hidden" justify="space-between"
    bgImage={{ base: "none", md: "url('background.png')" }}  bgRepeat="no-repeat" bgSize="cover" bgPosition="center" bgAttachment="fixed">
      <Sidebar />
      <Flex bg="green">

      </Flex>
      <Outlet />
    </HStack>
  );
}