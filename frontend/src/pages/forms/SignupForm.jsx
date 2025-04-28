import React from 'react'
import { Flex, Heading, Input, Text, VStack, InputGroup, Button, Link , Image} from "@chakra-ui/react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Link as RouterLink } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import InputValidation from './InputValidation';

export default function SignupForm () {
    const [registerData, setRegisterData] = useState({
      email: "",
      password: "",
      repeatedPassword: ""
    });
    const [errors, setErrors] = useState({
      email: "",
      password: "",
      repeatedPassword: ""
    });
    const [isError, setIsError] = useState(false);

    async function registerNewUser(data){
      try{
        await axios.post('http://localhost:8000/auth/register', data);
        setRegisterData({email: "", password: "", repeatedPassword: ""});
        setErrors({email: "", password: "", repeatedPassword: ""});
        setIsError(false);
      } catch (err) {
        console.error(`Register error: ${err.message}`);
      }
    }
    
    function handleRegisterSubmit(e) {
      e.preventDefault(); 
      const isRepeatedPassNeeded = true;
      const validationErrors = InputValidation(registerData, errors, setErrors, isRepeatedPassNeeded);
      
      if (!validationErrors.email && !validationErrors.password && !validationErrors.repeatedPassword){
        const data = {
          email: registerData.email,
          password: registerData.password
        }
        registerNewUser(data);
      } else {
        setIsError(true);
      }
    }

    return (
      <Flex  w="100vw" h="100vh" flexDir="row" align="center" justify="center" bg="#2a9d8f" overflow="hidden"
      bgImage={{ base: "none", md: "url('background.png')" }}  bgRepeat="no-repeat" bgSize="cover" bgPosition="center" bgAttachment="fixed">

        <Image src="logo.png" pos="absolute" maxH="7rem" h={{ base: "10rem", sm: "auto" }} left="0" top="0"/>

        <VStack maxW="34rem" minW="28rem" maxH="36rem" minH="32rem" w={{ base: "50vw", sm: "auto" }} h="100%"
        p={10} align="center" bg="#F8F9FA" borderRadius="xl" boxShadow="2xl" spacing={6}>

          <Heading fontSize="4xl" fontWeight="bold" color="#2b2d42">Sign up</Heading>
          <Text fontSize="md" fontWeight="semibold" color="#2b2d42">Please enter your account details</Text>

          <FormControl mt={2} isInvalid={isError}>
            <FormLabel color="#2b2d42">Email address</FormLabel>
              <InputGroup>
                <Input onChange={e => setRegisterData({...registerData, email: e.target.value})} value={registerData.email} type="email"
                  minW="20rem" maxW="24rem" minH="2.5rem" maxH="3rem" w="100%" h={{ base: "3rem", sm: "auto" }}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
              </InputGroup>
              <FormErrorMessage color="#ef233c" fontSize="small">{errors.email}</FormErrorMessage>
          </FormControl>
        
          <FormControl mt={2} isInvalid={isError}>
            <FormLabel color="#2b2d42">Password</FormLabel>
              <InputGroup>
                <Input onChange={e => setRegisterData({...registerData, password: e.target.value})} value={registerData.password} type="password"
                  minW="20rem" maxW="24rem" minH="2.5rem" maxH="3rem" w="100%" h={{ base: "3rem", sm: "auto" }}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
              </InputGroup>
              <FormErrorMessage color="#ef233c" fontSize="small">{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl mt={2} isInvalid={isError}>
            <FormLabel color="#2b2d42">Repeat password</FormLabel>
              <InputGroup>
                <Input onChange={e => setRegisterData({...registerData, repeatedPassword: e.target.value})} value={registerData.repeatedPassword} type="password"
                  minW="20rem" maxW="24rem" minH="2.5rem" maxH="3rem" w="100%" h={{ base: "3rem", sm: "auto" }}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
              </InputGroup>
              <FormErrorMessage color="#ef233c" fontSize="small">{errors.repeatedPassword}</FormErrorMessage>
          </FormControl>

          <Button onClick={handleRegisterSubmit} mt={2} fontSize="md" minW="10rem" maxW="14rem" minH="2.5em" maxH="3rem"
            w={{ base: "30vw", sm: "auto" }} h={{ base: "5vh", sm: "4vh" }} 
            bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }}
          >Create account</Button>

          <Text color="#2b2d42" fontSize="md" mt="auto">Already registered?{" "}
            <Link as={RouterLink} to="/login" color="#248277" _hover={{ color: "#14746f", textDecor: "underline" }}
            fontWeight="semibold" textDecor="none">Log in</Link>
          {" "}now!</Text>
        </VStack>
      </Flex>
    );
}