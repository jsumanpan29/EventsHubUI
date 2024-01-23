import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import ReactPaginate from 'react-paginate';

const AdminEvents = () => {

  const [searchInput, setSearchInput] = useState('');

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState('')
  const [eventStatusVal, setEventStatusVal] = useState('')

  const [error, setError] = useState('');

  const getEvents = async () => {
    try {
        let response; // Declare the variable outside the condition

        let url = '/events/admin?page=' + currentPage
        if (searchInput) {
            url+= '&keyword='+searchInput
        } 
        response = await axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
          }
        });

          setEvents(response.data.events)
          setTotalPage(response.data.pagination.total)
          setPerPage(response.data.pagination.per_page)
      } catch (e) {
          console.log(e);
      }
  }

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
};
  const handleToggleOnChange = (eventId, eventStatus) => {
    setSelectedEventId(eventId)
    setEventStatusVal(eventStatus)
    change_status.showModal()
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
};

  const confirmStatusChange = async() => {
      const formData = new FormData();
      if(eventStatusVal == 1){
        formData.append('event_status', 0);
      }else{
        formData.append('event_status', 1);
      }
      
      try {
        const response = await axios.post('/event/'+selectedEventId+'/update_status',  
          formData,
            {
                headers:
                {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
                },
            },
        );
        const updatedEvents = events.map(event => {
          if (event.id === selectedEventId) {
            return { ...event, event_status: eventStatusVal === 1 ? 0 : 1 };
          }
          return event;
        });
    
        setEvents(updatedEvents);
      } catch (err) {
        console.log(err)
      }
    
      setSelectedEventId(null)
      setEventStatusVal(null)
      change_status.close();
  }
  const closeStatusChange = async() => {
    setSelectedEventId(null)
    setEventStatusVal(null)
    change_status.close();
  }
  useEffect(() => {
   
      getEvents();
      
  }, [currentPage]);
  return (
    <div className='m-auto grid-cols-2'>
    <div className='col-span-1 mx-6'>
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
    <div className='col-span-1 mb-10 mx-6 bg-base-100'>   
        <div class="overflow-x-auto">
          <table className='table'>
                <thead>
                  <tr>
                    <th>Event Name</th>
                  </tr>
                </thead>
            <tbody>
              {
                Array.isArray(events) && events.length > 0 ? (
                events.map((event, index) => (
                  <tr key={event.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                    
                    <td class="flex justify-between items-center">
                      <div>
                        <div class="font-bold">{event.name}</div>
                        <div class="text-sm opacity-50">{event.user_id ? event.user_id?.first_name + " " + event.user_id?.last_name : "Unknown" }</div>
                      </div>
                      <label class="inline-flex items-center">
                        <input type="checkbox" class="toggle" value={event.id} checked={event.event_status == 1 ? true : false} onClick={()=>handleToggleOnChange(event.id, event.event_status)}/>
                      </label>
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
                  onPageChange={handlePageClick}
                  containerClassName={'join items-center justify-center w-full mb-6'}
                  pageClassName={'join-item btn'}
                  activeClassName={'btn-active'}
                  disabledClassName={'btn-disabled'}
                  previousClassName = {'join-item btn'}
                  nextClassName = {'join-item btn'}
                  forcePage={currentPage - 1}
              />
             

              <dialog id="change_status" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                  <h3 class="font-bold text-lg">Change status?</h3>
                  <p class="py-4">Are you sure you want to change event status?</p>
                  <div class="modal-action">
                    <form method="dialog">
                      <button class="btn mr-2" onClick={confirmStatusChange}>Confirm</button>
                      <button class="btn" onClick={closeStatusChange}>Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
    </div>
  </div>
  )
}

export default AdminEvents