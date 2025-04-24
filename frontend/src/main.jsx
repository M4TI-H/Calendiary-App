import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react"; 
import { system } from "@chakra-ui/react/preset";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
