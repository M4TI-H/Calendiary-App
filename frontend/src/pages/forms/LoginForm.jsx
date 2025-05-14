import { Heading, Input, Text, VStack, InputGroup, Button, Link, FormControl, FormErrorMessage, FormLabel, InputRightElement, Checkbox, IconButton } from "@chakra-ui/react";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { Link as RouterLink, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import InputValidation from './InputValidation';

export default function LoginForm () {
  const { setLoginPage } = useOutletContext();
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
  <VStack w="inherit" h="inherit" p={{base: "none", lg: "10"}} align="center" borderRadius="xl">


    <Heading fontSize="4xl" fontWeight="bold" color="#2b2d42">Log in</Heading>
    <Text fontSize="md" fontWeight="semibold" color="#2b2d42">Welcome back to Calendiary!</Text>

    <FormControl mt="4" isInvalid={isError}>
      <FormLabel color="#2b2d42">Email address</FormLabel>
        <InputGroup>
          <Input onChange={e => setLoginData({...loginData, email: e.target.value})} value={loginData.email} type="email"
            w="100%" minH="2.5rem" maxH="3rem" h={{ base: "3rem", sm: "auto" }}
            bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", border: "thin solid #ADB5BD"}}/>
        </InputGroup>
        <FormErrorMessage color="#ef233c" fontSize="sm">{errors.email}</FormErrorMessage>
    </FormControl>
  
    <FormControl mt="4" isInvalid={isError}>
      <FormLabel color="#2b2d42">Password</FormLabel>
        <InputGroup>
          <Input onChange={e => setLoginData({...loginData, password: e.target.value})} value={loginData.password} type={visibility ? 'text' : 'password'}
           w="100%" minH="2.5rem" maxH="3rem" h={{ base: "3rem", sm: "auto" }} maxLength="32"
            bg="#DEE2E6" variant="filled" _hover={{ bg: "#CED4DA" }} _focus={{bg: "#CED4DA", border: "thin solid #ADB5BD"}}/>
          <InputRightElement width="4.5rem">
            
            <IconButton w="2rem" size="sm" onClick={handleVisibility}>
              {visibility ? <TbEye /> : <TbEyeClosed />}
            </IconButton>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage color="#ef233c" fontSize="sm">{errors.password}</FormErrorMessage>
      <Checkbox pos="absolute" right="0" mt="2">Remember me</Checkbox>
    </FormControl>

    <Button onClick={handleLoginSubmit} mt="10" minW="10rem" maxW="14rem" minH="2em" maxH="3rem"
      w={{ base: "30vw", sm: "auto" }} h={{ base: "5vh", sm: "4vh" }}
      bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }} fontSize="md"
    >Sign in</Button>

    <Text color="#2b2d42" fontSize="md" mt="auto">No account yet?{" "}
      <Link onClick={() => setLoginPage(false)} as={RouterLink} to="/signup" color="#248277" _hover={{ color: "#14746f", textDecor: "underline" }}
      fontWeight="semibold" textDecor="none">Register</Link>
    {" "}now!</Text>
  </VStack>
  );
}