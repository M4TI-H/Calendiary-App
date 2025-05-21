import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react"; 
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import theme from './themes.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
