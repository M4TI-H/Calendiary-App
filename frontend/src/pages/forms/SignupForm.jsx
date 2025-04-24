import React from 'react'
import { Flex, Heading, Input, Text, VStack, InputGroup, Button } from "@chakra-ui/react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Link } from "react-router-dom";
import { useState } from 'react';

export default function SignupForm () {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    return (
      <Flex w="100vw" h="100vh" bg="#2A9D8F" flexDir="row" align="center" justify="center">
        <VStack w="26vw" h="60vh" align="center" bg="#F8F9FA" borderRadius="20px" pt="2vh">

            <Flex w="80%" h="8vh" flexDir="column" justify="space-between">
              <Heading fontSize="5vh" color="#264653">Sign up</Heading>
              <Text className="loginSub" fontSize="2vh" color="#495057">Please enter your account details</Text>
            </Flex>

            <Flex w="inherit" h="14vh" justify="center">
              <FormControl>
                <FormLabel color="#264653">Email address</FormLabel>
                  <InputGroup h="40%">
                    <Input className="loginInput" onChange={e => setLogin(e.target.value)} variant="unstyled" w="20vw" h="5vh" type="text" bg="#DEE2E6"/>
                  </InputGroup>
                <FormErrorMessage>There is an account using that email.</FormErrorMessage>
              </FormControl>
            </Flex>
            
            <Flex w="inherit" h="12vh" justify="center">
              <FormControl>
                <FormLabel color="#264653">Password</FormLabel>
                  <InputGroup h="40%">
                    <Input className="loginInput" onChange={e => setPassword(e.target.value)} variant="unstyled" w="20vw" h="5vh" type="password" bg="#DEE2E6"/>
                  </InputGroup>
                <FormErrorMessage>This password is not valid. Try again.</FormErrorMessage>
              </FormControl>
            </Flex>
            <Button className="loginBtn" w="10vw" h="4vh" variant="unstyled" bg="#567CA2" color="#F8F9FA">Create account</Button>

            <Button as={Link} to="/login">Login</Button>
        </VStack>
        
      </Flex>
    );
}