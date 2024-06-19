import React, { useState } from 'react';
import '../styles/Checkout.css';

const Checkout = ({
  handleSubmit,
  handleNameChange,
  handleAddressChange,
  handlePhoneChange,
  handlePaymentChange,
  name,
  address,
  phone,
  payment,
  handleFormClose,
  checkoutSuccess,
  selectedIds,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageAddress, setErrorMessageAddress] = useState('');
  const [errorMessagePhone, setErrorMessagePhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let hasError = false;

    if (name === "") {
      setErrorMessageName("Name cannot be empty");
      hasError = true;
    }

    if (address === "") {
      setErrorMessageAddress("Address cannot be empty");
      hasError = true;
    }

    if (phone === "") {
      setErrorMessagePhone("Phone number cannot be empty");
      hasError = true;
    }

    if (hasError) {
      return;
    }

      // Lấy danh sách ids từ selectedItems
      const ids = selectedIds;

      // Tạo payload cho yêu cầu đặt hàng
      const payload = {
        address,
        ids,
        nameRecipient: name,
        phoneNumber: phone,
        payment: 'Cash',
      
      };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/user/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,//jwt
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(payload);
        window.location.reload();
      } else {
        console.log(payload);
        console.log(selectedIds);
        console.log(ids);
        // Xử lý khi yêu cầu không thành công
      }
    } catch (error) {
      console.log(payload);
      console.log(ids);
      console.error(error);
    } finally{
      setLoading(false)
    }
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="checkout-container">
          {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      <form onSubmit={handleOrderSubmit} className="checkout-form">
        <h2 className="checkout-heading">Order Information</h2>
        <div className="form-group">
          <label htmlFor="name" className="checkout-label">Name:</label>
          <input type="text" id="name" className="checkout-input" value={name} onChange={handleNameChange} />
          <p>{errorMessageName}</p>
        </div>
        <div className="form-group">
          <label htmlFor="address" className="checkout-label">Address:</label>
          <input type="text" id="address" className="checkout-input" value={address} onChange={handleAddressChange} />
          <p>{errorMessageAddress}</p>
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="checkout-label">Phone:</label>
          <input type="number" id="phone" className="checkout-input" value={phone} onChange={handlePhoneChange} />
          <p>{errorMessagePhone}</p>
        </div>
        <div className="col-md-6">
        <label htmlFor="payment" className="payment">payment methods:</label>
            <select className="form-select" value={selectedCategory}
             onChange={handleCategoryChange}
             >
              <option value="Cash">Cash</option>
              <option value="Banking">Banking</option>
              <option value="Visa">Visa</option>
              <option value="Momo">Momo</option>
              <option value="Vnpay">Vnpay</option>
              <option value="other">Other...</option>
              {/* Thêm các option thể loại khác */}
            </select>
          </div>

        <div className="checkout-buttons">
          <button type="submit" className="checkout-submit-btn">Submit</button>
          <button type="button" className="checkout-cancel-btn" onClick={handleFormClose}>Cancel</button>
        </div>

        {checkoutSuccess && <p className="checkout-message">Checkout successful!</p>}
      </form>
    </div>
    );

};

export default Checkout;
