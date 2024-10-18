import React, { useState, useEffect } from 'react';
import { ArrowPathIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { supabase } from '../supabaseClient';

const EventDetails = ({ event, onSave, onCancel }) => {
  const [editEvent, setEditEvent] = useState({ ...event });
  const [flyerUrl, setFlyerUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (event.flyer_url) {
      fetchEventFlyer();
    }
  }, [event.flyer_url]);

  const fetchEventFlyer = async () => {
    setLoading(true);
    setError(null);
    try {
      // Check if the flyer_url includes the bucket path
      const path = event.flyer_url.includes('event-flyers/') 
        ? event.flyer_url.split('event-flyers/')[1] 
        : event.flyer_url;

      const { data, error } = await supabase.storage
        .from('event-flyers')
        .createSignedUrl(path, 3600);

      if (error) {
        throw error;
      }

      if (data?.signedUrl) {
        setFlyerUrl(data.signedUrl);
      } else {
        throw new Error('No URL returned from Supabase');
      }
    } catch (error) {
      console.error('Error fetching event flyer:', error);
      setError('Failed to load image. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditEvent({
      ...editEvent,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!editEvent.name?.trim()) {
      setError('Event name is required');
      return;
    }
    setError(null);
    onSave(editEvent);
  };

  return (
    <div className="p-6 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Event Details</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="relative mb-4">
          {loading && (
            <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center rounded-md z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
            </div>
          )}
          
          {flyerUrl ? (
            <img 
              src={flyerUrl} 
              alt="Event Flyer" 
              className="w-full h-64 object-cover rounded-md"
              onError={() => {
                setError('Failed to load image');
                setFlyerUrl(null);
              }}
            />
          ) : (
            <div className="mb-4 bg-gray-100 h-64 flex items-center justify-center rounded-md">
              <PhotoIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={editEvent.name || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter event name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={editEvent.description || ''}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter event description"
          />
        </div>

        <div className="flex space-x-4">
          <button
            className="w-full py-2 px-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 flex items-center justify-center transition-colors duration-300 disabled:opacity-50"
            onClick={handleSave}
            disabled={loading}
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Save
          </button>
          <button
            className="w-full py-2 px-4 text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center justify-center transition-colors duration-300 disabled:opacity-50"
            onClick={onCancel}
            disabled={loading}
          >
            <XMarkIcon className="w-5 h-5 mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;