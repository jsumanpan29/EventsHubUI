import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from '../../api/axios';

const ENABLED = 1
const DISABLED = 0
const EXPIRED = 2
export const MerchantContext = createContext({
  activeEvents: [],
  inactiveEvents: [],
  expiredEvents: [],
  activeEventsCurrentPage: 1,
  activeEventsTotalPage: 1,
  activeEventsPerPage: 1,
  inactiveEventsCurrentPage: 1,
  inactiveEventsTotalPage: 1,
  inactiveEventsPerPage: 1,
  expiredEventsCurrentPage: 1,
  expiredEventsTotalPage: 1,
  expiredEventsPerPage: 1,
  // addEvent: () => {},
  // removeEvent: () => {},
  fetchInactiveEvents: () => {},
  fetchActiveEvents: () => {},
  fetchExpiredEvents: () => {}
});

export const useMerchantContext = () => useContext(MerchantContext);

export const MerchantProvider = ({ children }) => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [inactiveEvents, setInactiveEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);
  const [activeEventsCurrentPage, setActiveEventsCurrentPage] = useState(1);
  const [activeEventsTotalPage, setActiveEventsTotalPage] = useState(1);
  const [activeEventsPerPage, setActiveEventsPerPage] = useState(1);
  const [inactiveEventsCurrentPage, setInactiveEventsCurrentPage] = useState(1);
  const [inactiveEventsTotalPage, setInactiveEventsTotalPage] = useState(1);
  const [inactiveEventsPerPage, setInactiveEventsPerPage] = useState(1);
  const [expiredEventsCurrentPage, setExpiredEventsCurrentPage] = useState(1);
  const [expiredEventsTotalPage, setExpiredEventsTotalPage] = useState(1);
  const [expiredEventsPerPage, setExpiredEventsPerPage] = useState(1);

  useEffect(() => {
    // Fetch events when the component mounts
    // const user = JSON.parse(Cookies.get('user')) 
    if(Cookies.get('user')){
      fetchActiveEvents();
    } 
    
  }, [activeEventsCurrentPage]);

  useEffect(() => {
    if(Cookies.get('user')){
      fetchInactiveEvents();
    } 
    
  }, [inactiveEventsCurrentPage]);

  useEffect(() => {
    if(Cookies.get('user')){
      fetchExpiredEvents();
    } 
    
  }, [expiredEventsCurrentPage]);

  // const fetchActiveEvents = async () => {
  //   try {
  //     const userID = JSON.parse(Cookies.get('user'))?.user.id
  
    
  //   const response = await axios.get('/event/'+userID+'/merchant/'+ ENABLED , {
  //       headers: {
  //           'Accept': 'application/json',
  //           'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
  //       }
  //   });
  //   setActiveEvents(response.data);
  //   // console.log("Fetch: "+ events)
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //   }
  // };

  const fetchActiveEvents = async () => {
    try {
      const userID = JSON.parse(Cookies.get('user'))?.user.id
  
    
    const response = await axios.get('/event/'+userID+'/merchant/'+ ENABLED + '?page=' + activeEventsCurrentPage, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
        }
    });
    // console.log("Fetch: "+ JSON.stringify(response))
    setActiveEvents(response.data.events);
    setActiveEventsTotalPage(response.data.pagination.total);
    setActiveEventsPerPage(response.data.pagination.per_page);
    // console.log("Fetch: "+ events)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchInactiveEvents = async () => {
    try {
      const userID = JSON.parse(Cookies.get('user'))?.user.id
  
    
    const response = await axios.get('/event/'+userID+'/merchant/'+ DISABLED + '?page=' + inactiveEventsCurrentPage , {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
        }
    });
    setInactiveEvents(response.data.events);
    setInactiveEventsTotalPage(response.data.pagination.total);
    setInactiveEventsPerPage(response.data.pagination.per_page);
    // console.log("Fetch: "+ events)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchExpiredEvents = async () => {
    try {
      const userID = JSON.parse(Cookies.get('user'))?.user.id
  
    
    const response = await axios.get('/event/'+userID+'/merchant/'+ EXPIRED + '?page=' + expiredEventsCurrentPage , {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
        }
    });
    setExpiredEvents(response.data.events);
    setExpiredEventsTotalPage(response.data.pagination.total);
    setExpiredEventsPerPage(response.data.pagination.per_page);
    // console.log("Fetch: "+ events)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };


  // const addEvent = async (eventID) => {
  //   try {
  //       const userID = JSON.parse(Cookies.get('user'))?.user.id
  //   //   const response = await axios.post('/api/event_attendees', newEvent); // Your API endpoint for adding events
  //   const response = await axios.post(
  //       '/event_attendees',
  //       { 'user_id': userID, 'event_id': eventID },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
  //         }
  //       }  
  //     );
  //     setEvents([...events, response.data.eventAttendee]);
  //     // console.log("AddEvent: "+ events)
  //   } catch (error) {
  //     console.error('Error adding event:', error);
  //   }
  // };

  // const removeEvent = async (eventId) => {
  //   try {
  //     await axios.delete(`/api/events/${eventId}`); // Your API endpoint for deleting events
  //     const updatedEvents = events.filter((event) => event.id !== eventId);
  //     setEvents(updatedEvents);
  //   } catch (error) {
  //     console.error('Error removing event:', error);
  //   }
  // };

  return (
    <MerchantContext.Provider value={{ activeEvents, inactiveEvents, expiredEvents, activeEventsCurrentPage, inactiveEventsCurrentPage, expiredEventsCurrentPage, fetchInactiveEvents:() => fetchInactiveEvents(), fetchActiveEvents:() => fetchActiveEvents(), fetchExpiredEvents:() => fetchExpiredEvents(), activeEventsTotalPage, activeEventsPerPage, setActiveEventsCurrentPage: (selectedPage) => setActiveEventsCurrentPage(selectedPage), inactiveEventsTotalPage, inactiveEventsPerPage, setInactiveEventsCurrentPage: (selectedPage) => setInactiveEventsCurrentPage(selectedPage), expiredEventsTotalPage, expiredEventsPerPage, setExpiredEventsCurrentPage: (selectedPage) => setExpiredEventsCurrentPage(selectedPage) }}>
      {children}
    </MerchantContext.Provider>
  );
};