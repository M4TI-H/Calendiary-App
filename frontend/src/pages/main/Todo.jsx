import { useState, useEffect } from 'react';
import { Flex, VStack, Heading, Divider, Wrap, WrapItem, Text, Input, Link, Button, HStack, } from "@chakra-ui/react";
import axios from 'axios';
import TodoList from "./components/TodoList";

export default function Todo () {
  const [todosData, setTodosData] = useState([]);  
  const [isListCreated, setIsListCreated] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [inputError, setInputError] = useState("");
  const [expandedList, setExpandedList] = useState(null);

  const token = localStorage.getItem("accessToken");
  
  function formatDate(date) {
    const dateOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };

    return new Date().toLocaleString("en-GB", dateOptions);
  }

  function fetchTodoLists() {
    axios.get('http://localhost:8000/todo/fetch_todo_lists', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setTodosData(res.data.list);
    })
    .catch((err) => {
      console.error(`error: ${err.message}`);
    })
  }

  useEffect(() => {
    if (token) {
      fetchTodoLists();
    }
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, []);

  async function addTaskList(){
    if (listTitle === "") {
      setInputError("Title cannot be empty.");
      return;
    } 
    else{
      setInputError("");
    }
    setIsListCreated(false);

    let dateNow = new Date();
    dateNow = formatDate(dateNow);

    try {
      const response = await axios.post("http://localhost:8000/todo/add_todo_list", 
        { title: listTitle, dateNow: dateNow }, 
        { headers: { Authorization: `Bearer ${token}` }
      });
      const newList = response.data.list;
      setTodosData(prev => [...prev, newList]);
      fetchTodoLists()
      setListTitle("");
    } catch (err) {
      console.error(`error: ${err.message}`);
    }
  }

  return (
    <VStack w="80vw" h="auto" mt="8" bg="#F8F9FA" borderTopRadius="xl" p="2">
      <Heading py="3">Your to-dos</Heading>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" mb="5"/>

      <HStack>
        <Wrap spacing="5" justify="center">
          {!isListCreated ?
          <WrapItem>
            <Flex onClick={() => setIsListCreated(true)} w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
              bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05, 1.05)"}}>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">Add new task list</Text>
            </Flex>
          </WrapItem>
          :
          <WrapItem>
            <Flex w="25rem" h="30rem" p="3" flexDir="column" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
              bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s"}}>
              <Input onChange={e => setListTitle(e.target.value)} w="19rem" h="3rem" placeholder="Set list title"  maxLength="60"
              borderColor="#248277" borderWidth="2px" borderRadius="lg" bg="#F8F9FA" _focusVisible="false" _hover="none"/>
              
              <Divider borderWidth="1px" w="90%" my="2"/>
              <Button onClick={addTaskList} mt="auto" mb="3" fontSize="md" minW="10rem" maxW="14rem" minH="2em" maxH="3rem"
                  w={{ base: "30vw", sm: "auto" }} h={{ base: "5vh", sm: "4vh" }}
                  bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }}
                >Submit</Button>
              <Link onClick={() => setIsListCreated(false)} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Cancel</Link>
            </Flex>
          </WrapItem>
          }
          
          {todosData.map(list => (
            <TodoList key={list.todo_list_id} list_id={list.todo_list_id} title={list.title} expandedList={expandedList} setExpandedList={setExpandedList}
            date={list.create_date} favorite={list.favorite} bookmark={list.bookmark} onListDelete={() => {setTodosData(prev => prev.filter(l => l.todo_list_id !== list.todo_list_id))}}/>
          ))}
        </Wrap>
      </HStack>
    </VStack>
  );
}