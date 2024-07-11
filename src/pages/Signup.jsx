import React, { useState } from 'react';
import { Client, Account } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Initialize Appwrite client and account outside of component
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('668d7e7b0027cdf95452');

  const account = new Account(client);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
      setError('Please enter all required details');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      register();
    }
  };

  const navigate = useNavigate();

  const register = async () => {
    try {
      await account.create('unique()', email, password, fullname);
      navigate('/dashboard')
      // Handle successful signup (e.g., redirect to login or dashboard)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;