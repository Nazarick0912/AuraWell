import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null); // Clear cart when user logs out
    }
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await cartAPI.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add or update item quantity in cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const result = await cartAPI.addItem(productId, quantity);
      if (result?.success) {
        await fetchCart(); // Refresh cart data
        return true;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    return false;
  };

  // Remove item entirely from cart
  const removeFromCart = async (productId) => {
    try {
      const result = await cartAPI.removeItem(productId);
      if (result?.success) {
        await fetchCart(); // Refresh UI after deletion
        return true;
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
    return false;
  };

  // Clear cart locally (for checkout simulation)
  const clearCart = () => {
    setCart(null);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      fetchCart, 
      loading 
    }}>
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

