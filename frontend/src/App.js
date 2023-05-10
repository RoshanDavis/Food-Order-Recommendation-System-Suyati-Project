import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';




import {BrowserRouter , Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          
            <Routes> 
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
             
            
             

            </Routes>
   
          
         
        </div>
        
      </div>
      
      
      </BrowserRouter>

    </div>

  

  );
}

export default App;

