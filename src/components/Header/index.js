import React , {useState, useEffect } from 'react'
import './styles.css'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import UserImg from '../../assets/user.svg'
const Header = () => {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user){   //if user exist then directly take to dashboard no need to signup/in again and again
      navigate('/dashboard')
    }
  }, [user, loading])

    const logout = () => {
      try{
        signOut(auth)
        .then(() => {
          toast.success("Logged out successful")
          navigate('/')
        })
      }
      catch(error){
         toast.error(error.meggage)
      }
    }
    
  return (
    <div className="navbar"> 
   <p className="logo">FinTracker</p>
   {user && (<div style={{display: "flex", alignItmes: "center", gap: "0.5rem"}} >
  <img src={user.photoURL ? user.photoURL : user } height="2rem" width="2rem"   />
   </div>)}
   <p onClick={logout} className="logo link">Logout</p>
    </div>
  )
}

export default Header