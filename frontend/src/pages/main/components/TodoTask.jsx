import { useState } from 'react';
import { Flex, Text, Link, Tooltip, IconButton, Input, VStack } from '@chakra-ui/react';
import { BiCheckCircle, BiCircle, BiTrash, BiSolidEdit  } from "react-icons/bi";
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
      await axios.patch("http://localhost:8000/main/todo/update_task", {
        todo_id: id,
        ...updatedData
      });
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  async function deleteTask() {
    try {
      await axios.delete(`http://localhost:8000/main/todo/delete_task/${id}`);
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
    <VStack align="flex-end">
      <Flex w="22rem" h="3rem" pl={isDoubleClicked ? "0" : "3"} pr={isDoubleClicked ? "0" : "1"} py="1" flexDir="row" align="center" borderRadius="lg" boxShadow="md" 
      borderWidth={isDoubleClicked ? "2px" : "1px"} borderColor={isDoubleClicked ? "#248277" : "#CED4DA"} bg={isTaskDone ? "#2b2d42" : "#F8F9FA"}>
        {!isDoubleClicked &&
        (<Tooltip label="Change task status" openDelay="700" bg="#F8F9FA" borderWidth="1px" borderColor="#CED4DA" color="#2b2d42" borderRadius="md" placement="left">
          <Flex onClick={() => setTaskStatus()} h="1.5rem" w="1.5rem" borderRadius="full" bg="#aacc00" _hover={{bg: "#80b918", cursor: "pointer"}}>
            {isTaskDone ? 
            <BiCheckCircle size="100%" color="#007f5f"/>
            :
            <BiCircle size="100%" color="#007f5f"/>
            }
          </Flex>
        </Tooltip>)
        }
        {isDoubleClicked ?
          <Flex w="100%" align="baseline" justify="space-between" p="0">
            <Input defaultValue={content} onChange={e => setEditedText(e.target.value)} border="none" _focusVisible="false"/>
            <IconButton h="3rem" w="3rem" bg="#248277" _hover={{bg: "#14746f"}}  onClick={submitTextChange}
              border="2px" borderColor="#248277" borderX="none" borderRadius="lg" borderLeftRadius="none">
            <BiSolidEdit/></IconButton>
          </Flex>
          :
          <Text onDoubleClick={textDoubleClick} ml="3" mr="2" decoration={isTaskDone ? "line-through" : "none"} 
          color={isTaskDone ? "#ADB5BD" : "#2b2d42"} fontWeight="semibold" _hover={{cursor: "default"}}>
            {displayedText}</Text>
          }
        {!isDoubleClicked && (
          isTaskDone && (
            <IconButton onClick={deleteTask} bg="none" _hover={{ bg: "rgba(193, 18, 31, 0.5)", color: "#780000" }} ml="auto" borderRadius="lg"> 
              <BiTrash size="1.4rem" />
            </IconButton>
          )
        )}
      </Flex>
      {isDoubleClicked && (
        <Link onClick={() => setIsDoubleClicked(false)} mr="1" fontSize="sm" fontWeight="semibold" color="#ADB5BD">Cancel</Link>
      )}
      {due_date && !isTaskDone ? <Text color={new Date(dateNow) < new Date(dueDate) ? "#ADB5BD" : "#ef233c"} mr="2" fontSize="sm">Due: {dueDate}</Text> : <></>}
    </VStack>
  );
}

