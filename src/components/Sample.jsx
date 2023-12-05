{Cookies.get('user') ?
        <>
        <div className="navbar-end">
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                <li>
                    <details>
                    <summary>
                    {JSON.parse(Cookies.get('user')).user.first_name}
                    </summary>
                    <ul class="p-2 bg-base-100 z-10 w-28">
                        <li className='items-center'><a>My Events</a></li>
                        {JSON.parse(Cookies.get('user')).user.roles.id == '2'&& 
                                <li className='items-center'><a>Create Event</a></li>
                        }
                        <li className='items-center'><a>Account</a></li>
                        <li className='items-center'><a onClick={handleLogoutClick}>Logout</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
            {
                JSON.parse(Cookies.get('user')).user.roles.id !== '2' ?
                (<></>) 
                : 
                (
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                        <LuBookMarked size={20}/>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> */}
                        <span class="badge badge-sm indicator-item">{eventAttended.length}</span>
                        </div>
                    </label>
                    <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow">
                        <div class="card-body">
                        <span class="font-bold text-lg">{eventAttended.length + " Events this month"}</span>
                        {
                            eventAttended ? (
                                eventAttended.map(item => (
                                    <div key={item?.id} className='grid grid-flow-col grid-cols-3 gap-3'>
                                        {item?.event && (
                                            <>
                                                <img src="" alt="" className="w-24 h-16" />
                                                {item?.event?.name && (
                                                    <span className="font-bold text-base col-span-2" key={item?.event?.id}>{item.event.name}</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))
                            ): (
                                <p>No Events</p>
                            )
                            
                        }
                    
                        <div class="card-actions">
                            <button class="btn btn-primary btn-block">Check My Events</button>
                        </div>
                        </div>
                    </div>
                </div>
            )
            }
            
        </div>
        </>
        :
        <>
        <div className="navbar-end">
            <a onClick={() => setLoginClicked(true)} className="btn btn-primary">
                {/* <Link to="/login">Login</Link> */}
                Login
            </a>
            <a className="btn" onClick={() => emptyCart()}>
                Remove Items
            {/* <a className="btn">
                <Link to="/signup">Signup</Link> */}
            </a>
            <div class="dropdown dropdown-end">
                { cartItems.length > 0 ?
                ( <>
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                    <LuBookMarked size={20}/>
                    <span class="badge badge-sm indicator-item">{cartItems.length}</span>
                    </div>
                </label>
                <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-60 bg-base-100 shadow">
                    <div class="card-body">
                    <span class="font-bold text-lg">{cartItems.length} Events added</span>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary btn-block">Checkout</button>
                    </div>
                    </div>
                </div>
                </>
            )
                :
                (<>
                
                </>)

                }
                
            </div>
        </div>
        </>
        }