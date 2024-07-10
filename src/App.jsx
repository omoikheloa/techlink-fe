import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import Navbar from './components/Navbar';

const App = () => {
  const isLoggedIn = true; // Change this based on your authentication logic

  return (
    <Router>
      <div>
        {isLoggedIn && <Navbar />}
        <div className="flex-1">
          <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {!isLoggedIn && (
                  <>
                    <Link to="/login" className="text-gray-700 hover:text-purple-700">Login</Link>
                    <Link to="/signup" className="text-gray-700 hover:text-purple-700">Sign Up</Link>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    {/* <Link to="/addevent" className="text-gray-700 hover:text-purple-700">Add Event</Link>
                    <Link to="/events" className="text-gray-700 hover:text-purple-700">Events</Link> */}
                  </>
                )}
            </div>
          </header>
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addevent" element={<CreateEvent />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;