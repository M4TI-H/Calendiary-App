import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Flex, Text, VStack,Divider, Wrap, WrapItem, Heading, Button } from "@chakra-ui/react";
import { BiListUl, BiNote, BiCalendar, BiBody } from "react-icons/bi";
import axios from "axios";
import Note from "./components/Note";
import TodoTask from "./components/todo_components/TodoTask";

export default function Dashboard () {
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
    <VStack w="80vw" h="auto" mt="1rem" bg="#F8F9FA" borderTopRadius="xl" p="2">
      <Flex w="100%" h="5rem" pl="5" justify="center" flexDir="column">
        <Heading fontSize="4xl" fontWeight="semibold">Welcome, {userData.name}</Heading>
        <Text fontSize="xl" ml="1">What are you up to today?</Text>
      </Flex>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" />

      <Flex w="auto" h="auto" flexDir="column" justify="center" pt="2" px="8">
        <Wrap spacing="8" alignItems="center" justify="center">
          <WrapItem>
            <Flex as={ Link } to="/notes" w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
            _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <BiNote size="3rem"/>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">Create a note</Text>
            </Flex>
          </WrapItem>
          <WrapItem>
            <Flex as={ Link } to="/todo" w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
            _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <BiListUl size="3rem"/>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">Add new task</Text>
            </Flex>
          </WrapItem>
          <WrapItem>
            <Flex as={ Link } to="/calendar" w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
            _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <BiCalendar size="3rem"/>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">Check my plans</Text>
            </Flex>
          </WrapItem>
          <WrapItem>
            <Flex as={ Link } to="/wellness" w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
            _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <BiBody size="3rem"/>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">My well-being</Text>
            </Flex>
          </WrapItem>
        </Wrap>
      </Flex>

      {taskData.length > 0 && 
      <>
        <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" my="5"/>

        <Flex w="auto" h="auto" flexDir="column" pt="2" px="8" >
          <Heading fontSize="2xl" pb="4">Tasks for today:</Heading>

          <VStack spacing="2" w="100%" h="auto" py="2">
            {taskData.map(task => {
              return <TodoTask key={task.todo_id} id={task.todo_id} content={task.description} due_date={task.due_date} 
              onDelete={() => {setTaskData(prev => prev.filter(t => t.todo_id !== task.todo_id))}}/>
            })}
          </VStack>
          
        </Flex>
      </>
      }

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" my="5"/>

      <Flex w="auto" h="auto" flexDir="column" pt="2" px="8">
        <Heading fontSize="2xl" pb="4">Recent notes:</Heading>
        <Wrap spacing="8" alignItems="center" justify="center">
          {noteData.map(note => {
              return (
              <WrapItem>
                <Note key={note.note_id} note_id={note.note_id} content={note.content} date={note.create_date} color={"yellow.300"}/>
              </WrapItem>
            )})}
          <WrapItem>
            <Button as={ Link } to="/notes" bg="#212529" color="#F8F9FA" _hover={{bg: "#343A40"}} pos="absolute">Show all</Button>
          </WrapItem>
        </Wrap>
      </Flex>
      
    </VStack>
  );
}