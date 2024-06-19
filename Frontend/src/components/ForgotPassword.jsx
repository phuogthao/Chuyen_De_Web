import React, { useState } from 'react';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailError, setEmailError] = useState('');


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    
  };
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePassConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };


  
  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (code.trim() === '') {
      setResultMessage("please inter code verify in your email")
      return;
    }

    if (password !== passwordConfirm) {
      setResultMessage("Passwords do not match")
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    setResultMessage("Please change your password to a stronger one")
    return;
  }
  
    try {
      
      const bearerToken = `Bearer ${code}`;
  
      const response = await fetch('http://localhost:8080/api/user/account/resetpassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': bearerToken // Gửi bearer token trong header Authorization
        },
        body: JSON.stringify({
          newPassword: password
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setResultMessage(data.result)
        console.log(data.result)
        console.log('Reset password successful');
      } else {
        
        console.log('Reset password failed');
      }
      
    } catch (error) {
      console.log('An error occurred', error);
    }
  };
  

  const handleGetCode = async (event) => {
    event.preventDefault();
    if(email.trim() === ''){
     setResultMessage("email not null")
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      
      const data = await response.json();
      
      
      if (response.ok) {
        setResultMessage(data.result)
        console.log(data.result); // Hiển thị thông báo thành công
      } else {
        setResultMessage(data.result)
        console.log('Error:', data.error); // Hiển thị thông báo lỗi
      }
    } catch (error) {
      
      console.log('Error:', error); // Hiển thị thông báo lỗi kết nối
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleResetPassword}>
        <div>
          <label>Email address:</label>
          <input          
            placeholder='example@gmail.com'
            type="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
         {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div>
          <label>verify Code:</label>
          <input
            placeholder='please check verify code in your email'
            type="email"
            value={code}
            onChange={handleCodeChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
          placeholder='new password'
            type="password"
            value={password}
            onChange={handlePassChange}
          />
        </div>
        <div>
          <label>Password Confirm:</label>
          <input
          placeholder='confirm new password'
            type="password"
            value={passwordConfirm}
            onChange={handlePassConfirmChange}
          />
        </div>
        <p className='text-message'>{resultMessage}</p>
        <div className="form-buttons">
          <button type="submit" onClick={handleResetPassword}>Reset Password</button>
          <button type="submit" onClick={handleGetCode}>Get Code</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
