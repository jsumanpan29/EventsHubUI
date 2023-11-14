import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Nav = () => {
    // const [user, setUser] = ([]);

//   useEffect(() => {
//     // Check for the 'user' cookie whenever the component mounts or updates
//     // const user = Cookies.get('user');
//     // setUser(user);
//   }, []);
const navigate = useNavigate();
    
const handleLogoutClick = () => {
    try {
        Cookies.remove('user')
        // console.log(Cookies.get('user'))
        navigate('/')
    } catch (err) {
        console.log('Error: '+err.message);
    }
}
  return (
    <div className="navbar bg-base-100 max-w-screen-xl m-auto">
    <div className="navbar-start">
        <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a><Link to="/">Home</Link></a></li>
            <li><a><Link to="/events">Find Events</Link></a></li>
            <li><a><Link to="/contact">Contact</Link></a></li>
        </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">EventHub</a>
    </div>
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base">
            <li className='mx-1'><a className='p-3'><Link to="/">Home</Link></a></li>
            <li className='mx-1'><a className='p-3'><Link to="/events">Find Events</Link></a></li>
            <li className='mx-1'><a className='p-3'><Link to="/contact">Contact</Link></a></li>
        </ul>
    </div>
    
        {Cookies.get('user') ?
        <>
            {/* <a className="btn btn-primary" onClick={handleLogoutClick}>
                Logout
            </a> */}
        {/* <div className="navbar-end">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="" />
                    <span class="profile-text">Your Text</span>
                    </div>
                </label>
                <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li><a class="justify-between">Profile</a></li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogoutClick}>Logout</a></li>
                </ul>
            </div>
        </div> */}
        <div className="navbar-end">
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                <li>
                    <details>
                    <summary>
                    {JSON.parse(Cookies.get('user')).user.name}
                    </summary>
                    <ul class="p-2 bg-base-100 z-10">
                        <li><a>Profile</a></li>
                        <li><a onClick={handleLogoutClick}>Logout</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
        </div>
        </>
        :
        <>
        <div className="navbar-end">
            <a className="btn btn-primary">
                <Link to="/login">Login</Link>
            </a>
            <a className="btn">
                <Link to="/signup">Signup</Link>
            </a>
        </div>
        </>
        }
    
    </div>
  )
}

export default Nav