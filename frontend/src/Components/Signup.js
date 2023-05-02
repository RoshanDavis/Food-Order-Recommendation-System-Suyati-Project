import React, { useState } from 'react';
import './Signup.css';
// import { useNavigate } from 'react-router';



export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 


 

  // const Login= ()=>{
  //   const navigate = useNavigate();
  //   const gotoLogin =()=>{
  //     navigate("/login");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    const userdata={ firstName,lastName,email,password};
    console.log(userdata);
    
    fetch('https://localhost:8000',{
      method: 'POST',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify(userdata),
      
    }) //.then(()=>{
    //   console.log('new user added');
     

    // })
    
  }


  return (
    <div className='formbg'>
          <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" onSubmit={handleSubmit}>Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength="8"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          minLength="8"
        />
      
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
      
    </div>

  );
}


