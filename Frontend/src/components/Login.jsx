import React, { useState } from 'react';

import { Redirect, useHistory } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ onLogin, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Trích xuất mã token từ dữ liệu phản hồi
        if(localStorage.getItem('token') != null){
          localStorage.removeItem('token')
        }
        localStorage.setItem('token', token); // Lưu token vào local storage
        console.log(localStorage.getItem('token'))
        history.push('/adminedit');
        window.location.reload()
      } else {
        setError('Invalid email or password'); // Thông báo lỗi đăng nhập không hợp lệ
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login'); // Thông báo lỗi đăng nhập
    }
  };

  if (isLoggedIn) {
    return history.push('/adminedit');
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
