import './App.css';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Restaurant from './Components/Restaurant';





import {BrowserRouter , Route, Routes } from 'react-router-dom';
import Review from './Components/Review';
import Order from './Components/Order';
import Complaint from './Components/Complaint';
import Terms from './Components/FooterPages/Terms';
import Privacy from './Components/FooterPages/Privacy';
import Security from './Components/FooterPages/Security';
import About from './Components/FooterPages/About';
import Team from './Components/FooterPages/Team';
import FAQ from './Components/FooterPages/FAQ';
function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          
            <Routes> 
              <Route exact path="/" element={<Home />} />

              <Route path="/Login" element={<Login />} />

              <Route path="/Signup" element={<Signup />} />
              <Route path='/Dashboard' element={<Dashboard/>}/>
              <Route path='/Restaurant' element={<Restaurant/>}/>
              <Route path='/Review' element={<Review/>}/>
              <Route path='/Order' element={<Order/>}/>
              <Route path='/Complaint' element={<Complaint/>}/>
              <Route path='/Terms' element={<Terms/>}/>
              <Route path='/Privacy' element={<Privacy/>}/>
              <Route path='/Security' element={<Security/>}/>
              <Route path='/About' element={<About/>}/>
              <Route path='/Team' element={<Team/>}/>
              <Route path='/FAQ' element={<FAQ/>}/>
            </Routes>
   
          
         
        </div>
        
      </div>
      
      
      </BrowserRouter>

    </div>

  

  );
}

export default App;

