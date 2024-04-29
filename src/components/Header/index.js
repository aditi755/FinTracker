import React from 'react'
import './styles.css'

const Header = () => {
    const logout = () => {
        alert("hi")
    }
  return (
    <div className="navbar"> 
   <p className="logo">FinTracker</p>
   <p onClick={logout} className="logo link">Logout</p>
    </div>
  )
}

export default Header