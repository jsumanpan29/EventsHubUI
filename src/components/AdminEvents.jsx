import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import ReactPaginate from 'react-paginate';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const [error, setError] = useState('');

  useEffect(() => {
    const getEvents = async () => {
        try {
              const response = await axios.get('/events', {
            // const response = await axios.get('/events?page='+currentPage, {
                  headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
                  }
              });


            //   if(response.data){
            //       console.log(response.data.events)
            //   }
              // console.log(JSON.parse(Cookies.get('user')).token)
              setUsers(response.data.users.data)
              setTotalPage(response.data.pagination.total)
              setPerPage(response.data.pagination.per_page)
          } catch (e) {
              console.log(e);
          }
      }
      getEvents();
      
  }, [currentPage]);
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
                    {/* <th>
                      <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                    </th> */}
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
            <tbody>
              {
                // Array.isArray(users) && users.length > 0 ? (
                // users.map((user, index) => (
                //   <tr key={user.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                //     {/* <td>
                //       <div className='flex'>
                //         <div className='flex-none'>
                          
                //         </div>
                //         <div className='flex-auto mx-5'>
                //           <p>{user.first_name + " " + user.last_name}</p>
                //         </div>
                //       </div>
                //     </td> */}
                //      <td>
                //         <div class="flex items-center gap-3">
                //           <div>
                //             <div class="font-bold">{user.first_name + " " + user.last_name}</div>
                //             {/* <div class="text-sm opacity-50">United States</div> */}
                //           </div>
                //         </div>
                //       </td>
                //       <td>
                //       {user.email}
                //         {/* Zemlak, Daniel and Leannon */}
                //         {/* <br/>
                //         <span class="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                //       </td>
                //       <td>{user.roles.length > 0 ? user.roles[0].name : 'No Role'}</td>
                //       <th>
                //         <button class="btn btn-ghost btn-xs"  onClick={() => openEditUserDialog(user)}>edit</button>
                //       </th>
                //       <th>
                //         <button class="btn btn-ghost btn-xs" onClick={() => openDeleteUserDialog(user)}>delete</button>
                //       </th>
                //   </tr>
                // ))
                //   ) : (
                //     <p>No users available</p>

                // )
              }
               
            </tbody>
          </table>
        </div>
        <div className="join items-center justify-center w-full">
                    <button className="join-item btn">1</button>
                    <button className="join-item btn">2</button>
                    <button className="join-item btn btn-disabled">...</button>
                    <button className="join-item btn">99</button>
                    <button className="join-item btn">100</button>
        </div>
         {/* <ReactPaginate
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
              /> */}
              {/* <Fab
                icon={<LuUserPlus2 />}
                event={false}
                alwaysShowTitle={true}
                onClick={openAddUserDialog}
              >
              </Fab> */}
             

              <dialog id="delete_user" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                  <h3 class="font-bold text-lg">Delete</h3>
                  <p class="py-4">Are you sure you want to delete user?</p>
                  <div class="modal-action">
                    <form method="dialog">
                      <button class="btn mr-2">Confirm</button>
                      <button class="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
    </div>
  </div>
  )
}

export default AdminEvents