import { Link } from 'react-router-dom';
import { Flex, Text, Button, Heading } from '@chakra-ui/react';

export default function Note({ title, content, date, color }) {

  return(
    <Flex onDoubleClick={() => handleNoteSelect()} w="20rem" h="20rem" flexDir="column" wrap="wrap" p="3" borderRadius="2xl"
    bg={color} _hover={{bg: "yellow.400", cursor: "pointer", transition: "ease-in .1s"}} boxShadow="lg"
    >
      <Heading fontSize="2xl" color="#2b2d42">{title}</Heading>
      <Text fontSize="md" mx="2" color="#2b2d42">{content}</Text>
      <Text fontSize="sm" color="#ADB5BD" mt="auto" ml="auto">{date}</Text>
    </Flex>
  );
}