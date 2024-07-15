import React, { useState } from 'react';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';

const Events = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Tech Conference 2024', description: 'A conference about the latest in tech.' },
    { id: 2, name: 'Dev Festival', description: 'An outdoor music festival.' },
    { id: 3, name: 'React Hackathon', description: 'React developers get to test their metal in several duels' },
    { id: 4, name: 'DevOps Conference', description: 'Welcome all devops technicians to our annual conference' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(null);
    }
  };

  const handleSaveEvent = (updatedEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    setSelectedEvent(null);
  };

  const handleCancel = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <div className="w-2/4 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
        <EventList events={events} onSelect={handleSelectEvent} onDelete={handleDeleteEvent} />
      </div>
      <div className="w-2/4 p-4">
        {selectedEvent && (
          <EventDetails event={selectedEvent} onSave={handleSaveEvent} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
};

export default Events;