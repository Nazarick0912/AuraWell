import React, { useState, useEffect } from 'react';
import { Package, Loader2 } from 'lucide-react';
import { ordersAPI } from '../../services/api'; //use kz api layer

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    //fetch order when the page load
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersAPI.getOrders();
                //sort by newest first using the timestamp from order.java
                const sortedOrders = data.sort((a, b) => b.createdAt - a.createdAt);
                setOrders(sortedOrders);
            } catch (err) {
                console.error("failed to load orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    //helper to format the timestamp into something readable
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-MY', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
                <Loader2 className="w-8 h-8 animate-spin text-sage-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-12 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-display text-4xl font-bold text-[#3A4D39] mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
                        <Package className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                        <p className="text-sage-500">you haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                                {/* order header */}
                                <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-sage-500">
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-sage-400 uppercase font-bold tracking-wider">Order ID</p>
                                            <p className="font-mono text-sage-700 text-sm">{order.id.substring(0, 8)}...</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <span className="bg-[#FFF8E1] text-[#B45309] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                                            {order.status}
                                        </span>
                                        {/* using the real timestamp from backend */}
                                        <p className="text-xs text-sage-400">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>

                                {/* order body */}
                                <div className="p-6">
                                    <div className="mb-6 space-y-3">
                                        {/* mapping items from order.java model */}
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-sm">
                                                <span className="text-sage-700 font-medium">
                                                    {item.name} <span className="text-sage-400">× {item.quantity}</span>
                                                </span>
                                                {/* price per item at time of purchase */}
                                                <span className="font-bold text-sage-900">RM {item.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-stone-100 w-full mb-4"></div>

                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                                        <div className="max-w-md">
                                            <p className="text-xs text-sage-400 mb-1">Ship to:</p>
                                            <p className="text-sm text-sage-600 leading-relaxed">{order.shippingAddress}</p>
                                        </div>

                                        <div className="flex items-center gap-4 text-xl">
                                            <span className="text-sage-500 text-base">Total</span>
                                            {/* maps to totalAmount in java model */}
                                            <span className="font-bold text-[#3A4D39]">RM {order.totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}