import React,  { useState,useEffect,useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie'
import { useEventContext } from './EventContext';
import { useMerchantContext } from './MerchantContext';
import ReactPaginate from 'react-paginate';

const Dashboard = () => {
  const userRole = JSON.parse(Cookies.get('user'))?.user.roles.id
  const [eventAttended, setEventAttended] = useState([])
  const [activeEventsAttended, setActiveEventsAttended] = useState([])
  const [deleteEventId, setDeleteEventId] = useState(null);
  // const [activeEventsCurrentPage, setActiveEventsCurrentPage] = useState(1);
  // const [activeEventsTotalPage, setActiveEventsTotalPage] = useState(1);
  // const [activeEventsPerPage, setActiveEventsPerPage] = useState(1);

  const [inactiveEventsAttended, setInactiveEventsAttended] = useState([])
  const [expiredEventsAttended, setExpiredEventsAttended] = useState([])
  const { events, fetchEvents, removeEvent, currentPage, totalPage, perPage, setCurrentPage} = useEventContext();
  const { activeEvents, inactiveEvents, expiredEvents, activeEventsTotalPage, activeEventsPerPage, activeEventsCurrentPage, inactiveEventsTotalPage, inactiveEventsPerPage, inactiveEventsCurrentPage, expiredEventsTotalPage, expiredEventsPerPage, expiredEventsCurrentPage, fetchActiveEvents, fetchInactiveEvents, fetchExpiredEvents, setActiveEventsCurrentPage, setInactiveEventsCurrentPage, setExpiredEventsCurrentPage} = useMerchantContext();

  const memoizedFetchActiveEvents = useCallback(fetchActiveEvents, [activeEventsCurrentPage]);
  const memoizedFetchInactiveEvents = useCallback(fetchInactiveEvents, [inactiveEventsCurrentPage]);
  const memoizedFetchExpiredEvents = useCallback(fetchExpiredEvents, [expiredEventsCurrentPage]);

  useEffect(() => {
    
    // const user = JSON.parse(userCookie);
    if (Cookies.get('user') && userRole == 3) {
      fetchEvents(); // Fetch events using the context provider function
    }

    // if (Cookies.get('user') && userRole == 2) {
    //   // fetchEvents();
    //   fetchActiveEvents();
    //   fetchInactiveEvents();
    //   fetchExpiredEvents();
    // }
  }, []);

  // useEffect(() => {
  //   // Fetch events when this component mounts or when currentPage changes
  //   if (Cookies.get('user') && userRole == 2) {
  //   fetchActiveEvents();
  // }
  // }, [fetchActiveEvents, activeEventsCurrentPage]);

  useEffect(() => {
    // Fetch events when this component mounts or when currentPage changes
    if (Cookies.get('user') && userRole == 2) {
      memoizedFetchActiveEvents();
    }
    // console.log(activeEvents)
  }, [memoizedFetchActiveEvents]);

  useEffect(() => {
    // Fetch events when this component mounts or when currentPage changes
    if (Cookies.get('user') && userRole == 2) {
      memoizedFetchInactiveEvents();
    }
    // console.log(activeEvents)
  }, [memoizedFetchInactiveEvents, deleteEventId]);

  useEffect(() => {
    // Fetch events when this component mounts or when currentPage changes
    if (Cookies.get('user') && userRole == 2) {
      memoizedFetchExpiredEvents();
    }
    // console.log(activeEvents)
  }, [memoizedFetchExpiredEvents]);

  const handleActiveEventsPageClick = (selectedPage) => {
    console.log(activeEventsCurrentPage)
    setActiveEventsCurrentPage(selectedPage.selected + 1);
  };

  const handleInactiveEventsPageClick = (selectedPage) => {
    setInactiveEventsCurrentPage(selectedPage.selected + 1);
  };

  const handleExpiredEventsPageClick = (selectedPage) => {
    setExpiredEventsCurrentPage(selectedPage.selected + 1);
  };
  useEffect(() => {
        //     setCart(eventAttended.user_events);
        // console.log("Nav: "+events)
        if (Cookies.get('user') && userRole == 3) { 
        setEventAttended(events)
        }
  }, [events]);


  const handleEventsPageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const eventDelete = async(e) => {
    e.preventDefault()
    // console.log("delete")
    try {
        // console.warn(email,password)
        const response = await axios.delete('/event/'+deleteEventId+'/delete', 
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                },
            },
        );
    
        // console.log('Event deleted successfully:', response.data);
        // add_user.close()
    } catch (err) {
        if (err?.response) {
            console.log("Error: Response=")
        } else if (err.reponse?.status === 400) {
            console.log("Error:400")
        } else if (err.response?.status === 401) {
            console.log("Error:401")
        } else {
            console.log("Error:"+err)
        }
    }
    setDeleteEventId(null)
    delete_event.close()
  }

  const openDeleteEventDialog = (event) => {
    // setIsDialogOpen(true);
    // setEditingUserId(null); // Resetting the editing user ID
    console.log('Deleting event:', event);
      setDeleteEventId(event.id)
      delete_event.showModal();
  };

