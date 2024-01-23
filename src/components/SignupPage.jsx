import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { useCart } from './CartContext'

const SignupPage = () => {
    
    const {cartItems, emptyCart, isItemInCart} = useCart();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        contact_no: '',
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
            return;
        }
        try {
            const registerResponse = await axios.post('/register',  
            JSON.stringify({ 
                first_name: formData.first_name,
                last_name: formData.last_name,
                contact_no: formData.contact_no,
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
            if(cartItems.length > 0){
                // Map through cart items to create an array of promises for bulk insertion
                const bulkInsertRequests = cartItems.map(cartItem => {
                    return axios.post('/event_attendees/bulk',  {
                        user_id: registerResponse.data.user.id,
                        event_id: cartItem.event_id,
                      },{
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ` + registerResponse.data.token
                        }
                    }
                    );
                });

                // Execute all bulk insert requests concurrently using Promise.all
                const bulkInsertResponses = await Promise.all(bulkInsertRequests);

            }

            
            emptyCart();
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
    <div className="hero min-h-screen bg-base-200">
        <div className="container">
            <div className="max-w-screen-md mx-auto">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-lg bg-base-100 mx-auto">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={signupSubmit}>
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text">First Name</span>
                            </label>
                            <input type="text" placeholder="First Name" onChange={handleSignupChange} name="first_name" value={formData.first_name} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" placeholder="Last Name" onChange={handleSignupChange} name="last_name" value={formData.last_name} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text">Contact Number</span>
                            </label>
                            <input type="text" placeholder="Contact Number" onChange={handleSignupChange} name="contact_no" value={formData.contact_no} className="input input-bordered" required />
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
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignupPage