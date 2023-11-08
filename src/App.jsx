import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import Nav from './components/Nav';
import {Route, Routes, useNavigate}  from 'react-router-dom'
import Events from './components/Events';
import Contact from './components/Contact';
import Missing from './components/Missing';
import Login from './components/Login';


function App() {
  // const [showSignUp, setShowSignUp] = useState(false)
  // const onClickShowSignUp = () => setShowSignUp(true)
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const navigate = useNavigate()

  // const loginSubmit = async(e) => {
  //     e.preventDefault()
  //     try {
  //         // console.warn(email,password)
  //         const response = await axios.post('/login',
  //         JSON.stringify({ email, password }),
  //         {
  //             headers:
  //             {
  //                 'Content-Type': 'application/json',
  //             },
  //         },
  //     );
  //         const user = response?.data;
  //         Cookies.remove('user')
  //         Cookies.set('user', user);
  //         navigate("/", { replace: true, state: { loginSuccess: true } });
  //     } catch (err) {
  //         if (err?.response) {
  //             console.log("Error: Response=")
  //         } else if (err.reponse?.status === 400) {
  //             console.log("Error:400")
  //         } else if (err.response?.status === 401) {
  //             console.log("Error:401")
  //         } else {
  //             console.log("Error:"+err)
  //         }
  //     }

  // }
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="*" element={<Missing />} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
