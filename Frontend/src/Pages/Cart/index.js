import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './cart.css';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = cart.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const handleAdd = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const handleSubtract = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
    }));
  };

  const handleRemove = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', id: productId });
  };

  const totalPrice = cart.reduce((total, product) => {
    const quantity = quantities[product.id] || 1;
    return product ? total + product.price * quantity : total;
  }, 0);

  return (
    <div className='main-container'>
      <div className='first-container'>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((product) => (
              <li key={product.id} style={{ listStyleType: 'none', marginBottom: '20px' }}>
                <img src={product.imageUrl} alt={product.name} width="150" />
                <div>
                  <h3>{product.name}</h3>
                  <p>Price: {product.price * (quantities[product.id] || 1)} &#8377;</p>
                  <button onClick={() => handleRemove(product.id)}>REMOVE</button>
                  <div>
                    <button onClick={() => handleSubtract(product.id)}>-</button>
                    <span>{quantities[product.id] || 1}</span>
                    <button onClick={() => handleAdd(product.id)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='second-container'>
        <div className='first-child'>
          {cart.map((product) => (
            <li key={product.id}>
              <h4>{product.name} :</h4>
              <span>{product.price * (quantities[product.id] || 1)} &#8377;</span>
            </li>
          ))}
        </div>
        <hr />
        <div className='second-child'>
          <li>
            <h3>Total Price: </h3>
            <span>{totalPrice} &#8377;</span>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Cart;