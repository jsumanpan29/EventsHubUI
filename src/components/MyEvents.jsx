import React from 'react'
import axios from '../../api/axios'
import Cookies from 'js-cookie'

const MyEvents = () => {
  const userRole = JSON.parse(Cookies.get('user'))?.user.roles.id

  switch (userRole) {
    case 2:
      return (
        <div className='grid-flow-col m-auto grid-cols-4'>
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
              <thead>
                <tr>
                  <th className='text-center'>Active Events</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-base-200">
                  <td>
                    {/* <img src="" alt="" className="w-24 h-16" /> */}
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="bg-base-200">
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="bg-base-200">
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
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
              <tr class="bg-base-200">
                  <td>
                    {/* <img src="" alt="" className="w-24 h-16" /> */}
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="bg-base-200">
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="bg-base-200">
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
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
              <tr class="bg-base-200">
                  <td>
                    {/* <img src="" alt="" className="w-24 h-16" /> */}
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="bg-base-200">
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="bg-base-200">
                  <td>
                    <div className='flex'>
                      <div className='flex-none'>
                        <img src="" alt="" className="w-24 h-16" />
                      </div>
                      <div className='flex-auto mx-5'>
                        <p>Event</p>
                      </div>
                    </div>
                  </td>
                </tr>
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
        </div>
  
        </div>
      );
    case 3:
       return (
        <div className='grid-flow-col grid-cols-3 m-10'>
            <div className='col-span-1 navbar bg-base-100'>
              <a href="" className="btn btn-ghost text-xl">My Events</a>
              
            </div>
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
            <div className='col-span-1 my-5'>
              <div class="overflow-x-auto">
                <table class="table">
                  <thead>
                  </thead>
                  <tbody>
                  <tr class="bg-base-200">
                      <td>
                        {/* <img src="" alt="" className="w-24 h-16" /> */}
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src="" alt="" className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>Event</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src="" alt="" className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>Event</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-base-200">
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src="" alt="" className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>Event</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src="" alt="" className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>Event</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-base-200">
                      <td>
                        <div className='flex'>
                          <div className='flex-none'>
                            <img src="" alt="" className="w-24 h-16" />
                          </div>
                          <div className='flex-auto mx-5'>
                            <p>Event</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
          </div>
          <div className="join items-center justify-center w-full mt-5">
                      <button className="join-item btn">1</button>
                      <button className="join-item btn">2</button>
                      <button className="join-item btn btn-disabled">...</button>
                      <button className="join-item btn">99</button>
                      <button className="join-item btn">100</button>
          </div>
            </div>
        </div>
       );
    default:
      return null; // Or any default component you'd like to render
  }
  
}

export default MyEvents