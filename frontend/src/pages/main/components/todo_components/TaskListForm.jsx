import { useState } from 'react';
import { Flex, Divider, Text, Link, Button, Textarea, Tag, TagLabel, TagLeftIcon, Wrap, WrapItem } from "@chakra-ui/react";
import { BiSun, BiDesktop, BiGift } from 'react-icons/bi';
import axios from 'axios';
import BookmarkTag from "./BookmarkTag";

export default function TaskListForm({formatDate, setIsListCreated, setTodosData, fetchTodoLists, bookmarkData }) {
  const [listTitle, setListTitle] = useState("");
  const [inputError, setInputError] = useState("");
  const [selectedBookmark, setSelectedBookmark] = useState([]);
  const token = localStorage.getItem("accessToken");

  async function addTaskList(){
    if (listTitle === "") {
      setInputError("Title cannot be empty.");
      return;
    } 
    else{
      setInputError("");
    }
    setIsListCreated(false);

    let dateNow = new Date();
    dateNow = formatDate(dateNow);

    try {
      const response = await axios.post("http://localhost:8000/todo/add_todo_list", 
        { title: listTitle, dateNow: dateNow, bookmark: selectedBookmark }, 
        { headers: { Authorization: `Bearer ${token}` }
      });
      const newList = response.data.list;
      setTodosData(prev => [...prev, newList]);
      fetchTodoLists()
      setListTitle("");
    } 
    catch (err) {
      console.error(`error: ${err.message}`);
    }
  }

  return (
    <Flex w="25rem" h="30rem" p="3" flexDir="column" align="center" borderRadius="xl" boxShadow="xl" border="2px" borderColor="#E9ECEF"
      bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s"}}>
      
      <Textarea onChange={e => setListTitle(e.target.value)} w="100%" h="8rem" resize="none"  maxLength="60" p="2" fontSize="lg" fontWeight="semibold"
        placeholder="Give your list a title!" borderRadius="lg" _hover={{boxShadow: "0 0 0 1px #248277"}}  _focus={{ boxShadow: "0 0 0 2px #248277"}} border="none"
      />

      <Divider w="100%" color="#ADB5BD" borderTopWidth="2px" my="4"/>

      <Text fontSize="sm" fontWeight="semibold" color="#ADB5BD" mb="2">Bookmarks</Text>

      <Wrap maxH="10rem" w="80%" justify="center">
        {bookmarkData.map(bookmark => {
          return (
          <WrapItem key={bookmark.bookmark_id}>
            <BookmarkTag id={bookmark.bookmark_id} name={bookmark.name} color={bookmark.color} icon={bookmark.icon} 
              setSelectedBookmark={setSelectedBookmark} selectedBookmark={selectedBookmark} isSelected={selectedBookmark === bookmark.bookmark_id ? true : false}
            />
          </WrapItem>
          )
        })}
      </Wrap>
      
      <Button onClick={addTaskList} mt="auto" mb="3" fontSize="md" minW="10rem" maxW="14rem" minH="2em" maxH="3rem"
          w={{ base: "30vw", sm: "auto" }} h={{ base: "5vh", sm: "4vh" }}
          bg="#248277" color="#F8F9FA" _hover={{ bg: "#14746f" }}
        >Submit</Button>
      <Link onClick={() => setIsListCreated(false)} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Cancel</Link>
    </Flex>
  );
}