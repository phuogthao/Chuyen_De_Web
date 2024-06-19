import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Checkout from './Checkout';

const Cart = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);
  const [checkoutError, setCheckoutError] = useState(false);
  const [quantity, setQuantity] = useState(1);


  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false); // Thêm biến trạng thái để điều khiển hiển thị của form

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handlePaymenntChange = (event) => {
    setPayment(event.target.value);
  };

  useEffect(() => {
    fetchData();

  }, []);

  //get cart item
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/user/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const jsonData = await response.json();
      console.log(jsonData);
  
      const updatedData = jsonData.map((item) => ({
        ...item,
        isChecked: false,
      }));
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };
  

  // Xử lý check
  const handleCheckboxChange = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    setData(updatedData);
    const selectedIds = updatedData.filter((item) => item.isChecked).map((item) => item.id);
    setSelectedItems(selectedIds);
  };

// Xoá hàng loạt
const handleDeleteSelected = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/user/cart', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedItems),
    });

    if (!response.ok) {
      throw new Error('Failed to delete selected items');
    }

    const updatedData = data.filter((item) => !selectedItems.includes(item.id));
    setData(updatedData);
    setSelectedItems([]);
  } catch (error) {
    console.error(error);
  }
};


// Xoá 1 sp
const handleClose = async (item) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/user/cart/${item.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete item');
    }

    const updatedData = data.filter((cartItem) => cartItem.id !== item.id);
    setData(updatedData);
  } catch (error) {
    console.error(error);
  }
};


  // Đóng form
  const handleFormClose = () => {
    setShowForm(false);
    setCheckoutSuccess(false);
  };

  const cartItems = (cartItem) => {
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
        <div className="container py-4">
          <button onClick={() => handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img src={cartItem.imageURL} alt={cartItem.nameBook} height="200px" width="180px" />
            </div>
            <div className="col-md-4">
              <h3>{cartItem.nameBook}</h3>
              <p className="lead fw-bold">{cartItem.price} VND</p>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
            type="number"
            id="quantity"
            className="form-control"
            value={cartItem.quantity}
            onChange={handleQuantityChange}
            min="1"
          />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={cartItem.isChecked}
                  onChange={() => handleCheckboxChange(cartItem.id)}
                />
                <label className="form-check-label" htmlFor="checkbox">
                  Select
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const calculateTotalPrice = () => {
    const totalPrice = data.reduce((total, item) => {
      if (item.isChecked) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);

    return totalPrice;
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      setCheckoutError("No items have been selected yet");
    } else {
      setShowForm(true); // Hiển thị form thanh toán khi không có lỗi
      setCheckoutError(null);
    }
  };

  const button = () => {
    const totalPrice = calculateTotalPrice();

    const handleSubmit = async (event) => {
      event.preventDefault();

      // Chuẩn bị dữ liệu để gửi
      const dataToSend = {
        name: name,
        address: address,
        phone: phone,
        selectedItems: selectedItems,
      };
      if (name.trim() === '' || address.trim() === '' || phone.trim() === '') {
        alert('Vui lòng điền đầy đủ thông tin');
      } else {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8080/api/user/order', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(dataToSend),
          });

          if (response.ok) {
            // Xử lý phản hồi thành công
            console.log('Checkout successful');
            // Reset form và các mục đã chọn
            setName('');
            setAddress('');
            setSelectedItems([]);
            setCheckoutSuccess(true);
          } else {
            // Xử lý phản hồi lỗi
            console.error('Checkout failed');
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    return (
      <div className="container">
        <div className="row">
          <button className="btn btn-outline-primary" onClick={handleDeleteSelected}>
            Delete Selected
          </button>
          <button className="btn btn-outline-primary" onClick={handleCheckout}>
            Checkout
          </button>
          <p>{checkoutError}</p>
          <p> </p>
          <p>Total Price: {totalPrice} VND</p>
        </div>

        {/* Hiển thị form thanh toán nếu showForm = true */}
        {showForm && (
        <Checkout
            handleSubmit={handleSubmit}
            handleNameChange={handleNameChange}
            handleAddressChange={handleAddressChange}
            handlePhoneChange={handlePhoneChange}
            handlePaymentChange={handlePaymenntChange}
            name={name}
            address={address}
            phone={phone}
            payment={payment}
            handleFormClose={handleFormClose}
            checkoutSuccess={checkoutSuccess}
            selectedIds={selectedItems}
      />
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Cart</h1>
      <hr />
      {data.length > 0 ? data.map(cartItems) : emptyCart()}
      {button()}
    </div>
  );
};

export default Cart;
