// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PendingTasks from './pages/PendingTasks';
import CompletedTasks from './pages/CompletedTasks';
import LoadingScreen from './components/LoadingScreen';
import ProfilePage from './pages/ProfilePage';
import AddTask from './pages/Addtask';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 7000); // 7 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <Routes key="routes">
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pending" element={<PendingTasks />} />
              <Route path="/completed" element={<CompletedTasks />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/addtask" element={<AddTask />} />

          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
