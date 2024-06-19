import React, { useState, useEffect } from 'react';
import '../buttons/Signup.css';
const Signup = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    // Kiểm tra xem JWT có tồn tại trong localStorage hay không
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogout = () => {
    // Xóa JWT khỏi localStorage và cập nhật trạng thái xác thực
    localStorage.removeItem('token');
    setAuthenticated(false);
    window.location.reload()
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Kiểm tra mật khẩu hợp lệ
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setResultMessage("Password must be at least 8 characters long and contain at least 1 uppercase character.");
      return; // Dừng xử lý nếu mật khẩu không hợp lệ
    }
  
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
  
    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        // Xử lý phản hồi thành công từ API
        setResultMessage("Sign up success");
        console.log('Đăng ký thành công!');
        // Chuyển hướng hoặc thực hiện các hành động khác sau khi đăng ký thành công
      })
      .catch((error) => {
        setResultMessage("Your email already exists in the system");
        console.error('Đăng ký thất bại:', error);
        // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác tùy ý
      });
  };
  

  return (
    <div>
      {!authenticated && (
        <button
          type="button"
          className="btn btn-outline-primary ms-2"
          data-bs-toggle="modal"
          data-bs-target="#signupModal"
        >
          <span className="fa fa-user-plus me-1"></span> Register
        </button>
      )}

      {authenticated && (
        <button
          type="button"
          className="btn btn-outline-primary ms-2"
          onClick={handleLogout}
        >
          <span className="fa fa-sign-out me-1"></span > Logout
        </button>
      )}

      {/* Modal đăng ký */}
      <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Register</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Form đăng ký */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    required
                    placeholder="hong"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    required
                    placeholder="ngoc"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    placeholder="example@gmail.com"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    aria-describedby="passwordHelp"
                    placeholder="more than 8 characters and at least 1 uppercase character."
                    id="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {/* <div id="passwordHelp" className="form-text">more than 8 characters and at least 1 uppercase character.</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password Confirm</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    aria-describedby="passwordHelp"
                    placeholder="please confirm password"
                    id="password"
                  />
                  <p>{resultMessage}</p>
                </div>
                <button type="submit" className="btn btn-outline-primary w-100 mt-5">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
