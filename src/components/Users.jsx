import React, {useState, useEffect} from 'react'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { LuUserPlus2 } from "react-icons/lu";
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import ReactPaginate from 'react-paginate';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      contact_no: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role_id: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const openAddUserDialog = () => {
    setFormData({
        first_name: '',
        last_name: '',
        contact_no: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role_id: '',
    });
    setIsDialogOpen(true);
    setEditingUserId(null); // Resetting the editing user ID
    add_user.showModal();
};

const openDeleteUserDialog = (user) => {
  // setIsDialogOpen(true);
  // setEditingUserId(null); // Resetting the editing user ID
    setDeleteUserId(user.id)
    delete_user.showModal();
};
const openEditUserDialog = (user) => {
    setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        contact_no: user.contact_no,
        email: user.email,
        password: '', // Clear password fields when editing
        passwordConfirm: '',
        role_id: user.roles[0].id,
    });
    setIsDialogOpen(true);
    setEditingUserId(user.id); // Set the ID of the user being edited
    add_user.showModal();
};

  const [error, setError] = useState('');

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePageClick = (selectedPage) => {
    // console.log(selectedPage)
    setCurrentPage(selectedPage.selected + 1);
};

  useEffect(() => {
    const getUsers = async () => {
        try {
              // const response = await axios.get('/users', {
            const response = await axios.get('/users?page='+currentPage, {
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
              // console.log(response.data.users.data)
              setTotalPage(response.data.pagination.total)
              setPerPage(response.data.pagination.per_page)
              // console.log(response.data.pagination)
          } catch (e) {
              console.log(e);
          }
      }
      getUsers();
      
  }, [currentPage,isDialogOpen,deleteUserId]);

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role_id: value });
  };

  const [roleList, setRoleList] = useState([]);
  
  useEffect(() => {
    if (roleList && roleList.length > 0) {
      // setVenue(roleList[0].id); 
      setFormData({ ...formData, role_id: roleList[0].id });
    }
  }, [roleList]);

  useEffect(() => {

    const getRoleList = async () => {
        try {
          const response = await axios.get('/roles',{
              headers: {
                'Accept':'application/json'
              }
          })
          setRoleList(response.data.roles)
          // console.log(response.data)
        } catch (err) {
          console.log(err)
        }
        
       
    }
    getRoleList();

}, [])

  const userSubmit = async(e) => {
    e.preventDefault()
    // console.log(editingUserId)

    if (editingUserId) {
      // Handle editing existing user logic using editingUserId
      // Example: Update the user's details
      if (formData.password !== formData.passwordConfirm) {
        setError('Passwords do not match.');
        // console.log('Passwords do not match.')
        return;
      }
      try {
        // console.warn(email,password)
          const response = await axios.post('/users/'+editingUserId+'/update',  
          JSON.stringify({ 
              first_name: formData.first_name,
              last_name: formData.last_name,
              contact_no: formData.contact_no,
              // email: formData.email, 
              password: formData.password,
              password_confirmation: formData.passwordConfirm,
              // role_id: formData.role_id
          }),
              {
                  headers:
                  {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                  },
              },
          );
      
          // console.log('User Updated successfully:', response.data);
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

          if (formData.password !== formData.passwordConfirm) {
            setError('Passwords do not match.');
            // console.log('Passwords do not match.')
            return;
          }
          try {
              // console.warn(email,password)
              const response = await axios.post('/users',  
              JSON.stringify({ 
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  contact_no: formData.contact_no,
                  email: formData.email, 
                  password: formData.password,
                  password_confirmation: formData.passwordConfirm,
                  role_id: formData.role_id
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
    }
    setIsDialogOpen(false);
    add_user.close();
    

}
  const userDelete = async(e) => {
    e.preventDefault()
    // console.log("delete")
    try {
        // console.warn(email,password)
        const response = await axios.delete('/users/'+deleteUserId+'/delete', 
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                },
            },
        );
    
        console.log('User deleted successfully:', response.data);
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
    setDeleteUserId(null)
    delete_user.close()
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
                  Array.isArray(users) && users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
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
                              <div class="font-bold">{user.first_name + " " + user.last_name}</div>
                              {/* <div class="text-sm opacity-50">United States</div> */}
                            </div>
                          </div>
                        </td>
                        <td>
                        {user.email}
                          {/* Zemlak, Daniel and Leannon */}
                          {/* <br/>
                          <span class="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                        </td>
                        <td>{user.roles.length > 0 ? user.roles[0].name : 'No Role'}</td>
                        <th>
                          <button class="btn btn-ghost btn-xs"  onClick={() => openEditUserDialog(user)}>edit</button>
                        </th>
                        <th>
                          <button class="btn btn-ghost btn-xs" onClick={() => openDeleteUserDialog(user)}>delete</button>
                        </th>
                    </tr>
                  ))
                    ) : (
                      <p>No users available</p>

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
                  icon={<LuUserPlus2 />}
                  event={false}
                  alwaysShowTitle={true}
                  onClick={openAddUserDialog}
                >
                </Fab>
                <dialog id="add_user" class="modal">
                  <div class="modal-box">
                    <form method="dialog">
                      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 class="font-bold text-lg text-center">{editingUserId !== null ? 'Edit User' :'Add User'}</h3>
                    {/* <p class="py-4">Press ESC key or click on ✕ button to close</p> */}
                    <form className="card-body" onSubmit={userSubmit}>
                    {/* onSubmit={eventSubmit} */}
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">First Name</span>
                        </label>
                        <input type="text" placeholder="First Name"  className="input input-bordered" name="first_name" value={formData.first_name} onChange={handleSignupChange} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Last Name</span>
                        </label>
                        <input type="text" placeholder="Last Name"  className="input input-bordered" name="last_name" value={formData.last_name} onChange={handleSignupChange} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Contact Number</span>
                        </label>
                        <input type="text" placeholder="Contact Number"  className="input input-bordered" name="contact_no" value={formData.contact_no} onChange={handleSignupChange} required />
                    </div>
                    {
                      editingUserId !== null ? 
                      <>
                      
                      </>
                      :
                      <>
                      <div className="form-control">
                        <label className="label">
                        <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email"  className="input input-bordered" name="email" value={formData.email} onChange={handleSignupChange} required />
                      </div>
                      </>
                    }
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered" name="password" value={formData.password} onChange={handleSignupChange}  required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password" className="input input-bordered" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleSignupChange} required />
                    </div>
                    {
                      editingUserId !== null ? 
                      <>
                      
                      </>
                      :
                      <>
                      <label class="form-control">
                      <div class="label">
                        <span class="label-text">User Type</span>
                      </div>
                      <select class="select select-bordered" value={formData.role_id} onChange={handleRoleChange} required>
                        
                          {roleList && roleList.length > 0 &&
                              roleList.map((role, index) => (
                                <option key={index} value={role.id}>{role.name}</option>
                              ))
                            }
                      </select>
                      </label>
                      </>
                    }
                    
                    
                    <div className="form-control mt-6">
                        <input className='btn btn-primary' type="submit" value={editingUserId !== null ? 'Save' :'Add User'}/>
                    </div>
                    </form>
                  </div>
                </dialog>

                <dialog id="delete_user" class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                    <h3 class="font-bold text-lg">Delete</h3>
                    <p class="py-4">Are you sure you want to delete user?</p>
                    <div class="modal-action">
                      <form method="dialog" onSubmit={userDelete}>
                        <button class="btn mr-2" type="submit">Confirm</button>
                        <button class="btn" type="button" onClick={()=>delete_user.close()}>Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
      </div>
    </div>
  )
}

export default Users