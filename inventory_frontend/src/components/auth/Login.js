import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getLoginApi, registerUserApi } from '../../services/AppinfoService';
import AIWC_Transparent_Logo from '../../assets/AIWC_Transparent_Logo.png';
import AdminApp from '../../AdminApp';
import ManagerApp from '../../ManagerApp';
import LabApp from '../../LabApp';
import ResearcherApp from '../../ResearcherApp';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = async () => {
    try {
      getLoginApi()
        .then((response) => {
          console.log('API Response:', response);

          // Check if there is at least one request in the array
          if (response.length > 0) {
            let found = false;

            for (let i = 0; i < response.length; i++) {
              const user = response[i];

              // Check if the current user meets all conditions
              if (user.user_name === username && user.password === password) {
                found = true;
                setLoggedIn(true);
                setUserRole(user.role);
                break; // Exit the loop once a matching user is found
              }
            }

            if (!found) {
              alert('Invalid Credentials');
            }
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Unauthorized..!');
        });
    } catch (error) {
      console.log(error);
      alert('Unauthorized..!');
    }
  };


  const handleRegister = async () => {
    try {
      if (username.trim().length !== 0 && password.trim().length !== 0) {
        alert("Register Successfully");
        console.log('Username and password are set');
        await registerUserApi({ username, password });
        // handleLogin(); // Log in the user after registration
      } else {
        alert("Username and password are not Register");
        console.log('Username and password are not set');
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
    width: '500px',
  };
  
  const leftSideStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: '20px', 
    padingTop: '10px', // Adjust the spacing between the logo and other content
  };
  
  const rightSideStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '20px',
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
      {isLoggedIn ? (
        (() => {
          console.log('Inside isLoggedIn block');
          switch (userRole) {
            case 'Admin':
              console.log('Rendering AdminApp');
              return <AdminApp />;
            case 'Manager':
              return <ManagerApp />;
            case 'Lab Assistant':
              return <LabApp />;
            case 'Researcher':
              return <ResearcherApp />;
            default:
              // Display an alert for unexpected userRole
              alert('Something went wrong. Please contact support.');
              setLoggedIn(false)
              return <Login />; // or any other appropriate fallback
          }
        })()
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="alert alert-danger">
                <h1 style={{ marginLeft: '300px' }}>WELCOME TO INVENTORY CONTROL!</h1>
              </div>
              <br />
              <br />
              <div className="col-sm-8 full-img" style={loginStyle}>
                <div style={leftSideStyle}>
                  <img src={AIWC_Transparent_Logo} alt="Logo" style={imageStyle} />
                </div>
              </div>

              <div className="col-sm-4" style={rightSideStyle}>
                <h3 style={{ marginLeft: '100px' }}>Login Here</h3>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    value={username}
                    className="form-control"
                    placeholder="Enter Username"
                    style={{ width: 350, border: '1px solid lightgray', backgroundColor: 'lightyellow', padding: '8px' }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    value={password}
                    className="form-control"
                    placeholder="Enter Password"
                    style={{ width: 350, border: '1px solid lightgray', backgroundColor: 'lightyellow', padding: '8px' }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p></p>

                <div>
                  <button onClick={handleLogin} className="btn btn-primary" style={{ marginLeft: '270px' }}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
