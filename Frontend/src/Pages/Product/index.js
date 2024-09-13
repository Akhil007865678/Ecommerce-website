import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Footer from '../../Components/Footer';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <>
    <div>
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search for a product"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <img src={product.imageUrl} alt={product.name} width="200" />
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductSlider;
