import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { addLoginApi, addEmpRegApi } from '../../services/AppinfoService';
import App from '../../App';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // State to manage the role selection
  const [token, setToken] = useCookies(['mytoken']);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility


  const handleRegister = () => {
    console.log(username, password, role);
    if (username.trim().length !== 0 && password.trim().length !== 0 && role.trim().length !== 0) {
      const requestData = {
        user_name: username,  // Change 'username' to 'user_name'
        password,
        role,
      };
        
      const empData = {
        user_name: username,
        role
      }
      addEmpRegApi(empData)
      .then(result => {
        console.log('Emp Details Addes');
      })
      .catch(error => {
        console.log("Failed to Add Employee", error);
      });
  
      addLoginApi(requestData)
        .then(result => {
          alert("Register Successfully");
          console.log('Username, password, and role are set');
          setUsername('');
          setPassword('');
          setRole('');
        })
        .catch(error => {
          console.log("Failed to register", error);
          alert("Failed to Register");
          setUsername('');
          setPassword('');
          setRole('');
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const loginStyle = {
    minHeight: '100%',
    height: '77vh',
    margin: 0,
    display: 'flex',
    width: '600px',
  };

  const rightSideStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '100px',
    padingTop: '100px',
    padingRight: '50px', // Adjust the spacing between the logo and other content
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    float: 'left',
  };

  return (
    <div >
      <div style={{background: "lightpink", height: '70px'}} className="header">
        <h2 style={{ textAlign: 'center', paddingTop: '15px' }} >SIGN UP!</h2>
      </div>
      <p></p>

          <div className="col-sm-4" style={rightSideStyle}>
            <h3>Register Here</h3>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <p></p>
              <input
                type="text"
                value={username}
                className="form-control"
                placeholder="Enter Username"
                style={{
                  width: 350,
                  border: '1px solid lightgray',
                  backgroundColor: 'lightyellow',
                  padding: '8px',
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <p></p>

           
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative', width: 350 }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  className="form-control"
                  placeholder="Enter Password"
                  style={{
                    width: '100%',
                    border: '1px solid lightgray',
                    backgroundColor: 'lightyellow',
                    padding: '8px',
                    paddingRight: '30px', // Adjust for the width of the eye icon button
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <p></p>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: 350,
                  border: '1px solid lightgray', // Border color
                  backgroundColor: 'lightyellow', // Background color
                  padding: '8px',
                }}
              >
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Lab Assistant">Lab Assistant</option>
                <option value="Researcher">Researcher</option>
              </select>
            </div>

            <br />

            <div>
              <button onClick={handleRegister} style={{ marginLeft: '100px' }} className="btn btn-primary">
                Register
              </button>
            </div>
      </div>
    </div>
  );
}

export default Register;
