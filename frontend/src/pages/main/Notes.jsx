import { useState, useEffect } from "react";
import { Flex, VStack, Heading, Text, HStack, Wrap, WrapItem, Divider, Textarea, Link, Button } from "@chakra-ui/react";
import axios from "axios";
import Note from "./components/Note";

export default function Notes () {
  const [noteData, setNoteData] = useState([]);
  const [isNoteCreated, setIsNoteCreated] = useState(false);
  const [content, setContent] = useState("");
  const [inputError, setInputError] = useState("");
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

  async function addNote(){
    if (content === "") {
      setInputError("Note cannot be empty.");
      return;
    } 
    else{
      setInputError("");
    }
    setIsNoteCreated(false);
  
    let dateNow = new Date();
    dateNow = formatDate(dateNow);
    try {
      const response = await axios.post("http://localhost:8000/note/add_note", 
        { content: content, dateNow: dateNow }, 
        { headers: { Authorization: `Bearer ${token}` }
      });
      const newNote = response.data.note;
      setNoteData(prev => [...prev, newNote]);
      fetchNotes()
      setContent("");
    } 
    catch (err) {
      console.error(`error: ${err.message}`);
    }
  }

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
         <Wrap spacing="5" justify="center" align="center">
          {isNoteCreated ? 
          <WrapItem>
            <VStack w="20rem" h="20rem" flexDir="column" align="flex-start" p="5" borderRadius="2xl"
              bg="yellow.300" _hover={{bg: "yellow.400", cursor: "pointer", transition: "ease-in .1s"}} boxShadow="lg">
              <Textarea onChange={(e) => setContent(e.target.value)} px="2" py="0" minH="15rem" fontWeight="semibold" resize="none" variant="unstyled" 
                overflow="hidden" placeholder="What are you thinking about?"/>
              <HStack w="100%" h="2rem"justify="space-between" mt="auto">
                <Link onClick={() => {setIsNoteCreated(false); setContent("")}} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Cancel</Link>
                <Button onClick={() => {addNote(); setIsNoteCreated(false);}} w="5rem" h="2rem">Create</Button>
              </HStack>
            </VStack>
          </WrapItem>
          :
          <WrapItem>
            <Flex onClick={() => setIsNoteCreated(true)} w="10rem" h="10rem" p="2" flexDir="column" justify="center" align="center" borderRadius="xl" boxShadow="xl" 
              borderWidth="3px" borderStyle="dashed" borderColor="#2b2d42" bg="#F8F9FA" _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", 
              transform: "scale(1.05, 1.05)"}}>
              <Text color="#2b2d42" textAlign="center" fontSize="sm" fontWeight="semibold">Add new note</Text>
            </Flex>
          </WrapItem>
          }
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