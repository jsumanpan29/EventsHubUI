import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from '../../api/axios';

// const EventContext = createContext();
export const EventContext = createContext({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
  fetchEvents: () => {}, // Add the fetchEvents function to the context
});


export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    // const user = JSON.parse(Cookies.get('user')) 
    // if(user){
    fetchEvents();
    // }
    
  }, []);

  const fetchEvents = async () => {
    try {
      const userID = JSON.parse(Cookies.get('user'))?.user.id
  
    
    const response = await axios.get('/event_attendee/user/'+userID, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
        }
    });
    setEvents(response.data.eventAttendees);
    // console.log("Fetch: "+ events)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addEvent = async (eventID) => {
    try {
        const userID = JSON.parse(Cookies.get('user'))?.user.id
    //   const response = await axios.post('/api/event_attendees', newEvent); // Your API endpoint for adding events
    const response = await axios.post(
        '/event_attendees',
        { 'user_id': userID, 'event_id': eventID },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
          }
        }  
      );
      setEvents([...events, response.data.eventAttendee]);
      // console.log("AddEvent: "+ events)
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const removeEvent = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}`); // Your API endpoint for deleting events
      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent, fetchEvents }}>
      {children}
    </EventContext.Provider>
  );
};
