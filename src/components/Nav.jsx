import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { LuBookMarked } from "react-icons/lu";
import { useEventContext } from './EventContext';
import { useCart } from './CartContext'
import { useUserContext } from './UserContext'; 

const Nav = ({ setLoginClicked }) => {

const [eventAttended, setEventAttended] = useState([])
const { events, fetchEvents, removeEvent } = useEventContext();
const { userCookie, removeCookie } = useUserContext(); 

const {cartItems, emptyCart, isItemInCart} = useCart();

const navigate = useNavigate();
const loc = useLocation();


const handleLogoutClick = () => {
    try {
        removeCookie('user')
        navigate('/')
    } catch (err) {
        console.log('Error: '+err.message);
    }
}



  // UseEffect to fetch events after logging in
  useEffect(() => {
    if (userCookie && JSON.parse(Cookies.get('user'))?.user.roles.id === 3) {
      fetchEvents(); // Fetch events using the context provider function
    }
  }, []);


  useEffect(() => {
        setEventAttended(events)
  }, [events]);

  return (
    <div className="navbar bg-base-100 max-w-screen-xl m-auto">
    <div className="navbar-start">
       
        {Cookies.get('user') && (JSON.parse(Cookies.get('user'))?.user.roles.id === 1 || JSON.parse(Cookies.get('user'))?.user.roles.id === 2) ?
            (<>
    
                </>)
            :
            (<>
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {Cookies.get('user') ?
                <>
                    <li><Link to="/dashboard"> My Events</Link></li>
                </>
                : 
                <>
                    <li><Link to="/">Home</Link></li>
                </>
                }
                <li><Link to="/events">Find Events</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            </div>

            {/* <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <div className="drawer-side z-[1]">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                 {Cookies.get('user') ?
                <>
                    <li><Link to="/dashboard"> My Events</Link></li>
                </>
                : 
                <>
                    <li><Link to="/">Home</Link></li>
                </>
                }
                <li><Link to="/events">Find Events</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                
                </ul>
            </div>
            </div> */}
            </>)
        }       
        <a className="btn btn-ghost normal-case text-xl">Eventurado</a>
    </div>

    {Cookies.get('user') && (JSON.parse(Cookies.get('user'))?.user.roles.id === 1 || JSON.parse(Cookies.get('user'))?.user.roles.id === 2)  ?
    (<>
    
    </>)
    :
    (
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base">
            {Cookies.get('user') ?
            <>
                <li className='mx-1'><Link to="/dashboard">My Events</Link></li>
            </>
            :
            <>
                <li className='mx-1'><Link to="/">Home</Link></li>
            </>
            }
            <li className='mx-1'><Link to="/events">Find Events</Link></li>
            <li className='mx-1'><Link to="/contact">Contact</Link></li>
        </ul>
    </div>
    )

    }
    
    
       {/* Navbar End */}

       {!Cookies.get('user') ?
       (
       <div className="navbar-end">
            <Link to="/" onClick={() => setLoginClicked(true)} className="btn btn-primary">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
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
                                                <img src={item?.url} alt={item?.file_name} className="w-24 h-16" />
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
                        <Link className = "btn btn-primary btn-block" to="/signup" state={{ item: cartItems }}>Checkout</Link>
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
                        <li className='items-center' onClick={()=>{navigate("/dashboard", { state: { from: loc } })}}><a>{JSON.parse(Cookies.get('user')).user.roles.id == '1'? "Dashboard" : "My Events" }</a></li>
                        {JSON.parse(Cookies.get('user')).user.roles.id == '2'&& 
                               <Link to={'/merchant/create_event'}> <li className='items-center'><p>Create Event</p></li></Link>
                        }
                        <li className='items-center' onClick={()=>{navigate("/dashboard/account", { state: { from: loc } })}}><p>Account</p></li>
                        <li className='items-center' onClick={handleLogoutClick}><p>Logout</p></li>
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
                        <span class="badge badge-sm indicator-item">{eventAttended?.length > 0 ? eventAttended.length : 0}</span>
                        </div>
                    </label>
                    <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow">
                        <div class="card-body">
                        <span class="font-bold text-lg">{(eventAttended?.length > 0 ? eventAttended.length : 0) + " Events added"}</span>
                        {
                            eventAttended && eventAttended.length > 0 ? (
                                eventAttended.map(item => (
                                    <div key={item?.id} className='grid grid-flow-col grid-cols-3 gap-3'>
                                        {item && (
                                            <>
                                                {item.media && item.media.length > 0 ?
                                                        <img
                                                        src={item.media[0]?.url || ''}
                                                        alt={`Event ${item.id}`}
                                                        className="w-24 h-16"
                                                    />
                                                :
                                                <img src='' alt='' className="w-24 h-16" />

                                                }
                                                {item?.name && (
                                                    <span className="font-bold text-base col-span-2" key={item?.id}>{item.name}</span>
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
                            <button class="btn btn-primary btn-block"  onClick={()=>{navigate("/dashboard", { state: { from: loc } })}}>Check My Events</button>
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