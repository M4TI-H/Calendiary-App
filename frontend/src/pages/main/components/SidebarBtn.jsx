import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function SidebarBtn({content, icon, link}) {

  return(
    <Button as={Link} to={link}
      w="95%" h="3rem" pl="2rem" justifyContent="flex-start" 
      leftIcon={icon} borderRadius="10px" color="#2b2d42"
      bg="none" _hover={{bg: "rgba(131, 197, 190, 0.5)", color: "#006d77"}} 
    >{content}</Button>
  );
}