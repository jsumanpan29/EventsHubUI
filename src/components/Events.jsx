import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { useNavigate, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { LuTag,LuUser2,LuNavigation } from "react-icons/lu";
import Cookies from 'js-cookie'
import ReactPaginate from 'react-paginate';

// const Events = ({events}) => {
const Events = () => {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [perPage, setPerPage] = useState(1);


    useEffect(() => {
        const getEvents = async () => {
            try {
                //   const response = await axios.get('/events', {
                const response = await axios.get('/events?page='+currentPage, {
                      headers: {
                          'Accept': 'application/json',
                          // 'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
                      }
                  });


                //   if(response.data){
                //       console.log(response.data.events)
                //   }
                  // console.log(JSON.parse(Cookies.get('user')).token)
                  setEvents(response.data.events)
                  setTotalPage(response.data.pagination.total)
                  setPerPage(response.data.pagination.per_page)
              } catch (e) {
                  console.log(e);
              }
          }
          getEvents();
          
      }, [currentPage]);
    //   }, []);
    
    const handlePageClick = (selectedPage) => {
        // console.log(selectedPage)
        setCurrentPage(selectedPage.selected + 1);
    };

    //   const onDetails = (eventId) => {
    //     // if (cookies.user.user.role == '0') {
    //     //     toast.error('You need to be admin to enable action!', {
    //     //         position: "bottom-right",
    //     //         autoClose: 5000,
    //     //         hideProgressBar: false,
    //     //         closeOnClick: true,
    //     //         pauseOnHover: true,
    //     //         draggable: true,
    //     //         progress: undefined,
    //     //     });
    //     // } else {
    //         navigate('/events/'+eventId, { state: { id: eventId } });
    //     // }
    //   }
  return (
    <>
    <div className="flex flex-col w-full">
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
    <div className="min-h-screen bg-base-300">
        <div className="container grid grid-cols-4 pt-0 m-auto gap-x-8">
            <div className="lg:col-span-1">
                <nav className="flex flex-col w-64">
                    <div className="flex items-center justify-center h-14 text-white font-bold text-3xl">
                        Filters
                    </div>
                    <div className="flex-grow">
                        <ul className="py-4">
                        <li className="px-4 py-2  hover:text-white">
                            <Link to="/">Option 1</Link>
                        </li>
                        <li className="px-4 py-2  hover:text-white">
                            <Link to="/about">Option 2</Link>
                        </li>
                        <li className="px-4 py-2  hover:text-white">
                            <Link to="/contact">Option 3</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="col-span-4 mt-1 lg:col-span-3 static">
                
                <div className='mb-3'>
                {
                        Array.isArray(events) ? (
                        events.map((event,index) =>(
                            // <a href={'/events/'+event.id} className="relative flex flex-col sm:flex-row items-center">
                            // <Link to={{
                            //         pathname: '/events/' + event.id,
                            //         state: {id: event.id},
                            // }}>
                            <Link key={event.id} to={'/events/' + event.id} state={{ id: event.id }}>
                                <div className='relative flex flex-col sm:flex-row items-center bg-base-100 mb-7 rounded-lg'>
                                    <div className="avatar">
                                            <div className="mask w-64 h-28 mr-5">
                                                <img src="" alt="Event Image" />
                                            </div>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <div className='text-2xl font-bold pb-1'><h1>{event.name}</h1></div>
                                        <div className='text-sm pb-1 flex'><p className='pr-3'>{format(new Date(event.date_sched_start), 'MMM dd - ') + format(new Date(event.date_sched_end), 'MMM dd, yyyy') }</p>
                                                                        <p>{' Reg. Deadline: '+ format(new Date(event.date_reg_deadline), 'MMM dd, yyyy') }</p>
                                        </div>
                                        <div className='grid grid-cols-3 lg:grid-cols-5 pb-1'>
                                            <div className='text-sm flex '><LuTag size={18} className='mr-1.5' />{event.category_id.name}</div>
                                            <div className='text-sm flex'><LuUser2 size={18} className='mr-1.5' />{event.est_attendants + '+'}</div>
                                            <div className='text-sm flex lg:col-span-3'><LuNavigation size={18} className='mr-1.5' />{event.venue_id.name + ", " +event.location}</div>
                                        </div>
                                    </div>
                                </div>
                               
                            </Link>
                            // </a>
                        ))
                        ) : (
                            <p>No events available</p>

                        )
                    }
                    
                </div>
                <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
                    // pageCount={Math.ceil( totalPage / perPage )}
                    pageCount={Math.ceil( totalPage / perPage )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'join items-center justify-center w-full mb-6'}
                    pageClassName={'join-item btn'}
                    activeClassName={'btn-active'}
                    disabledClassName={'btn-disabled'}
                    previousClassName = {'join-item btn'}
                    nextClassName = {'join-item btn'}
                    // forcePage={currentPage - 1}
                />
                {/* <div className="join items-center justify-center w-full">
                    <button className="join-item btn">1</button>
                    <button className="join-item btn">2</button>
                    <button className="join-item btn btn-disabled">...</button>
                    <button className="join-item btn">99</button>
                    <button className="join-item btn">100</button>
                </div> */}

            </div> 

        </div>

    </div>
    </>
  )
}

export default Events