import { useState } from 'react';
import { Flex, Text, Button, ListItem, ListIcon, List, Tooltip, IconButton } from '@chakra-ui/react';
import { BiCheckCircle, BiCircle, BiTrash  } from "react-icons/bi";


export default function TodoTask({content, due_date}) {
  const [isTaskDone, setIsTaskDone] = useState(false);

  function setTaskStatus () {
    setIsTaskDone(!isTaskDone);
  }

  function textEdit () {
    console.log("Text has been clicked!");
  }

  return(
    <ListItem align="end">
      <Flex w="22rem" h="3rem" pl="3" pr="1" py="1" flexDir="row" align="center" borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor="#CED4DA" bg="#F8F9FA">
        <Tooltip label="Change task status" openDelay="700" bg="#F8F9FA" borderWidth="1px" borderColor="#CED4DA" color="#2b2d42" borderRadius="md" placement="left">
          <Flex onClick={() => setTaskStatus()} h="1.5rem" w="1.5rem" borderRadius="full" bg="#aacc00" _hover={{bg: "#80b918"}}>
            {isTaskDone ? 
            <BiCheckCircle size="100%" color="#007f5f"/>
            :
            <BiCircle size="100%" color="#007f5f"/>
            } 
          </Flex>
        </Tooltip>

        <Text onDoubleClick={() => textEdit()} ml="3" mr="2" decoration={isTaskDone ? "line-through" : "none"} color={isTaskDone ? "#ADB5BD" : "#2b2d42"} fontWeight="semibold">{content}</Text>
        {isTaskDone ? 
          <IconButton bg="none" _hover={{bg: "rgba(193, 18, 31, 0.5)", color: "#780000"}} ml="auto" borderRadius="lg"> 
            <BiTrash size="1.4rem" hover={{color: "#780000"}}/>
          </IconButton>
          : <></>}
      </Flex>
      {due_date && !isTaskDone ? <Text color="#ADB5BD" mr="2" mt="1" fontSize="sm">Due: {due_date}</Text> : <></>}
      
    </ListItem>
      
  );
}

