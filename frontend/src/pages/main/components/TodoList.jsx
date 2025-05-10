import { useState, useEffect, forwardRef, useRef } from 'react';
import { Divider, Flex, Text, Input, HStack, IconButton, VStack, Link, FormErrorMessage, FormControl, WrapItem, Button,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, useDisclosure} from '@chakra-ui/react';
import { BiListPlus, BiSolidEdit, BiX } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import TodoTask from './TodoTask';

export default function TodoList({list_id, title, date, onListDelete, expandedList, setExpandedList}) {
  const [taskData, setTaskData] = useState([]);
  const [newTaskData, setNewTaskData] = useState({
    description: "",
    due_date: "",
  });
  const [createNewTask, setCreateNewTask] = useState(false);
  const [inputError, setInputError] = useState("");
  const taskListRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const token = localStorage.getItem("accessToken");

  function formatDate(date) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric"
    };

    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    date.setHours(0, 0, 0, 0);
    return date.toLocaleString("en-GB", options).replace(",", "").toString();
  }

  function fetchTasks() {
    axios.get(`http://localhost:8000/todo/fetch_tasks/${list_id}`, { 
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setTaskData(res.data.task);
    })
    .catch((err) => {
      console.error(`error: ${err.message}`);
    })
  }

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }

    if (list_id !== expandedList && taskListRef.current) {
      const isOverflow = taskListRef.current.scrollHeight > taskListRef.current.clientHeight;
      setIsOverflowing(isOverflow);
    }
  }, []);

  async function addTask(newTaskData) {
    try {
      const dueDate = newTaskData.due_date
        ? new Date(newTaskData.due_date).toLocaleDateString('en-CA')
        : null;
      const dateNow = new Date().toLocaleDateString('en-CA');
      if (newTaskData.description === "") {
        setInputError("Task cannot be empty.");
        return;
      }
      else if (dateNow > dueDate){
        setInputError("Due date cannot be in past");
        return;
      }
      else{
        setInputError("");
      }

      const response = await axios.post("http://localhost:8000/todo/add_task", 
        { 
          list_id: list_id,
          description: newTaskData.description, 
          due_date: dueDate
        }, 
        { 
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const newTask = response.data.task;
      setTaskData(prev => [...prev, newTask]);
      setCreateNewTask(false);
      setNewTaskData({description: "", due_date: ""});
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  async function removeList() {
    try {
      await axios.delete(`http://localhost:8000/todo/remove_list/${list_id}`);
      onListDelete();
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  const DatePickerInput = forwardRef(
    ({value, onClick}, ref) => (
      <Flex align="center">
        <Link ref={ref} onClick={onClick} fontSize="sm" fontWeight="semibold" color="#ADB5BD">
          {newTaskData.due_date ? `Due: ${formatDate(newTaskData.due_date)}` : "Select due date"}
        </Link>
        {value && <BiX onClick={() => setNewTaskData({ ...newTaskData, due_date: "" })} color="#ADB5BD" size="1rem" style={{cursor: "pointer"}}/>}
      </Flex>
    )
  )

  return(
    <WrapItem>
      <Flex w="25rem" minH="30rem" h={list_id === expandedList ? "auto" : "30rem"} p="3"  flexDir="column" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
        bg="#F8F9FA" _hover={{bg: "#F1F3F5", transition: "ease-in .2s"}}>
        <HStack w="100%" maxH="5rem" h="auto" align="center" justify="start" pos="relative" pl="4">
          <Text maxW="18rem" fontSize="xl" fontWeight="semibold">{title}</Text>
          <IconButton onClick={() => setCreateNewTask(true)} pos="absolute" right="0" mr="4"><BiListPlus /></IconButton>
        </HStack>
        
        <Divider borderWidth="1px" w="90%" my="2"/>
        <VStack ref={taskListRef} spacing="2" w="100%" py="2" maxH={list_id === expandedList ? "auto" : "21rem"} overflow="hidden">
          {createNewTask && 
            <VStack w="100%" _hover={{cursor: "default"}}>
              <FormControl isInvalid={inputError !== ""}>
                <Flex p="0" flexDir="row" justify="center">
                  <Input w="19rem" h="3rem" placeholder="Type your task here" onChange={e => setNewTaskData({...newTaskData, description: e.target.value})} 
                    borderColor="#248277" borderWidth="2px" borderRadius="lg" bg="#F8F9FA" _focusVisible="false" _hover="none" borderRightRadius="none"
                    maxLength="100"
                  />

                  <IconButton onClick={() => addTask(newTaskData)} h="3rem" w="3rem" bg="#248277" _hover={{bg: "#14746f"}} 
                    border="2px" borderColor="#248277" borderX="none" borderRadius="lg" borderLeftRadius="none">
                  <BiSolidEdit/></IconButton>
                </Flex>
                <FormErrorMessage mx="1rem" color="#ef233c" fontSize="sm">{inputError}</FormErrorMessage>
              </FormControl>
              <HStack justify="space-between" w="100%" px="4">
                <DatePicker 
                  closeOnScroll="true"
                  selected={newTaskData.due_date} 
                  onChange={date => {
                    setNewTaskData({...newTaskData, due_date: date});
                  }}
                  customInput={<DatePickerInput/>}
                />
                <Link onClick={() => {setCreateNewTask(false); setInputError("");}} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Cancel</Link>
              </HStack>
            </VStack>
          }
          {(!isOverflowing ? taskData : taskData.slice(0, 5)).map(task => {
            return <TodoTask key={task.todo_id} id={task.todo_id} content={task.description} due_date={task.due_date} 
            onDelete={() => {setTaskData(prev => prev.filter(t => t.todo_id !== task.todo_id))}}/>
          })}
        </VStack>
        <HStack px="3" w="100%" mt="auto" justify="space-between" align="center">
          <Link onClick={onOpen} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Remove list</Link>
          {isOverflowing && 
            <Link onClick={() => setExpandedList(list_id === expandedList ? null : list_id)} fontSize="sm" fontWeight="semibold" color="#ADB5BD">
              {list_id === expandedList ? "Hide" : "Show all"}
            </Link>
          }
          <Text fontSize="sm" color="#ADB5BD">{date}</Text>
        </HStack>    
      </Flex>
    
      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="2xl" fontWeight="bold">Remove task list</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Flex w="100%" flexDir="row" align="center" justify="space-between">
                <Button onClick={onClose} ref={cancelRef}>Cancel</Button>
                <Button colorScheme="red" onClick={() => {onClose(); removeList()}}>Delete</Button>
              </Flex>
              
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </WrapItem>
  );
}