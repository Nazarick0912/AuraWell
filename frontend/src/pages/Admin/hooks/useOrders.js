import { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../../../services/api';

// Transform backend order data to frontend format
const transformOrder = (order) => ({
    id: order.id,
    customer: order.customerName || 'Unknown Customer',
    date: new Date(order.createdAt).toISOString().split('T')[0],
    total: order.totalAmount,
    status: order.status
        ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
        : 'Pending',
    // Store items as array for multi-line display
    itemsList: order.items
        ? order.items.map(item => `${item.productName || 'Product'} (x${item.quantity})`)
        : [],
    // Shipping details from checkout
    shippingAddress: order.shippingAddress || null,
    userId: order.userId || null
});

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders on mount
    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            try {
                const data = await adminAPI.getAllOrders();
                setOrders(data.map(transformOrder));
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    // Update order status
    const updateOrderStatus = useCallback(async (order, newStatus) => {
        const result = await adminAPI.updateOrderStatus(order.id, newStatus.toLowerCase());

        if (result.success) {
            setOrders(prev => prev.map(o =>
                o.id === order.id ? { ...o, status: newStatus } : o
            ));
            return { success: true };
        }
        return { success: false, error: result.error || 'Unknown error' };
    }, []);

    return {
        orders,
        loading,
        updateOrderStatus
    };
}


