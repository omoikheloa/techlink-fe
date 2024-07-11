import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg?w=1060&t=st=1677861909~exp=1677862509~hmac=f1c90f6667088daeffc3a871b85bf9e0319eeb9699f5c55da9e29f452affe002)' }}>
      <div className="text-center text-white p-8 bg-black bg-opacity-70 rounded-lg max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Welcome to TechLink!</h1>
        <p className="text-xl mb-8">Thank you for joining us. Discover, manage, and share tech events effortlessly.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-purple-600 bg-opacity-70 p-6 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Create Your First Event</h2>
            <img src="https://via.placeholder.com/300" alt="Create Event" className="mb-4 rounded" />
            <p className="mb-4">Start by creating your first event and share it with the tech community.</p>
            <Link to="/add-event" className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded">Add Event</Link>
          </div>
          <div className="bg-purple-600 bg-opacity-70 p-6 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Manage Your Events</h2>
            <img src="https://via.placeholder.com/300" alt="Manage Event" className="mb-4 rounded" />
            <p className="mb-4">Keep track of your events, update details, and manage participants.</p>
            <Link to="/manage-event" className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded">Manage Event</Link>
          </div>
          <div className="bg-purple-600 bg-opacity-70 p-6 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Explore Tech Events</h2>
            <img src="https://via.placeholder.com/300" alt="Explore Events" className="mb-4 rounded" />
            <p className="mb-4">Browse and RSVP to the latest tech events happening around you.</p>
            <Link to="/explore-events" className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded">Explore Events</Link>
          </div>
          <div className="bg-purple-600 bg-opacity-70 p-6 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Profile Settings</h2>
            <img src="https://via.placeholder.com/300" alt="Profile Settings" className="mb-4 rounded" />
            <p className="mb-4">Update your profile information and manage your account settings.</p>
            <Link to="/profile-settings" className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded">Profile Settings</Link>
          </div>
        </div>
        
        <div className="bg-purple-600 bg-opacity-70 p-6 mt-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Get Started with Our Tutorials</h2>
          <p className="mb-4">Check out our tutorials to get the most out of TechLink.</p>
          <Link to="/tutorials" className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded">View Tutorials</Link>
        </div>
        
        <div className="bg-purple-600 bg-opacity-70 p-6 mt-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="mb-4">Connect with other tech enthusiasts in our community forum.</p>
          <Link to="/community" className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded">Go to Community</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;