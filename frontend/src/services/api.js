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
      
      if (response.ok && data?.success && data.user) {
        return data.user;
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

// ========================
// ADMIN API
// ========================

export const adminAPI = {
  /**
   * Get all orders (admin only)
   * @returns {Promise<object[]>} Array of all orders
   */
  async getAllOrders() {
    try {
      const { response, data } = await apiRequest('/admin/orders', {
        method: 'GET',
      });
      
      if (response.ok && data) {
        return data;
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch admin orders:', error);
      return [];
    }
  },

  /**
   * Update order status (admin only)
   * @param {string} orderId 
   * @param {string} status - One of: pending, processing, shipped, delivered, cancelled
   * @returns {Promise<{success: boolean, order?: object, error?: string}>}
   */
  async updateOrderStatus(orderId, status) {
    try {
      const { response, data } = await apiRequest('/admin/orders', {
        method: 'PUT',
        body: JSON.stringify({ orderId, status }),
      });
      
      if (response.ok && data?.success) {
        return { success: true, order: data.order };
      }
      return { success: false, error: data?.error || 'Failed to update order status' };
    } catch (error) {
      console.error('Failed to update order status:', error);
      return { success: false, error: 'Failed to update order status' };
    }
  },

  /**
   * Update product (admin only)
   * @param {string} productId 
   * @param {object} productData 
   * @returns {Promise<{success: boolean, product?: object, error?: string}>}
   */
  async updateProduct(productId, productData) {
    try {
      const { response, data } = await apiRequest(`/admin/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      
      if (response.ok && data?.success) {
        return { success: true, product: data.product };
      }
      return { success: false, error: data?.error || 'Failed to update product' };
    } catch (error) {
      console.error('Failed to update product:', error);
      return { success: false, error: 'Failed to update product' };
    }
  },

  /**
   * Delete product (admin only)
   * @param {string} productId 
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async deleteProduct(productId) {
    try {
      const { response, data } = await apiRequest(`/admin/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (response.ok && data?.success) {
        return { success: true };
      }
      return { success: false, error: data?.error || 'Failed to delete product' };
    } catch (error) {
      console.error('Failed to delete product:', error);
      return { success: false, error: 'Failed to delete product' };
    }
  },

  /**
   * Create new product (admin only)
   * @param {object} productData 
   * @returns {Promise<{success: boolean, product?: object, error?: string}>}
   */
  async createProduct(productData) {
    try {
      const { response, data } = await apiRequest('/admin/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      
      if (response.ok && data?.success) {
        return { success: true, product: data.product };
      }
      return { success: false, error: data?.error || 'Failed to create product' };
    } catch (error) {
      console.error('Failed to create product:', error);
      return { success: false, error: 'Failed to create product' };
    }
  },
};

export default {
  auth: authAPI,
  cart: cartAPI,
  products: productsAPI,
  orders: ordersAPI,
  admin: adminAPI,
};

