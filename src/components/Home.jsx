import React, { useState } from 'react'
import Signup from './Signup'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie'


const Home = ({ loginClicked }) => {
  const [showSignUp, setShowSignUp] = useState(false)
  const onClickShowSignUp = () => setShowSignUp(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //   const [events, setEvents] = useState([]);
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
      navigate("/dashboard", { replace: true, state: { loginSuccess: true } });
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
      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>

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
                    <input className='btn btn-primary' type="submit" value="Login" />
                  </div>
                </form>
              </div>
            ) : (
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
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
        <div className="hero-content flex-col lg:flex-row">
          <img src="" className="max-w-sm h-96 w-96 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="hero min-h-fit bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="" className="max-w-sm h-96 w-96 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home