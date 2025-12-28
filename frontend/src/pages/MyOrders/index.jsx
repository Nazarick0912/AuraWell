import React, { useState, useEffect } from 'react';
import { Package, Loader2 } from 'lucide-react';
import { ordersAPI } from '../../services/api'; //kz's centralized api
import OrderCard from './components/OrderCard'; //new component

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersAPI.getOrders();
                //sort by newest first
                const sortedOrders = data.sort((a, b) => b.createdAt - a.createdAt);
                setOrders(sortedOrders);
            } catch (err) {
                console.error("failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-sage-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-12 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-display text-4xl font-bold text-[#3A4D39] mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                        <Package className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                        <p className="text-sage-500 font-medium">you haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}