import React from 'react'

const Dashboard = () => {
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
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>

    </div>
    <div class=" lg:col-span-1 hidden">
      
    </div>
    
    </div> 
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li><a>My Events</a></li>
        <li><a>Account Settings</a></li>
      </ul>
    
    </div>
  </div>
  )
}

export default Dashboard