import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer';

import './search.css';

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = useCallback(() => {
    let filtered = products.filter((product) =>
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (minPrice !== '') {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, products, minPrice, maxPrice]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products, minPrice, maxPrice, filterProducts]);

  const handleProductClick = (id) => {
    navigate(`/singleProducts/${id}`);
  };
  const buyProduct = (id) => {
    navigate(`/buy/${id}`);
  }
  const addAlert = () => {
    alert('Product added to cart successfully');
  }

  return (
    <>
      <div className='parent-container'>
          
          <div className='filter-container'>
            <h3>Price Range</h3>
            <input
              type="number"
              id="min-price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
            />

            <input
              type="number"
              id="max-price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
            />
            <div className='filter-by-product'>
                <h3>BRAND</h3>
                
            </div>
            <div className='filter-by-customer-rating'>
                <h3>CUSTOMER RATINGS</h3>
                <div className='rating'>
                  <input type="checkbox"/>
                  <h3>4* & above</h3>
                </div>
                <div className='rating'>
                  <input type="checkbox"/>
                  <h3>3* & above</h3>
                </div>
            </div>
          </div>

          <div className='products-container'>
              <div>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product._id} className='details'>
                      <div>
                          <img
                            onClick={() => handleProductClick(product._id)}
                            src={product.imageUrl}
                            alt={product.name}
                            width="200"
                          />
                      </div>
                      <div className='child-container'>
                          <h2>{product.name}</h2>
                          <h3>Price: ${product.price}</h3>
                          <button className='btn' onClick={buyProduct}>Buy Now</button>
                          <button className='btn' onClick={addAlert}>Add To Cart</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found</p>
                )}
              </div>
          </div>

      </div>
      <Footer />
    </>
  );
};

export default SearchResults;