import React, {useState, useEffect} from 'react'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { LuListPlus } from "react-icons/lu";
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import ReactPaginate from 'react-paginate';

const Category = () => {

  const [searchInput, setSearchInput] = useState('');

  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const [formData, setFormData] = useState({
    name: ''
});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const getCategories = async () => {
    try {
        let response; // Declare the variable outside the condition

        let url = '/categories?page=' + currentPage
        if (searchInput) {
            url+= '&keyword='+searchInput
        } 
        response = await axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
          }
        });
          setCategories(response.data.categories)
          setTotalPage(response.data.pagination.total)
          setPerPage(response.data.pagination.per_page)
      } catch (e) {
          console.log(e);
      }
  }

  const openAddCategoryDialog = () => {
    setFormData({
        name: ''
    });
    setIsDialogOpen(true);
    setEditingCategoryId(null); // Resetting the editing venue ID
    add_category.showModal();
};

  const openDeleteCategoryDialog = (category) => {
      setDeleteCategoryId(category.id)
      delete_category.showModal();
  };
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
};

  const openEditCategoryDialog = (category) => {
    setFormData({
      name: category.name,
      address: category.address
    });
    setIsDialogOpen(true);
    setEditingCategoryId(category.id); // Set the ID of the category being edited
    add_category.showModal();
  };

  const [error, setError] = useState('');

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  
  useEffect(() => {
   
      getCategories();
      
  }, [currentPage,isDialogOpen,deleteCategoryId]);
  
  const categorySubmit = async(e) => {
    e.preventDefault()
    console.log(editingCategoryId) 

    if (editingCategoryId) {
      try {
          const response = await axios.post('/category/'+editingCategoryId+'/update',  
          JSON.stringify({ 
              name: formData.name
          }),
              {
                  headers:
                  {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                  },
              },
          );
      
          console.log('Category Updated successfully:', response.data);
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
              const response = await axios.post('/categories',  
              JSON.stringify({ 
                name: formData.name
              }),
                  {
                      headers:
                      {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                      },
                  },
              );
          
              console.log('Category added successfully:', response.data);
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
    add_category.close();
    }

    const categoryDelete = async(e) => {
    e.preventDefault()
    try {
        const response = await axios.delete('/category/'+deleteCategoryId+'/delete', 
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                },
            },
        );
    
        console.log('Category deleted successfully:', response.data);
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
    setDeleteCategoryId(null)
    delete_category.close()
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
                        <button className="btn join-item" onClick={getCategories}>Search</button>
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
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
              <tbody>
              {
                  Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category, index) => (
                    <tr key={category.id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                    
                       <td>
                          <div class="flex items-center gap-3">
                            <div>
                              <div class="font-bold">{category.name}</div>
                            </div>
                          </div>
                        </td>
                        <th>
                          <button class="btn btn-ghost btn-xs"  onClick={() => openEditCategoryDialog(category)}>edit</button>
                        </th>
                        <th>
                          <button class="btn btn-ghost btn-xs" onClick={() => openDeleteCategoryDialog(category)}>delete</button>
                        </th>
                    </tr>
                  ))
                    ) : (
                      <p>No categories available</p>

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
              icon={<LuListPlus />}
              event={false}
              alwaysShowTitle={true}
              onClick={openAddCategoryDialog}
            ></Fab>
            <dialog id="add_category" class="modal">
                  <div class="modal-box">
                    <form method="dialog">
                      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 class="font-bold text-lg text-center">{editingCategoryId !== null ? 'Edit Category' :'Add Category'}</h3>
                    <form className="card-body" onSubmit={categorySubmit}>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name"  className="input input-bordered" name="name" value={formData.name} onChange={handleCategoryChange} required />
                    </div>
                    
                    
                    <div className="form-control mt-6">
                        <input className='btn btn-primary' type="submit" value={editingCategoryId !== null ? 'Save' :'Add Category'}/>
                    </div>
                    </form>
                  </div>
              </dialog>

              <dialog id="delete_category" class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                    <h3 class="font-bold text-lg">Delete</h3>
                    <p class="py-4">Are you sure you want to delete category?</p>
                    <div class="modal-action">
                      <form method="dialog" onSubmit={categoryDelete}>
                        <button class="btn mr-2" type="submit">Confirm</button>
                        <button class="btn" type="button" onClick={()=>delete_category.close()}>Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
      </div>
    </div>
  )
}

export default Category