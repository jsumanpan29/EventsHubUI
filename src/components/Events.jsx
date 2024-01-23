import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { LuTag,LuUser2,LuNavigation,LuCalendar,LuCalendarClock } from "react-icons/lu";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import ReactPaginate from 'react-paginate';

const Events = () => {

    const location = useLocation();
    
    let searchInputFromHome;
    const [searchInput, setSearchInput] = useState('');
    const [attendanceInput, setAttendanceInput] = useState('');
    const [sortInput, setSortInput] = useState('regDeadlineAsc');
    const [venuesInput, setVenuesInput] = useState('');
    const [categoriesInput, setCategoriesInput] = useState('');
    const [datesInput, setDatesInput] = useState('')

    const formatDate = (date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      };

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [perPage, setPerPage] = useState(1);

    const [venues, setVenues] = useState([]);
    const [categories, setCategories] = useState([]);

    const [valueDateSched, onValueDateSched] = useState();

    const [checkboxes, setCheckboxes] = useState({
        under500: false,
        between500And1000: false,
        between1000And2000: false,
        between2000And5000: false,
        between5000And10000: false,
        between10000And15000: false,
        between15000And25000: false,
        between25000And50000: false,
        between50000And100000: false,
        over100000: false,
    });

    const [venueCheckboxes, setVenueCheckboxes] = useState([])
    const [categoryCheckboxes, setCategoryCheckboxes] = useState([])

    const handleSortChange = (e) => {
        setSortInput(e.target.value);
    };

    const handleAttendanceChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({ ...checkboxes, [name]: checked });
    };



    const handleDateRangeChange = (newValue) => {
        onValueDateSched(newValue);
      };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
        setCurrentPage(1);
    };
    const handleVenueChange = (event) => {
        const { value, checked } = event.target;
      
        if (checked) {
          setVenueCheckboxes((prevCheckboxes) => [...prevCheckboxes, value]);
        } else {
          setVenueCheckboxes((prevCheckboxes) =>
            prevCheckboxes.filter((checkboxValue) => checkboxValue !== value)
          );
        }
      };

      const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
      
        if (checked) {
            setCategoryCheckboxes((prevCheckboxes) => [...prevCheckboxes, value]);
        } else {
            setCategoryCheckboxes((prevCheckboxes) =>
            prevCheckboxes.filter((checkboxValue) => checkboxValue !== value)
          );
        }
      };

      const getEvents = async () => {
        try {
            searchInputFromHome = location?.state?.searchInput
            let response; // Declare the variable outside the condition

            let url = '/events?page=' + currentPage
            
            if (searchInputFromHome){
                url+= '&keyword='+searchInputFromHome
                searchInputFromHome=''
            }
            if (searchInput) {
                url+= '&keyword='+searchInput
            } 
            if (sortInput) {
                url+= '&sort='+sortInput
            } 
            if (attendanceInput) {
                url+= '&attendance='+attendanceInput
            }
            if (venuesInput) {
                url+= '&venues='+venuesInput
            }  
            if (categoriesInput) {
                url+= '&categories='+categoriesInput
            } 
            if(datesInput){
                url+=datesInput
            }
               response = await axios.get(url, {
                headers: {
                  'Accept': 'application/json',
                }
              });
              setEvents(response.data.events)
              setTotalPage(response.data.pagination.total)
              setPerPage(response.data.pagination.per_page)
          } catch (e) {
              console.log(e);
          }
      }
      useEffect(() => {
        const formattedFromDate = valueDateSched ? formatDate(valueDateSched[0]) : '';
        const formattedToDate = valueDateSched ? formatDate(valueDateSched[1]) : '';
        
        // Constructing the string in the required format
        let formattedDateRange
        if(valueDateSched){
            formattedDateRange = `&dateStart=${formattedFromDate}&dateEnd=${formattedToDate}`;
        }
        else{
            formattedDateRange = ''
        }
      
      
        setDatesInput(formattedDateRange);
      }, [valueDateSched]);

    useEffect(() => {
        const checkedCheckboxes = Object.entries(checkboxes)
            .filter(([key, value]) => value === true)
            .map(([key]) => key);
    
            setAttendanceInput(checkedCheckboxes.join(", "))
    }, [checkboxes]);
    useEffect(() => {
        // Join all the checked venue values into a string
        setVenuesInput(venueCheckboxes.join(", "));
      }, [venueCheckboxes]);

    useEffect(() => {
        setCategoriesInput(categoryCheckboxes.join(", "));
    }, [categoryCheckboxes]);


    useEffect(() => {
          getEvents();
      }, [currentPage]);
      
  useEffect(() => {
    const getVenues = async () => {
        try {
            const response = await axios.get('/venues', {
                  headers: {
                      'Accept': 'application/json',
                  }
              });

              setVenues(response.data.venues)
          } catch (e) {
              console.log(e);
          }
      }
      getVenues();
      
  }, []);
  useEffect(() => {
    const getCategories = async () => {
        try {
            const response = await axios.get('/categories', {
                  headers: {
                      'Accept': 'application/json',
                  }
              });
              setCategories(response.data.categories)
          } catch (e) {
              console.log(e);
          }
      }
      getCategories();
      
  }, []);
    
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    };
  return (
    <>
    <div className="flex flex-col w-full">
        <div className="grid h-24 bg-base-300 place-items-center">
            <div className="join">
                <div>
                    <div>
                    <input className="input input-bordered w-full sm:w-64 md:w-80 lg:w-96 xl:w-120 join-item" placeholder="Search" value={searchInput} onChange={handleSearchInput}/>
                    </div>
                </div>
               
                <div className="indicator">
                    <button className="btn join-item" onClick={getEvents}>Search</button>
                </div>
            </div>
        </div>
       
    </div>
    <div className="min-h-screen bg-base-300">
        <div className="container grid grid-cols-4 pt-0 m-auto gap-x-8">
            <div className="col-span-4 xl:col-span-1">
                <nav id="filters" className="flex flex-col w-full">
                    <div className="flex items-center justify-center h-14 text-white font-bold text-3xl">
                        Filters
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 mb-3">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            Sort By
                        </div>
                        <div className="collapse-content">
                            <select className="select select-bordered w-full max-w-xs" onChange={handleSortChange} value={sortInput}>
                                <option value={"regDeadlineAsc"}>Deadline: soonest first</option>
                                <option value={"regDeadlineDesc"}>Deadline: latest first</option>
                                <option value={"nameAsc"}>Event Name: A-Z</option>
                                <option value={"nameDesc"}>Event Name: Z-A</option>
                            </select>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 mb-3">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            Dates
                        </div>
                        <div className="collapse-content">
                        <DateRangePicker onChange={handleDateRangeChange} value={valueDateSched} required />
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 mb-3">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            Attendance
                        </div>
                        <div className="collapse-content"> 
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="under500" checked={checkboxes.under500} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">Under 500</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="between500And1000" checked={checkboxes.between500And1000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">500 - 1,000</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="between1000And2000" checked={checkboxes.between1000And2000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">1000 - 2,000</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="between2000And5000" checked={checkboxes.between2000And5000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">2,000 - 5,000</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="between5000And10000" checked={checkboxes.between5000And10000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">5,000 - 10,000</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="between10000And15000" checked={checkboxes.between10000And15000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">10,000 - 15,000</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="between15000And25000" checked={checkboxes.between15000And25000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">15,000 - 25,000</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="between25000And50000" checked={checkboxes.between25000And50000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">25,000 - 50,000</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="between50000And100000" checked={checkboxes.between50000And100000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">50,000 - 100,000</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="flex items-center cursor-pointer p-1">
                                    <input type="checkbox" className="checkbox" name="over100000" checked={checkboxes.over100000} onChange={handleAttendanceChange}/>
                                    <span className="label-text ml-2">Over 100,000</span> 
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 mb-3">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            Venue
                        </div>
                        <div className="collapse-content"> 
                            {
                                Array.isArray(venues) ? (
                                    venues.map((venue,index) =>(
                                        <div className="form-control">
                                            <label className="flex items-center cursor-pointer p-1">
                                                <input type="checkbox" className="checkbox" name={venue.name}  value={String(venue.id)} onChange={handleVenueChange} checked={venueCheckboxes.includes(String(venue.id))}/>
                                                <span className="label-text ml-2">{venue.name}</span> 
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p>No venue available</p>

                                )
                            }
                            
                        </div>
                    </div>
                    
                    <div className="collapse collapse-arrow bg-base-100 mb-3">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            Category
                        </div>
                        <div className="collapse-content"> 
                            {
                                    Array.isArray(categories) ? (
                                        categories.map((category,index) =>(
                                            <div className="form-control">
                                                <label className="flex items-center cursor-pointer p-1">
                                                    <input type="checkbox" className="checkbox" name={category.name} value={String(category.id)} onChange={handleCategoryChange} checked={categoryCheckboxes.includes(String(category.id))}/>
                                                    <span className="label-text ml-2">{category.name}</span> 
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No category available</p>

                                    )
                            }
                        </div>
                    </div>
                </nav>
            </div>
            <div className="col-span-4 mt-1 xl:col-span-3 static">
                
                <div className='mb-3'>
                {
                        Array.isArray(events) ? (
                        events.map((event,index) =>(
                            <Link key={event.id} to={'/events/' + event.id}>
                                <div className='relative flex flex-col sm:flex-row items-center bg-base-100 mb-7 rounded-lg'>
                                    <div className="avatar">
                                            <div className="mask w-52 h-28 mr-5">
                                                <img src={event.media[0]?.url} alt="Event Image" />
                                            </div>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <div className='text-2xl font-bold pb-1'><h1>{event.name}</h1></div>
                                        <div className='text-sm pb-1 flex'><p className='pr-3 flex'><LuCalendar size={18} className='mr-1.5' />{format(new Date(event.date_sched_start), 'MMM dd - ') + format(new Date(event.date_sched_end), 'MMM dd, yyyy') }</p>
                                                                        <p className='flex'><LuCalendarClock size={18} className='mr-1.5' />{' Reg. Deadline: '+ format(new Date(event.date_reg_deadline), 'MMM dd, yyyy') }</p>
                                        </div>
                                        <div className='grid grid-cols-3 lg:grid-cols-5 pb-1'>
                                            <div className='text-sm flex '><LuTag size={18} className='mr-1.5' />{event.category_id.name}</div>
                                            <div className='text-sm flex'><LuUser2 size={18} className='mr-1.5' />{event.est_attendants + '+'}</div>
                                            <div className='text-sm flex lg:col-span-3'><LuNavigation size={18} className='mr-1.5' />{event.venue_id?.name + ", " +event.location}</div>
                                        </div>
                                    </div>
                                </div>
                               
                            </Link>
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
                />

            </div> 

        </div>

    </div>
    </>
  )
}

export default Events