import React from 'react'
import { Flex, Heading, Input, Text, VStack, InputGroup, Button, Image, Link, FormControl, FormErrorMessage, 
  FormLabel, InputRightElement, Checkbox } from "@chakra-ui/react";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import InputValidation from './InputValidation';

export default function LoginForm () {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
      email: "",
      password: "",
      repeatedPassword: ""
    });
    const [errors, setErrors] = useState({
      email: "",
      password: "",
      repeatedPassword: "",
      general: ""
    });
    const [isError, setIsError] = useState(false);

    async function loginUser(data){
      try{
        const response = await axios.post('http://localhost:8000/auth/login', data);
        setLoginData({email: "", password: ""});
        setErrors({email: "", password: "", general: ""});
        setIsError(false);

        if (response.data.status === "User logged in successfully."){
          localStorage.setItem("accessToken", response.data.user);
          navigate("/");
        }
      } catch (err) {
        if (err.response) {
          console.error(`Log in error: ${err.response}`);

          if (err.response.data.status) {
            setErrors({...errors,
              email: err.response.data.status === "No user with that email." ? "No user with that email." : "",
              password: err.response.data.status === "Incorrect password." ? "Incorrect password." : ""});
          }
          else{
             setErrors({...errors, general: "Something went wrong. Please try again."});
             console.log(errors.general);
          }
        }
        setIsError(true);
      }
    }

    function handleLoginSubmit(e) {
      e.preventDefault(); 
      const isRepeatedPassNeeded = false;
      const validationErrors = InputValidation(loginData, errors, setErrors, isRepeatedPassNeeded);
      
      if (!validationErrors.email && !validationErrors.password && !validationErrors.repeatedPassword){
        const data = {
          email: loginData.email,
          password: loginData.password
        }
        loginUser(data);
      } else {
        setIsError(true);
      }
    }
    
    //password visibility handler
    const [visibility, setVisibility] = useState(false);
    const handleVisibility = () => {
      setVisibility(!visibility);
    }

    return (
      <Flex  w="100vw" h="100vh" flexDir="row" align="center" justify="center" bg="#2a9d8f" overflowX="hidden"
      bgImage={{ base: "none", md: "url('background.png')" }}  bgRepeat="no-repeat" bgSize="cover" bgPosition="center" bgAttachment="fixed">

        <Image src="logo.png" pos="absolute" maxH="7rem" h={{ base: "10rem", sm: "auto" }} left="0" top="0"/>

        <VStack minW="28rem" maxH="36rem" minH="32rem" w={{ base: "50vw", sm: "auto" }} h="100%"
        p={10} align="center" bg="#F8F9FA" borderRadius="xl" boxShadow="2xl" spacing={6}>

          <Heading fontSize="4xl" fontWeight="bold" color="#2b2d42">Log in</Heading>
          <Text fontSize="md" fontWeight="semibold" color="#2b2d42">Welcome back to Calendiary!</Text>

          <FormControl mt={4} isInvalid={isError}>
            <FormLabel color="#2b2d42">Email address</FormLabel>
              <InputGroup>
                <Input onChange={e => setLoginData({...loginData, email: e.target.value})} value={loginData.email} type="email"
                  minW="20rem" maxW="24rem" minH="2.5rem" maxH="3rem" w="100%" h={{ base: "3rem", sm: "auto" }}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
              </InputGroup>
              <FormErrorMessage color="#ef233c" fontSize="sm">{errors.email}</FormErrorMessage>
          </FormControl>
        
          <FormControl mt={4} isInvalid={isError}>
            <FormLabel color="#2b2d42">Password</FormLabel>
              <InputGroup>
                <Input onChange={e => setLoginData({...loginData, password: e.target.value})} value={loginData.password} type={visibility ? 'text' : 'password'}
                  minW="20rem" maxW="24rem" minH="2.5rem" maxH="3rem" w="100%" h={{ base: "3rem", sm: "auto" }} maxLength={32}
                  bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", borderColor: "#ADB5BD", borderWidth: "thin"}}/>
                <InputRightElement width="4.5rem">
                  
                  <Button w="4rem" size="sm" onClick={handleVisibility} rightIcon={visibility ? <TbEye /> : <TbEyeClosed />}>
                  {visibility ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage color="#ef233c" fontSize="sm">{errors.password}</FormErrorMessage>
            <Checkbox pos="absolute" right="0" mt={2}>Remember me</Checkbox>
          </FormControl>

          <Button onClick={handleLoginSubmit} mt={6} fontSize="md" minW="10rem" maxW="14rem" minH="2em" maxH="3rem"
            w={{ base: "30vw", sm: "auto" }} h={{ base: "5vh", sm: "4vh" }}
            bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }}
          >Sign in</Button>

          <Text color="#2b2d42" fontSize="md" mt="auto">No account yet?{" "}
            <Link as={RouterLink} to="/signup" color="#248277" _hover={{ color: "#14746f", textDecor: "underline" }}
            fontWeight="semibold" textDecor="none">Register</Link>
          {" "}now!</Text>
        </VStack>
      </Flex>
    );
}