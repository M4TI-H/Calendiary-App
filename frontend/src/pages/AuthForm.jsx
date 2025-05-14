import { Outlet } from "react-router-dom";
import { Flex, HStack, Image, Box } from "@chakra-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthForm (){
  const [loginPage, setLoginPage] = useState(true);
  const MotionImage = motion(Image);
  const MotionBox = motion(Box);

  return (
    <Flex  w="100vw" h="100vh" flexDir="row" align="center" justify="center" bg="#2a9d8f" overflowX="hidden"
    bgImage="url('background.png')" bgRepeat="no-repeat" bgSize="cover" bgPosition="center" bgAttachment="fixed">

      <HStack spacing="0" px="6"  w="100%" h="100%"
        minW="20rem" maxW={{base: "28rem", lg: "64rem"}} minH="28rem" maxH="36rem"
        bg="#F8F9FA" borderRadius="xl" boxShadow="2xl" 
        flexDir={loginPage && "row-reverse"} justify={{base: "center", lg: "space-between"}}>

        <AnimatePresence mode="wait">
          <MotionBox
            minW="18rem" maxW="28rem" h="90%" w="100%"
            initial={{ x: loginPage ? -450 : 450 }}
            animate={{ x: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Outlet context={{setLoginPage, loginPage}}/>
          </MotionBox>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <MotionImage w="36rem" h="32rem" mx="2"
            key={loginPage ? "login1" : "login2"}
            src={loginPage ? "login1.jpg" : "login2.jpg"}
            initial={{x: loginPage ? 450 : -450 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
            display={{ base: "none", lg: "block" }}
            borderRadius="2xl"
          />
        </AnimatePresence>
      </HStack>
    </Flex>
  );
}