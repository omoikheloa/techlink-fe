import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Music',
    address: '',
    city: '',
    state: '',
    country: '',
    startTime: '',
    endTime: '',
    quantity: 0,
    price: 0,
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([formData]);

      if (error) throw error;
      console.log('Event created successfully:', data);
      // You can add further actions here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error creating event:', error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-purple-700">Create an Event</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Upload Flyer</h2>
            <input type="file" id="cover" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
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
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
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
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Sale Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Sale End Date</label>
                <input
                  type="date"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
              Save draft
            </button>
            <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;