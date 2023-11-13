import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const signupSubmit = async(e) => {
        e.preventDefault()

        if (formData.password !== formData.passwordConfirm) {
            setError('Passwords do not match.');
            // console.log('Passwords do not match.')
            return;
        }
        try {
            // console.warn(email,password)
            const response = await axios.post('/register',  
            JSON.stringify({ 
                name: formData.name,
                email: formData.email, 
                password: formData.password,
                password_confirmation: formData.passwordConfirm
            }),
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                    },
                },
            );
        
            console.log('Registration successful:', response.data);
            navigate("/login", { replace: true});
        } catch (err) {
            if (err?.response) {
                console.log("Error: Response=")
            } else if (err.reponse?.status === 400) {
                console.log("Error:400")
            } else if (err.response?.status === 401) {
                console.log("Error:401")
            } else {
                console.log("Error:"+err)
            }
        }

    }
  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={signupSubmit}>
        <div className="form-control">
            <label className="label">
            <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Name" onChange={handleSignupChange} name="name" value={formData.name} className="input input-bordered" required />
        </div>
        <div className="form-control">
            <label className="label">
            <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Email" onChange={handleSignupChange} name="email" value={formData.email} className="input input-bordered" required />
        </div>
        <div className="form-control">
            <label className="label">
            <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Password" onChange={handleSignupChange} name="password" value={formData.password} className="input input-bordered" required />
        </div>
        <div className="form-control">
            <label className="label">
            <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" placeholder="Confirm Password" onChange={handleSignupChange} name="passwordConfirm" value={formData.passwordConfirm} className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
            <input className='btn btn-primary' type="submit" value="Submit" />
        </div>
        </form>
    </div>
  )
}

export default Signup