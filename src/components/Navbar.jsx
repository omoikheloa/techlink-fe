import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">TechLink</Link>
      </div>
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>
      </div>
      <nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0">
          <li>
            <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-700 transition-all duration-300">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/events" className="block px-3 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="block px-3 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={onLogout} className="block px-3 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="block px-3 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="block px-3 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;