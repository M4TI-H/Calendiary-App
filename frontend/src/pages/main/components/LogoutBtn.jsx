import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function LogoutBtn({ icon }) {
  const navigate = useNavigate();

  function handleUserLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  return(
    <Button onClick={handleUserLogout} as={Link} to="/login"
      w="95%" h="3rem" pl="2rem" justifyContent="flex-start" 
      leftIcon={icon} borderRadius="10px"  color="#2b2d42"
      bg="none" _hover={{bg: "rgba(193, 18, 31, 0.5)", color: "#780000"}}
    >Log out</Button>
  );
}