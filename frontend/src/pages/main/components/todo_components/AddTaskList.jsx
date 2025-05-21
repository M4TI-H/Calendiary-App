import { Tooltip, Flex, WrapItem } from "@chakra-ui/react";
import { BiPlus } from 'react-icons/bi';

export default function AddTaskList({setIsListCreated}) {

  return (
    <WrapItem w="20rem" minH="30rem" h="auto" display="flex" alignItems="center" justifyContent="center">
      <Tooltip label="Add new to-do list!" openDelay="1000" bg="#F8F9FA" border="1px solid #CED4DA" color="#2b2d42" borderRadius="md" placement="bottom">
        <Flex onClick={() => setIsListCreated(true)} w="10rem" h="10rem" 
          p="2" flexDir="column" justify="center" align="center" 
          borderRadius="xl" border="3px dashed #212529" boxShadow="xl"
          _hover={{bg: "#F1F3F5", cursor: "pointer", transform: "scale(1.05)"}} transition=".2 ease-in">
            <BiPlus size="30%" color="#212529"/>
        </Flex>
      </Tooltip>
    </WrapItem>
    
  );
}