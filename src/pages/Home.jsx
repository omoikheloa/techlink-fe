import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg?w=1060&t=st=1677861909~exp=1677862509~hmac=f1c90f6667088daeffc3a871b85bf9e0319eeb9699f5c55da9e29f452affe002)' }}>
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-8">Welcome to TechLink!</h1>
        <div className="space-x-4">
          <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Add Event
          </Link>
          <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Manage Event
          </Link>
          <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Participant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;