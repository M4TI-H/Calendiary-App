import { useState, useEffect } from 'react';
import { Divider, Flex, Text, List } from '@chakra-ui/react';
import axios from 'axios';
import TodoTask from './TodoTask';

export default function TodoList({title, date}) {
  const [taskData, setTaskData] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  const token = localStorage.getItem("accessToken");

  const fetchTasks = async () => {
    if (token) {
      axios.get('http://localhost:8000/main/todo/fetch_tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      .then((res) => {
        setTaskData(res.data.task);
      })
      .catch((err) => {
        console.error(`error: ${err.message}`);
      })
    }
  }

  useEffect(() => {
    if (searchText === "") {
      fetchTasks();
    }
    else {
      console.log(searchText);
    }
  }, [searchText]);

  return(
    <Flex w="25rem" h="30rem" p="3" flexDir="column" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
    bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s"}}>
        
      <Text textAlign="center" fontSize="xl" fontWeight="semibold">{title}</Text>

      <Divider borderWidth="1px" w="90%" my="2"/>
      <List spacing="2">
        {taskData.map(task => {
          return <TodoTask key={task.todo_id} id={task.todo_id} content={task.description} due_date={task.due_date}/>
        })}
      </List>

      <Text fontSize="sm" color="#ADB5BD" mt="auto" ml="auto">{date}</Text>
    </Flex>
  );
}

