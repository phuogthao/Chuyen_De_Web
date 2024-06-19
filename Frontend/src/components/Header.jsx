import React from 'react';
import { NavLink } from 'react-router-dom';
import CartBtn from './buttons/CartBtn';
import Login from './buttons/Login';
import Signup from './buttons/Signup';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid py-2" style={{ backgroundColor: 'rgba(198, 241, 239, 0.5)' }}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div style={{ flex: '1 0 auto' }}></div> {/* Thêm phần tử trống để định dạng cho phần bên trái của navbar */}
            <div className="d-flex justify-content-center"> {/* Thêm lớp CSS để căn giữa */}
              <NavLink
                className="navbar-brand mx-auto fw-bold"
                to="/"
                style={{ flexShrink: 0 }}
              >
                BOOK STORE
              </NavLink>
            </div>
            <div style={{ flex: '1 0 auto' }}></div> {/* Thêm phần tử trống để định dạng cho phần bên phải của navbar */}
            <Login />
            <Signup />
            <CartBtn />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
