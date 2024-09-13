import React, { useState, useEffect } from 'react';
import './ProductSlider.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { dispatch } = useCart();

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

  const handleProductClick = (id) => {
    navigate(`/singleProducts/${id}`)
  };

  const addToCart = (product) => {
    if (product && product.name && product.imageUrl && product.price) {
      dispatch({ type: 'ADD_TO_CART', product });
    } else {
      console.error('Invalid product:', product);
    }
  };
  
  const groupProductsByType = (products) => {
    return products.reduce((acc, product) => {
      const { productType } = product;
      if (!acc[productType]) {
        acc[productType] = [];
      }
      acc[productType].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupProductsByType(products);

  return (
    <div className="product-slider">
      {Object.keys(groupedProducts).map((productType) => (
        <div key={productType} className="product-type-row">
          <h2>{productType}</h2>
          <div className='product-container'>
            {groupedProducts[productType].map((product) => (
              <div className='product-card' key={product._id}>
                <img 
                  onClick={() => handleProductClick(product._id)} 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className='image' 
                />
                <div className='ProductName'>
                  <h3>{product.name}</h3>
                  <div><p>Price: {product.price} &#8377;</p></div>
                </div>
                <button 
                  className='button-cart' 
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSlider;
