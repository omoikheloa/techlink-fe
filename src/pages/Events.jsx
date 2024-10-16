import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';
import { supabase } from '../supabaseClient';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setEvents(data);
    } catch (error) {
      setError('Error fetching events: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([newEvent])
        .single();

      if (error) {
        throw error;
      }

      setEvents([data, ...events]);
    } catch (error) {
      setError('Error adding event: ' + error.message);
    }
  };

  const handleSaveEvent = async (updatedEvent) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updatedEvent)
        .eq('id', updatedEvent.id)
        .single();

      if (error) {
        throw error;
      }

      setEvents(events.map((event) => (event.id === updatedEvent.id ? data : event)));
      setSelectedEvent(null);
    } catch (error) {
      setError('Error updating event: ' + error.message);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setEvents(events.filter((event) => event.id !== id));
      if (selectedEvent && selectedEvent.id === id) {
        setSelectedEvent(null);
      }
    } catch (error) {
      setError('Error deleting event: ' + error.message);
    }
  };

  const handleCancel = () => {
    setSelectedEvent(null);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-200">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-200">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <div className="w-2/4 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
        <EventList events={events} onSelect={handleSelectEvent} onDelete={handleDeleteEvent} />
        <button
          onClick={() => handleAddEvent({ name: 'New Event', description: 'New event description' })}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 transition-colors"
        >
          Add Event
        </button>
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