import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, Flex, Button } from "@chakra-ui/react";
import axios from "axios";

export default function AlertDialogComponent({list_id, isOpen, onClose, cancelRef, onDelete}) {
  
  async function removeList() {
    try {
      await axios.delete(`http://localhost:8000/todo/remove_list/${list_id}`);
      onDelete();
    } catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  return(
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="2xl" fontWeight="bold">Remove task list</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Flex w="100%" flexDir="row" align="center" justify="space-between">
              <Button onClick={onClose} ref={cancelRef}>Cancel</Button>
              <Button colorScheme="red" onClick={() => {onClose(); removeList()}}>Delete</Button>
            </Flex>
            
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}