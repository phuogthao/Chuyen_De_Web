import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../buttons/Login.css';
import Signup from './Signup';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showAccountButton, setShowAccountButton] = useState(false);
  const [arialHidden, setArialHidden] = useState(true);
  const [resultMessage, setResultMessage] = useState('');
  const history = useHistory();
  const handleClick = () => {
    setArialHidden(true);
  };
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthenticated(true);
      setShowAccountButton(true);
    } else {
      setAuthenticated(false);
      setShowAccountButton(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(email.trim() === ''){
      setResultMessage("email not null")
      return;
    }

    const payload = {
      email: email,
      password: password
    };
    

    fetch('http://localhost:8080/api/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        const token = data.token;
        localStorage.setItem('token', token);
        setAuthenticated(true);
        setShowForm(false);
        window.location.reload();
        console.log('Đăng nhập thành công!');
      })
      .catch((error) => {
        setResultMessage("wrong userName or password");
        console.error('Đăng nhập thất bại:', error);
      });
  };

  const handleAccountAccess = () => {
    // Chuyển hướng đến trang Account.jsx
    history.push('/account');
    console.log('Truy cập thông tin tài khoản');
  };

  return (
    <>
      {!authenticated && (
        <button
          type="button"
          className="btn btn-outline-primary ms-auto"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          <span className="fa fa-sign-in me-1"></span> Login
        </button>
      )}

      {authenticated && (
        <button
          type="button"
          className="btn btn-outline-primary ms-2"
          onClick={handleAccountAccess}
        >
          Account
        </button>
      )}

      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="example@gmail.com"
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <p className="text-lable">
                  forgot password? <Link to="/forgot-password" onClick={handleClick}>click here</Link>
                </p>
                
                <p className='text-message'> {resultMessage}</p>
                <button
                  type="submit"
                  className="btn btn-outline-primary w-100 mt-5"
                >
                  <span className="fa fa-sign-in me-2"></span> Login
                </button>
                <p className="text" >Or:</p>
              </form>
              
              <div className="button-container">
                <button type="button" className="btn btn-outline-primary">
                  <span className="fa fa-google me-2"></span> Login With GG
                </button>
                <button type="button" className="btn btn-outline-primary">
                  <span className="fa fa-github me-2"></span> Login With Github
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
