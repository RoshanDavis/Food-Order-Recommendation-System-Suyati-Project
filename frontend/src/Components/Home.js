import React from 'react'
import Navbar from './Navbar'
import './Home.css'
import Signup from './Signup'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <nav>
            <Navbar/>
        </nav>
        <body className='home-body'>
            <div className='text-container'>
                <h1>
                    Order your favorite food with us.
                </h1>
                <div>
                    <h2>Restaurants in your pocket</h2>
                    <p>Order from your favorite restaurants with the all-new Foodiko app.</p>
                </div>
            </div>
            <img src={require('../Assets/Home-Page-Food.png')} alt="" />
        </body>
    </div>
  )
}

export default Home
