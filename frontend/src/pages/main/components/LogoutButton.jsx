import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleUserLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  return(
    <Button onClick={handleUserLogout}>Log out</Button>
  );
}