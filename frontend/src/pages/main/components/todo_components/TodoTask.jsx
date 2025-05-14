import { useState } from 'react';
import { Flex, Text, Link, Tooltip, IconButton, Input, VStack, HStack, Textarea } from '@chakra-ui/react';
import { BiCheck, BiCircle, BiTrash  } from "react-icons/bi";
import axios from 'axios';

export default function TodoTask({id, content, due_date, onDelete}) {
  const [isTaskDone, setIsTaskDone] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [displayedText, setDisplayedText] = useState(content);

  function formatDate(date) {
    const dateOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric"
    };
  
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    date.setHours(0, 0, 0, 0);
    return date.toLocaleString("en-GB", dateOptions).replace(",", "");
  }
  let dateNow = new Date();
  dateNow = formatDate(dateNow);
  const dueDate = formatDate(due_date);
  
  async function updateTask(updatedData){
    try {
      await axios.patch("http://localhost:8000/todo/update_task", {
        todo_id: id,
        ...updatedData
      });
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  async function deleteTask() {
    try {
      await axios.delete(`http://localhost:8000/todo/delete_task/${id}`);
      onDelete();   //instantly update current task list
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  function setTaskStatus() {
    const newStatus = !isTaskDone;
    setIsTaskDone(newStatus);
    updateTask({status: newStatus});
  }

  function textDoubleClick() {
    setEditedText(displayedText);
    setIsDoubleClicked(!isDoubleClicked);
  }

  function submitTextChange() {
    //don't update if nothing changed
    if (editedText.trim() === displayedText.trim()) {
      setIsDoubleClicked(false);
      return;
    }

    setIsTaskDone(false);
    setIsDoubleClicked(!isDoubleClicked);
    setDisplayedText(editedText);
    updateTask({description: editedText, status: false});
  }

  return(
      <Flex w="100%" h="auto" minH={due_date && isDoubleClicked ? "4rem" : "3rem"} maxH="10rem"
        py="2" px="2" flexDir="column" pos="relative"
        borderRadius="lg" boxShadow="md" 
        border="1px #CED4DA" bg={isTaskDone ? "#CED4DA" : "#F8F9FA"} 
      >
        <HStack my="auto">
          {!isDoubleClicked &&
          (<Tooltip label="Change task status" openDelay="700" bg="#F8F9FA" borderWidth="1px" borderColor="#CED4DA" color="#2b2d42" borderRadius="md" placement="left">
            <Flex onClick={() => setTaskStatus()} h="1.5rem" w="1.5rem" borderRadius="full" bg="#83c5be" _hover={{bg: "#6FA8A3", cursor: "pointer"}} my="auto">
              {isTaskDone ? 
              <BiCheck size="100%" color="#006d77"/>
              :
              <BiCircle size="100%" color="#006d77"/>
              }
            </Flex>
          </Tooltip>)
          }
          {isDoubleClicked ?
            <Flex w="100%" h="auto" align="baseline" justify="space-between">
              <Textarea resize="none" overflow="hidden" defaultValue={content} onChange={e => setEditedText(e.target.value)} 
              _focusVisible="false" maxLength="100"/>
              
            </Flex>
            :
            <Text maxW="14rem" onDoubleClick={textDoubleClick} my="auto" ml="3" mr="2" decoration={isTaskDone ? "line-through" : "none"} 
            color={isTaskDone ? "#ADB5BD" : "#2b2d42"} fontWeight="semibold" _hover={{cursor: "default"}}>
              {displayedText}</Text>

          }
          {!isDoubleClicked && (
            isTaskDone && (
              <IconButton h="2rem" w="2rem" onClick={deleteTask} bg="none" _hover={{ bg: "rgba(193, 18, 31, 0.5)" }} my="auto" ml="auto" borderRadius="lg"> 
                <BiTrash size="1.4rem" color="#780000"/>
              </IconButton>
            )
          )}
        </HStack>

        <HStack display={isDoubleClicked || (!isTaskDone && due_date) ? "flex" : "none"} justify="space-between" mt="1" px="2" w="100%" right="0" bottom="0">
          {isDoubleClicked && <Link onClick={() => setIsDoubleClicked(false)} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Cancel</Link>}
          {isDoubleClicked && <Link onClick={submitTextChange} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Confirm change</Link>}
          {!isDoubleClicked && due_date && !isTaskDone && <Text color={new Date(dateNow) < new Date(dueDate) ? "#ADB5BD" : "#ef233c"} ml="auto" fontSize="sm">Due: {dueDate}</Text>}
        </HStack>
        
      </Flex>
  );
}