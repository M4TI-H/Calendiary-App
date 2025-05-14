import { Tooltip, Flex, WrapItem } from "@chakra-ui/react";
import { BiPlus } from 'react-icons/bi';

export default function AddTaskList({setIsListCreated}) {

  return (
    <WrapItem w="20rem" minH="30rem" h="auto" display="flex" alignItems="center" justifyContent="center">
      <Tooltip label="Add new to-do list!" openDelay="1000" bg="#F8F9FA" borderWidth="1px" borderColor="#CED4DA" color="#2b2d42" borderRadius="md" placement="bottom" showArrow>
        <Flex onClick={() => setIsListCreated(true)} w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" borderWidth="2px" borderColor="#E9ECEF"
          bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transform: "scale(1.05)"}} transition="all .1s ease-in-out">
              <BiPlus size="50%" color="#ADB5BD"/>
        </Flex>
      </Tooltip>
    </WrapItem>
    
  );
}