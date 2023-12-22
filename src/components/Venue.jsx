import React, {useState, useEffect} from 'react'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { LuWarehouse } from "react-icons/lu";
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import ReactPaginate from 'react-paginate';

const Venue = () => {

  const [venues, setVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    address: ''
});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVenueId, setEditingVenueId] = useState(null);

  const openAddVenueDialog = () => {
    setFormData({
        name: '',
        address: ''
    });
    setIsDialogOpen(true);
    setEditingVenueId(null); // Resetting the editing venue ID
    add_venue.showModal();
};

  const openEditVenueDialog = (venue) => {
    setFormData({
      name: venue.name,
      address: venue.address
    });
    setIsDialogOpen(true);
    setEditingVenueId(venue.id); // Set the ID of the venue being edited
    add_venue.showModal();
  };

  const [error, setError] = useState('');

  const handleVenueChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    const getVenues = async () => {
        try {
              const response = await axios.get('/venues', {
            // const response = await axios.get('/events?page='+currentPage, {
                  headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
                  }
              });


            //   if(response.data){
                  console.log(response.data.venues)
            //   }
              // console.log(JSON.parse(Cookies.get('user')).token)
              setVenues(response.data.venues)
              // console.log(response.data.users.data)
              setTotalPage(response.data.pagination.total)
              setPerPage(response.data.pagination.per_page)
              // console.log(response.data.pagination)
          } catch (e) {
              console.log(e);
          }
      }
      getVenues();
      
  }, [currentPage,isDialogOpen]);
  
  const venueSubmit = async(e) => {
    e.preventDefault()
    console.log(editingVenueId)

    if (editingVenueId) {
      // Handle editing existing user logic using editingUserId
      // Example: Update the user's details
      // if (formData.password !== formData.passwordConfirm) {
      //   setError('Passwords do not match.');
      //   return;
      // }
      try {
        // console.warn(email,password)
          const response = await axios.post('/venues/'+editingVenueId+'/update',  
          JSON.stringify({ 
              name: formData.name,
              address: formData.address,
          }),
              {
                  headers:
                  {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                  },
              },
          );
      
          console.log('User Updated successfully:', response.data);
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
      
      
    } else {

          // if (formData.password !== formData.passwordConfirm) {
          //   setError('Passwords do not match.');
          //   // console.log('Passwords do not match.')
          //   return;
          // }
          try {
              // console.warn(email,password)
              const response = await axios.post('/venues',  
              JSON.stringify({ 
                name: formData.name,
                address: formData.address,
              }),
                  {
                      headers:
                      {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                      },
                  },
              );
          
              console.log('User added successfully:', response.data);
              add_venue.close()
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
    }
    setIsDialogOpen(false);
    add_venue.close();
    

}
  return (
    <div className='m-auto grid-cols-2'>
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
              {/* <thead>
                <tr>
                  <th className='text-center'>Users</th>
                </tr>
              </thead> */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
              <tbody>
              {
                  Array.isArray(venues) && venues.length > 0 ? (
                    venues.map((venue, index) => (
                    <tr key={venue.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                      {/* <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>{user.first_name + " " + user.last_name}</p>
                          </div>
                        </div>
                      </td> */}
                       <td>
                          <div class="flex items-center gap-3">
                            <div>
                              <div class="font-bold">{venue.name}</div>
                              {/* <div class="text-sm opacity-50">United States</div> */}
                            </div>
                          </div>
                        </td>
                        <td>
                        {venue.address}
                        </td>
                        <th>
                          <button class="btn btn-ghost btn-xs"  onClick={() => openEditVenueDialog(venue)}>edit</button>
                        </th>
                        <th>
                          <button class="btn btn-ghost btn-xs">delete</button>
                        </th>
                    </tr>
                  ))
                    ) : (
                      <p>No venues available</p>

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
            <Fab
              icon={<LuWarehouse />}
              event={false}
              alwaysShowTitle={true}
              onClick={openAddVenueDialog}
            ></Fab>
            <dialog id="add_venue" class="modal">
                  <div class="modal-box">
                    <form method="dialog">
                      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {/* <h3 class="font-bold text-lg">Hello!</h3>
                    <p class="py-4">Press ESC key or click on ✕ button to close</p> */}
                    <form className="card-body" onSubmit={venueSubmit}>
                    {/* onSubmit={eventSubmit} */}
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name"  className="input input-bordered" name="name" value={formData.name} onChange={handleVenueChange} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Address</span>
                        </label>
                        <input type="text" placeholder="Address"  className="input input-bordered" name="address" value={formData.address} onChange={handleVenueChange} required />
                    </div>
                    
                    
                    <div className="form-control mt-6">
                        <input className='btn btn-primary' type="submit" value={editingVenueId !== null ? 'Save' :'Add Venue'}/>
                    </div>
                    </form>
                  </div>
                </dialog>
      </div>
    </div>
  )
}

export default Venue