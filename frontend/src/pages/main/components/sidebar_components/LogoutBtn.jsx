import { Link, useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, Flex, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

import axios from "axios";

export default function LogoutBtn({ icon, narrowScreen }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  function handleUserLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  return(
    <>
    {narrowScreen ?
    <IconButton onClick={onOpen}
        w="10vw" h="90%"
        borderRadius="10" color="#2b2d42"
        bg="none" _hover={{bg: "rgba(193, 18, 31, 0.5)", color: "#780000"}}
      >{icon}</IconButton>
    :
    <Button onClick={onOpen}
      w="95%" h="3rem" mt="auto" mb="5"
      justifyContent="flex-start" pl="8"
      leftIcon={icon} borderRadius="10"  color="#2b2d42"
      bg="none" _hover={{bg: "rgba(193, 18, 31, 0.5)", color: "#780000"}}
    >Log out</Button>
    }

    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="2xl" fontWeight="bold">Log out</AlertDialogHeader>
          <AlertDialogBody>
            You are now logging out.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Flex w="100%" flexDir="row" align="center" justify="space-between">
              <Button onClick={onClose} ref={cancelRef}>Cancel</Button>
              <Button colorScheme="red" onClick={handleUserLogout}>Leave</Button>
            </Flex>
            
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
    </>
    
  );
}