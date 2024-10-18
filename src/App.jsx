import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import { Toaster } from 'react-hot-toast';

// Initialize Supabase client
const supabase = createClient('https://fkwavphbckanbnbusifj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2F2cGhiY2thbmJuYnVzaWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3ODc1NTEsImV4cCI6MjAzNjM2MzU1MX0.A4carmDiM8TwPNn5221KhOOybgfU_1Kxcs3bFI6Odtk');

const AppRoutes = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Toaster position='top-right' />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="flex-1">
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/events" element={isLoggedIn ? <Events /> : <Navigate to="/login" />} />
            <Route path="/create-event" element={isLoggedIn ? <CreateEvent /> : <Navigate to="/login" />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login
  const handleLogin = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  // Check if user is logged in on initial render
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkSession();
  }, []);

  return (
    <Router>
      <AppRoutes isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
    </Router>
  );
};

export default App;