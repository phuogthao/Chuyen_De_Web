import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../styles/ProductDetails.css';

const ProductDetail = () => {
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const [quantity, setQuantity] = useState(1);
  const { id} = useParams();
  const [productData, setProductData] = useState(null);
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
    fetchComments();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/product/book/${id}`);
      if (response.ok) {
        const jsonData = await response.json();
        const productData = jsonData;
        
        setProductData(productData);
      } else {
        console.error('Failed to fetch product data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCart = async (product) => {
    const productWithQuantity = { ...product, quantity };
  
    try {
      const response = await fetch(`http://localhost:8080/api/user/cart/${product.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productWithQuantity),
      });
  
      if (response.ok) {
        console.log('Product added to cart');
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/product/comment/${id}`);
      if (response.ok) {
        const jsonData = await response.json();
        setComments(jsonData);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const addComment = async (content) => {
    try {
      const token = localStorage.getItem('token'); // Lấy mã thông báo từ local storage
  
      const requestBody = {
        book_id: productData.id, // Thay đổi giá trị book_id tùy theo yêu cầu của bạn
        content: content,
      };
  
      const response = await fetch('http://localhost:8080/api/user/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Thêm mã thông báo vào tiêu đề Authorization
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        console.log('Comment added successfully');
        // Thực hiện các thao tác cần thiết sau khi thêm comment thành công
        window.location.reload();
      } else {
        console.error('Failed to add comment');
        console.log(requestBody);
        // Xử lý lỗi khi không thêm được comment
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      // Xử lý lỗi khi có lỗi trong quá trình thực hiện yêu cầu
    }
  };
  
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  const { name, author, description, codeCategory, nameCategory, price, quantity: availableQuantity, urlImage } = productData;

  return (
    <div className="container my-5 py-3">
        <div className="container my-5 py-3">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center mx-auto product">
              <img src={productData.urlImage} alt={name} height="400px" />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h1 className="display-5 fw-bold">Name: {name}</h1>
              <hr />
              <p className="lead">
                <span className="author-label">Author:</span> {author}
              </p>
              <p className="lead">
                <span className="author-label">Description:</span> {description}
              </p>
              <p className="lead">
                <span className="author-label">Category:</span> {nameCategory}
              </p>
              <p className="lead">
                <span className="author-label">Price:</span> {price} VND
              </p>
              <p className="lead">
                <span className="author-label">Available Quantity:</span> {availableQuantity}
              </p>

              <input
                type="number"
                id="quantity"
                className="form-control"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
              <button onClick={() => handleCart(productData)} className="btn btn-outline-thirt my-5">
                {cartBtn}
              </button>
            </div>
          </div>
        </div>

      {/* Hiển thị danh sách các comment */}
      <div className="row">
        <div className="col-md-12">
          <h2>Comments:</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p className="comment-author">By: {comment.userName}.</p>
              <p className="comment-content">{comment.content}</p>
              <p className="comment-createdate">Create Date: {comment.createDate}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Form nhập comment mới */}
      <div className="row">
        <div className="col-md-12">
          <h2>Add Comment:</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const content = e.target.elements.content.value;
              addComment(content);
              e.target.reset();
            }}
          >
            <div className="form-group">
              <textarea
                name="content"
                className="form-control"
                rows="3"
                placeholder="Enter your comment"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
