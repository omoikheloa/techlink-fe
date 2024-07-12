import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="w-full bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-xl font-bold">
        <Link to="/">TechLink</Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="px-3 py-2 rounded hover:bg-gray-700">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/events" className="px-3 py-2 rounded hover:bg-gray-700">Events</Link>
              </li>
              <li>
                <Link to="/create-event" className="px-3 py-2 rounded hover:bg-gray-700">Create Event</Link>
              </li>
              <li>
                <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-gray-700">Dashboard</Link>
              </li>
              <li>
                <button onClick={onLogout} className="px-3 py-2 rounded hover:bg-gray-700">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="px-3 py-2 rounded hover:bg-gray-700">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="px-3 py-2 rounded hover:bg-gray-700">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;