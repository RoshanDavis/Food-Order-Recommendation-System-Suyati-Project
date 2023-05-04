import React from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import './Dashboard.css'
const Dashboard = () => {
  return (
    <div className='dashboard'>
        <nav>
            <Navbar2/>
        </nav>
        <body className='dashboard-body'>
            <div className="bg-img position-relative d-flex justify-content-center">
              <h1 className>Satisfy your cravings</h1> 
            </div>
        </body>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Dashboard