import React from 'react';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="mt-1 block w-full border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" id="confirmPassword" className="mt-1 block w-full border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;