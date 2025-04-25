import React from 'react'
import { Flex, Heading, Input, Text, VStack, InputGroup, Button } from "@chakra-ui/react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Link } from "react-router-dom";
import { useState } from 'react';

export default function LoginForm () {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    return (
      <Flex  w="100vw" h="100vh" flexDir="row" align="center" justify="center" bg="#2a9d8f" overflow="hidden"
      bgImage={{ base: "none", md: "url('colorkit.png')" }}  bgRepeat="no-repeat" bgSize="cover" bgPosition="center" bgAttachment="fixed">
        <VStack maxW="34rem" minW="28rem" maxH="32rem" minH="12rem" w={{ base: "50vw", sm: "auto" }} h="100%"
        p={10} align="center" bg="#F8F9FA" borderRadius="xl" boxShadow="2xl" spacing={6}>

          <Heading fontSize="4xl" fontWeight="bold" color="#2b2d42">Log in</Heading>
          <Text fontSize="md" fontWeight="semibold" color="#2b2d42">Welcome back to Calendiary!</Text>

          <FormControl mt={16}>
            <FormLabel color="#2b2d42">Email address</FormLabel>
              <InputGroup>
                <Input onChange={e => setLogin(e.target.value)} type="email" minW="20rem" maxW="24rem" 
                  minH="2.5rem" maxH="3rem" w={{ base: "70vw", sm: "auto" }} h={{ base: "3rem", sm: "auto" }}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
              </InputGroup>
            <FormErrorMessage>There is no account with this email.</FormErrorMessage>
          </FormControl>
        
          <FormControl mt={24}>
            <FormLabel color="#2b2d42">Password</FormLabel>
              <InputGroup>
                <Input onChange={e => setPassword(e.target.value)} type="password" minW="20rem" maxW="24rem"
                  minH="2.5rem" maxH="3rem" w={{ base: "70vw", sm: "auto" }} h={{ base: "3rem", sm: "auto" }}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
              </InputGroup>
            <FormErrorMessage>This password is not valid. Try again.</FormErrorMessage>
          </FormControl>

          <Button mt={2} fontSize="md" minW="10rem" maxW="14rem" minH="2em" maxH="3rem"
            w={{ base: "30vw", sm: "auto" }} h={{ base: "5vh", sm: "4vh" }}
            bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }}
          >Sign in</Button>

          <Button as={Link} to="/signup" mt="auto" fontSize="md" minW="8rem" maxW="10rem" minH="2rem" maxH="3rem"
             w={{ base: "8rem", sm: "auto" }} h={{ base: "3rem", sm: "auto" }}
            bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }}
          >Sign up now</Button>
        </VStack>
      </Flex>
    );
}