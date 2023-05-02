import React from 'react'
import './Navbar.css'
import Signup from './Signup'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='site-title'>
            <img src={require('../Assets/Icon.png')} alt=""/>
            <a href="/" >Foodiko</a>
        </div> 
        <ul>
            <li className='nav-item'>
                <Link to='/Login'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link to='/Signup'>Sign Up</Link>
            </li>
          
        </ul>
    </nav>
  )
}

export default Navbar