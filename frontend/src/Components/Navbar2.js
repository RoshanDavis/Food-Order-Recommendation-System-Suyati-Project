import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar2 = () => {
  return (
    <nav className='navbar'>
        <div className='site-title'>
            <img src={require('../Assets/Icon.png')} alt=""/>
            <a href="/" >Foodiko</a>
        </div> 
        <ul>
            <li className='nav-item'>
                <Link to='/'>Home</Link>
            </li>
            <li className='nav-item'>
                <Link to='/Dashboard'>Dashboard</Link>
            </li>
            <li className='nav-item'>
                <Link to='/Dashboard'>Cart</Link>
            </li>
            <li className='nav-item'>
                <img src={require('../Assets/Profile.png')}  alt="" className='img-fluid w-50'/>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar2