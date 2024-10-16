import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';
import { supabase } from '../supabaseClient'; // Import the Supabase client

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from Supabase when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events') // 'events' is the table name
        .select('*');    // Fetch all columns
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);  // Set the fetched events to state
      }
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Add a new event to the database and update the state
  const handleAddEvent = async (newEvent) => {
    const { data, error } = await supabase
      .from('events')    // 'events' table in Supabase
      .insert([newEvent]);

    if (error) {
      console.error('Error adding event:', error);
    } else {
      setEvents([...events, data[0]]);  // Update state with the newly added event
    }
  };

  // Update an existing event in the database
  const handleSaveEvent = async (updatedEvent) => {
    const { data, error } = await supabase
      .from('events')
      .update(updatedEvent)
      .eq('id', updatedEvent.id);  // Update event by its ID

    if (error) {
      console.error('Error updating event:', error);
    } else {
      setEvents(events.map((event) => (event.id === updatedEvent.id ? data[0] : event)));
      setSelectedEvent(null);  // Clear the selected event
    }
  };

  // Delete an event from the database and update the state
  const handleDeleteEvent = async (id) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
    } else {
      setEvents(events.filter((event) => event.id !== id));
      if (selectedEvent && selectedEvent.id === id) {
        setSelectedEvent(null);  // Clear selected event if it's deleted
      }
    }
  };

  const handleCancel = () => {
    setSelectedEvent(null);  // Cancel editing
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <div className="w-2/4 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
        <EventList events={events} onSelect={handleSelectEvent} onDelete={handleDeleteEvent} />
        {/* Add event button for adding a new event */}
        <button
          onClick={() => handleAddEvent({ name: 'New Event', description: 'New event description' })}
          className="bg-green-500 text-white px-4 py-2 mt-4"
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