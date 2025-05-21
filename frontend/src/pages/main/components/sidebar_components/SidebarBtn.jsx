import { Link } from 'react-router-dom';
import { Button, IconButton } from '@chakra-ui/react';

export default function SidebarBtn({content, icon, link, narrowScreen}) {

  return(
    <>
    {narrowScreen ? 
      <IconButton as={Link} to={link}
        w="10%" h="90%"
        borderRadius="10" color="#2b2d42"
        bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}} 
      >{icon}</IconButton>
      :
      <Button as={Link} to={link}  
        w="95%" h="3rem" fontSize={{base: "0.25rem", sm: "0.8rem"}}
        justifyContent="flex-start" pl="4"
        leftIcon={icon} borderRadius="10" color="#2b2d42"
        bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}} 
      >{content}</Button>
    }
    </>
  );
}