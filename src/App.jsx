import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import Nav from './components/Nav';
import {Route, Routes, useNavigate, Link}  from 'react-router-dom'
import Events from './components/Events';
import Event from './components/Event'
import Contact from './components/Contact';
import Missing from './components/Missing';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import { EventProvider } from './components/EventContext';
import axios from '../api/axios'
import Cookies from 'js-cookie'
import NotAuth from './components/NotAuth';



function App() {
  const [loginClicked, setLoginClicked] = useState(false);
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
// //   const [events, setEvents] = useState([]);
//   const navigate = useNavigate()


//   const loginSubmit = async(e) => {
//       e.preventDefault()
//       try {
//           // console.warn(email,password)
//           const response = await axios.post('/login',
//           JSON.stringify({ email, password }),
//           {
//               headers:
//               {
//                   'Content-Type': 'application/json',
//               },
//           },
//       );
//           const user = response?.data;
//           console.log(JSON.stringify(user))
//           Cookies.remove('user')
//           Cookies.set('user', JSON.stringify(user));
//           navigate("/", { replace: true, state: { loginSuccess: true } });
//       } catch (err) {
//           if (err?.response) {
//               console.log("Error: Response=")
//           } else if (err.reponse?.status === 400) {
//               console.log("Error:400")
//           } else if (err.response?.status === 401) {
//               console.log("Error:401")
//           } else {
//               console.log("Error:"+err)
//           }
//       }
//     }
  return (
    <EventProvider>
    <div className="App">
      <Nav setLoginClicked={setLoginClicked} />
      <Routes>
        <Route path="/" element={<Home loginClicked={loginClicked}  />} />
        {/* <Route path='/dashboard'>
            <Route index element={<Dashboard /> }/>
            <Route path="/account" element={<Account />} />
        </Route> */}
        <Route path='/dashboard/*' element={<Dashboard />} />
          {/* <Route index element={<Dashboard />} /> */}
          {/* <Route path="account" element={<Account />} /> */}
        {/* </Route> */}

        <Route path="/events">
          <Route index element={<Events
          />}/>
          <Route path=":id" element={<Event 
                />} />
        </Route>
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/login" element={<Login
          />} /> 
        <Route path="*" element={<Missing />} /> 
      </Routes>
      <Footer />
    </div>
    </EventProvider>
  );
}

export default App;
