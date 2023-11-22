import React, { useState } from 'react'
import Account from './Account'
import MyEvents from './MyEvents'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [showAccountSettings, setShowAccountSettings] = useState(false)
  const onClickShowAccountSettings = () => setShowAccountSettings(true)

  const [selectedOption, setSelectedOption] = useState(''); 
  const navigate = useNavigate();

  // Function to handle click on sidebar options
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  
  const renderContent = () => {
    switch (selectedOption) {
      case 'MyEvents':
        // navigate(`/dashboard`);
        return <MyEvents />;
      case 'AccountSettings':
        // navigate(`/dashboard/account-settings`);
        return <Account />;
      default:
        // navigate(`/dashboard`);
        return <MyEvents />;
    }
  };


  

  // const handleButtonClick = () => {
  //   navigate('/new-route');
  // };

  return (
    // <div className="flex h-screen bg-gray-100">
    //   <nav className="bg-gray-800 text-white p-4 w-64 min-h-screen">
    //   <ul>
    //     <li className="py-2 hover:bg-indigo-600 hover:text-white">My Events</li>
    //     <li className="py-2 hover:bg-indigo-600 hover:text-white">Favorites</li>
    //     <li className="py-2 hover:bg-indigo-600 hover:text-white">Account Settings</li>
    //   </ul>
    // </nav>
    //   <div className="flex-1 flex flex-col overflow-hidden">
    //   <header className="bg-indigo-600 text-white p-4">
    //     <h1 className="text-2xl font-bold">Dashboard</h1>
    //   </header>
    //     <div className="flex-grow p-4">
    //       <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
    //       <div className="grid grid-cols-2 gap-4">
    //         {/* Dashboard widgets or cards go here */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content grid grid-cols-4 lg:grid-cols-5">
    <div class="col-span-4 items-center justify-center flex">
    <div class="hero min-h-screen bg-base-100">
      <div class="hero-content text-center">
        {renderContent()}
      </div>
    </div>

    </div>
    <div class=" lg:col-span-1 hidden">
      
    </div>
    
    </div> 
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li onClick={() => handleOptionClick('MyEvents')}><a>My Events</a></li>
        {/* <Link to={'/account'}><li><a>Account Settings</a></li></Link> */}
        <li onClick={() => handleOptionClick('AccountSettings')}><a>Account Settings</a></li>
      </ul>
    
    </div>
  </div>
  )
}

export default Dashboard