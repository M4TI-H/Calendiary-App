import { useState, useEffect, forwardRef } from 'react';
import { Divider, Flex, Text, List, ListItem, Input, HStack, IconButton, VStack, Link } from '@chakra-ui/react';
import { BiListPlus, BiSolidEdit, BiX } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import TodoTask from './TodoTask';

export default function TodoList({title, date}) {
  const [taskData, setTaskData] = useState([]);
  const [newTaskData, setNewTaskData] = useState({
    description: "",
    due_date: ""
  });
  const [createNewTask, setCreateNewTask] = useState(false);
  const token = localStorage.getItem("accessToken");


  useEffect(() => {
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
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, []);


  async function addTask(newTaskData) {
    try {
      const response = await axios.post("http://localhost:8000/main/todo/add_task", newTaskData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("accessToken")}` 
        }
      });
      
      const newTask = response.data.task;
      setTaskData(prev => [...prev, newTask]);
      setCreateNewTask(false);
      setNewTaskData({description: "", due_date: ""});
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  const DatePickerInput = forwardRef(
    ({value, onClick}, ref) => (
      <Flex align="center">
        <Link ref={ref} onClick={onClick} fontSize="sm" fontWeight="semibold" color="#ADB5BD">
          {newTaskData.due_date === "" ? "Select due date" : `Due: ${value}` }
        </Link>
        {newTaskData.due_date === "" ? <></> : <BiX onClick={() => setNewTaskData({ ...newTaskData, due_date: "" })} color="#ADB5BD" size="1rem" style={{cursor: "pointer"}}/>}
      </Flex>
    )
  )

  return(
    <Flex w="25rem" h="30rem" p="3" flexDir="column" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
    bg="#F8F9FA" _hover={{bg: "#F1F3F5", transition: "ease-in .2s"}}>
      <HStack w="100%" align="center" justify="center" pos="relative">
        <Text fontSize="xl" fontWeight="semibold" >{title}</Text>
        <IconButton onClick={() => setCreateNewTask(true)} pos="absolute" right="0" mr="4"><BiListPlus /></IconButton>
      </HStack>
      
      <Divider borderWidth="1px" w="90%" my="2"/>
      <VStack spacing="2" w="100%">
        {createNewTask ? 
          <VStack w="100%" _hover={{cursor: "default"}}>
            <Flex  p="0">
              <Input w="19rem" h="3rem" placeholder="Type your task here" onChange={e => setNewTaskData({...newTaskData, description: e.target.value})} 
              borderColor="#248277" borderWidth="2px" borderRadius="lg" bg="#F8F9FA" _focusVisible="false" _hover="none" borderRightRadius="none"/>

              <IconButton onClick={() => addTask(newTaskData)} h="3rem" w="3rem" bg="#248277" _hover={{bg: "#14746f"}} 
                border="2px" borderColor="#248277" borderX="none" borderRadius="lg" borderLeftRadius="none">
              <BiSolidEdit/></IconButton>
              
            </Flex>
            <HStack justify="space-between" w="100%" px="4">

              <DatePicker closeOnScroll="true"
                selected={newTaskData.due_date} 
                onChange={date => setNewTaskData({...newTaskData, due_date: date})}
                customInput={<DatePickerInput/>}
              />
              
              <Link onClick={() => setCreateNewTask(false)} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Cancel</Link>
            </HStack>

          </VStack>
        : <></>}
        {taskData.map(task => {
          return <TodoTask key={task.todo_id} id={task.todo_id} content={task.description} due_date={task.due_date} 
          onDelete={() => {setTaskData(prev => prev.filter(t => t.todo_id !== task.todo_id))}}/>
        })}
      </VStack>

      <Text fontSize="sm" color="#ADB5BD" mt="auto" ml="auto">{date}</Text>
    </Flex>
  );
}

