import { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import Nav from './components/Nav';
import {Route, Routes, useNavigate, Link, useLocation}  from 'react-router-dom'
import Events from './components/Events';
import Event from './components/Event'
import Contact from './components/Contact';
import Missing from './components/Missing';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import { EventProvider } from './components/EventContext';
import axios from '../api/axios'
import Cookies from 'js-cookie'
import { CartProvider } from './components/CartContext';
import Signup from './components/Signup';
import SignupPage from './components/SignupPage';
import { MerchantProvider } from './components/MerchantContext';
import CreateEvent from './components/CreateEvent';
import { UserProvider } from './components/UserContext';

import NotAuth from './components/NotAuth';
import RequireAuth from './components/RequireAuth';
import PubAttendeeAuth from './components/PubAttendeeAuth';
import Users from './components/Users';
import Venue from './components/Venue';
import AdminEvents from './components/AdminEvents';
import AdminAuth from './components/AdminAuth';
import MerchantAuth from './components/MerchantAuth';
import EventPreview from './components/EventPreview';
import UpdateEvent from './components/UpdateEvent';
import Category from './components/Category';

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return children
} 

function App() {
  const [loginClicked, setLoginClicked] = useState(false);
  
  return (
    <UserProvider>
    <MerchantProvider>
    <CartProvider>
    <EventProvider>
    <div className="App">
      <Wrapper>
      <Nav setLoginClicked={setLoginClicked} />
      {/* <Nav setLoginClicked={setLoginClicked} setAccountSettingsClicked = {setAccountSettingsClicked} /> */}
      <Routes>
        {/* Public */}
        
        {/* Unauthorized User */}
        <Route element={<NotAuth />}>
            <Route path="/" element={<Home loginClicked={loginClicked}  />} />
           
            <Route path="/login" element={<Login/>} /> 
            <Route path="/signup" element={<SignupPage/>} /> 
        </Route>
        {/* Routes for Unauthorized User and Attendee Only */}
        <Route element={<PubAttendeeAuth />}>
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/events">
            <Route index element={<Events />}/>
            <Route path=":eId" element={<Event />} />
          </Route>
        </Route>

        {/* Routes for Auth */}
        <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Routes for Admin */}
          <Route element={<AdminAuth />}>
            <Route path="/dashboard/user" element={<Users /> } />
            <Route path="/dashboard/venue" element={<Venue /> } />
            <Route path="/dashboard/category" element={<Category /> } />
            <Route path="/dashboard/admin_events" element={<AdminEvents /> } />
          </Route>
          <Route path="/dashboard/account" element={<Account />} />
        </Route>
          
        {/* Routes for Merchant */}
        <Route element={<MerchantAuth />}>
            <Route path='/merchant/create_event' element={<CreateEvent />} />
            <Route path='/merchant/edit_event/:eId' element={<UpdateEvent />} />
            <Route path='/merchant/preview/:eId' element={<EventPreview />} />
        </Route>
          
        </Route>
        
        {/* Catch All */}
        <Route path="*" element={<Missing />} /> 
      </Routes>
      <Footer />
    </Wrapper>
    </div>
    </EventProvider>
    </CartProvider>
    </MerchantProvider>
    </UserProvider>
  );
}

export default App;
