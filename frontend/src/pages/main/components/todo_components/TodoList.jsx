import { useState, useEffect, forwardRef, useRef } from 'react';
import { Divider, Flex, Text, Input, HStack, IconButton, VStack, Link, FormErrorMessage, FormControl, WrapItem, Button, useDisclosure, Box} from '@chakra-ui/react';
import { BiListPlus, BiSolidEdit, BiX, BiCheckCircle } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import TodoTask from './TodoTask';
import AlertDialogComponent from '../AlertDialog';

export default function TodoList({list_id, title, date, bookmark, onListDelete, expandedList, setExpandedList}) {
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
  }, []);

  useEffect(() => {
    const element = taskListRef.current;

    if (!element || list_id === expandedList) return;

    const observer = new ResizeObserver(() => {
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      setIsOverflowing(scrollHeight > clientHeight);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [expandedList, taskData.length])

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


  const DatePickerInput = forwardRef(
    ({value, onClick}, ref) => (
      <Flex align="center">
        <Link ref={ref} onClick={onClick} fontSize="xs" color="#ADB5BD">
          {newTaskData.due_date ? `Due: ${formatDate(newTaskData.due_date)}` : "Select due date"}
        </Link>
        {value && <BiX onClick={() => setNewTaskData({ ...newTaskData, due_date: "" })} color="#ADB5BD" size="1rem" style={{cursor: "pointer"}}/>}
      </Flex>
    )
  )

  return(
    <WrapItem>
      <Flex w="20rem"  h={list_id === expandedList ? "auto" : "30rem"} minH="30rem" 
        p="3" flexDir="column" align="center" pos="relative" 
        borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
        bg="#F8F9FA" _hover={{bg: "#F1F3F5", transition: "ease-in .2s"}}
      >
        <VStack w="100%" maxW="24rem" maxH="15rem" h="auto" align="start" spacing="0">
          <Text w="100%" fontSize="xs" color="#ADB5BD">{bookmark}</Text>
          <Text w="100%" fontSize="md" fontWeight="semibold">{title}</Text>
        </VStack>
        
        <Divider borderWidth="1px" w="90%" my="2"/>
        <VStack ref={taskListRef} spacing="2" w="100%" py="2" maxH={list_id === expandedList ? "none" : "20rem"} overflow="hidden">
          {createNewTask ?
            <VStack w="100%" _hover={{cursor: "default"}}>
              <FormControl isInvalid={inputError !== ""}>
                <Flex p="0" flexDir="row" justify="center">
                  <Input w="19rem" h="3rem" onChange={e => setNewTaskData({...newTaskData, description: e.target.value})} 
                    maxLength="100" placeholder="Type your task here" fontSize="sm"
                    borderColor="#248277" borderWidth="2px" borderRadius="lg" borderRightRadius="none" bg="#F8F9FA" 
                    _focusVisible="false" _hover="none"
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
                <Link onClick={() => {setCreateNewTask(false); setInputError("");}} variant="textButton">Cancel</Link>
              </HStack>
            </VStack>
            :
            <Button onClick={() => setCreateNewTask(true)} leftIcon={<BiListPlus />} w="80%" minH="2rem" maxH="2rem"
              bg="#F8F9FA" border="1px solid #CED4DA" boxShadow="md" fontSize="sm"
            >New task</Button>
          }

          {(list_id === expandedList || !isOverflowing ? taskData : taskData.slice(0, 5)).map(task => {
            return <TodoTask key={task.todo_id} id={task.todo_id} content={task.description} due_date={task.due_date} 
              onDelete={() => {setTaskData(prev => prev.filter(t => t.todo_id !== task.todo_id))}}/>
          })}
        </VStack>
        {isOverflowing &&
          <Link onClick={() => setExpandedList(list_id === expandedList ? null : list_id)} py="2" variant="textButton">
            {list_id === expandedList ? "Hide" : "Show all"}
          </Link>
          }
        <HStack px="3" w="100%" mt="auto" justify="space-between" align="center">
          <Link onClick={onOpen} fontSize="xs" color="#ADB5BD">Delete</Link>
          <Text variant="helperText">{date}</Text>
        </HStack>    
      </Flex>
    
      <AlertDialogComponent list_id={list_id} onClose={onClose} isOpen={isOpen} cancelRef={cancelRef} onDelete={onListDelete}/>
    </WrapItem>
  );
}