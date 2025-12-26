/**
 * Centralized API Service for AuraWell
 * All backend API calls go through this file
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090/api';

// Helper function for making API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for session cookies (JSESSIONID)
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  const response = await fetch(url, mergedOptions);
  
  // Handle non-JSON responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    return { response, data };
  }
  
  return { response, data: null };
}

// ========================
// AUTH API
// ========================

export const authAPI = {
  /**
   * Login user with email and password
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{success: boolean, user?: object, message?: string}>}
   */
  async login(email, password) {
    const { response, data } = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    return data;
  },
  
  /**
   * Register a new user
   * @param {object} userData - { firstName, lastName, email, password }
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  async register(userData) {
    const { response, data } = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    return data;
  },
  
  /**
   * Logout current user
   * @returns {Promise<{success: boolean}>}
   */
  async logout() {
    const { response, data } = await apiRequest('/auth/logout', {
      method: 'POST',
    });
    
    return data;
  },
  
  /**
   * Get current authenticated user (session check)
   * @returns {Promise<object|null>} User object or null if not authenticated
   */
  async getCurrentUser() {
    try {
      const { response, data } = await apiRequest('/auth/me', {
        method: 'GET',
      });
      
      if (response.ok && data) {
        return data;
      }
      return null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },
};

// ========================
// CART API
// ========================

export const cartAPI = {
  /**
   * Get current user's cart
   * @returns {Promise<object|null>} Cart object or null
   */
  async getCart() {
    try {
      const { response, data } = await apiRequest('/cart', {
        method: 'GET',
      });
      
      if (response.ok) {
        return data;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      return null;
    }
  },
  
  /**
   * Add item to cart
   * @param {string} productId 
   * @param {number} quantity 
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  async addItem(productId, quantity = 1) {
    try {
      const { response, data } = await apiRequest('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
      
      return data || { success: response.ok };
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      return { success: false, message: 'Failed to add item' };
    }
  },
  
  /**
   * Remove item from cart
   * @param {string} productId 
   * @returns {Promise<{success: boolean}>}
   */
  async removeItem(productId) {
    try {
      const { response, data } = await apiRequest(`/cart?productId=${productId}`, {
        method: 'DELETE',
      });
      
      return data || { success: response.ok };
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      return { success: false };
    }
  },
};

// ========================
// PRODUCTS API
// ========================

export const productsAPI = {
  /**
   * Get all products
   * @param {string} category - Optional category filter
   * @returns {Promise<object[]>} Array of products
   */
  async getAll(category = null) {
    try {
      const endpoint = category ? `/products?category=${category}` : '/products';
      const { response, data } = await apiRequest(endpoint, {
        method: 'GET',
      });
      
      if (response.ok && data) {
        return data;
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  },
  
  /**
   * Get single product by ID
   * @param {string} id 
   * @returns {Promise<object|null>}
   */
  async getById(id) {
    try {
      const { response, data } = await apiRequest(`/products/${id}`, {
        method: 'GET',
      });
      
      if (response.ok) {
        return data;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return null;
    }
  },
};

// ========================
// ORDERS API
// ========================

export const ordersAPI = {
  /**
   * Get current user's orders
   * @returns {Promise<object[]>} Array of orders
   */
  async getOrders() {
    try {
      const { response, data } = await apiRequest('/orders', {
        method: 'GET',
      });
      
      if (response.ok && data) {
        return data;
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
    }
  },
  
  /**
   * Place a new order from current cart
   * @param {string} shippingAddress 
   * @returns {Promise<{success: boolean, order?: object, error?: string}>}
   */
  async placeOrder(shippingAddress) {
    try {
      const { response, data } = await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({ shippingAddress }),
      });
      
      if (response.ok && data) {
        return { success: true, order: data };
      }
      return { success: false, error: data?.error || 'Failed to place order' };
    } catch (error) {
      console.error('Failed to place order:', error);
      return { success: false, error: 'Failed to place order' };
    }
  },
};

export default {
  auth: authAPI,
  cart: cartAPI,
  products: productsAPI,
  orders: ordersAPI,
};

