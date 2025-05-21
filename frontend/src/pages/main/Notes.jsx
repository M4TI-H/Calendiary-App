import { useState, useEffect } from "react";
import { Flex, VStack, Heading, HStack, Wrap, WrapItem, Divider, Textarea, Link, Button } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi"
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
    <VStack w="70rem" h="54rem" bg="#F8F9FA">
      <Heading py="3">Your notes</Heading>

      <Divider w="100%" color="#ADB5BD" borderTopWidth="1px" mb="5"/>

      <HStack h="auto">
         <Wrap spacing="5" justify="center" align="center">
          {isNoteCreated ? 
          <WrapItem>

            <VStack w="18rem" h="20rem"
              flexDir="column" align="flex-start" p="5" 
              borderRadius="2xl" border="3px dashed #212529" bg="none" boxShadow="lg"
              _hover={{transition: "ease-in .1s"}}
            >
              <Textarea onChange={(e) => setContent(e.target.value)} px="2" py="0" minH="15rem" 
                fontWeight="semibold" resize="none" variant="unstyled" 
                placeholder="What are you thinking about?"
                overflow="auto" sx={{
                  '&::-webkit-scrollbar': { w: "4px" },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: '#6C757D', borderRadius: "full" },
                  '&::-webkit-scrollbar-track': { backgroundColor: "none" }
                }}
              />
              
              <HStack w="100%" h="2rem"justify="space-between" mt="auto">
                <Link onClick={() => {setIsNoteCreated(false); setContent("")}} fontSize="xs" color="#ADB5BD">Cancel</Link>
                <Button onClick={() => {addNote(); setIsNoteCreated(false);}} w="5rem" h="2rem" fontSize="xs" >Create</Button>
              </HStack>

            </VStack>

          </WrapItem>
          :
          <WrapItem>
            <Flex onClick={() => setIsNoteCreated(true)} w="10rem" h="10rem" 
              p="2" flexDir="column" justify="center" align="center" 
              borderRadius="2xl" boxShadow="xl" border="3px dashed #2b2d42" 
              _hover={{bg: "#F1F3F5", cursor: "pointer", transition: "ease-in .2s", transform: "scale(1.05)"}}>
              <BiPlus size="30%" color="#212529"/>
            </Flex>
          </WrapItem>
          }
          {noteData.map(note => (
            <WrapItem key={note.note_id}>
              <Note id={note.note_id} content={note.content} date={note.create_date} color={note.color} onNoteDelete={() => {setNoteData(prev => prev.filter(n => n.note_id !== note.note_id))}}/>
            </WrapItem>
          ))}
         </Wrap>
      </HStack>
    </VStack>
  );
}