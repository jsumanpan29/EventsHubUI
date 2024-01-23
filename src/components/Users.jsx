import React, {useState, useEffect} from 'react'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { LuUserPlus2 } from "react-icons/lu";
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import ReactPaginate from 'react-paginate';

const Users = () => {
  const [searchInput, setSearchInput] = useState('');

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

  const getUsers = async () => {
    try {
        let response; // Declare the variable outside the condition

        let url = '/users?page=' + currentPage
        if (searchInput) {
            url+= '&keyword='+searchInput
        } 
        response = await axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
          }
        });
          setUsers(response.data.users.data)
          setTotalPage(response.data.pagination.total)
          setPerPage(response.data.pagination.per_page)
      } catch (e) {
          console.log(e);
      }
  }

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
    setDeleteUserId(user.id)
    delete_user.showModal();
};
const handleSearchInput = (e) => {
  setSearchInput(e.target.value);
  setCurrentPage(1);
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
    setCurrentPage(selectedPage.selected + 1);
};

  useEffect(() => {
    
      getUsers();
      
  }, [currentPage,isDialogOpen,deleteUserId]);

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role_id: value });
  };

  const [roleList, setRoleList] = useState([]);
  
  useEffect(() => {
    if (roleList && roleList.length > 0) {
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
        } catch (err) {
          console.log(err)
        }
        
       
    }
    getRoleList();

}, [])

  const userSubmit = async(e) => {
    e.preventDefault()
    if (editingUserId) {
      // Handle editing existing user logic using editingUserId
      // Example: Update the user's details
      if (formData.password !== formData.passwordConfirm) {
        setError('Passwords do not match.');
        return;
      }
      try {
          const response = await axios.post('/users/'+editingUserId+'/update',  
          JSON.stringify({ 
              first_name: formData.first_name,
              last_name: formData.last_name,
              contact_no: formData.contact_no,
              password: formData.password,
              password_confirmation: formData.passwordConfirm,
          }),
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
      
      
    } else {

          if (formData.password !== formData.passwordConfirm) {
            setError('Passwords do not match.');
            return;
          }
          try {
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
    try {
        const response = await axios.delete('/users/'+deleteUserId+'/delete', 
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
                        <input className="input input-bordered w-full sm:w-64 md:w-80 lg:w-96 xl:w-120 join-item" placeholder="Search" value={searchInput} onChange={handleSearchInput}/>
                        </div>
                    </div>
                    
                    <div className="indicator">
                        <button className="btn join-item" onClick={getUsers}>Search</button>
                    </div>
                </div>
          </div>
      </div>
      <div className='col-span-1 mb-10 mx-6 bg-base-100'>   
          <div class="overflow-x-auto">
            <table className='table'>
                  <thead>
                    <tr>
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
                    <form className="card-body" onSubmit={userSubmit}>
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