import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}>
      <div className="text-center text-white bg-black bg-opacity-0 p-8 rounded">
        <h1 className="text-5xl font-bold mb-8">Welcome to TechLink!</h1>
        <div className="space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Add Event
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Manage Event
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Participate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;