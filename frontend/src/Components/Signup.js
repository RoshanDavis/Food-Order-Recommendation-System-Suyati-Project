import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { firstName, lastName, email, password };
    console.log(userData);

    axios.post('http://localhost:8000/api/signup/', userData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

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


///referrence code
// import React, { useState } from 'react';
// import axios from 'axios';

// function SignupForm() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     first_name: '',
//     last_name: '',
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios.post('http://localhost:8000/api/signup/', formData)
//       .then(response => {
//         console.log(response.data);
//         // do something with the response data
//       })
//       .catch(error => {
//         console.error(error);
//         // handle the error
//       });
//   }

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
//       </label>
//       <br />
//       <label>
//         First Name:
//         <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
//       </label>
//       <br />
//       <label>
//         Last Name:
//         <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
//       </label>
//       <br />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

// export default SignupForm;


//////////////////////MAIN  












// import React, { useState } from 'react';
// import './Signup.css';
// import axios from 'axios';
// // import { useNavigate } from 'react-router';



// export default function Signup() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
 

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // handle form submission here
//     const userdata = { firstName, lastName, email, password };
//     console.log(userdata);
  
//     axios.post('https://localhost:8000/register', userdata)
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
 
    
//   };


//   return (
//     <div className='formbg'>
//           <form onSubmit={handleSubmit}>
//       <h3>Sign Up</h3>
//       <div className="form-group">
//         <label htmlFor="firstName">First Name</label>
//         <input
//           type="text"
//           className="form-control"
//           id="firstName"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           placeholder="First Name"
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="lastName">Last Name</label>
//         <input
//           type="text"
//           className="form-control"
//           id="lastName"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           placeholder="Last Name"
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           className="form-control"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="password" onSubmit={handleSubmit}>Password</label>
//         <input
//           type="password"
//           className="form-control"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//           minLength="8"
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="confirmPassword">Confirm Password</label>
//         <input
//           type="password"
//           className="form-control"
//           id="confirmPassword"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm Password"
//           required
//           minLength="8"
//         />
      
//       </div>
//       <button type="submit" className="btn btn-primary">
//         Sign Up
//       </button>
//     </form>
      
//     </div>

//     );
  











    // Just tried with these, TO BE IGNORED-------------------------------
    /* 
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

    axios.post('https://localhost:8000/register',data).then(
      res => {
        console.log(res);
      }
    ).catch(
      err =>{
        console.log(err);
      }
    )


    
    // fetch('https://localhost:8000',{
    //   method: 'POST',
    //   headers:{ 'Content-Type': 'application/json'},
    //   body: JSON.stringify(userdata),
      
    } //) //.then(()=>{
    //   console.log('new user added');
     

    // }) */
