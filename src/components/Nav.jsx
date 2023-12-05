import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { LuBookMarked } from "react-icons/lu";
import axios from '../../api/axios'
import { useEventContext } from './EventContext';
import { useCart } from './CartContext'

const Nav = ({ setLoginClicked }) => {

// const [onLoggedIn, setOnLoggedIn] = useState(false)
// const [eventsCount, setEventsCount] = useState(0)
const [eventAttended, setEventAttended] = useState([])
// const [onEventAlreadyAttended, setOnEventAlreadyAttended] = useState(false)
const { events, fetchEvents, removeEvent } = useEventContext();

const [userCookie, setUserCookie] = useState(Cookies.get('user'));
// const [addedToCart, setAddedToCart] = useState(false);

const {cartItems, emptyCart, isItemInCart} = useCart();

const navigate = useNavigate();



const handleLogoutClick = () => {
    try {
        Cookies.remove('user')
        navigate('/')
    } catch (err) {
        console.log('Error: '+err.message);
    }
    // console.log(events)
}



  // UseEffect to fetch events after logging in
  useEffect(() => {
    
    // const user = JSON.parse(userCookie);
    if (userCookie) {
      fetchEvents(); // Fetch events using the context provider function
    }
  }, []);


  useEffect(() => {
        //     setCart(eventAttended.user_events);
        // console.log("Nav: "+JSON.stringify(events))
        setEventAttended(events)
        // console.log(eventAttended)
  }, [events]);

//   useEffect(() => {
//     //     setCart(eventAttended.user_events);
//     // fetchEvents
//     console.log("Nav: "+events)
//     // console.log(eventAttended)
// }, []);
// useEffect(() => {
//     const getAttended = async () =>{
//       try { 
//           const user = JSON.parse(userCookie)
//           const response = await axios.get('/users/events_attended/'+user?.user.id, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ` + user?.token 
//             }
//           });
//           // if (response.data.) {
          
//           // }
//         //   console.log(response.data)
//         // addToCart(response.data);
//         setEventAttended(response.data)
//       } catch (e) {
//           console.log(e);
//       }
     
//     }
//     getAttended();
//   }, []);

  return (
    <div className="navbar bg-base-100 max-w-screen-xl m-auto">
    <div className="navbar-start">
        <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {Cookies.get('user') ?
            <>
                <li><a><Link to="/dashboard"> My Events</Link></a></li>
            </>
            : 
            <>
                <li><a><Link to="/">Home</Link></a></li>
            </>
            }
            
            <li><a><Link to="/events">Find Events</Link></a></li>
            <li><a><Link to="/contact">Contact</Link></a></li>
        </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">EventHub</a>
    </div>

    {Cookies.get('user') && JSON.parse(Cookies.get('user'))?.user.roles.id === 1 ?
    (<>
    
    </>)
    :
    (
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base">
            {Cookies.get('user') ?
            <>
                <li className='mx-1'><a className='p-3'><Link to="/dashboard">My Events</Link></a></li>
            </>
            :
            <>
                <li className='mx-1'><a className='p-3'><Link to="/">Home</Link></a></li>
            </>
            }
            <li className='mx-1'><a className='p-3'><Link to="/events">Find Events</Link></a></li>
            <li className='mx-1'><a className='p-3'><Link to="/contact">Contact</Link></a></li>
        </ul>
    </div>
    )

    }
    
    
       {/* Navbar End */}

       {!Cookies.get('user') ?
       (
       <div className="navbar-end">
            {/* <a onClick={() => setLoginClicked(true)} className="btn btn-primary"> */}
            <a onClick={() => setLoginClicked(true)} className="btn btn-primary">
                <Link to="/">Login</Link>
                {/* Login */}
            </a>
            {/* <a className="btn" onClick={() => emptyCart()}>
                Remove Items */}
            <a className="btn">
                <Link to="/signup">Signup</Link>
            </a>
            <div class="dropdown dropdown-end">
                { cartItems.length > 0 ?
                ( <>
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                    <LuBookMarked size={20}/>
                    <span class="badge badge-sm indicator-item">{cartItems.length}</span>
                    </div>
                </label>
                <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow">
                    <div class="card-body">
                    <span class="font-bold text-lg">{cartItems.length} Events added</span>
                    {
                            cartItems ? (
                                cartItems.map(item => (
                                    <div key={item?.event_id} className='grid grid-flow-col grid-cols-3 gap-3'>
                                        {/* {item?.event && (
                                            <> */}
                                                <img src="" alt="" className="w-24 h-16" />
                                                {item?.name && (
                                                    <span className="font-bold text-base col-span-2" key={item?.event_id}>{item?.name}</span>
                                                )}
                                            {/* </>
                                        )} */}
                                    </div>
                                ))
                            ): (
                                <p>No Events</p>
                            )
                            
                        }
                    <div class="card-actions">
                        <button class="btn btn-primary btn-block">Checkout</button>
                    </div>
                    </div>
                </div>
                </>
            )
                :
                (<>
                
                </>)

                }
                
            </div>
        </div>
        )
       :
       (<>
       <div className="navbar-end">
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                <li>
                    <details>
                    <summary>
                    {JSON.parse(Cookies.get('user')).user.first_name}
                    </summary>
                    <ul class="p-2 bg-base-100 z-10 w-28 right-1 xl:w-36 xl:-right-4">
                        <li className='items-center'><a>My Events</a></li>
                        {JSON.parse(Cookies.get('user')).user.roles.id == '2'&& 
                                <li className='items-center'><a>Create Event</a></li>
                        }
                        <li className='items-center'><a>Account</a></li>
                        <li className='items-center'><a onClick={handleLogoutClick}>Logout</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
            {
                JSON.parse(Cookies.get('user')).user.roles.id == '3' ?
                (
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                        <LuBookMarked size={20}/>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> */}
                        <span class="badge badge-sm indicator-item">{eventAttended.length}</span>
                        </div>
                    </label>
                    <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow">
                        <div class="card-body">
                        <span class="font-bold text-lg">{eventAttended.length + " Events this month"}</span>
                        {
                            eventAttended ? (
                                eventAttended.map(item => (
                                    <div key={item?.id} className='grid grid-flow-col grid-cols-3 gap-3'>
                                        {item?.event && (
                                            <>
                                                <img src="" alt="" className="w-24 h-16" />
                                                {item?.event?.name && (
                                                    <span className="font-bold text-base col-span-2" key={item?.event?.id}>{item.event.name}</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))
                            ): (
                                <p>No Events</p>
                            )
                            
                        }
                    
                        <div class="card-actions">
                            <button class="btn btn-primary btn-block">Check My Events</button>
                        </div>
                        </div>
                    </div>
                </div>
                ) 
                : 
                (
                <></>
            )
            }
            
        </div>
       
       </>)
       
       }
    
    </div>
  )
}

export default Nav