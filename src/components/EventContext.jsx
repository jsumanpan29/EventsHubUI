import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from '../../api/axios';

// const EventContext = createContext();
export const EventContext = createContext({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
  fetchEvents: () => {}, // Add the fetchEvents function to the context
  isEventAlreadyAttended: () => {}
});


export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    // const user = JSON.parse(Cookies.get('user')) 
    // if(Cookies.get('user')){
      if(Cookies.get('user') && JSON.parse(Cookies.get('user'))?.user.roles.id == 3){
    fetchEvents();
    }
    
  }, []);

  const isEventAlreadyAttended = (eventID) => {
      if(events){
        // return events.some(event => event && event?.event_id === eventID);
        return events.some(event => event && event?.id === eventID);
      } else{
        return false
      }
    
    }

  const fetchEvents = async () => {
    try {
      const userID = JSON.parse(Cookies.get('user'))?.user.id
  
    
    const response = await axios.get('/event_attendee/user/'+userID, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
        }
    });
    if(response.data.eventAttendees){
      setEvents(response.data.eventAttendees);
    }
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
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, response.data];
        return updatedEvents;
      });
    //   // Use the functional form of setEvents to update based on previous state
    //  setEvents((prevEvents) => [...prevEvents, response.data.eventAttendee]);
    // console.log("After Event: "+  JSON.stringify(events))
    //   console.log("Added Event: "+  JSON.stringify(response))
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const removeEvent = async (eventId) => {
    try {
      const userID = JSON.parse(Cookies.get('user'))?.user.id
      // await axios.delete(`/event_attendee/${eventId}`); // Your API endpoint for deleting events
      await axios.delete('/event_attendee/event/'+eventId+'/user/'+userID+'/delete',
      {
         headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
         }
      }
      ); // Your API endpoint for deleting events

      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent, fetchEvents, isEventAlreadyAttended }}>
      {children}
    </EventContext.Provider>
  );
};
