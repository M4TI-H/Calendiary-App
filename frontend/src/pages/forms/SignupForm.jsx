import React from 'react'
import { Flex, Heading, Input, Text, VStack, InputGroup, Button } from "@chakra-ui/react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function SignupForm () {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [errorList, setErrorList] = useState([]);

    async function registerNewUser(data){
      try{
        await axios.post('http://localhost:8000/auth/register', data);
      } catch (err) {
        console.error(`Register error: ${err.message}`);
      }
    }
    
    function handleRegisterSubmit(e) {
      e.preventDefault(); 
      if (password === repeatedPassword){
        const data = {
          email: login,
          password: password
        }
        registerNewUser(data);
      }
      else{
        console.log("Passwords are not the same.")
      }
    }

    return (
      <Flex  w="100vw" h="100vh" flexDir="row" align="center" justify="center" bg="#2a9d8f" overflow="hidden"
      bgImage={{ base: "none", md: "url('colorkit.png')" }}  bgRepeat="no-repeat" bgSize="cover" bgPosition="center" bgAttachment="fixed">

        {/*<Image src="logo.png" pos="absolute" maxH="7rem" h={{ base: "10rem", sm: "auto" }} left="0" top="0"/>*/}

        <VStack maxW="34rem" minW="28rem" maxH="36rem" minH="12rem" w={{ base: "50vw", sm: "auto" }} h="100%"
        p={10} align="center" bg="#F8F9FA" borderRadius="xl" boxShadow="2xl" spacing={6}>

          <Heading fontSize="4xl" fontWeight="bold" color="#2b2d42">Sign up</Heading>
          <Text fontSize="md" fontWeight="semibold" color="#2b2d42">Please enter your account details</Text>

          <FormControl mt={16}>
            <FormLabel color="#2b2d42">Email address</FormLabel>
              <InputGroup>
                <Input onChange={e => setLogin(e.target.value)} type="email" minW="20rem" maxW="24rem" 
                  minH="2.5rem" maxH="3rem" w={{ base: "70vw", sm: "auto" }} h={{ base: "3rem", sm: "auto" }}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
              </InputGroup>
            <FormErrorMessage>There is an account using that email.</FormErrorMessage>
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

          <FormControl mt={24}>
            <FormLabel color="#2b2d42">Repeat password</FormLabel>
              <InputGroup>
                <Input onChange={e => setRepeatedPassword(e.target.value)}  type="password" minW="20rem" maxW="24rem"
                  minH="2.5rem" maxH="3rem" w={{ base: "70vw", sm: "auto" }} h={{ base: "3rem", sm: "auto" }}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
              </InputGroup>
              <FormErrorMessage>This password is not valid. Try again.</FormErrorMessage>
          </FormControl>

          <Button onClick={handleRegisterSubmit} mt={2} fontSize="md" minW="10rem" maxW="14rem" minH="2em" maxH="3rem"
            w={{ base: "30vw", sm: "auto" }} h={{ base: "5vh", sm: "4vh" }}
            bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }}
          >Create account</Button>

          <Button as={Link} to="/login" mt="auto" fontSize="md" minW="6rem" maxW="8rem" minH="2rem" maxH="3rem"
            w={{ base: "7rem", sm: "auto" }} h={{ base: "3rem", sm: "auto" }}
            bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }}
          >Login</Button>
        </VStack>
      </Flex>
    );
}