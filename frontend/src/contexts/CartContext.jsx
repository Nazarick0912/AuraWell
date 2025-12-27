import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartAPI, productsAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  // Fetch products on mount (needed to enrich cart items with product details)
  useEffect(() => {
    const loadProducts = async () => {
      const productList = await productsAPI.getAll();
      setProducts(productList);
    };
    loadProducts();
  }, []);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null); // Clear cart when user logs out
    }
  }, [user]);

  // Helper function to enrich cart items with product details
  const enrichCartItems = (cartData) => {
    if (!cartData || !cartData.items) return cartData;
    
    const enrichedItems = cartData.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        productName: product?.name || `Unknown Product`,
        price: product?.price || 0,
        image: product?.imageUrl || null,
        description: product?.description || '',
      };
    });
    
    return {
      ...cartData,
      items: enrichedItems,
    };
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await cartAPI.getCart();
      const enrichedCart = enrichCartItems(cartData);
      setCart(enrichedCart);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Re-enrich cart when products are loaded
  useEffect(() => {
    if (products.length > 0 && cart) {
      setCart(prevCart => enrichCartItems(prevCart));
    }
  }, [products]);

  // Add or update item quantity in cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const result = await cartAPI.addItem(productId, quantity);
      if (result?.success) {
        // Fetch and enrich cart data
        const cartData = await cartAPI.getCart();
        const enrichedCart = enrichCartItems(cartData);
        setCart(enrichedCart);
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
        // Fetch and enrich cart data
        const cartData = await cartAPI.getCart();
        const enrichedCart = enrichCartItems(cartData);
        setCart(enrichedCart);
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

