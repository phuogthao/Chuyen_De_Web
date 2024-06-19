import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Account.css';

const Account = () => {
  const [account, setAccount] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('info');
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [email, setEmail] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    gender: 'male',
    dateOfBirth: ''
  });

  // Thêm state mới
const [oldPassword, setOldPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Missing JWT token');
      return;
    }

    if (selectedCategory === 'info') {
      fetchAccount(token);
      setShowOrders(false);
    }
    if (selectedCategory === 'history') {
      fetchOrders(token);
      setAccount(null);
    }
    if (selectedCategory === 'cartItem') {
      fetchCartItems(token);
      setAccount(null);
    }
    if (selectedCategory === 'history-comment') {
      fetchComments();
      setAccount(null);
    }
    if (selectedCategory === 'change-infor') {
      fetchAccount(token);
      
    }
    
  }, [selectedCategory]);

  // Get account information
  const fetchAccount = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/account', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const accountData = response.data;
      setAccount(accountData);
      console.log(accountData);
      setFormData({
        firstName: account.firstName,
        lastName: account.lastName,
        address: account.address,
        gender: account.gender,
        dateOfBirth: account.dateOfBirth
      });
    } catch (error) {
      console.error('Failed to fetch account:', error);
    }
  };

  // Get order history
  const fetchOrders = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/order', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const ordersData = response.data;
      setOrders(ordersData);
      setShowOrders(true);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'info') {
      fetchAccount(localStorage.getItem('token'));
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  

  const handleOrderDetails = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/user/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const orderData = response.data;
      console.log(orderData)
      setSelectedOrder(orderData);
      setShowOrderDetails(true);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };
//get list cart
const fetchCartItems = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/user/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const cartItemsData = response.data;
    setCartItems(cartItemsData);
    console.log(cartItemsData);
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
  }
};
  // Xử lý sự kiện khi người dùng nhấn nút "Submit"
