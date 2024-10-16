import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = 'https://fkwavphbckanbnbusifj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2F2cGhiY2thbmJuYnVzaWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3ODc1NTEsImV4cCI6MjAzNjM2MzU1MX0.A4carmDiM8TwPNn5221KhOOybgfU_1Kxcs3bFI6Odtk';
const supabase = createClient(supabaseUrl, supabaseKey);

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'frontend',
    address: '',
    city: '',
    state: '',
    country: '',
    start_time: '',
    end_time: '',
    quantity: 0,
    price: 0,
    start_date: '',
    end_date: '',
  });
  const [flyer, setFlyer] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFlyer(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!flyer) {
      setError('Please upload a flyer. It is required.');
      return;
    }

    try {
      // Upload flyer
      const fileExt = flyer.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: fileData, error: fileError } = await supabase.storage
        .from('event-flyers')
        .upload(fileName, flyer);

      if (fileError) throw fileError;
      
      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('event-flyers')
        .getPublicUrl(fileName);
      
      const flyer_url = urlData.publicUrl;

      // Insert event data
      const { data, error } = await supabase
        .from('events')
        .insert([{ ...formData, flyer_url }]);

      if (error) throw error;
      console.log('Event created successfully:', data);
      
      // Redirect to events tab
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error.message);
      setError('Error creating event. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-purple-700">Create an Event</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Upload Flyer (Required)</h2>
            <input 
              type="file" 
              id="flyer" 
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" 
            />
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">General Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                >
                  <option>Music</option>
                  <option>Sport</option>
                  <option>Exhibition</option>
                  <option>Business</option>
                  <option>Photography</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Location and Time</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                <input
                  type="text"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region</label>
                <input
                  type="text"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                   <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">Start Time</label>
                   <input
                     type="time"
                     id="start_time"
                     value={formData.start_time}
                     onChange={handleChange}
                     className="mt-1 block w-full border-gray-300 rounded-md"
                   />
                 </div>
                 <div>
                   <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">End Time</label>
                   <input
                     type="time"
                     id="end_time"
                     value={formData.end_time}
                     onChange={handleChange}
                     className="mt-1 block w-full border-gray-300 rounded-md"
                   />
                 </div>
               </div>
             </div>
             <div className="bg-white p-6 rounded-md shadow-md">
               <h2 className="text-2xl font-bold mb-4 text-gray-700">Ticket</h2>
               <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                   <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Sale Start Date</label>
                   <input
                     type="date"
                     id="start_date"
                     value={formData.start_date}
                     onChange={handleChange}
                     className="mt-1 block w-full border-gray-300 rounded-md"
                   />
                 </div>
                 <div>
                   <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Sale End Date</label>
                   <input
                     type="date"
                     id="end_date"
                     value={formData.end_date}
                     onChange={handleChange}
                     className="mt-1 block w-full border-gray-300 rounded-md"
                   />
                 </div>
               </div>
             </div>
             <div className="flex space-x-4">
               <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
                 Create Event
               </button>
             </div>
           </form>
         </div>
       </div>
     );
   };

   export default CreateEvent;