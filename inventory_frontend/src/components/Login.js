import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { loginUserApi, registerUserApi } from '../services/AppinfoService';  
import App from '../App';

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
        alert("Login Successfully");
        console.log('Username And Password Are Set');
        const resp = await loginUserApi({ username, password });
        setToken('mytoken', resp.token);
        setLoggedIn(true);
      } else {
        alert("Invalid Credentials");
        console.log('Username And Password Are Not Set');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    try {
      if (username.trim().length !== 0 && password.trim().length !== 0) {
        alert("Register Successfully");
        console.log('Username and password are set');
        await registerUserApi({ username, password });
        handleLogin(); // Log in the user after registration
      } else {
        alert("Username and password are not Register");
        console.log('Username and password are not set');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "img/18.jpg"})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100%', // Fix here
    height: '77vh',
    backgroundPosition: 'center',
    margin: 0,
  };

  return (
    <div className="App">
      <div className="container-fluid">
        {isLoggedIn ? (
          <App />
        ) : (

        <div className="row">
          <h1 className="alert alert-danger">WELCOME</h1>
          <br />
          <br />

          <div className="col-sm-4">
            {isLoggedIn ? <h3>Login Here</h3> : <h3>Register Here</h3>}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={username}
                className="form-control"
                placeholder="Enter Username"
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <br />

            <div>
              {isLoggedIn ? (
                <div>
                  <button onClick={handleLogin} className="btn btn-primary">
                    Login
                  </button>
                  <p>
                    If You Don't Have Account, Please
                    <button onClick={() => setLoggedIn(false)} className="btn btn-primary">
                      Register
                    </button>
                  </p>
                </div>
              ) : (
                <div>
                  <button onClick={handleRegister} className="btn btn-primary">
                    Register
                  </button>
                  <p>
                    If You Have Account, Please{' '}
                    <button className="btn btn-primary" onClick={() => setLoggedIn(true)}>
                      Login
                    </button>
                    </p>
                </div>
              )}
            </div>
          </div>

            <div className="col-sm-8 full-img" style={loginStyle}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

