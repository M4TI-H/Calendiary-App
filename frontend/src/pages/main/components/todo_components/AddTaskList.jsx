import { Tooltip, Flex, Text } from "@chakra-ui/react";
import { BiPlus } from 'react-icons/bi';

export default function AddTaskList({setIsListCreated, fetchBookmarks, setBookmarkData}) {

  async function handleClick() {
    const bookmarks = await fetchBookmarks(); 
    setBookmarkData(bookmarks);
    console.log(bookmarks);
    setIsListCreated(true);
  }

  return (
    <Tooltip label="Add new to-do list!" openDelay="1000" bg="#F8F9FA" borderWidth="1px" borderColor="#CED4DA" color="#2b2d42" borderRadius="md" placement="bottom" showArrow>
      <Flex onClick={handleClick} w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" borderWidth="2px" borderColor="#E9ECEF"
        bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transform: "scale(1.05)"}} transition="all .1s ease-in-out">
            <BiPlus size="50%" color="#ADB5BD"/>
      </Flex>
    </Tooltip>
  );
}