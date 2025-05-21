import { useState, useEffect } from 'react';
import { VStack, Heading, Divider, Wrap, HStack, WrapItem } from "@chakra-ui/react";
import axios from 'axios';
import TodoList from "./components/todo_components/TodoList";
import AddTaskList from "./components/todo_components/AddTaskList";
import TaskListForm from './components/todo_components/TaskListForm';

export default function Todo () {
  const [todosData, setTodosData] = useState([]);  
  const [bookmarkData, setBookmarkData] = useState([]);
  const [isListCreated, setIsListCreated] = useState(false);
  const [expandedList, setExpandedList] = useState(null);
  const token = localStorage.getItem("accessToken");
  
  function formatDate(date) {
    const dateOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };

    return new Date().toLocaleString("en-GB", dateOptions);
  }

  function fetchTodoLists() {
    axios.get('http://localhost:8000/todo/fetch_todo_lists', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setTodosData(res.data.list);
    })
    .catch((err) => {
      console.error(`error: ${err.message}`);
    })
  }

  async function fetchBookmarks() {
    try {
      const res = await axios.get('http://localhost:8000/main/fetch_bookmarks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarkData(res.data.bookmark);
    }
    catch (err) {
      console.error(`error: ${err.message}`);
      return [];
    }
  
  }

  function getBookmarkName(bookmarkId) {
  const bookmark = bookmarkData.find(b => b.bookmark_id === bookmarkId);
  return bookmark ? bookmark.name : "";
}

  useEffect(() => {
    if (token) {
      fetchTodoLists();
      fetchBookmarks();
    }
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, []);

  return (
    <VStack w="74rem" maxH="54rem" h="100%" bg="#F8F9FA" pb="20" 
      overflow="auto" sx={{
        '&::-webkit-scrollbar': { w: "6px" },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#6C757D', borderRadius: "full" },
        '&::-webkit-scrollbar-track': { backgroundColor: "none" }
      }}
    >
      <Heading py="3">Your to-dos</Heading>
      <Divider w="full" maxW="95%" borderY="1px solid #ADB5BD" />

      <HStack>
        <Wrap spacing="5" align="flex-start" justify="center">
          {!isListCreated ?
            <AddTaskList setIsListCreated={setIsListCreated} fetchBookmarks={fetchBookmarks} setBookmarkData={setBookmarkData}/>
          :
            <TaskListForm formatDate={formatDate} setIsListCreated={setIsListCreated} setTodosData={setTodosData} fetchTodoLists={fetchTodoLists} bookmarkData={bookmarkData}/>
          }
          {todosData.map(list => (
            <TodoList key={list.todo_list_id} list_id={list.todo_list_id} title={list.title} expandedList={expandedList} setExpandedList={setExpandedList}
            date={list.create_date} favorite={list.favorite} bookmark={getBookmarkName(list.bookmark)} onListDelete={() => {setTodosData(prev => prev.filter(l => l.todo_list_id !== list.todo_list_id))}}/>
          ))}
        </Wrap>
      </HStack>
    </VStack>
  );
}