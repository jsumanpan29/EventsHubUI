import React from 'react'

const Account = () => {
  return (
    // <div class="max-w-md">
    //   <h1 class="text-5xl font-bold">Account</h1>
    //   <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    //   <button class="btn btn-primary">Get Started</button>
    // </div> 
    <div className='grid-flow-col grid-cols-2 m-10'>
            <div className='col-span-1 navbar bg-base-100'>
              {/* <a href="" className="btn btn-ghost text-xl">Account Settings</a> */}
              <div className="navbar-start">
              <h3 className='text-xl font-medium'>ACCOUNT SETTINGS</h3>
              </div>
              <div className="navbar-end">
                  <a className="btn">
                     Edit
                  </a>
             </div>
            </div>
            <div className='col-span-1'>
              <div class="overflow-x-auto">
              <form className="card-body" >
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">First Name</span>
                    </label>
                    <input type="text" placeholder="First Name"  name="first_name" className="input input-bordered" disabled required />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Last Name</span>
                    </label>
                    <input type="text" placeholder="Last Name"  name="last_name" className="input input-bordered" disabled required />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Contact Number</span>
                    </label>
                    <input type="text" placeholder="Contact Number"  name="contact_no" className="input input-bordered" disabled required />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email"  name="email" className="input input-bordered" disabled required />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password"  name="password" className="input input-bordered" disabled required />
                </div>
                {/* <div className="form-control">
                    <label className="label">
                    <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="password" placeholder="Confirm Password"  name="passwordConfirm" className="input input-bordered" required />
                </div> */}
                <div className="form mt-6">
                    <input className='btn btn-primary btn-wide btn-disabled' type="submit" value="Save" />
                </div>
              </form>
              </div>
             
            </div>
        </div>
  )
}

export default Account