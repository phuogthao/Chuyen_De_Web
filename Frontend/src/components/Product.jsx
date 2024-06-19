import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/actions/index';
import './main.css';
import '../styles/Product.css';


const Product = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [topSoldProducts, setTopSoldProducts] = useState([]);
  const [newBookProducts, setNewBookProducts] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    getTopSold();
    fetchData();
    getNewBook();
  }, [currentPage, selectedCategory]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/product/book?page=${currentPage}&category=${selectedCategory}&search=${searchTerm}`);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData.results);
        setTotalPages(jsonData.totalPages);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTopSold = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/product/book/soldtop');
      if (response.ok) {
        const data = await response.json();
        setTopSoldProducts(data);
      } else {
        console.error('Failed to fetch top sold products');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNewBook = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/product/book/newbook');
      if (response.ok) {
        const data = await response.json();
        setNewBookProducts(data);
      } else {
        console.error('Failed to fetch top sold products');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Thay đổi thành 0 để đồng bộ kết quả tìm kiếm với trang hiện tại
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(0); // Thay đổi thành 0 để đồng bộ kết quả tìm kiếm với trang hiện tại
  };

  const filteredData = data.filter((item) => {
    if (selectedCategory === '') {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.codeCategory === selectedCategory
      );
    }
  });

  const handleAddToCart = async (item) => {
    const productWithQuantity = { ...item, quantity: 1 };
  
    try {
      const response = await fetch(`http://localhost:8080/api/user/cart/${item.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productWithQuantity),
      });
  
      if (response.ok) {
        dispatch(addItem(productWithQuantity));
        console.log(`Added to cart: ${item.name}`);
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  

  return (
    <div>
        <div className="container-header">
        
        <div className="container-search">
            <div className="row">
                <div className="text-center">
                    <h1 className="product-title">Product</h1>
                    <hr className="product-hr" />
                </div>
            </div>
            <div className="content-filter">
                <div className="search">
                    <input type="text" className="form-control custom-input" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                </div>
                <div className="category">
                    <select className="form-select custom-select" value={selectedCategory} onChange={handleCategoryChange}>
                      <option value="">All Categories</option>
                      <option value="van_hoc">Văn Học</option>
                      <option value="tieu_thuyet">Tiểu thuyết</option>
                      <option value="ngu_ngon">Ngụ ngôn</option>
                      <option value="tho">Thơ</option>
                      <option value="chinh_tri">Chính trị-Pháp Luật</option>
                      <option value="khoa_hoc">Khoa học Công nghệ</option>
                      <option value="kinh_te">Kinh tế</option>
                      <option value="giao_trinh">Giáo trình</option>
                      <option value="tam_ly">Tâm Lý</option>
                      <option value="thieu_nhi">Thiếu Nhi</option>
                      {/* Thêm các option thể loại khác */}
                    </select>
                </div>
            </div>
          </div>
    </div>
{/* Top sold */}
    <div className="container">
      <h1 className="product-title">Top Selling</h1>
      <div className="top-selling-container">
        {topSoldProducts.map((item) => (
          <div className="product-item" key={item.id}>
            <div className="card">
              <h3>{item.name}</h3>              
              <div className="image-container">
                <img src={item.urlImage} alt={item.name} />
              </div>
              <p className="author">{item.author}</p>
              <div className="button-container">
                <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary me-2">
                  Buy Now
                </NavLink>
                <button className="btn btn-outline-primary" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


      <div className="container">
      <h1 className="product-title">List Product</h1>
        <div className="row justify-content-around">
          {filteredData.map((item) => (
            <div className="card my-5 py-5" key={item.id} style={{ width: '20rem' }}>
              <img src={item.urlImage} className="card-img-top" alt="Product" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="lead">{item.author}</p>
                <p className="lead">{item.price} VND</p>
                <div>
                  <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary me-2">
                    Buy Now
                  </NavLink>
                  <button className="btn btn-outline-primary" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top sold */}
    <div className="container">
      <h1 className="product-title">New Book Release</h1>
      <div className="top-selling-container">
        {newBookProducts.map((item) => (
          <div className="product-item" key={item.id}>
            <div className="card">
              <h3>{item.name}</h3>              
              <div className="image-container">
                <img src={item.urlImage} alt={item.name} />
              </div>
              <p className="author">{item.author}</p>
              <div className="button-container">
                <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary me-2">
                  Buy Now
                </NavLink>
                <button className="btn btn-outline-primary" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <button
              className="btn btn-outline-primary me-2"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
