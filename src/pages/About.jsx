import React from 'react';
import feature1 from '../images/reactlogin.png';
import feature2 from '../images/depositphotos.jpg';
import feature3 from '../images/what-does-rsvp-mean.jpg';

const About = () => {
  return (
    <div>
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-6xl font-bold mb-4">TechLink</h1>
            <p className="text-2xl mb-8">Discover, manage, and share technology events effortlessly.</p>
            <a href="https://deployed-project-url.com" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">Visit TechLink</a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src={feature1} alt="Feature 1" className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h3 className="text-2xl font-bold mb-2">Sign Up</h3>
                <p className="text-gray-700">This allows users to create an account on the platform which allows them to access features that are unavailable to guests, including posting events and editing profile.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src={feature2} alt="Feature 2" className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h3 className="text-2xl font-bold mb-2">Create Event</h3>
                <p className="text-gray-700">Our event creation feature allows users to effortlessly create and customize their technology events. Users can add details such as event title, description, date, time, and location, as well as upload relevant images and set event categories to reach the right audience.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src={feature3} alt="Feature 3" className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h3 className="text-2xl font-bold mb-2">R.S.V.P Events</h3>
                <p className="text-gray-700">The RSVP feature allows attendees to easily register for events, receive confirmations, and manage their participation. Event organizers can track attendee responses and manage event capacity effectively, ensuring a smooth and organized event experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About TechLink</h2>
          <p className="text-center max-w-2xl mx-auto mb-8">
            TechLink was inspired by the challenges faced in discovering and managing technology events. As a tech enthusiast, I wanted to create a platform that simplifies event discovery, management, and sharing. This project was developed as a portfolio project for ALX School.
          </p>
          <div className="text-center">
            <a href="https://github.com/omoikheloa/techlink-fe" className="text-purple-600 hover:text-purple-800">GitHub Repository</a>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="https://www.linkedin.com/in/omo-ikheloa" className="text-gray-700 hover:text-purple-700">LinkedIn</a>
            <a href="https://github.com/omoikheloa" className="text-gray-700 hover:text-purple-700">GitHub</a>
            <a href="https://twitter.com/undisputed_ish" className="text-gray-700 hover:text-purple-700">Twitter</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;