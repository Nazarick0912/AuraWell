import React from 'react';
import { Package } from 'lucide-react';

export default function OrderCard({ order }) {
    //helper to format the timestamp
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-MY', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
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
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1 ${
                        order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {order.status}
                    </span>
                    <p className="text-xs text-sage-400">{formatDate(order.createdAt)}</p>
                </div>
            </div>

            {/* order body */}
            <div className="p-6">
                <div className="mb-6 space-y-3">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-sage-700 font-medium">
                                {item.productName} <span className="text-sage-400">× {item.quantity}</span>
                            </span>
                            {/* fixed: using priceAtPurchase to match orders.json */}
                            <span className="font-bold text-sage-900">RM {(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
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
                        <span className="font-bold text-[#3A4D39]">RM {order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}