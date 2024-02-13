import React, { useState, useEffect } from 'react';
import { updateLoginApi, getLoginApi } from '../../services/AppinfoService';

function PasswordReset() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userOptions, setUserOptions] = useState([]);
  const [resetStatus, setResetStatus] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    fetchUserOptions();
  }, []);

  const fetchUserOptions = async () => {
    try {
      const users = await getLoginApi();
      setUserOptions(users.map(user => user.user_name));
    } catch (error) {
      console.error('Error fetching user options:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      // Check if the username exists before attempting to reset the password
      const userExists = userOptions.includes(username);

      if (userExists) {
        // User found, proceed to reset the password
        await updateLoginApi(username, { user_name: username, password });
        setResetStatus('Password reset successfully!');
        setUsername('')
        setPassword('')
        alert('Password reset successfully!')
      } else {
        // User not found
        setResetStatus('Username not found. Password reset failed.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetStatus('An error occurred while resetting the password.');
    }
  };

  return (
    <div>
        <div className='header' style={{ backgroundColor: 'lightpink', height: '70px' }}>
            <h1 style={{ textAlign: 'center', paddingTop: '15px' }}>Password Reset</h1>
        </div>
        <p></p>
        <div className='container' style={{ marginLeft: '450px' }}>
            <label htmlFor="username" style={{ fontWeight: 'bold' }}>Username</label>
            <br/>
            <select
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                  width: 350,
                  border: '1px solid lightgray',
                  backgroundColor: 'lightyellow',
                  padding: '8px',
                }}
            >
              <option value="">Select Username</option>
              {userOptions.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <p></p>
            <label htmlFor="password" style={{ fontWeight: 'bold' }}>New Password</label>
            <br/>
            <input
              type="password"
              value={password}
              style={{
                  width: 350,
                  border: '1px solid lightgray',
                  backgroundColor: 'lightyellow',
                  padding: '8px',
                }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p></p>
            <button onClick={handleResetPassword} style={{ marginLeft: '100px', backgroundColor: 'green', color: 'white'  }}>Reset Password</button>
        </div>
    </div>
  );
}

export default PasswordReset;
