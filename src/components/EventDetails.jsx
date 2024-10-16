import React from 'react';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/solid';

const EventDetails = ({ event, onSave, onCancel }) => {
  const [editEvent, setEditEvent] = React.useState({ ...event });

  const handleChange = (e) => {
    setEditEvent({
      ...editEvent,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(editEvent);
  };

  return (
    <div className="p-6 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Event Details</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={editEvent.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={editEvent.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 flex items-center justify-center transition-colors duration-300"
            onClick={handleSave}
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Save
          </button>
          <button
            className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center justify-center transition-colors duration-300"
            onClick={onCancel}
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