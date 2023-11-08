import React, { useState } from 'react'
import Signup from './Signup'


const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false)
  const onClickShowSignUp = () => setShowSignUp(true)

  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
    <div className="hero-overlay bg-opacity-60"></div>

    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        <button className="btn btn-primary" onClick={onClickShowSignUp}>Get Started</button>
      </div>
      { showSignUp && (
        <>
         <Signup />
        </>
      ) }
      
    </div>
  </div>
  )
}

export default Home