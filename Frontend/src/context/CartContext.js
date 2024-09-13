import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const updatedCart = [...state, action.product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    case 'REMOVE_FROM_CART':
      const filteredCart = state.filter(product => product.id !== action.id);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
      return filteredCart;
    case 'SET_CART':
      return action.cart;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    const localData = localStorage.getItem('cart');
    if (localData) {
      dispatch({ type: 'SET_CART', cart: JSON.parse(localData) });
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
