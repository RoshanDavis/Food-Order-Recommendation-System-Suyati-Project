import React from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import './Dashboard.css'
import ProductSlider from './ProductSlider'
import recommended from'./ProductSliderTestData'
import popular from './ProductSliderTestData'
import offers from './ProductSliderTestData'
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

            <div className="container pb-5">
              <h2 className='pt-5'>Recommended for you</h2>
              <div className="container p-0 m-0">
                <ProductSlider data={recommended}/>
              </div>
            </div>

            <div className="container pb-5">
              <h2 className='pt-5'>Popular</h2>
              <div className="container p-0 m-0">
                <ProductSlider data={popular}/>
              </div>
            </div>

            <div className="container pb-5">
              <h2 className='pt-5'>Special Offers</h2>
              <div className="container p-0 m-0">
                <ProductSlider data={offers}/>
              </div>
            </div>

        </body>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Dashboard