import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Flex, Text, VStack,Divider, Wrap, WrapItem, Heading, Button, HStack } from "@chakra-ui/react";
import { BiListUl, BiNote, BiCalendar, BiBody } from "react-icons/bi";
import axios from "axios";
import Note from "./components/Note";
import TodoTask from "./components/todo_components/TodoTask";

export default function Dashboard ({narrowScreen}) {
  const { userData } = useOutletContext();
  const [taskData, setTaskData] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const token = localStorage.getItem("accessToken");

  function fetchTodaysTasks() {
    axios.get("http://localhost:8000/todo/fetch_todays_tasks", { 
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setTaskData(res.data.task);
    })
    .catch((err) => {
      console.error(`error: ${err.message}`);
    })
  }

  function fetchRecentNotes() {
    axios.get("http://localhost:8000/note/fetch_recent_notes", { 
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setNoteData(res.data.note);
    })
    .catch((err) => {
      console.error(`error: ${err.message}`);
    })
  }

  useEffect(() => {
    if (token) {
      fetchTodaysTasks();
      fetchRecentNotes();
    }
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, []);

  return (
    <VStack maxW="74rem" w="full" h={narrowScreen ? "100vh" : "54rem"} bg="#F8F9FA" overflowY="auto"
    sx={{
      '&::-webkit-scrollbar': { w: "6px" },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#6C757D', borderRadius: "full" },
      '&::-webkit-scrollbar-track': { backgroundColor: "none" }
    }}
    >
      <Flex w="full" maxW="90%" h="full" minH="5rem" 
        ml={{base: "0", md: "10"}}  mr={{base: "0", md: "auto"}}
        flexDir="column" justify="center" align={{base: "center", md: "unset"}}
      >
        <Heading fontSize={{base: "lg", md: "2xl"}} fontWeight="bold">Welcome, {userData.name}</Heading>
        <Text fontSize={{base: "md", md: "lg"}}>What are you up to today?</Text>
      </Flex>

      <Flex w="full" maxW="95%" h="full" minH="20rem" p="3" align="center" flexDir="column" mb="5">
        <Heading fontSize={{base: "lg", md: "2xl"}} fontWeight="bold">Your statistics:</Heading>
        <Wrap spacing="5" my="5" w="90%" justify="center">
          <WrapItem _hover={{cursor: "pointer", transform: "scale(1.05, 1.05)"}} flexDir="column" alignItems="center">
            <Flex bg="black" w={{base: "8rem", md: "12rem"}} h={{base: "8rem", md: "12rem"}}></Flex>
            <Text variant="helperText">Your progress</Text>
          </WrapItem>
          <WrapItem _hover={{cursor: "pointer", transform: "scale(1.05, 1.05)"}} flexDir="column" alignItems="center">
            <Flex bg="black" w={{base: "8rem", md: "12rem"}} h={{base: "8rem", md: "12rem"}}></Flex>
            <Text variant="helperText">Your progress</Text>
          </WrapItem>
          <WrapItem _hover={{cursor: "pointer", transform: "scale(1.05, 1.05)"}} flexDir="column" alignItems="center">
            <Flex bg="black" w={{base: "8rem", md: "12rem"}} h={{base: "8rem", md: "12rem"}}></Flex>
            <Text variant="helperText">Your progress</Text>
          </WrapItem>
          <WrapItem _hover={{cursor: "pointer", transform: "scale(1.05, 1.05)"}} flexDir="column" alignItems="center">
            <Flex bg="black" w={{base: "8rem", md: "12rem"}} h={{base: "8rem", md: "12rem"}}></Flex>
            <Text variant="helperText">Your progress</Text>
          </WrapItem>
        </Wrap>
      </Flex>

      <Divider w="full" maxW="95%" borderY="1px solid #ADB5BD" my="5"/>

      <Flex w="auto" maxW="80%" h="auto" flexDir="column" justify="center">
        <Wrap spacing="0" alignItems="center" justify="center">
          <WrapItem>

            <VStack as={ Link } to="/notes" mx="5" my="3" w={{base: "6rem", md: "8rem"}} h={{base: "6rem", md: "8rem"}} p="2" bg="#F1F3F5" 
              justify="center" spacing="3" borderRadius="xl" boxShadow="xl"
              transition= ".2s ease-in-out" _hover={{bg: "rgba(131, 197, 190, 0.5)", cursor: "pointer", transform: "scale(1.05, 1.05)", color: "#006d77"}}>
              <BiNote size="2rem"/>
              <Text textAlign="center" fontSize="xs" fontWeight="medium">Create a note</Text>
            </VStack>

            <VStack as={ Link } to="/todo" mx="5" my="3" w={{base: "6rem", md: "8rem"}} h={{base: "6rem", md: "8rem"}} p="2" bg="#F1F3F5" 
              justify="center" spacing="3" borderRadius="xl" boxShadow="xl"
              transition= ".2s ease-in-out" _hover={{bg: "rgba(131, 197, 190, 0.5)", cursor: "pointer", transform: "scale(1.05, 1.05)", color: "#006d77"}}>
              <BiListUl size="2rem"/>
              <Text textAlign="center" fontSize="xs" fontWeight="medium">Add new task</Text>
            </VStack>

          </WrapItem>
          <WrapItem>

            <VStack as={ Link } to="/calendar" mx="5" my="3" w={{base: "6rem", md: "8rem"}} h={{base: "6rem", md: "8rem"}} p="2" bg="#F1F3F5" 
              justify="center" spacing="3" borderRadius="xl" boxShadow="xl"
              transition= ".2s ease-in-out" _hover={{bg: "rgba(131, 197, 190, 0.5)", cursor: "pointer", transform: "scale(1.05, 1.05)", color: "#006d77"}}>
              <BiCalendar size="2rem"/>
              <Text textAlign="center" fontSize="xs" fontWeight="medium">Check my plans</Text>
            </VStack>

            <VStack as={ Link } to="/wellness" mx="5" my="3" w={{base: "6rem", md: "8rem"}} h={{base: "6rem", md: "8rem"}} p="2" bg="#F1F3F5"
              justify="center" spacing="3" borderRadius="xl" boxShadow="xl"
              transition= ".2s ease-in-out" _hover={{bg: "rgba(131, 197, 190, 0.5)", cursor: "pointer", transform: "scale(1.05, 1.05)", color: "#006d77"}}>
              <BiBody size="2rem"/>
              <Text textAlign="center" fontSize="xs" fontWeight="medium">My well-being</Text>
            </VStack>

          </WrapItem>
        </Wrap>
      </Flex>
      <Divider w="full" maxW="95%" borderY="1px solid #ADB5BD" my="5"/>
      {taskData.length > 0 && 
      <>
      <Heading fontSize="2xl">Tasks for today:</Heading>
      <VStack spacing="3" my="2" w="30rem">
        {taskData.map(task => {
          return <TodoTask key={task.todo_id} id={task.todo_id} content={task.description} due_date={task.due_date} 
          onDelete={() => {setTaskData(prev => prev.filter(t => t.todo_id !== task.todo_id))}}/>
        })}
      </VStack>

      <Divider w="full" maxW="95%" borderY="1px solid #ADB5BD" my="5"/>
      </>
      }

      <VStack w="100%" h="auto" my="2">
        <Heading fontSize="2xl">Recent notes:</Heading>
        <Wrap spacing="8" alignItems="center" justify="center">
          {noteData.map(note => {
            return (
            <WrapItem key={note.note_id}>
              <Note note_id={note.note_id} content={note.content} date={note.create_date} color={note.color}/>
            </WrapItem>
          )})}
        </Wrap>
      </VStack>
      
    </VStack>
  );
}