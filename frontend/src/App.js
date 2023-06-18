import './App.css';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Restaurant from './Components/Restaurant';
import Cart from './Components/Cart/Cart';


import {BrowserRouter , Route, Routes } from 'react-router-dom';
import Review from './Components/Review';
import Order from './Components/Order';
import Complaint from './Components/Complaint';



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

               <Route path='/Cart' element={<Cart/>}/> 

              <Route path='/Review' element={<Review/>}/>
              <Route path='/Order' element={<Order/>}/>
              <Route path='/Complaint' element={<Complaint/>}/>

            </Routes>
   
          
         
        </div>
        
      </div>
      
      
      </BrowserRouter>

    </div>

  

  );
}

export default App;

