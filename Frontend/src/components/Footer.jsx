import React from 'react';
import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">BOOKSTORE</h5>
            <p className="about-us">
              BookStore is currently considered one of the leading online sales websites in Vietnam.
              And that certainly cannot be without books.
              At the beginning, Tiki was also a website specializing only in book products!
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">about us</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/" className="text-dark">Home</a>
              </li>
              <li>
                <a href="/products" className="text-dark">Products</a>
              </li>
              <li>
                <a href="/about" className="text-dark">About</a>
              </li>
              <li>
                <a href="/contact" className="text-dark">Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact us</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-dark">Facebook:</p>
              </li>
              <li>
                <p className="text-dark">Instagram: </p>
              </li>
              <li>
                <p className="text-dark">HotLine: 012345678</p>
              </li>
              <li>
                <p className="text-dark">Email: 20130408@st.hcmuaf.edu.vn</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Company Name: All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