const handleSubmit = (event) => {
  event.preventDefault();

  if (newPassword !== confirmNewPassword) {
    // Hiển thị thông báo lỗi khi mật khẩu mới không khớp
    console.error('New password does not match the confirm password.');
    return;
  }
};
//get list cmt
const fetchComments = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/user/comment', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const commentsData = response.data;
      setComments(commentsData);
    } else {
      console.error('Failed to fetch comments');
    }
  } catch (error) {
    console.error('Failed to fetch comments:', error);
  }
};
//change infor
const handleUpdateInformation = async (event) => {
  event.preventDefault();

 

  // Tiến hành gửi yêu cầu cập nhật thông tin đến server
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      'http://localhost:8080/api/user/account',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Information updated successfully');
    // Cập nhật lại thông tin tài khoản hiển thị
    setMessage('change info success')
    fetchAccount(token);
  } catch (error) {
    setMessage('change info failer')
    console.error('Failed to update information:', error);
  }
};


  

  const categories = [
    {
      id: 'account',
      label: 'Account Manager',
      subcategories: [
        { id: 'info', label: 'Information' },
        { id: 'change-password', label: 'Change password' },
        { id: 'change-infor', label: 'Update information' },
        { id: 'history-comment', label: 'History Comment' },
      ]
    },
    {
      id: 'orders',
      label: 'Order Manager',
      subcategories: [
        { id: 'history', label: 'Order history' },
        { id: 'track', label: 'Order follow' },
      ]
    },
    {
      id: 'cart',
      label: 'Cart Manager',
      subcategories: [
        { id: 'cartItem', label: 'List Cart' },
      ]
    },
    {
      id: 'notification',
      label: 'Notification',
      subcategories: [
        { id: 'order', label: 'Order' },
        { id: 'sale', label: 'Sale' },
        { id: 'update', label: 'Update' },
        { id: 'message', label: 'Message' },
        { id: 'contact', label: 'Contact' },
      ]
    },
    {
      id: 'terms',
      label: 'Policy and Terms',
      subcategories: [
        { id: 'policy', label: 'Policy' },
        { id: 'terms', label: 'Terms' },
      ]
    }
  ];

  const handleSubcategoryClick = (subcategory) => {
    if (subcategory.id === 'info') {
      setSelectedCategory('info');
    }
    if (subcategory.id === 'history') {
      setSelectedCategory('history');
    }
    if (subcategory.id === 'cartItem') {
      setSelectedCategory('cartItem');
    }
    if (subcategory.id === 'change-password') {
      setSelectedCategory('change-password');
    }
    
    if (subcategory.id === 'history-comment') {
      setSelectedCategory('history-comment');
    }
    
    if (subcategory.id === 'change-infor') {
      setSelectedCategory('change-infor');
    }
  };
  const handleChangePassword = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
      // Kiểm tra tính hợp lệ của mật khẩu cũ và mật khẩu mới
  if (oldPassword.trim() === '') {
    setResultMessage('Please enter your old password.');
    return;
  }

  if (newPassword.trim() === '') {
    setResultMessage('Please enter your new password.');
    return;
  }
  if (newPassword === confirmNewPassword) {
    setResultMessage('Confirm password different.');
    return;
  }

  // Kiểm tra độ dài và sự tồn tại của ít nhất một ký tự viết hoa trong mật khẩu mới
  if (newPassword.length < 8 || !/\d/.test(newPassword)) {
    setResultMessage('New password must be at least 8 characters long and contain at least one decimal digit.');
    return;
  }
  
    try {
      const response = await axios.put('http://localhost:8080/api/user/account/changepassword', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = response.data.result;
      setResultMessage(result);
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };



  return (
    <div className="account-container">
      <div className="sidebar">
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              <button
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.label}
              </button>
              {selectedCategory === category.id && (
                <ul className="subcategory-list">
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory.id}
                      className="subcategory-item"
                      onClick={() => handleSubcategoryClick(subcategory)}
                    >
                      <button className="subcategory-button">{subcategory.label}</button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {selectedCategory === 'info' && account && (
          <div className="account-info">
          <h2>Account Information</h2>
          <div className="account-data">
            <div className="account-data-row">
              <span className="account-data-label">ID:</span>
              <span className="account-data-value">{account.id}</span>
            </div>
            <div className="account-data-row">
              <span className="account-data-label">First Name:</span>
              <span className="account-data-value">{account.firstName}</span>
            </div>
            <div className="account-data-row">
              <span className="account-data-label">Last Name:</span>
              <span className="account-data-value">{account.lastName}</span>
            </div>
            <div className="account-data-row">
              <span className="account-data-label">Email:</span>
              <span className="account-data-value">{account.email}</span>
            </div>
            <div className="account-data-row">
              <span className="account-data-label">Address:</span>
              <span className="account-data-value">{account.address}</span>
            </div>
            <div className="account-data-row">
              <span className="account-data-label">Gender:</span>
              <span className="account-data-value">{account.gender}</span>
            </div>
            <div className="account-data-row">
              <span className="account-data-label">Date of Birth:</span>
              <span className="account-data-value">{account.dateOfBirth}</span>
            </div>
            <div className="account-data-row">
              <span className="account-data-label">Account Created:</span>
              <span className="account-data-value">{account.createDate}</span>
            </div>
          </div>
        </div>
        
        )}
          {selectedCategory === 'history' && showOrders && (
            <div className="order-history">
              <h2>Order History</h2>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Recipient</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Payment</th>
                    <th>Create Date</th>
                    <th>Total Money</th>
                    <th>Action</th> {/* New column for the button */}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="order-item">
                      <td>{order.id}</td>
                      <td>{order.nameRecipient}</td>
                      <td>{order.address}</td>
                      <td>{order.phoneNumber}</td>
                      <td>{order.payment}</td>
                      <td>{order.createDate}</td>
                      <td>{order.totalMoney}</td>
                      <td>
                        <button onClick={() => handleOrderDetails(order.id)}>View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {showOrderDetails && selectedOrder && (
            <div className="order-details-modal">
              <div className="modal-content">
                    <div className="order-details-header">
                      <h3>Order Details</h3>
                      <button onClick={() => setShowOrderDetails(false)}>X</button>
                    </div>

                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Name</th>
                      <th>Create Date</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.nameBook}</td>
                        <td>{order.createDate}</td>
                        <td>{order.quantity}</td>
                        <td>{order.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {selectedCategory === 'cartItem' && (
            <div className="cart-items">
              <h2>Cart Items</h2>
              {cartItems.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Create By</th>
                      <th>Create Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nameBook}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.createBy}</td>
                        <td>{item.createDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          )}
          {selectedCategory === 'change-password' && (
            <div className="change-password-form">
              <h2>Change Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password:</label>
                  <input
                    type="password"
                    id="oldPassword"
                    placeholder='please inter old password'
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder='must be at least 8 characters long and contain at least one decimal digit'
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    placeholder='please confirm new password'
                    value={confirmNewPassword}
                    onChange={(event) => setConfirmNewPassword(event.target.value)}
                    required
                  />
                </div>
                  <p>{resultMessage}</p>
                    <button type="submit" onClick={handleChangePassword}>Submit</button>
              </form>
            </div>
        )}{selectedCategory === 'history-comment' && (
          <div>
            <h2>Comments</h2>
            <table className="comment-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book</th>
                  <th>Content</th>
                  <th>Author</th>
                  <th>Create Date</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.id}</td>
                    <td>{comment.bookName}</td>
                    <td>{comment.content}</td>
                    <td>{comment.userName}</td>
                    <td>{comment.createDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}{selectedCategory === 'change-infor' && (
          <div className='update-infor'>
            <h2 className='title-update'>Change Information</h2>
            <div className='update-container'>
              <form className='form-update' onSubmit={handleUpdateInformation}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </div>
                <div>
                  <p>{message}</p>
                </div>
                <div className="form-actions">
                  <button type="submit" onClick={handleUpdateInformation}>Update</button>
                  <button type="button" onClick={() => setSelectedCategory('info')}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        
           
      </div>
    </div>
  );
};

export default Account;
