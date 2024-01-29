import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { loginUserApi, registerUserApi } from '../../services/AppinfoService'; 
import App from '../../App';
import AIWC_Transparent_Logo from '../../assets/AIWC_Transparent_Logo.png'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  const [isLoggedIn, setLoggedIn] = useState(false);
/*
  useEffect(() => {
    const userToken = token['mytoken'];
    console.log('Login User token is', userToken);

    if (userToken) {
      setLoggedIn(true);
    }
  }, [token]);
*/
  const handleLogin = async () => {
    try {
      if (username.trim().length !== 0 && password.trim().length) {
        console.log('Username And Password Are Set');
        const resp = await loginUserApi({ username, password });
        setToken('mytoken', resp.token);
        setLoggedIn(true);
        
        alert("Login Successfully");
      } else {
        alert("Invalid Credentials");
        console.log('Username And Password Are Not Set');
      }
    } catch (error) {
      console.log(error);
      alert("Unauthorized..!")
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

  // const loginStyle = {
  //   backgroundImage: `url(${process.env.PUBLIC_URL}/assets/AIWC_Transparent_Logo.png)`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   minHeight: '100%', // Fix here
  //   height: '77vh',
  //   backgroundPosition: 'center',
  //   margin: 0,
  // };

  
   
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
      <div className="container-fluid">
        {isLoggedIn ? (
          <App />
        ) : (
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
              {isLoggedIn ? <h3>Register Here</h3> : <h3 style={{ marginLeft: '100px' }}>Login Here</h3>}
              <p></p>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <p></p>
              <input
                type="text"
                value={username}
                className="form-control"
                placeholder="Enter Username"
                style={{ width: 350, 
                  border: '1px solid lightgray', 
                  backgroundColor: 'lightyellow', 
                  padding: '8px', }}
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
                style={{ width: 350, 
                  border: '1px solid lightgray', // Border color
                  backgroundColor: 'lightyellow', // Background color
                  padding: '8px', }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <br />

            <div>
              {isLoggedIn ? (
                <div>
                <button onClick={handleRegister} style={{ marginLeft: '100px' }} className="btn btn-primary">
                  Register
                </button>
                <p>
                  If You Have Account, Please Login Here..
                  <p></p>
                  <button className="btn btn-primary" style={{ marginLeft: '100px' }} onClick={() => setLoggedIn(true)}>
                    Login
                  </button>
                  </p>
              </div>
                
              ) : (
                <div>
                  <button onClick={handleLogin} className="btn btn-primary" style={{ marginLeft: '100px' }}>
                    Login
                  </button>
                  <p></p>
                  <p>
                    If You Don't Have Account, Please Register Here..
                    <p></p>
                    <button onClick={handleRegister} className="btn btn-primary" style={{ marginLeft: '100px' }}>
                      Register
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>

          
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

