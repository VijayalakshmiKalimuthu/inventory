import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LoginUser, RegisterUser } from '../services/AppinfoService';  
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);

  useEffect(() => {
    var userToken = token['mytoken'];
    console.log('Login User token is', userToken);
    console.log('Data type', typeof token['mytoken']);

    if (String(userToken) === 'undefined') {
      navigate('/');
    } else {
      navigate('/home');
    }
  }, [token, navigate]); // Add 'navigate' to the dependency array

  const handleLogin = () => {
    if (username.trim().length !== 0 && password.trim().length) {
      console.log('Username And Password Are Set');
      LoginUser({ username, password })
        .then((resp) => {
          setToken('mytoken', resp.token);
          navigate('/home');
        })
        .catch((error) => console.log(error));
    } else {
      console.log('Username And Password Are Not Set');
      navigate('/');
    }
  };

  const handleRegister = () => {
    if (username.trim().length !== 0 && password.trim().length !== 0) {
      console.log('Username and password are set');
      RegisterUser({ username, password })
        .then(() => handleLogin())
        .catch((error) => console.log(error));
    } else {
      navigate('/');
      console.log('Username and password are not set');
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
        <div className="row">
          <h1 className="alert alert-danger">WELCOME</h1>
          <br />
          <br />

          <div className="col-sm-4">
            {isLogin ? <h3>Login Here</h3> : <h3>Register Here</h3>}
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
              {isLogin ? (
                <div>
                  <button onClick={handleLogin} className="btn btn-primary">
                    Login
                  </button>
                  <p>
                    If You Don't Have Account, Please
                    <button onClick={() => setLogin(false)} className="btn btn-primary">
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
                    <button className="btn btn-primary" onClick={() => setLogin(true)}>
                      Login
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="col-sm-8 full-img" style={loginStyle}></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
