import { useState, useRef } from 'react';
import { Flex, Text, Heading, Divider, VStack, HStack, Link, Button,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, useDisclosure,
  Textarea
 } from '@chakra-ui/react';
 import axios from 'axios';

export default function Note({ id, content, date, color, onNoteDelete }) {
  const [isNoteEdited, setIsNodeEdited] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [displayedContent, setDisplayedContent] = useState(content);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  async function removeNote() {
    try {
      await axios.delete(`http://localhost:8000/note/remove_note/${id}`);
      onNoteDelete();
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  async function editNote() {
    try {
      await axios.patch("http://localhost:8000/note/edit_note", {
        note_id: id,
        content: editedContent
      });

      setDisplayedContent(editedContent);
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  return(
    <VStack onDoubleClick={isNoteEdited ? null : () => setIsNodeEdited(true)} w="20rem" h="20rem" flexDir="column" align="flex-start" p="5" borderRadius="2xl"
      bg={color} _hover={{bg: "yellow.400", cursor: "pointer", transition: "ease-in .1s"}} boxShadow="lg">
      {!isNoteEdited ? 
      ( 
        <VStack h="100%" w="100%" align="flex-start">
          <Text minH="15rem" fontSize="md" fontWeight="semibold" mx="2" color="#2b2d42">{displayedContent}</Text>
          <HStack w="100%" h="2rem" justify="space-between" mt="auto">
            <Link onClick={onOpen} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Remove note</Link>
            <Text fontSize="sm" color="#ADB5BD">{date}</Text>
          </HStack>
        </VStack>
       ) : (
        <VStack h="100%" w="100%">
          <Textarea onChange={(e) => setEditedContent(e.target.value)} px="2" py="0" minH="15rem" fontWeight="semibold" resize="none" variant="unstyled" overflow="hidden" defaultValue={displayedContent}/>
          <HStack w="100%" h="2rem"justify="space-between" mt="auto">
            <Link onClick={() => {setIsNodeEdited(false); setEditedContent(content)}} fontSize="sm" fontWeight="semibold" color="#ADB5BD">Cancel</Link>
            <Button onClick={() => {editNote(); setIsNodeEdited(false);}} w="5rem" h="2rem">Edit</Button>
          </HStack>
        </VStack>
      )
      }
      

      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="2xl" fontWeight="bold">Remove note</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Flex w="100%" flexDir="row" align="center" justify="space-between">
                <Button onClick={onClose} ref={cancelRef}>Cancel</Button>
                <Button colorScheme="red" onClick={() => {onClose(); removeNote()}}>Delete</Button>
              </Flex>
              
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </VStack>
  );
}