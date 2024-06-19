import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10; // Số lượng sản phẩm hiển thị trên mỗi trang

  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryAdd, setSelectedCategoryAdd] = useState('van_hoc');
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    description: '',
    codeCategory: selectedCategoryAdd,
    price: '',
    urlImage: '',
    quantity: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/product/book?page=${currentPage}&category=${selectedCategory}&search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm header Authorization chứa JWT
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setProducts(jsonData.results);
        setTotalPages(jsonData.totalPages);
        
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredData = products.filter((item) => {
    if (selectedCategory === '') {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.codeCategory === selectedCategory
      );
    }
  });

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Thay đổi thành 0 để đồng bộ kết quả tìm kiếm với trang hiện tại
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(0); // Thay đổi thành 0 để đồng bộ kết quả tìm kiếm với trang hiện tại
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //add product
  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      if (formData.name === '') {
        setErrorMessage('Product name cannot be empty.');
        return;
      }
     
      const updatedFormData = {
        ...formData,
        codeCategory: selectedCategoryAdd,
      };
      
      const response = await axios.post('http://localhost:8080/api/admin/book', updatedFormData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      const newProduct = response.data;
      setProducts([newProduct, ...products]);
      setFormData({
        name: '',
        author: '',
        description: '',
        codeCategory: selectedCategoryAdd,
        price: '',
        urlImage: '',
        quantity: ''
      });
    } catch (error) {
      console.log(formData)
      console.error(error);
    }
  };

  //delete product
  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      const response = await axios.delete(`http://localhost:8080/api/admin/book/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status <= 299) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        console.error('Delete request failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectProduct = (productId) => {
    const isSelected = selectedProductIds.includes(productId);

    if (isSelected) {
      setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };
  //delete list product
  const handleDeleteSelectedProducts = async () => {
    try {
      const deleteIds = selectedProductIds.map((id) => id);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/admin/book', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(deleteIds),
      });
  
      if (response.ok) {
        console.log("delete success: " + deleteIds)
        setProducts(products.filter((product) => !selectedProductIds.includes(product.id)));
        setSelectedProductIds([]);
        window.location.reload();
      } else {
        console.log(deleteIds)
        console.error('Delete request failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  //update product
  const handleUpdateProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/admin/book/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product.id === productId ? updatedProduct : product
          )
        );
        const productToUpdate = products.find((product) => product.id === productId);
        if (!productToUpdate) {
          console.error('Product not found');
          return;
        }
        setFormData({
          name: productToUpdate.name,
          author: productToUpdate.author,
          urlImage: productToUpdate.urlImage,
          price: productToUpdate.price,
          description: productToUpdate.description,
          codeCategory: productToUpdate.codeCategory,
          quantity: productToUpdate.quantity,
        });
      } else {
        console.error('Update request failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='admin-title'>Admin Manager</h1>

        
        <div className='wrapper'>
        <div className="input-container">
        <h2>Add Product</h2>
          <label>Name Book:</label>
          {errorMessage && <p>{errorMessage}</p>}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name Book"
          />

          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Author"
          />

          <label>Price:</label>
          <input
            type="number"
            min="1"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="full-width"
          />

          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            title="Enter the quantity"
            className="full-width"
          />

          <label>Image URL:</label>
          <input
            type="text"
            name="urlImage"
            value={formData.urlImage}
            onChange={handleInputChange}
            placeholder="Image"
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            rows={2}
            className="full-width"
          />

          <label>Category:</label>
          <select
            name="codeCategory"
            value={selectedCategoryAdd}
            onChange={(event) => setSelectedCategoryAdd(event.target.value)}
            className="full-width"
          >
            <option value="van_hoc">Văn Học</option>
            <option value="tieu_thuyet">Tiểu thuyết</option>
            <option value="ngu_ngon">Ngụ ngôn</option>
            <option value="tho">Thơ</option>
          </select>
        </div>
        </div>
        <div className='controller-button'>
          <button className='delete-button' onClick={handleDeleteSelectedProducts}>Delete Selected</button>
          <button className='delete-button' onClick={handleAddProduct}>Add</button>
        </div>


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
                      {/* Thêm các option thể loại khác */}
                    </select>
                </div>
            </div>
          </div>
    </div>
      <div className="product-admin-grid">
        {filteredData.map((product) => (
          <div key={product.id} className="admin-product-item">
            <input
              type="checkbox"
              checked={selectedProductIds.includes(product.id)}
              onChange={() => handleSelectProduct(product.id)}
            />
            <p>
              <strong className="strong">ID: </strong>
              {product.id}
            </p>
            <p>
              <strong className="strong">Book Name: </strong> {product.name}
            </p>
            <p>
              <strong className="strong">Author: </strong> {product.author}
            </p>
            <p>
              <strong className="strong">Description: </strong>
              {product.description}
            </p>
            <p>
              <strong className="strong">Category: </strong>
              {product.codeCategory}
            </p>
            <p>
              <strong className="strong">Price: </strong> {product.price}
            </p>
            <p>
              <strong className="strong">Quantity: </strong> {product.quantity}
            </p>
            <img src={product.urlImage} alt={product.name} width={100} height={100} />
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => handleUpdateProduct(product.id)}>Update</button>
          </div>
        ))}
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

      {/* <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="Previous"
        nextLabel="Next"
      /> */}
    </div>
  );

};



export default Admin;
