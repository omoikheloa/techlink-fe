import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

// Initialize Supabase client
const supabase = createClient('your_supabase_url', 'your_supabase_anon_key');

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login
  const handleLogin = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setIsLoggedIn(true);
      window.location.href = '/dashboard'; // or use navigation hooks
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
      window.location.href = '/login'; // or use navigation hooks
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  // Check if user is logged in on initial render
  useEffect(() => {
    const checkSession = async () => {
      const session = supabase.auth.session();
      setIsLoggedIn(!!session);
    };
    checkSession();
  }, []);

  return (
    <Router>
      <div>
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
    </Router>
  );
};

export default App;