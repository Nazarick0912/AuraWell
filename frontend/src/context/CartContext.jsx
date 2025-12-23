import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    //fetch the cart from backend when user login
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart(null); //clear cart when user logout
        }
    }, [user]);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:9090/api/cart', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setCart(data);
            }
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        } finally {
            setLoading(false);
        }
    };

    //add item to cart
    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await fetch('http://localhost:9090/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId, quantity })
            });
            
            if (response.ok) {
                await fetchCart(); //refresh the cart data after adding a new item
                return true;
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
        return false;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, fetchCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);