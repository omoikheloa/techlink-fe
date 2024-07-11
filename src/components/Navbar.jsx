import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">TechLink</Link>
        <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;