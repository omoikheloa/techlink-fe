import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTelegram, FaYoutube } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import firstEvent from '../images/fabio-oyXis2kALVg-unsplash.jpg';
import manageEvent from '../images/ilya-pavlov-wbXdGS_D17U-unsplash.jpg';
import exploreEvents from '../images/maxim-hopman-IayKLkmz6g0-unsplash.jpg';
import profileSettings from '../images/georgia-de-lotz-5pJPhkS6Oxg-unsplash.jpg';

const FeatureCard = ({ title, image, description, linkTo, linkText }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-purple-600 bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <img src={image} alt={title} className="mb-4 rounded w-full h-48 object-cover" />
      <p className="mb-4">{description}</p>
      <Link to={linkTo} className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded transition-colors duration-300">
        {linkText}
      </Link>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg?w=1060&t=st=1677861909~exp=1677862509~hmac=f1c90f6667088daeffc3a871b85bf9e0319eeb9699f5c55da9e29f452affe002)' }}>
      <div className="text-center text-white p-8 bg-black bg-opacity-70 rounded-lg max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-8"
        >
          Welcome to TechLink!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl mb-8"
        >
          Discover, manage, and share cutting-edge tech events effortlessly.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            title="Create Your First Event"
            image={firstEvent}
            description="Start by creating your first tech event and share it with the ICT community."
            linkTo="/create-event"
            linkText="Add Event"
          />
          <FeatureCard
            title="Manage Your Events"
            image={manageEvent}
            description="Keep track of your tech events, update details, and manage participants."
            linkTo="/events"
            linkText="Manage Events"
          />
          <FeatureCard
            title="Explore Tech Events"
            image={exploreEvents}
            description="Browse and RSVP to the latest ICT and tech events happening around you."
            linkTo="/explore-events"
            linkText="Explore Events"
          />
          <FeatureCard
            title="Profile Settings"
            image={profileSettings}
            description="Update your tech profile information and manage your account settings."
            linkTo="/profile-settings"
            linkText="Profile Settings"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-purple-600 bg-opacity-70 p-6 mt-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-semibold mb-4">Get Started with Our Tech Tutorials</h2>
          <p className="mb-4">Check out our ICT tutorials to get the most out of TechLink.</p>
          <Link to="/tutorials" className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded transition-colors duration-300">
            View Tutorials
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-purple-600 bg-opacity-70 p-6 mt-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-semibold mb-4">Join Our Tech Community</h2>
          <p className="mb-4">Connect with other ICT enthusiasts in our community channels.</p>
          <div className="flex justify-center space-x-4">
            <a href="https://t.me/TechLinkCommunity" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300 flex items-center">
              <FaTelegram className="mr-2" /> Join Telegram
            </a>
            <a href="https://www.youtube.com/TechLinkChannel" target="_blank" rel="noopener noreferrer" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300 flex items-center">
              <FaYoutube className="mr-2" /> Watch Videos
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;