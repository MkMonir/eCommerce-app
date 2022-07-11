import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './contexts/authContext/AuthContext';
import { UserContextProvider } from './contexts/userContext/UserContext';
import { ProductContextProvider } from './contexts/productContext/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);
