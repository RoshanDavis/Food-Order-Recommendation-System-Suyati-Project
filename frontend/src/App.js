import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {BrowserRouter , Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>


        <div className="App">
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          <switch>
            <Routes> 
              {/* <Route exact path="/" component={Home} /> */}
              <Route path="/login" component={Login} />
              <Route path="/Signup" component={Signup} />

            </Routes>
   
          </switch>
          <Home/> 
        </div>
        
      </div>



    </div>

    </BrowserRouter>

  );
}

export default App;

