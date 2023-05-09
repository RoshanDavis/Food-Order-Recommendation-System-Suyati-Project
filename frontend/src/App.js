import './App.css';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
// import Login from './Components/Login';
import Signup from './Components/Signup';
import {BrowserRouter , Route, Routes} from 'react-router-dom';

import Restaurant from './Components/Restaurant';
function App() {
  return (
    <BrowserRouter>


        <div className="App">
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          
            <Routes> 
              <Route exact path="/" element={<Home />} />
              {/* <Route path="/login" component={<Login} /> */}
              <Route path="/Signup" element={<Signup />} />
              <Route path='/Dashboard' element={<Dashboard/>}/>
              <Route path='/Restaurant' element={<Restaurant/>}/>
            </Routes>
   
          
         
        </div>
        
      </div>



    </div>

    </BrowserRouter>

  );
}

export default App;

