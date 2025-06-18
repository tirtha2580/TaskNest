// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext.jsx'; // ✅ import the context provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* ✅ wrap the whole app */}
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </UserProvider>
  </StrictMode>
);
