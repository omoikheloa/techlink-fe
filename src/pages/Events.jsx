import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';
import { supabase } from '../supabaseClient';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      let { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error(error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleDeleteEvent = async (id) => {
    let { error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setEvents(events.filter((event) => event.id !== id));
      if (selectedEvent && selectedEvent.id === id) {
        setSelectedEvent(null);
      }
    }
  };

  const handleSaveEvent = async (updatedEvent) => {
    let { error } = await supabase
      .from('events')
      .update(updatedEvent)
      .eq('id', updatedEvent.id);
    if (error) {
      console.error(error);
    } else {
      setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
      setSelectedEvent(null);
    }
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