import React from 'react'
import Header from '../components/Header'
import SignupSignIn from '../components/SignupSignin'
import '../App.css'

const Signup = () => {
  return (
    <div>
        <Header />
        <div className="wrapper">
           <SignupSignIn />
        </div>
    </div>
  )
}

export default Signup 