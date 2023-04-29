import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='site-title'>
            <img src={require('../Assets/Icon.png')} alt=""/>
            <a href="/" >Foodiko</a>
        </div> 
        <ul>
            <li>
                <a href="/Login">Login</a>
            </li>
            <li>
                <a href="/Sign-Up">Sign Up</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar