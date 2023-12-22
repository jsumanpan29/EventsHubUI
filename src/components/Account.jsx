import React,{useEffect,useState} from 'react'
import Cookies from 'js-cookie';
import axios from '../../api/axios'
import { useUserContext } from './UserContext';

const Account = () => {
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     contact_no: '',
//     email: '',
//     password: '',
//     passwordConfirm: ''
//     // role_id: ''
// });
  const { setCookie } = useUserContext(); 
  const [editAccount, onEditAccount] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [error, setError] = useState('')
  
//   useEffect(() => {
//   try {
//     const userData = JSON.parse(Cookies.get('user'));
//     console.log(userData)
//     if (userData) {
//       setFormData({
//         first_name: userData.first_name,
//         last_name: userData.last_name,
//         contact_no: userData.contact_no,
//         email: userData.email,
//         password: '',
//         passwordConfirm: ''
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching user data from cookies:', error);
//   }
// }, [])
useEffect(() => {
  try {
    const userData = JSON.parse(Cookies.get('user'));
    // console.log(JSON.stringify(userData))
    // console.log(userData.token)
    if (userData) {
      setFirstName(userData.user.first_name)
      setLastName(userData.user.last_name)
      setContactNo(userData.user.contact_no)
      setEmail(userData.user.email)
    }
  } catch (error) {
    console.error('Error fetching user data from cookies:', error);
  }
}, [editAccount])
  // const handleSignupChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleEditAccount = (e) => {
    e.preventDefault()
    onEditAccount(true)
  }

const userSubmit = async(e) => {
  e.preventDefault()

    // Handle editing existing user logic using editingUserId
    // Example: Update the user's details
    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      // console.log('Passwords do not match.')
      return;
    }
    try {
      // console.warn(email,password)
        const response = await axios.post('/users/'+JSON.parse(Cookies.get('user')).user.id+'/update',  
        JSON.stringify({ 
            first_name: firstName,
            last_name: lastName,
            contact_no: contactNo,
            password: password,
            password_confirmation: passwordConfirm,
            // role_id: formData.role_id
        }),
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                },
            },
        );
    
        console.log('User Updated successfully:', response.data);
        // add_user.close()
        onEditAccount(false)
        // console.log('{"user":'+JSON.stringify(response.data.user)+',"token":'+'"'+JSON.parse(Cookies.get('user')).token+'"}')
        // Cookies.set('user', '{"user":'+JSON.stringify(response.data.user)+',"token":'+'"'+JSON.parse(Cookies.get('user')).token+'"}');
        setCookie('user', '{"user":'+JSON.stringify(response.data.user)+',"token":'+'"'+JSON.parse(Cookies.get('user')).token+'"}')

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
                  <a className="btn" onClick={handleEditAccount} disabled={editAccount === true? true: false}>
                     Edit
                  </a>
             </div>
            </div>
            <div className='col-span-1'>
              <div class="overflow-x-auto">
              <form className="card-body" onSubmit={userSubmit}>
              {/* onSubmit={userSubmit}> */}
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">First Name</span>
                    </label>
                    <input type="text" placeholder="First Name"  name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)}  className="input input-bordered" required disabled={editAccount === true ? false: true}/>
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Last Name</span>
                    </label>
                    <input type="text" placeholder="Last Name"  name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered" required disabled={editAccount === true ? false: true}/>
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Contact Number</span>
                    </label>
                    <input type="text" placeholder="Contact Number"  name="contact_no" value={contactNo} onChange={(e) => setContactNo(e.target.value)} className="input input-bordered" required disabled={editAccount === true ? false: true}/>
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email"  name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered" required disabled={editAccount === true ? false: true}/>
                </div>
                {
                  editAccount === true ?
                  <>
                  <div className="form-control">
                      <label className="label">
                      <span className="label-text">Password</span>
                      </label>
                      <input type="password" placeholder="Password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered" required disabled={editAccount === true ? false: true}/>
                  </div>
                  <div className="form-control">
                      <label className="label">
                      <span className="label-text">Confirm Password</span>
                      </label>
                      <input type="password" placeholder="Confirm Password"  name="passwordConfirm"  value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="input input-bordered" required disabled={editAccount === true ? false: true}/>
                  </div>
                  </>
                  :
                  <>
                  
                  </>

                }
                
                <div className="form mt-6">
                    <input className={editAccount === true ? 'btn btn-primary btn-wide': 'btn btn-primary btn-wide btn-disabled' } type="submit" value="Save" />
                </div>
              </form>
              </div>
             
            </div>
        </div>
  )
}

export default Account