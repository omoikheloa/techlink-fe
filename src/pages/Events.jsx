import React, { useState } from 'react';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';

const Events = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Tech Conference 2024', description: 'A conference about the latest in tech.' },
    { id: 2, name: 'Music Festival', description: 'An outdoor music festival.' },
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
    <div className="flex p-6 space-x-6">
      <EventList events={events} onSelect={handleSelectEvent} onDelete={handleDeleteEvent} />
      {selectedEvent && (
        <EventDetails event={selectedEvent} onSave={handleSaveEvent} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Events;