import { useState, useEffect } from "react";
import { Flex, VStack, Heading, Text, HStack, Wrap, WrapItem, Divider } from "@chakra-ui/react";
import axios from "axios";
import Note from "./components/Note";

export default function Notes () {
  const [noteData, setNoteData] = useState([]);
  const token = localStorage.getItem("accessToken");

  function fetchNotes() {
    axios.get('http://localhost:8000/note/fetch_notes', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setNoteData(res.data.note);
    })
    .catch((err) => {
      console.error(`error: ${err.message}`);
    })
  }

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, []);

  return (
    <VStack w="80vw" h="auto" mt="1rem" bg="#F8F9FA" borderTopRadius="xl" p="2">
      <Heading py="3">Your notes</Heading>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" mb="5"/>

      <HStack>
         <Wrap spacing="5" justify="center">
          <WrapItem>
            <Flex onClick={() => setIsListCreated(true)} w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" 
              borderWidth="3px" borderStyle="dashed" borderColor="#2b2d42" bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", 
              transform: "scale(1.05, 1.05)"}}>
              <Text color="#2b2d42" textAlign="center" fontSize="sm" fontWeight="semibold">Add new note</Text>
            </Flex>
          </WrapItem>
          {noteData.map(note => (
            <WrapItem key={note.note_id}>
              <Note id={note.note_id} content={note.content} date={note.create_date} color={"yellow.300"} onNoteDelete={() => {setNoteData(prev => prev.filter(n => n.note_id !== note.note_id))}}/>
            </WrapItem>
          ))}
         </Wrap>
      </HStack>
      <Flex>
        
      </Flex>
    </VStack>
  );
}