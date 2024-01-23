import React,  { useState,useEffect,useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie'
import { useEventContext } from './EventContext';
import { useMerchantContext } from './MerchantContext';
import ReactPaginate from 'react-paginate';
import { LuUser2, LuWarehouse, LuList, LuFlag } from "react-icons/lu";
import Chart from 'react-apexcharts'

const Dashboard = () => {
  const [eventsByCategory, setEventsByCategory] = useState({
    series: [],
    options: {
      labels: [],
      chart:{
        type:'donut',
      },
      responsive:[
        {
          breakpoint:480,
          options:{
            chart:{
              width:200,
            },
            legend:{
              position: 'bottom',
            },
          },
        },
      ]
    }
  })
  const [eventsByVenue, setEventsByVenue] = useState({
    series: [],
    labels: [],
    options: {
      labels: [],
      chart:{
        type:'donut',
      },
      responsive:[
        {
          breakpoint:480,
          options:{
            chart:{
              width:200,
            },
            legend:{
              position: 'bottom',
            },
          },
        },
      ]
    }
  })

  const [eventsByAttendance, setEventsByAttendance] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Top 10 Events By Attendance"
      },
      xaxis: {
        categories: [
        ],
      }
    },

  })
  
  const userRole = JSON.parse(Cookies.get('user'))?.user.roles.id
  const [eventAttended, setEventAttended] = useState([])
  const [deleteEventId, setDeleteEventId] = useState(null);

  const [totalUsers, setTotalUsers] = useState('')
  const [totalCategories, setTotalCategories] = useState('')
  const [totalEvents, setTotalEvents] = useState('')
  const [totalVenues, setTotalVenues] = useState('')

  const [totalUsersIncrease, setTotalUsersIncrease] = useState('')
  const [totalCategoriesIncrease, setTotalCategoriesIncrease] = useState('')
  const [totalEventsIncrease, setTotalEventsIncrease] = useState('')
  const [totalVenuesIncrease, setTotalVenuesIncrease] = useState('')
  const { events, fetchEvents, removeEvent, currentPage, totalPage, perPage, setCurrentPage, handleEventsSearch, searchEventsQuery} = useEventContext();
  const { activeEvents, inactiveEvents, expiredEvents, activeEventsTotalPage, activeEventsPerPage, activeEventsCurrentPage, inactiveEventsTotalPage, inactiveEventsPerPage, inactiveEventsCurrentPage, expiredEventsTotalPage, expiredEventsPerPage, expiredEventsCurrentPage, fetchActiveEvents, fetchInactiveEvents, fetchExpiredEvents, setActiveEventsCurrentPage, setInactiveEventsCurrentPage, setExpiredEventsCurrentPage, handleSearch, searchQuery} = useMerchantContext();

  const [searchInputUsersByEvent, setSearchInputUsersByEvent] = useState('');
  const [usersByEvent, setUsersByEvent] = useState([])
  const [usersByEventId, setUsersByEventId] = useState('')
  const [userToRemoveId, setUserToRemoveId] = useState('')
  const [usersByEventCurrentPage, setUsersByEventCurrentPage] = useState(1);
  const [usersByEventTotalPage, setUsersByEventTotalPage] = useState(1);
  const [usersByEventPerPage, setUsersByEventPerPage] = useState(1);

  const memoizedFetchActiveEvents = useCallback(fetchActiveEvents, [activeEventsCurrentPage]);
  const memoizedFetchInactiveEvents = useCallback(fetchInactiveEvents, [inactiveEventsCurrentPage]);
  const memoizedFetchExpiredEvents = useCallback(fetchExpiredEvents, [expiredEventsCurrentPage]);

  const getUsersByEvent = async (event_id) => {
    try {
          let response; 
          
          let url = '/event_attendee/event/'+ event_id + '?page=' + currentPage
          if (searchInputUsersByEvent) {
              url+= '&keyword='+searchInputUsersByEvent
          } 
          response = await axios.get(url, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
            }
          });
          setUsersByEvent(response.data.eventAttendees)
          setUsersByEventTotalPage(response.data.pagination.total)
          setUsersByEventPerPage(response.data.pagination.per_page)
         
      } catch (e) {
          console.log(e);
      }
  }

  const removeUserByEvent = async () => {
    try {
      let response; 

      let url = '/event_attendee/event/'+usersByEventId+'/user/'+userToRemoveId+'/delete'

      response = await axios.delete(url,
      {
         headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
         }
      }
      ); // Your API endpoint for deleting events

    } catch (error) {
      console.error('Error:', error);
    }
    setUserToRemoveId(null)
    delete_user.close()
    getUsersByEvent(usersByEventId)
  };

  useEffect(() => {
    if (Cookies.get('user') && userRole == 3) {
      fetchEvents(); // Fetch events using the context provider function
    }
  }, [searchEventsQuery]);

  const handSearchInputUsersByEvent = (e) => {
      setSearchInputUsersByEvent(e.target.value);
      setUsersByEventCurrentPage(1);
  };

    const close_check_attendees = () => {
        setUsersByEvent('')
        setUsersByEventId('')
        setSearchInputUsersByEvent('')
        check_attendees.close()
    }
  useEffect(() => {
    if (Cookies.get('user') && userRole == 1) {
      const getStatTotalUsers = async () => {
        try {
            const response = await axios.get('/users/total', {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
              }
            });
              setTotalUsers(response.data.total_users)
              setTotalUsersIncrease(response.data.percentage_increase_since_last_month)
          } catch (e) {
              console.log(e);
          }
      }
      const getStatTotalVenues = async () => {
        try {
            const response = await axios.get('/venues/total', {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
              }
            });
              setTotalVenues(response.data.total_venues)
              setTotalVenuesIncrease(response.data.percentage_increase_since_last_month)
          } catch (e) {
              console.log(e);
          }
      }
      const getStatTotalCategories = async () => {
        try {
            const response = await axios.get('/categories/total', {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
              }
            });
              setTotalCategories(response.data.total_categories)
              setTotalCategoriesIncrease(response.data.percentage_increase_since_last_month)
          } catch (e) {
              console.log(e);
          }
      }
      const getStatTotalEvents = async () => {
        try {
            const response = await axios.get('/events/total', {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
              }
            });
              setTotalEvents(response.data.total_events)
              setTotalEventsIncrease(response.data.percentage_increase_since_last_month)
          } catch (e) {
              console.log(e);
          }
      }
      const getPieTotalEventsByCategory = async () => {
        try {
            const response = await axios.get('/events/total_events_category', {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
              }
            });

            const dataTotalEventsByCategory = response.data.data;
            const stateTotalEventsByCategory = {
              series: dataTotalEventsByCategory.map(item => item.total_events),
              labels: dataTotalEventsByCategory.map(item => item.category),
              options: {
                labels: dataTotalEventsByCategory.map(item => item.category),
                chart: {
                  type: 'donut',
                },
                title: {
                  text: "Events Distribution By Category"
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              },
            };
            setEventsByCategory(stateTotalEventsByCategory);
            
          } catch (e) {
              console.log(e);
          }
      }

      const getPieTotalEventsByVenue = async () => {
        try {
            const response = await axios.get('/events/total_events_venue', {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
              }
            });

            const dataTopEventsByAttendance = response.data.data;
            const stateTopEventsByAttendance = {
              series: dataTopEventsByAttendance.map(item => item.total_events),
              labels: dataTopEventsByAttendance.map(item => item.venue),
              options: {
                labels: dataTopEventsByAttendance.map(item => item.venue),
                chart: {
                  type: 'donut',
                },
                title: {
                  text: "Events Distribution By Venue"
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              },
            };
            setEventsByVenue(stateTopEventsByAttendance);
            
          } catch (e) {
              console.log(e);
          }
      }

      const getTopEventsByAttendance = async () => {
        try {
            const response = await axios.get('/events/top_events_by_attendance', {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
              }
            });

            const dataTopEventsByAttendance = response.data.data;
            const stateTopEventsByAttendance = {
              series: [{
                name: "Attendees",
                data: dataTopEventsByAttendance.map(item => item.attendees_count)
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 350
                }, 
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  }
                },
                dataLabels: {
                  enabled: false
                },
                title: {
                  text: "Top 10 Events By Attendance"
                },
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return val
                    }
                  }
                },
                xaxis: {
                  categories: dataTopEventsByAttendance.map(item => item.name),
                  labels: {
                    formatter: function (val) {
                      return val
                    }
                  }
                }
              },
            };
            setEventsByAttendance(stateTopEventsByAttendance);
            
          } catch (e) {
              console.log(e);
          }
      }



      getStatTotalUsers();
      getStatTotalVenues();
      getStatTotalCategories();
      getStatTotalEvents();
      getPieTotalEventsByCategory();
      getPieTotalEventsByVenue();
      getTopEventsByAttendance();

    }
  }, []);

  useEffect(() => {
    // Fetch events when this component mounts or when currentPage changes
    if (Cookies.get('user') && userRole == 2) {
      memoizedFetchActiveEvents();
    }
  }, [memoizedFetchActiveEvents, deleteEventId]);

  useEffect(() => {
    // Fetch events when this component mounts or when currentPage changes
    if (Cookies.get('user') && userRole == 2) {
      memoizedFetchInactiveEvents();
    }
  }, [memoizedFetchInactiveEvents, deleteEventId]);

  useEffect(() => {
    // Fetch events when this component mounts or when currentPage changes
    if (Cookies.get('user') && userRole == 2) {
      memoizedFetchExpiredEvents();
    }
  }, [memoizedFetchExpiredEvents]);

  const handleActiveEventsPageClick = (selectedPage) => {
    setActiveEventsCurrentPage(selectedPage.selected + 1);
  };

  const handleInactiveEventsPageClick = (selectedPage) => {
    setInactiveEventsCurrentPage(selectedPage.selected + 1);
  };

  const handleExpiredEventsPageClick = (selectedPage) => {
    setExpiredEventsCurrentPage(selectedPage.selected + 1);
  };

  const handleUsersByEventPageClick = (selectedPage) => {
    setUsersByEventCurrentPage(selectedPage.selected + 1);
  };

  const handleSearchButtonClick = () => {
    fetchActiveEvents();
    fetchExpiredEvents();
    fetchInactiveEvents();
  };

  const handleRemoveUserByEvent = (user_id) => {
      setUserToRemoveId(user_id)
      delete_user.showModal()
  }

  useEffect(() => {
        if (Cookies.get('user') && userRole == 3) { 
        setEventAttended(events)
        }
  }, [events, searchEventsQuery]);


  const handleEventsPageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const eventDelete = async(e) => {
    e.preventDefault()
    try {
        const response = await axios.delete('/event/'+deleteEventId+'/delete', 
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                },
            },
        );
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
    console.log('Deleting event:', event);
      setDeleteEventId(event.id)
      delete_event.showModal();
  };

  const checkAttendeesDialog = (event) => {
    getUsersByEvent(event.id)
    setUsersByEventId(event.id)
      check_attendees.showModal();
  };

  switch (userRole) {
    case 1:
      return (<>
        <div className='flex justify-center items-center py-7'>
          <div className='flex flex-col md:flex-row 2xl:hidden'>
          <div className=" stats-vertical shadow">
            <div className="stat gap-0 ">
              <div className="stat-figure text-secondary text-3xl">
              <LuUser2 />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-secondary">{totalUsers}</div>
              <div className="stat-desc">{totalUsersIncrease}% more than last month</div>
            </div>
            <div className="stat gap-0">
              <div className="stat-figure text-secondary text-3xl">
              <LuList />
              </div>
              <div className="stat-title">Total Categories</div>
              <div className="stat-value text-secondary">{totalCategories}</div>
              <div className="stat-desc">{totalCategoriesIncrease}% more than last month</div>
            </div>
          </div>
          <div className=" stats-vertical shadow"> 
            
            <div className="stat gap-0">
              <div className="stat-figure text-secondary text-3xl">
              <LuWarehouse />
              </div>
              <div className="stat-title">Total Venues</div>
              <div className="stat-value text-secondary">{totalVenues}</div>
              <div className="stat-desc">{totalVenuesIncrease}% more than last month</div>
            </div>
            
            <div className="stat gap-0">
              <div className="stat-figure text-secondary text-3xl">
              <LuFlag />
              </div>
              <div className="stat-title">Total Events</div>
              <div className="stat-value text-secondary">{totalEvents}</div>
              <div className="stat-desc">{totalEventsIncrease}% more than last month</div>
            </div>
          </div>
          </div>
        
          <div className="hidden 2xl:flex stats stats-horizontal shadow">
            <div className="stat gap-0 ">
              <div className="stat-figure text-secondary text-3xl">
              <LuUser2 />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-secondary">{totalUsers}</div>
              <div className="stat-desc">{totalUsersIncrease}% more than last month</div>
            </div>
            <div className="stat gap-0">
              <div className="stat-figure text-secondary text-3xl">
              <LuWarehouse />
              </div>
              <div className="stat-title">Total Venues</div>
              <div className="stat-value text-secondary">{totalVenues}</div>
              <div className="stat-desc">{totalVenuesIncrease}% more than last month</div>
            </div>
            
            <div className="stat gap-0">
              <div className="stat-figure text-secondary text-3xl">
              <LuList />
              </div>
              <div className="stat-title">Total Categories</div>
              <div className="stat-value text-secondary">{totalCategories}</div>
              <div className="stat-desc">{totalCategoriesIncrease}% more than last month</div>
            </div>
            
            <div className="stat gap-0">
            <div className="stat-figure text-secondary text-3xl">
              <LuFlag />
              </div>
              <div className="stat-title">Total Events</div>
              <div className="stat-value text-secondary">{totalEvents}</div>
              <div className="stat-desc">{totalEventsIncrease}% more than last month</div>
            </div>
          </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-center items-center py-3 gap-5'>
        <div className='card bg-base-100 min-h-[275px] max-h-[600px]' >
          <Chart options={eventsByCategory.options} series={eventsByCategory.series} type="donut" width="380" height="380"/>
        </div>
        <div className='card bg-base-100 min-h-[275px] max-h-[600px]' >
          <Chart options={eventsByVenue.options} series={eventsByVenue.series} type="donut" width="380" height="380"/>
        </div>
      </div>

      <div className='py-3 px-10 '>
      <Chart options={eventsByAttendance.options} series={eventsByAttendance.series} type="bar" height="400"/>
      </div>
      
      </>)
    case 2:
      return (
        <div className='grid-flow-col m-auto grid-cols-4'>
        <div className='col-span-1 mx-6'>
          <div className="grid h-24 bg-base-300 place-items-center">
                <div className="join">
                    <div>
                        <div>
                        <input className="input input-bordered w-full sm:w-64 md:w-80 lg:w-96 xl:w-120 join-item" placeholder="Search" value={searchQuery} onChange={handleSearch}/>
                        </div>
                    </div>
                    
                    <div className="indicator">
                        <button className="btn join-item" onClick={handleSearchButtonClick}>Search</button>
                    </div>
                </div>
          </div>
        </div>
        <div className='col-span-1 mb-10 mx-6 bg-base-100'>   
          <div class="overflow-x-auto">
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
                          <div className='flex-auto mx-5 grid grid-flow-row'>
                           <div className='row-span-1'><a className='font-bold row-span-1 text-gray-400 hover:underline'><Link key={event.id} to={'/merchant/preview/' + event.id}>{event.name}</Link></a></div>
                           <div className='row-span-1'><a className='row-span-1 text-gray-400 hover:underline cursor-pointer' onClick={() => checkAttendeesDialog(event)}>Check Attendees</a></div>
                            <div className='row-span-1 flex gap-3'><a className='row-span-1 text-blue-500 hover:underline'><Link key={event.id} to={'/merchant/edit_event/' + event.id}> Edit</Link></a><a className='row-span-1 text-red-500 hover:underline cursor-pointer' onClick={() => openDeleteEventDialog(event)}>Delete</a></div>
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
          {
            activeEvents ? 
                  <ReactPaginate
                  previousLabel={'«'}
                  nextLabel={'»'}
                  breakLabel={'...'}
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
            :
                  <ReactPaginate
                  previousLabel={'«'}
                  nextLabel={'»'}
                  breakLabel={'...'}
                  pageCount={1}
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
          }
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
                          <div className='flex-auto mx-5 font-bold'>
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
          {
            expiredEvents ? 
                <ReactPaginate
                previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={'...'}
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
            />
            :
                <ReactPaginate
                previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={'...'}
                pageCount={1}
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
            />
          }
          
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
                           <div className='row-span-1 font-bold '><a className='row-span-1 text-gray-400 hover:underline'><Link key={event.id} to={'/merchant/preview/' + event.id}>{event.name}</Link></a></div>
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
          {
            inactiveEvents ? 
                    <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
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
                />
            :
                    <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
                    pageCount={1}
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
                />
          }
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

        <dialog id="check_attendees" class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                    <h3 class="font-bold text-xl">Attendees</h3>
                    <div className="grid pt-4 place-items-center">
                        <div className="join">
                            <div>
                                <div>
                                <input className="input input-bordered w-full sm:w-64 md:w-80 lg:w-96 xl:w-120 join-item" placeholder="Search" value={searchInputUsersByEvent} onChange={handSearchInputUsersByEvent}/>
                                </div>
                            </div>
                            
                            <div className="indicator">
                                <button className="btn join-item" onClick={()=>getUsersByEvent(usersByEventId)}>Search</button>
                            </div>
                        </div>
                    </div>
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={close_check_attendees}>✕</button>
                    </form>
                    <div>
                      <div className="overflow-x-auto">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Full Name</th>
                              <th>Email</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            Array.isArray(usersByEvent) && usersByEvent.length > 0 ? (
                              usersByEvent.map((user, index) => (
                              <tr key={user.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                              
                                  <td>
                                    <div class="flex items-center gap-3">
                                      <div>
                                      <div class="font-bold">{user.first_name + " " + user.last_name}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                  {user.email}
                                  </td>
                                  
                                  <th>
                                    <button class="btn btn-ghost btn-xs" onClick={()=>handleRemoveUserByEvent(user.id)}>Remove</button>
                                  </th>
                              </tr>
                            ))
                              ) : (
                                <p>No Users available</p>

                            )
                          }
                            
                          </tbody>
                        </table>
                      </div>
                      <ReactPaginate
                        previousLabel={'«'}
                        nextLabel={'»'}
                        breakLabel={'...'}
                        pageCount={Math.ceil( usersByEventTotalPage / usersByEventPerPage )}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handleUsersByEventPageClick}
                        containerClassName={'join items-center justify-center w-full mb-6'}
                        pageClassName={'join-item btn'}
                        activeClassName={'btn-active'}
                        disabledClassName={'btn-disabled'}
                        previousClassName = {'join-item btn'}
                        nextClassName = {'join-item btn'}
                        forcePage={usersByEventCurrentPage - 1}
                            />
                    </div>
                  </div>
        </dialog>

        <dialog id="delete_user" class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                    <h3 class="font-bold text-lg">Remove</h3>
                    <p class="py-4">Are you sure you want to remove user from the event?</p>
                    <div class="modal-action">
                      <form method="dialog" onSubmit={removeUserByEvent}>
                        <button class="btn mr-2" type="submit">Confirm</button>
                        <button class="btn" type="button" onClick={()=>delete_user.close()}>Close</button>
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
              <h3 className='text-xl font-medium'>MY EVENTS</h3>
            </div>
            </div>
            <div className='col-span-1 mx-6'>
              <div className="grid h-24 bg-base-300 place-items-center">
                    <div className="join">
                        <div>
                            <div>
                            <input className="input input-bordered w-full sm:w-64 md:w-80 lg:w-96 xl:w-120 join-item" placeholder="Search" value={searchEventsQuery} onChange={handleEventsSearch}/>
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
                    {
                  Array.isArray(eventAttended) ? (
                    eventAttended.map((event, index) => (
                    <tr key={event.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
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
          <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
                    pageCount={Math.ceil( totalPage / perPage )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handleEventsPageClick}
                    containerClassName={'join items-center justify-center w-full my-3'}
                    pageClassName={'join-item btn'}
                    activeClassName={'btn-active'}
                    disabledClassName={'btn-disabled'}
                    previousClassName = {'join-item btn'}
                    nextClassName = {'join-item btn'}
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