import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie'

const Login = () => {

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
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
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
                </div>
            </div>
        </div>

    )
}

export default Login