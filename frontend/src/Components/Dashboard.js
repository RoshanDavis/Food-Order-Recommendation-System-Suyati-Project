import React,{useState} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import './Dashboard.css'
import ProductSlider from './ProductSlider'
import recommended from'./ProductSliderTestData'
import popular from './ProductSliderTestData'
import offers from './ProductSliderTestData'
import SearchBar from './SearchBar'


const Dashboard = () => {

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  }

  return (
    <div className='dashboard'>
        <nav>
            <Navbar2/>
        </nav>
        <body className='dashboard-body'>

            <div className="bg-img position-relative d-flex justify-content-center">
              <div className="fg-content d-flex flex-column justify-content-center align-items-center gap-5 ">
                <h1 className>Satisfy your cravings</h1> 
                <SearchBar onSearchResults={handleSearchResults} />
              </div>
            </div>
            {searchResults.length > 0 &&
              <div className="container pb-5">
                <h2 className='pt-5'>Search Results</h2>
                <div className="container p-0 m-0">
                  {/* {searchResults.map(results => 
                      <li key={results.id}>{results.name}</li>
                    )} */}
                  <ProductSlider data={searchResults}/>
                  {console.log(searchResults)}
                </div>
              </div>
            }

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