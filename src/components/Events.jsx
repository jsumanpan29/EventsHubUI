import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const Events = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await axios.get('/events', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer 15|CfMZHpehCDI7rP4QLqLlXfZTWafnFwoZb7lq41Ie6e50a11d`
                    }
                });
                // if(response.data){
                //     console.log(response.data.events.data)
                // }
                setEvents(response.data.events.data)
            } catch (e) {
                console.log(e);
            }
        }
        getEvents();
    }, []);
  return (
    <>
    <div className="flex flex-col w-full border-opacity-50">
        <div className="grid h-24 card bg-base-300 rounded-box place-items-center">
            <div className="join">
                <div>
                    <div>
                    <input className="input input-bordered join-item" placeholder="Search"/>
                    </div>
                </div>
                {/* <select className="select select-bordered join-item">
                    <option disabled selected>Filter</option>
                    <option>Sci-fi</option>
                    <option>Drama</option>
                    <option>Action</option>
                </select> */}
                <div className="indicator">
                    <button className="btn join-item">Search</button>
                </div>
            </div>
        </div>
       
    </div>
    <div className="hero min-h-fit bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-xl">
                <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Event</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(events) ? (
                        events.map((event,index) =>(
                        <tr key={index}>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask w-44 h-28">
                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Event Image" />
                                </div>
                                </div>
                            </div>
                            </td>
                            <td>
                            {event.name}
                            </td>
                            <td>
                            {event.location}
                            </td>
                            <th>
                            <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                        ))
                        ) : (
                            <tr>
                            <td colSpan="4">No events available</td>
                            </tr>

                        )
                    }
                    
                    </tbody>
                    
                </table>
                </div>
                <div className="join">
                <button className="join-item btn">1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn btn-disabled">...</button>
                <button className="join-item btn">99</button>
                <button className="join-item btn">100</button>
                </div>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Events