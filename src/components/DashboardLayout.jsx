import React, { useState,useEffect } from 'react'
import Cookies from 'js-cookie';
import { NavLink, useNavigate,Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    const userRole = JSON.parse(Cookies.get('user'))?.user.roles.id

    return (
  <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content grid grid-cols-4 lg:grid-cols-5 bg-base-300">
      <div class="col-span-4 items-center justify-center flex">
      <div class="container min-h-screen">
        <Outlet />
      </div>
  
      </div>
      <div class=" lg:col-span-1 hidden">
        
      </div>
      
      </div> 
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {userRole === 1 ? (
              <>
                <li key="dashboard"><NavLink end to="/dashboard">Dashboard</NavLink></li>
                <li key="user"><NavLink to="/dashboard/user">User</NavLink></li>
                <li key="venue"><NavLink to="/dashboard/venue">Venue</NavLink></li>
                <li key="venue"><NavLink to="/dashboard/category">Category</NavLink></li>
                <li key="admin_events"><NavLink to="/dashboard/admin_events">Events</NavLink></li>
                <li key="account"><NavLink to="/dashboard/account">Account Settings</NavLink></li>
              </>
            ) : (
              <>
                <li key="dashboard"><NavLink end to="/dashboard">My Events</NavLink></li>
                <li key="account"><NavLink to="/dashboard/account">Account Settings</NavLink></li>
              </>
            )}
        </ul>
      
      </div>
    </div>
    )
}

export default DashboardLayout