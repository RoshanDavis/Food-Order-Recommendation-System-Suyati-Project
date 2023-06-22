
// import React, { useState } from 'react';
// import './Login.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// export default function Login() {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const Navigate = useNavigate();

//   const users = [
    
//     // {email: "aj@gmail.com", password: "123456789"},
//     // {email: "aj@gmail.com", password: "123456789"},
//     // {email: "aj@gmail.com", password: "123456789"}
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = {  email, password };
//     console.log(userData);

//     axios.post('http://127.0.0.1:8000/login/', userData)
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     const user = users.find((user) => {
//         return user.email === email && user.password === password;
//       });
  
//       if (user) {
//         Navigate("/Dashboard");
//       } else {
//         alert("Invalid username or password.");
//       }

//   };

//   return (
//     <div className='formlbg'>
//       <form onSubmit={handleSubmit}>
//         <h3>Login</h3>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             minLength="8"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log(userData);


  axios.post('http://127.0.0.1:8000/login/',{ "email": email, "password": password })
  .then((response) => {
    if (response.data.success) {
     window.location.href = '/Dashboard/';
    } else {
      alert('User does not exist');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  };
  return (
    <div className='formlbg'>
      <form className='formlogin' onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="form-group">
          <label className='labellogin' htmlFor="email">Email</label>
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
          <label className='labellogin' htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength="4"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}