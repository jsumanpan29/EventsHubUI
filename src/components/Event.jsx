import React, { useState,useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie';
import { useCart } from './CartContext';
import { LuTag,LuUser2,LuNavigation } from "react-icons/lu";
import { format } from 'date-fns'

const Event = () => {
  // const {id} = useParams();
  const { state } = useLocation();
  // const event = events.find(event => (event.id).toString() === id)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [estAttendants, setEstAttendants] = useState('');
  const [venueName, setVenueName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventSchedStart, setEventSchedStart] = useState(new Date());
  const [eventSchedEnd, setEventSchedEnd] = useState(new Date());
  const [eventRegDeadline, setEventRegDeadline] = useState(new Date());
  const [userCookie, setUserCookie] = useState(Cookies.get('user'));
  const { cart, addToCart } = useCart();

  useEffect(() => {
    console.log('Cart Data:', cart);
}, [cart]);

  useEffect(() => {
    const getEvents = async () => {
              try { const response = await axios.get('/event/'+state.id, {
                headers: {
                    // 'Accept': 'application/json',
                }
              });
              // console.log(response.data.event)
              setName(response.data.event.name);
              setDescription(response.data.event.description);
              setCategoryName(response.data.event.category_id.name);
              setEstAttendants(response.data.event.est_attendants);
              setVenueName(response.data.event.venue_id.name);
              setEventLocation(response.data.event.location);
              setEventSchedStart(response.data.event.date_sched_start);
              setEventSchedEnd(response.data.event.date_sched_end);
              setEventRegDeadline(response.data.event.date_reg_deadline);
          } catch (e) {
              console.log(e);
          }
      }
      getEvents();
  }, []);
  const attendEvent = async (id,name) => {
    try {
        // console.log("attendEvent:"+JSON.parse(userCookie))
        // console.log("Name:"+name)
        await addToCart(name)
        console.log('Cart Data:', cart);
        // setTimeout(() => {
        //   console.log('Cart Data:', cart);
        // }, 3500);
    } catch (err) {
        console.log('Error: '+err.message);
    }
}
  const deleteEvent = async (id) => {
    try {
        console.log("deleteEvent:"+JSON.parse(userCookie))
        // const response = await axios.delete(`/events/${id}`,
        //     {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Authorization': `Bearer `+ userCookie.token
        //         }
        //     });
        // if (response.data.message == 'You need to be admin to enable action.') {
        //     // toast.error('You need to be admin to enable action!', {
        //     //     position: "bottom-right",
        //     //     autoClose: 5000,
        //     //     hideProgressBar: false,
        //     //     closeOnClick: true,
        //     //     pauseOnHover: true,
        //     //     draggable: true,
        //     //     progress: undefined,
        //     // });
        // } else {
        //     // toast.error('Product Deleted!', {
        //     //     position: "bottom-right",
        //     //     autoClose: 5000,
        //     //     hideProgressBar: false,
        //     //     closeOnClick: true,
        //     //     pauseOnHover: true,
        //     //     draggable: true,
        //     //     progress: undefined,
        //     // });
        //     const newProducts = products.filter((product) => product.id != id)
        //     setProducts(newProducts);
        // }
    } catch (err) {
        console.log('Error: '+err.message);
    }
}

const updateEvent = async (eventID) => {
    // if (cookies.user.user.role == '0') {
    //     // toast.error('You need to be admin to enable action!', {
    //     //     position: "bottom-right",
    //     //     autoClose: 5000,
    //     //     hideProgressBar: false,
    //     //     closeOnClick: true,
    //     //     pauseOnHover: true,
    //     //     draggable: true,
    //     //     progress: undefined,
    //     // });
    // } else {
    //     navigate('/edit', { state: { id: productId } });
    // }
    // const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    // const updatedPost = { id, title: editTitle, datetime, body: editBody}
    try{
      // const response = await api.put('/posts/'+id, updatedPost)
      // setPosts(posts.map(post => post.id === id ? { ...response.data } : post ))
      // setEditTitle('')
      // setEditBody('')
      // navigate('/')
      console.log("updateEvent:"+JSON.parse(userCookie))
    }catch(err){
      console.log('Error: '+err.message)
    }
}
  return (
    <div className="items-start min-h-screen bg-base-200">
      <div className="container w-full lg:w-3/4 xl:w-2/3 mx-auto">
        {event && 
            <>
             <div>
             <h1 className="text-5xl font-bold pt-10 pb-5">{name}</h1>
             </div>
            <img src="" className="w-full h-96 shadow-2xl" />
            <div className='grid grid-cols-5 py-4 gap-12 place-items-center px-6'>
              
              <div className='text-sm flex '><LuTag size={18} className='mr-1.5' />{categoryName}</div>
              <div className='text-sm flex'><LuUser2 size={18} className='mr-1.5' />{estAttendants + '+'}</div>
              <div className='text-sm flex'>{format(new Date(eventSchedStart), 'MMM dd - ') + format(new Date(eventSchedEnd), 'MMM dd, yyyy') }</div>
              <div className='text-sm flex'><LuNavigation size={18} className='mr-1.5' />{venueName + ", " + eventLocation}</div>
              <div className='text-sm flex'>
                  {' Reg. Deadline: '+ format(new Date(eventRegDeadline), 'MMM dd, yyyy') }
              </div>
              
            </div>
            <div className='grid grid-cols-5'>
              <div className='col-span-4 px-10'>
                <h1 className="text-3xl font-bold pb-3">About this Event</h1>
                <p>{description}</p>
              </div>
              <div className='flex items-center justify-center'>
                  <button className="btn btn-primary px-8" onClick={() => attendEvent(state.id,name)}>Attend</button>
              </div>
            </div>
            </>
        }
        {!event && 
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