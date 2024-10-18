import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEvents(data);
    } catch (error) {
      toast.error(`Error fetching events: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleAddEvent = useCallback(async (newEvent) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([newEvent])
        .single();

      if (error) throw error;

      setEvents((prevEvents) => [data, ...prevEvents]);
      toast.success('Event added successfully!');
    } catch (error) {
      toast.error(`Error adding event: ${error.message}`);
    }
  }, []);

  const handleSaveEvent = useCallback(async (updatedEvent) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updatedEvent)
        .eq('id', updatedEvent.id)
        .single();

      if (error) throw error;

      setEvents((prevEvents) => 
        prevEvents.map((event) => (event.id === updatedEvent.id ? data : event))
      );
      setSelectedEvent(null);
      toast.success('Event updated successfully!');
    } catch (error) {
      toast.error(`Error updating event: ${error.message}`);
    }
  }, []);

  const handleDeleteEvent = useCallback(async (id) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      if (selectedEvent && selectedEvent.id === id) {
        setSelectedEvent(null);
      }
      toast.success('Event deleted successfully!');
    } catch (error) {
      toast.error(`Error deleting event: ${error.message}`);
    }
  }, [selectedEvent]);

  const handleCancel = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen bg-gray-900 text-gray-200"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen bg-gray-900 text-gray-200"
    >
      <div className="w-2/4 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
        <EventList events={events} onSelect={handleSelectEvent} onDelete={handleDeleteEvent} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create-event')}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 transition-colors"
        >
          Add Event
        </motion.button>
      </div>
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-2/4 p-4"
          >
            <EventDetails event={selectedEvent} onSave={handleSaveEvent} onCancel={handleCancel} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Events;