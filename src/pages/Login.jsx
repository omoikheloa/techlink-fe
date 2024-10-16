import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Make sure this import is correct

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await onLogin(email, password);
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetMessage('Password reset email sent. Please check your inbox.');
    } catch (resetError) {
      setResetMessage(`Error: ${resetError.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
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
          {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Login</button>
        </form>
        <button
          onClick={() => setIsResetModalOpen(true)}
          className="mt-4 w-full py-2 text-purple-600 bg-white border border-purple-600 rounded-md hover:bg-purple-50"
        >
          Forgot Password?
        </button>
      </div>

      {isResetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              {resetMessage && <p className="mb-4 text-sm text-blue-500">{resetMessage}</p>}
              <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Send Reset Email</button>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="mt-2 w-full py-2 text-purple-600 bg-white border border-purple-600 rounded-md hover:bg-purple-50"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;