//   useEffect(() => {
//     if (Cookies.get('user') && userRole == 2) { 
//       setActiveEventsAttended(activeEvents)
//       console.log("activeEvents: "+ JSON.stringify(activeEvents))
//     }
// }, [activeEvents]);

// useEffect(() => {
//   //     setCart(eventAttended.user_events);
//   // console.log("Nav: "+events)
//   if (Cookies.get('user') && userRole == 2) { 
//     setInactiveEventsAttended(inactiveEvents)
//     console.log("inactiveEvents: "+JSON.stringify(inactiveEvents))
//   }
//   // console.log(eventAttended)
// }, [inactiveEvents]);

// useEffect(() => {
//   //     setCart(eventAttended.user_events);
 
//   if (Cookies.get('user') && userRole == 2) { 
//     setExpiredEventsAttended(expiredEvents)
//     console.log("expiredEvents: "+ JSON.stringify(expiredEvents))
//   }
//   // console.log(eventAttended)
// }, [expiredEvents]);


  switch (userRole) {
    case 1:
      return (<>
        <p>Admin</p>
      </>)
    case 2:
      return (
        <div className='grid-flow-col m-auto grid-cols-4'>
        <div className='col-span-1 mx-6'>
          <div className="grid h-24 bg-base-300 place-items-center">
                <div className="join">
                    <div>
                        <div>
                        <input className="input input-bordered w-full sm:w-64 md:w-80 lg:w-96 xl:w-120 join-item" placeholder="Search"/>
                        </div>
                    </div>
                    
                    <div className="indicator">
                        <button className="btn join-item">Search</button>
                    </div>
                </div>
          </div>
        </div>
        <div className='col-span-1 mb-10 mx-6 bg-base-100'>   
          <div class="overflow-x-auto">
            {/* 5 events per page */}
            <table className='table'>
              <thead>
                <tr>
                  <th className='text-center'>Active Events</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array.isArray(activeEvents) ? (
                  activeEvents.map((event, index) => (
                    <tr key={event.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src={event.media[0]?.url} alt={`Event ${event.id}`} className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>{event.name}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                    ) : (
                      <p>No events available</p>

                  )
                }
              </tbody>
            </table>
          </div>
          {/* <div className="join items-center justify-center w-full">
                      <button className="join-item btn">1</button>
                      <button className="join-item btn">2</button>
                      <button className="join-item btn btn-disabled">...</button>
                      <button className="join-item btn">99</button>
                      <button className="join-item btn">100</button>
          </div> */}
           <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
                    // pageCount={Math.ceil( totalPage / perPage )}
                    pageCount={Math.ceil( activeEventsTotalPage / activeEventsPerPage )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handleActiveEventsPageClick}
                    containerClassName={'join items-center justify-center w-full mb-6'}
                    pageClassName={'join-item btn'}
                    activeClassName={'btn-active'}
                    disabledClassName={'btn-disabled'}
                    previousClassName = {'join-item btn'}
                    nextClassName = {'join-item btn'}
                    forcePage={activeEventsCurrentPage - 1}
                />
        </div>
        <div className='col-span-1 my-10 mx-6 bg-base-100'>   
        <div class="overflow-x-auto"> 
            <table class="table">
              <thead>
                <tr>
                  <th className='text-center'>Expired Events</th>
                </tr>
              </thead>
              <tbody>
              {
                  Array.isArray(expiredEvents) ? (
                    expiredEvents.map((event, index) => (
                    <tr key={event.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src={event.media[0]?.url} alt={`Event ${event.id}`} className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>{event.name}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                    ) : (
                      <p>No events available</p>

                  )
                }
              </tbody>
            </table>
          </div>
          <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
                    // pageCount={Math.ceil( totalPage / perPage )}
                    pageCount={Math.ceil( expiredEventsTotalPage / expiredEventsPerPage )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handleExpiredEventsPageClick}
                    containerClassName={'join items-center justify-center w-full mb-6'}
                    pageClassName={'join-item btn'}
                    activeClassName={'btn-active'}
                    disabledClassName={'btn-disabled'}
                    previousClassName = {'join-item btn'}
                    nextClassName = {'join-item btn'}
                    forcePage={expiredEventsCurrentPage - 1}
                    // forcePage={currentPage - 1}
                />
        </div>
        <div className='col-span-1 my-10 mx-6 bg-base-100'>   
        <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th className='text-center'>Inactive Events</th>
                </tr>
              </thead>
              <tbody>
              {
                  Array.isArray(inactiveEvents) ? (
                    inactiveEvents.map((event, index) => (
                    <tr key={event.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src={event.media[0]?.url} alt={`Event ${event.id}`} className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5 grid grid-flow-row'>
                           <div className='row-span-1'><a className='row-span-1 text-gray-400 hover:underline'><Link key={event.id} to={'/merchant/preview/' + event.id}>{event.name}</Link></a></div>
                           <div className='row-span-1'><a className='row-span-1 text-blue-500 hover:underline'><Link key={event.id} to={'/merchant/edit_event/' + event.id}> Edit</Link></a></div>
                            <div className='row-span-1'><a className='row-span-1 text-red-500 hover:underline cursor-pointer' onClick={() => openDeleteEventDialog(event)}>Delete</a></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                    ) : (
                      <p>No events available</p>

                  )
                }
              </tbody>
            </table>
          </div>
          <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
                    // pageCount={Math.ceil( totalPage / perPage )}
                    pageCount={Math.ceil( inactiveEventsTotalPage / inactiveEventsPerPage )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handleInactiveEventsPageClick}
                    containerClassName={'join items-center justify-center w-full mb-6'}
                    pageClassName={'join-item btn'}
                    activeClassName={'btn-active'}
                    disabledClassName={'btn-disabled'}
                    previousClassName = {'join-item btn'}
                    nextClassName = {'join-item btn'}
                    forcePage={inactiveEventsCurrentPage - 1}
                    // forcePage={currentPage - 1}
                />
        </div>
        <dialog id="delete_event" class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                    <h3 class="font-bold text-lg">Delete</h3>
                    <p class="py-4">Are you sure you want to delete event?</p>
                    <div class="modal-action">
                      <form method="dialog" onSubmit={eventDelete}>
                        <button class="btn mr-2" type="submit">Confirm</button>
                        <button class="btn" type="button" onClick={()=>delete_event.close()}>Close</button>
                      </form>
                    </div>
                  </div>
        </dialog>
        </div>
      );
    case 3:
       return (
        <div className='grid-flow-col grid-cols-3 m-10'>
            <div className='col-span-1 navbar bg-base-100'>
            <div className="navbar-start">
              {/* <a href="" className="btn btn-ghost text-xl">My Events</a> */}
              <h3 className='text-xl font-medium'>MY EVENTS</h3>
            </div>
            </div>
            <div className='col-span-1 mx-6'>
              <div className="grid h-24 bg-base-300 place-items-center">
                    <div className="join">
                        <div>
                            <div>
                            <input className="input input-bordered w-full sm:w-64 md:w-80 lg:w-96 xl:w-120 join-item" placeholder="Search"/>
                            </div>
                        </div>
                        
                        <div className="indicator">
                            <button className="btn join-item">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-1 my-5'>
              <div class="overflow-x-auto">
                <table class="table">
                  <thead>
                  </thead>
                  <tbody>
                  {/* <tr class="bg-base-200">
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src="" alt="" className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>Event</p>
                          </div>
                        </div>
                      </td>
                    </tr> */}
                    {
                  Array.isArray(eventAttended) ? (
                    eventAttended.map((event, index) => (
                    <tr key={event.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            {/* {event?.media && event?.media?.length > 0 && (
                                                    <img
                                                        src={event.media[0]?.url || ''}
                                                        alt={`Event ${event.id}`}
                                                        className="w-24 h-16"
                                                    />
                                                )} */}
                            {
                                event.media && event.media.length > 0 ?
                                <img
                                src={event.media[0]?.url || ''}
                                alt={`Event ${event.id}`}
                                className="w-24 h-16"
                                />
                                :
                                <img src='' alt='' className="w-24 h-16" />


                            }
                          </div>
                          <div className='flex-auto mx-5'>
                            <Link key={event.id} to={'/events/' + event.id}><a className='row-span-1 text-gray-400 hover:underline'>{event.name}</a></Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                    ) : (
                      <p>No events available</p>

                  )
                }
                    
                  </tbody>
                </table>
          </div>
          {/* <div className="join items-center justify-center w-full mt-5">
                      <button className="join-item btn">1</button>
                      <button className="join-item btn">2</button>
                      <button className="join-item btn btn-disabled">...</button>
                      <button className="join-item btn">99</button>
                      <button className="join-item btn">100</button>
          </div> */}
          <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
                    pageCount={Math.ceil( totalPage / perPage )}
                    // pageCount={Math.ceil( inactiveEventsTotalPage / inactiveEventsPerPage )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handleEventsPageClick}
                    containerClassName={'join items-center justify-center w-full my-3'}
                    pageClassName={'join-item btn'}
                    activeClassName={'btn-active'}
                    disabledClassName={'btn-disabled'}
                    previousClassName = {'join-item btn'}
                    nextClassName = {'join-item btn'}
                    // forcePage={inactiveEventsCurrentPage - 1}
                    forcePage={currentPage - 1}
                />
          </div>
          
        </div>
       );
    default:
      return null; // Or any default component you'd like to render
  }
}

export default Dashboard