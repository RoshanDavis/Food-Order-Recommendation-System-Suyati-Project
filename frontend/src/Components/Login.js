// import React,  { useState } from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBCheckbox,
//   MDBIcon
// }
// from 'mdb-react-ui-kit';
// import axios from 'axios';


//     const Login = () => {

//         const [email, setEmail] = useState('');
//         const [password, setPassword] = useState('');
      
//         const [errors, setErrors] = useState({

//           email: '',
//           password: '',
//         });
      
//         const handleInputChange = (event) => {
//           const { name, value } = event.target;
      
//           switch (name) {
//             case 'email':
//               setEmail(value);
//               setErrors({ ...errors, email: '' });
//               break;
//             case 'password':
//               setPassword(value);
//               setErrors({ ...errors, password: '' });
//               break;
//             default:
//               break;
//           }
//         };
      
//         const handleSubmit = (event) => {
//           event.preventDefault();
      
//           // Validation
//           let formErrors = {};
      
//           if (email.trim() === '') {
//             formErrors.email = 'Email is required';
//           } else if (!/\S+@\S+\.\S+/.test(email)) {
//             formErrors.email = 'Email address is invalid';
//           }
      
//           if (password.trim() === '') {
//             formErrors.password = 'Password is required';
//           }
      
//           if (Object.keys(formErrors).length > 0) {
//             setErrors(formErrors);
//             return;
//           }
      
//           // Submit the form
//           axios.post('https://example.com/api/login', { email, password })
//             .then((response) => {
//               console.log(response.data);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         };

//   return (
//     <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

//       <MDBRow>

//         <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

//           <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(0, 100%, 50%)'}}>
//           Discover new flavors, 
// delivered to your door. <br />

//           </h1>

//           <p className='px-3' style={{color: 'hsl(16, 100%, 50%)'}}>
//           We are a one-stop-shop for all your food needs, bringing together the best restaurants and cuisines from around the world.

//           </p>

//         </MDBCol>

//         <MDBCol md='6' className='position-relative'>

//           <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
//           <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

//           <MDBCard className='my-5 bg-glass'>
//             <MDBCardBody className='p-5'>

//             <MDBInput
//                 wrapperClass='mb-4'
//                 label='Email'
//                 id='form3'
//                 type='email'
//                 value={email}
//                 onChange={handleInputChange}
//                 required
//                 error={errors.email}
//                 />
//                 <MDBInput
//                 wrapperClass='mb-4'
//                 label='Password'
//                 id='form4'
//                 type='password'
//                 value={password}
//                 onChange={handleInputChange}
//                  required
//                  error={errors.password}
//                 />

//               <MDBBtn className='w-90 mb-4' size='md'>sign up</MDBBtn>
//             </MDBCardBody>
//           </MDBCard>

//         </MDBCol>

//       </MDBRow>

//     </MDBContainer>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import "./Login.css";
export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const users = [
    {email: "aj@gmail.com", password: "123456789"},
    {email: "aj@gmail.com", password: "123456789"},
    {email: "aj@gmail.com", password: "123456789"}
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {  email, password };
    console.log(userData);

    axios.post('http://127.0.0.1:8000/login/', userData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    const user = users.find((user) => {
        return user.email === email && user.password === password;
      });
  
      if (user) {
        window.location.href = "/Dashboard";
      } else {
        alert("Invalid username or password.");
      }

  };

  return (
    <div className='formbg'>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
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
          <label htmlFor="password">Password</label>
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
