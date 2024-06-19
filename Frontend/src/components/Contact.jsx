import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css';

const Contact = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [resultMessage, setResultMessage] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
      
        const contactData = {
          name: fullName,
          email,
          content,
        };
      
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:8080/api/user/contact', contactData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status === 200) {
            setResultMessage("Contact sent successfully!")
            
            setFullName('');
            setEmail('');
            setContent('');
            
            console.log('Contact sent successfully!');
          }
           else {
            setResultMessage("Please login to send contatc!")
           
            console.log('Please login to send contatc!');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      
      
   
  };
    return (
        <div>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12 text-center py-4 my-4">
                        <h1>If Have Some Question Or Feedback?</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md 5 d-flex justify-content-center">
                        <img src="/assets/images/contact.png" alt="Contact Us" height="300px" width="300px" />
                    </div>
                    <div className="col-md-6">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                            Full Name
                            </label>
                            <input
                            required
                            type="text"
                            className="form-control"
                            id="fullName"
                            placeholder="thaole"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                            Email address
                            </label>
                            <input
                            required
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                            Content
                            </label>
                            <textarea
                            required
                            className="form-control"
                            id="content"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <p className='result-message'>{resultMessage}</p>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Send Message
                        </button>
                        </form>

                    </div>
                    </div>
                </div>
            </div>
        )
}

export default Contact
