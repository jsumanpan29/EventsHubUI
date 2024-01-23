import React, {useState, useEffect} from 'react'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { LuWarehouse } from "react-icons/lu";
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import ReactPaginate from 'react-paginate';

const Venue = () => {

  const [searchInput, setSearchInput] = useState('');

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
  const [deleteVenueId, setDeleteVenueId] = useState(null);

  const getVenues = async () => {
    try {
        let response; // Declare the variable outside the condition

        let url = '/venues?page=' + currentPage
        if (searchInput) {
            url+= '&keyword='+searchInput
        } 
        response = await axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
          }
        });

          setVenues(response.data.venues)
          setTotalPage(response.data.pagination.total)
          setPerPage(response.data.pagination.per_page)
      } catch (e) {
          console.log(e);
      }
  }

  const openAddVenueDialog = () => {
    setFormData({
        name: '',
        address: ''
    });
    setIsDialogOpen(true);
    setEditingVenueId(null); // Resetting the editing venue ID
    add_venue.showModal();
};

  const openDeleteVenueDialog = (venue) => {
      setDeleteVenueId(venue.id)
      delete_venue.showModal();
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
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
    
      getVenues();
      
  }, [currentPage,isDialogOpen,deleteVenueId]);
  
  const venueSubmit = async(e) => {
    e.preventDefault()
    console.log(editingVenueId) 

    if (editingVenueId) {
      try {
          const response = await axios.post('/venue/'+editingVenueId+'/update',  
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
      
          console.log('Venue Updated successfully:', response.data);
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
          try {
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
          
              console.log('Venue added successfully:', response.data);
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

const venueDelete = async(e) => {
  e.preventDefault()
  try {
      const response = await axios.delete('/venue/'+deleteVenueId+'/delete', 
          {
              headers:
              {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
              },
          },
      );
  
      console.log('Venue deleted successfully:', response.data);
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
  setDeleteVenueId(null)
  delete_venue.close()
}
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
                        <button className="btn join-item" onClick={getVenues}>Search</button>
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
                       <td>
                          <div class="flex items-center gap-3">
                            <div>
                              <div class="font-bold">{venue.name}</div>
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
                          <button class="btn btn-ghost btn-xs" onClick={() => openDeleteVenueDialog(venue)}>delete</button>
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
                    <h3 class="font-bold text-lg text-center">{editingVenueId !== null ? 'Edit Venue' :'Add Venue'}</h3>
                    <form className="card-body" onSubmit={venueSubmit}>
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

              <dialog id="delete_venue" class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                    <h3 class="font-bold text-lg">Delete</h3>
                    <p class="py-4">Are you sure you want to delete venue?</p>
                    <div class="modal-action">
                      <form method="dialog" onSubmit={venueDelete}>
                        <button class="btn mr-2" type="submit">Confirm</button>
                        <button class="btn" type="button" onClick={()=>delete_venue.close()}>Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
      </div>
    </div>
  )
}

export default Venue