import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { addLoginApi } from '../../services/AppinfoService';
import App from '../../App';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // State to manage the role selection
  const [token, setToken] = useCookies(['mytoken']);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleRegister = async () => {
    try {
      console.log(username, password, role)
      if (username.trim().length !== 0 && password.trim().length !== 0 && role.trim().length !== 0) { 
        await addLoginApi({ username, password, role });
        alert("Register Successfully");
        console.log('Username, password, and role are set');
        setUsername('')
        setPassword('')
        setRole('')

        // handleLogin(); // Log in the user after registration
      } else {
        alert("Username, password, and role are required");
        console.log('Username, password, and role are not set');
      }
    } catch (error) {
      console.log(error);
    }
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
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="alert alert-danger" style={{ marginLeft: '6px' }}>
            <h1 style={{ marginLeft: '400px' }}>Sign Up!</h1>
          </div>
          <br />
          <br />

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
              <p></p>
              <input
                type="password"
                value={password}
                className="form-control"
                placeholder="Enter Password"
                style={{
                  width: 350,
                  border: '1px solid lightgray', // Border color
                  backgroundColor: 'lightyellow', // Background color
                  padding: '8px',
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="lab">Lab</option>
                <option value="researcher">Researcher</option>
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
      </div>
    </div>
  );
}

export default Register;
