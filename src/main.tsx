import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FunctionsProvider } from './contexts/ContextFormData';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FunctionsProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </FunctionsProvider>
  </React.StrictMode>,
);
