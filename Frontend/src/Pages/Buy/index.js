import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BuyPage.css';

const Buy = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/singleProducts/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Handle placing the order here
    console.log('Order placed');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-page">
      <div className="product-data">
        <img src={product.imageUrl} alt={product.name} width="250" />
        <h2>{product.name}</h2>
        <h3>Price: ₹{product.price}</h3>
      </div>

      <div className='form'>
          <form onSubmit={handlePlaceOrder}>
            <div>
              <input placeholder='NAME :' type="text" id="name" required />
            </div>
            <div>
              <input placeholder='ADDRESS :' type="text" id="address" required />
            </div>
            <div>
              <label htmlFor="payment">Payment Method:</label>
              <select id="payment" required>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            <button type="submit">Place Order</button>
          </form>
      </div>
    </div>
  );
};

export default Buy;
