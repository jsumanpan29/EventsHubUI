import React, { useState,useEffect } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie';
import { LuTag,LuUser2,LuNavigation,LuCalendar,LuCalendarClock } from "react-icons/lu";
import { format } from 'date-fns'
import { useEventContext } from './EventContext';
import { useCart } from './CartContext'

const Event = () => {
  const {eId} = useParams();
  const { events, addEvent, removeEvent, isEventAlreadyAttended} = useEventContext();
  const {cartItems, addToCart, removeFromCart, emptyCart, isItemInCart} = useCart();

  const [eventID, setEventID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [estAttendants, setEstAttendants] = useState('');
  const [venueName, setVenueName] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventSchedStart, setEventSchedStart] = useState(new Date());
  const [eventSchedEnd, setEventSchedEnd] = useState(new Date());
  const [eventRegDeadline, setEventRegDeadline] = useState(new Date());
  const [userCookie, setUserCookie] = useState(Cookies.get('user'));

  const [attendedText, setAttendedText] = useState('')



  useEffect(() => {
    const getEvents = async () => {
              try { const response = await axios.get('/event/'+eId, {  
                headers: {
                    'Accept': 'application/json',
                }
              });
              if(response.data){
                setEventID(response.data.event.id)
                setName(response.data.event.name);
                setDescription(response.data.event.description);
                setCategoryName(response.data.event.category_id.name);
                setEstAttendants(response.data.event.est_attendants);
                setVenueName(response.data.event.venue_id.name);
                setEventLocation(response.data.event.location);
                setEventSchedStart(response.data.event.date_sched_start);
                setEventSchedEnd(response.data.event.date_sched_end);
                setEventRegDeadline(response.data.event.date_reg_deadline);
                if (response.data.media.length > 0) {
                  setImageFileName(response.data.media[0].file_name);
                  setImageUrl(response.data.media[0].url);
                }
              }
          } catch (e) {
              console.log(e);
          }
      }
      getEvents();
  }, []);

const addItemToCart = (eventID, eventName, imageUrl, imageFileName) => {
  
  const itemToAdd = {
      event_id: eventID,
      name: eventName,
      url: imageUrl,
      file_name: imageFileName
  }
  addToCart(itemToAdd)
}

  return (
    <div className="items-start min-h-screen bg-base-200">
      <div className="container w-full lg:w-3/4 xl:w-2/3 mx-auto">
        {eId && 
            <>
             <div>
             <h1 className="text-lg md:text-2xl lg:text-5xl font-bold pt-10 pb-5">{name}</h1>
             </div>
            <div class="flex justify-center items-center h-[180px] md:h-[280px] lg:h-[320px] xl:h-[400px] 2xl:h-[500px] w-128 bg-gray-800">
               
                {
                  imageUrl ?
                  <img src={imageUrl} alt={imageFileName} className="object-cover h-full w-full shadow-2xl" />
                  :
                  <img src='' alt='' className="object-cover h-full w-full shadow-2xl" />
                }
            </div>
            <div className='grid grid-cols-5 py-4 gap-12 place-items-center px-6'>
              
              <div className='text-xs md:text-sm flex'><LuTag size={18} className='mr-1.5' />{categoryName}</div>
              <div className='text-xs md:text-sm flex'><LuUser2 size={18} className='mr-1.5' />{estAttendants + '+'}</div>
              <div className='text-xs md:text-sm flex'><LuCalendar size={18} className='mr-1.5' />{format(new Date(eventSchedStart), 'MMM dd - ') + format(new Date(eventSchedEnd), 'MMM dd, yyyy') }</div>
              <div className='text-xs md:text-sm flex'><LuNavigation size={18} className='mr-1.5' />{venueName + ", " + eventLocation}</div>
              <div className='text-xs md:text-sm flex'>
              <LuCalendarClock size={18} className='mr-1.5' />{' Reg. Deadline: '+ format(new Date(eventRegDeadline), 'MMM dd, yyyy') }
              </div>
              
            </div>
            <div className='grid grid-cols-5 h-80'>
              <div className='col-span-4 px-3 lg:px-10'>
                <h1 className="text-base md:text-xl lg:text-3xl font-bold pb-3">About this Event</h1>
                <p className='text-xs md:text-sm lg:text-base'>{description}</p>
              </div>
              <div className='flex justify-center'>
                 
              
              {
                Cookies.get('user') ?
                (<>
                 <button className="btn btn-primary text-xs md:text-sm lg:text-base px-2 md:px-8" onClick={() => isEventAlreadyAttended(eventID) ? removeEvent(eventID) : addEvent(eventID)}>{isEventAlreadyAttended(eventID) ? "Remove" : "Attend"}</button>
                 
                </>)
                :
                (<>
                   <button className="btn btn-primary text-xs md:text-sm lg:text-base px-2 md:px-8" onClick={() => isItemInCart(eventID) ? removeFromCart(eventID) : addItemToCart(eventID, name, imageUrl, imageFileName)}>{isItemInCart(eventID) ? "Remove" : "Attend"}</button>
                </>)
              }
              </div>
            </div>
            
            </>
        }
        {!eId && 
            <>
            
            <div>
              <h1 className="text-5xl font-bold">Oops! Event not found</h1>
            </div>
            </>
        }
        
      </div>
    </div>

  )
}

export default Event