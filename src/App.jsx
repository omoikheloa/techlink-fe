// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
// import { Client, Account } from 'appwrite';
// import Home from './pages/Home';
// import CreateEvent from './pages/CreateEvent';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Events from './pages/Events';
// import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';

// // Initialize Appwrite client and account outside of the component
// const client = new Client()
//   .setEndpoint('https://cloud.appwrite.io/v1')
//   .setProject('668d7e7b0027cdf95452'); // Replace with your project ID

// const account = new Account(client);

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Adjust this based on your authentication logic

//   // Handle login
//   const handleLogin = async (email, password) => {
//     try {
//       await account.createSession(email, password);
//       setIsLoggedIn(true);
//       // Redirect to dashboard or home page
//       window.location.href = '/dashboard'; // or use navigation hooks
//     } catch (error) {
//       console.error('Login failed:', error.message);
//       // Handle error (e.g., show error message)
//     }
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await account.deleteSession('current'); // Log out of the current session
//       setIsLoggedIn(false);
//       // Redirect to login page
//       window.location.href = '/login'; // or use navigation hooks
//     } catch (error) {
//       console.error('Logout failed:', error.message);
//       // Handle error (e.g., show error message)
//     }
//   };

//   // Check if user is logged in on initial render
//   React.useEffect(() => {
//     const checkSession = async () => {
//       try {
//         await account.getSession('current');
//         setIsLoggedIn(true);
//       } catch (error) {
//         setIsLoggedIn(false);
//       }
//     };
//     checkSession();
//   }, []);

//   return (
//     <Router>
//       <div>
//         {isLoggedIn && <Navbar onLogout={handleLogout} />}
//         <div className="flex-1">
//           <header className="bg-white shadow-md">
//             <div className="container mx-auto flex justify-between items-center">
//               {!isLoggedIn && (
//                 <>
//                   <Link to="/login" className="text-gray-700 hover:text-purple-700">Login</Link>
//                   <Link to="/signup" className="text-gray-700 hover:text-purple-700">Sign Up</Link>
//                 </>
//               )}
//               {isLoggedIn && (
//                 <>
//                   <Link to="/createevent" className="text-gray-700 hover:text-purple-700">Create Event</Link>
//                   <Link to="/events" className="text-gray-700 hover:text-purple-700">Events</Link>
//                 </>
//               )}
//             </div>
//           </header>
//           <main className="p-6">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
//               <Route path="/events" element={isLoggedIn ? <Events /> : <Navigate to="/login" />} />
//               <Route path="/createevent" element={isLoggedIn ? <CreateEvent /> : <Navigate to="/login" />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Client, Account } from 'appwrite';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

// Initialize Appwrite client and account outside of the component
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('668d7e7b0027cdf95452'); 

const account = new Account(client);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login
  const handleLogin = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      setIsLoggedIn(true);
      window.location.href = '/dashboard'; // or use navigation hooks
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Log out of the current session
      setIsLoggedIn(false);
      window.location.href = '/login'; // or use navigation hooks
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  // Check if user is logged in on initial render
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="flex-1">
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/events" element={isLoggedIn ? <Events /> : <Navigate to="/login" />} />
              <Route path="/create-event" element={isLoggedIn ? <CreateEvent /> : <Navigate to="/login" />} />
              <Route path="/about" element={<About /> } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;