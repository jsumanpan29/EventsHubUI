import React, { useState } from 'react'
import Signup from './Signup'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie'
import { useEventContext } from './EventContext';
import { useCart } from './CartContext'
import img_traffic from '../images/img_traffic.jpg';
import img_kid from '../images/img_kid.jpg';
import img_marathon from '../images/img_marathon.jpg';


const Home = ({ loginClicked }) => {
  const {cartItems, emptyCart, isItemInCart} = useCart();
  const [showSignUp, setShowSignUp] = useState(false)
  const onClickShowSignUp = () => setShowSignUp(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const { events, removeEvent } = useEventContext();
  const navigate = useNavigate()


  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.warn(email,password)
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
      // console.log(JSON.stringify(user))
      Cookies.remove('user')
      Cookies.set('user', JSON.stringify(user));
      emptyCart();
      navigate("/dashboard", { replace: true, state: { loginSuccess: true } })
      // JSON.parse(Cookies.get('user')).user.roles.id == '1' ? navigate("/dashboard", { replace: true, state: { loginSuccess: true } }) : navigate("/dashboard/my_events", { replace: true, state: { loginSuccess: true } });
      
      
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
      {/* <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}> */}
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
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
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
        <div className="flex m-10 flex-col lg:flex-row">
          <img src={img_kid} className="w-[420px] rounded-lg shadow-2xl" />
          <div className='flex flex-col w-[780px] items-center justify-center'>
            <h1 className="p-3 text-5xl">Explore Unforgettable Events!</h1>
            <p className="p-6 text-center">Immerse yourself in the extraordinary as you ignite new memories and unleash your adventures. Explore a world where every moment is a chance to create unforgettable experiences, where discovery knows no bounds. From captivating events to exhilarating escapades, Eventurado invites you to embark on a journey where the extraordinary becomes the norm, and each step is a leap into the extraordinary.</p>
            <button className="btn btn-primary">Browse</button>
          </div>
        </div>
      </div>
      <div className="hero min-h-fit bg-base-200">
        <div className="flex flex-col w-full">
          <div className="grid h-32 bg-base-300 place-items-center">
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
      </div>
      <div className="hero min-h-fit bg-base-200">
        <div className="flex m-10 flex-col lg:flex-row">
          <div className='flex flex-col w-[780px] items-center justify-center'>
              <h1 className="p-3 text-5xl">Contact Us!</h1>
              <p className="p-6 text-center"> Whether you have questions, ideas, or just want to say hello, we'd love to hear from you! Feel free to reach out to us for anything you need assistance with.</p>
              <button className="btn btn-primary">Contact us</button>
          </div>
          <img src={img_marathon} className="w-[420px] rounded-lg shadow-2xl" />
          
        </div>
      </div>
    </>
  )
}

export default Home