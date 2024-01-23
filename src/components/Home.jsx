import React, { useState } from 'react'
import Signup from './Signup'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie'
import { useCart } from './CartContext'
import img_traffic from '../images/img_traffic.jpg';
import img_kid from '../images/img_kid.jpg';
import img_marathon from '../images/img_marathon.jpg';


const Home = ({ loginClicked }) => {
  const {cartItems, emptyCart, isItemInCart} = useCart();
  const [searchInput, setSearchInput] = useState('');
  const [showSignUp, setShowSignUp] = useState(false)
  const onClickShowSignUp = () => setShowSignUp(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleSearch = () => {
    navigate('/events', { state: { searchInput: searchInput } });
  };

  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/login',
        JSON.stringify({ email, password }),
        {
          headers:
          {
            'Content-Type': 'application/json',
          },
        },
      );
      const user = response?.data;
      Cookies.remove('user')
      Cookies.set('user', JSON.stringify(user));
      emptyCart();
      navigate("/dashboard", { replace: true, state: { loginSuccess: true } })
      
      
    } catch (err) {
      if (err?.response) {
        console.log("Error: Response=")
      } else if (err.reponse?.status === 400) {
        console.log("Error:400")
      } else if (err.response?.status === 401) {
        console.log("Error:401")
      } else {
        console.log("Error:" + err)
      }
    }
  }

  return (
    <>
      <div className="hero min-h-screen" style={{ backgroundImage: 'url(' + img_traffic + ')' }}>
        <div className="hero-overlay bg-opacity-80"></div>

        <div className="hero-content text-center text-neutral-content">
          {
            loginClicked ? (
              <div className="card flex-shrink-0 w-full max-w-sm shadow-lg bg-base-100">
                <form className="card-body" onSubmit={loginSubmit}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered" required />
                  </div>
                  <div className="form-control mt-6">
                    <input className='btn btn-primary' type= "submit" value="Login" />
                  </div>
                </form>
              </div>
            ) : (
              <div className="max-w-md">
               
              <h1 className="mb-5 text-5xl">Welcome to Eventurado!</h1>
              <p className="mb-5 text-xl">Uncover, Connect, Create, and Venture into events that defy your wildest expectations.</p>
                <button className="btn btn-primary" onClick={onClickShowSignUp}>Get Started</button>
              </div>
            )
          }
          {showSignUp && (
            <>
              <Signup />
            </>
          )}

        </div >
      </div >
      <div className="hero min-h-fit bg-base-200">
        <div className="flex flex-col lg:flex-row m-10">
          <img src={img_kid} className="w-full lg:w-[420px] rounded-lg shadow-2xl mb-4 lg:mb-0" alt="Event Image" />
          <div className='flex flex-col w-full lg:w-[780px] items-center justify-center'>
            <h1 className="p-3 text-3xl lg:text-5xl text-center">Explore Unforgettable Events!</h1>
            <p className="p-6 text-center">Immerse yourself in the extraordinary as you ignite new memories and unleash your adventures. Explore a world where every moment is a chance to create unforgettable experiences, where discovery knows no bounds. From captivating events to exhilarating escapades, Eventurado invites you to embark on a journey where the extraordinary becomes the norm, and each step is a leap into the extraordinary.</p>
            <NavLink className="btn btn-primary w-full lg:w-auto" end to="/events">Browse</NavLink>
          </div>
        </div>
      </div>
      <div className="hero min-h-fit bg-base-200">
        <div className="flex flex-col w-full">
          <div className="grid h-32 bg-base-300 place-items-center">
              <div className="join">
                  <div>
                      <div>
                      <input className="input input-bordered w-full sm:w-64 md:w-80 lg:w-96 xl:w-120 join-item" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                      </div>
                  </div>
                
                  <div className="indicator">
                      <button className="btn join-item" onClick={handleSearch}>Search</button>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <div className="hero min-h-fit bg-base-200">
        <div className="flex flex-col m-10 lg:flex-row-reverse">
        <img src={img_marathon} className="w-full lg:w-[420px] rounded-lg shadow-2xl" alt="Marathon Image" />
          <div className='flex flex-col w-full lg:w-[780px] items-center justify-center mb-4 lg:mb-0'>
            <h1 className="p-3 text-3xl lg:text-5xl text-center">Contact Us!</h1>
            <p className="p-6 text-center">Whether you have questions, ideas, or just want to say hello, we'd love to hear from you! Feel free to reach out to us for anything you need assistance with.</p>
            <NavLink className="btn btn-primary w-full lg:w-auto" end to="/contact">Contact us</NavLink>
          </div>
          
        </div>


      </div>
    </>
  )
}

export default Home