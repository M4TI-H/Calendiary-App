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
      return res.data.bookmark;
    }
    catch (err) {
      console.error(`error: ${err.message}`);
      return [];
    }
  
  }

  useEffect(() => {
    if (token) {
      fetchTodoLists();
    }
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, []);

  return (
    <VStack w="80vw" h="auto" mt="8" bg="#F8F9FA" borderTopRadius="xl" p="2">
      <Heading py="3">Your to-dos</Heading>

      <Divider w="100%" borderTopWidth="2px" mb="5"/>

      <HStack>
        <Wrap spacing="5" align="center" justify="center">
            <WrapItem>
            {!isListCreated ?
              <AddTaskList setIsListCreated={setIsListCreated} fetchBookmarks={fetchBookmarks} setBookmarkData={setBookmarkData}/>
            :
              <TaskListForm formatDate={formatDate} setIsListCreated={setIsListCreated} setTodosData={setTodosData} fetchTodoLists={fetchTodoLists} bookmarkData={bookmarkData}/>
            }
            </WrapItem>
          
          {todosData.map(list => (
            <TodoList key={list.todo_list_id} list_id={list.todo_list_id} title={list.title} expandedList={expandedList} setExpandedList={setExpandedList}
            date={list.create_date} favorite={list.favorite} bookmark={list.bookmark} onListDelete={() => {setTodosData(prev => prev.filter(l => l.todo_list_id !== list.todo_list_id))}}/>
          ))}
        </Wrap>
      </HStack>
    </VStack>
  );
}