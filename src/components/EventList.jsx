import React from 'react';
import { TrashIcon, PencilSquareIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const EventList = ({ events, onSelect, onDelete }) => {
  return (
    <div className="p-6 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Events</h2>
      {events && events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => {
            if (!event) {
              return (
                <li key={Math.random()} className="bg-red-100 p-4 rounded-md shadow-md">
                  <div className="flex items-center text-red-600">
                    <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                    <span>Invalid event data</span>
                  </div>
                </li>
              );
            }

            return (
              <li
                key={event.id}
                className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex justify-between items-center"
                onClick={() => onSelect(event)}
              >
                <div>
                  <h3 className="text-xl font-bold text-purple-600">{event.name || 'Unnamed Event'}</h3>
                  <p className="text-gray-600">{event.description || 'No description available'}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-purple-100 hover:bg-purple-200 text-purple-600 p-2 rounded-md transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(event.id);
                    }}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="bg-purple-100 hover:bg-purple-200 text-purple-600 p-2 rounded-md transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(event);
                    }}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No events available
        </div>
      )}
    </div>
  );
};

export default EventList;