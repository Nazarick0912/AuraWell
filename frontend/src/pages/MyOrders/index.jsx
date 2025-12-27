import { Package } from 'lucide-react';

export default function MyOrders() {
    // Dummy Data
    const orders = [
        {
            id: "9fc96c9a-9c35-4cbd-a050-3480995766a2",
            date: "27 December 2025 at 07:13 pm",
            status: "Pending",
            items: [
                { name: "Senior Calcium Plus", qty: 1, price: 34.99 }
            ],
            shippingAddress: "John, 2323, USM, Gelugor, Pulau Pinang 11800",
            total: 34.99
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-12 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-display text-4xl font-bold text-[#3A4D39] mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">

                            {/* Order Header */}
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
                                    <p className="text-xs text-sage-400">{order.date}</p>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-6">
                                {/* Items List */}
                                <div className="mb-6 space-y-3">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm">
                                            <span className="text-sage-700 font-medium">
                                                {item.name} <span className="text-sage-400">× {item.qty}</span>
                                            </span>
                                            <span className="font-bold text-sage-900">RM {item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-px bg-stone-100 w-full mb-4"></div>

                                {/* Shipping & Total */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                                    <div className="max-w-md">
                                        <p className="text-xs text-sage-400 mb-1">Ship to:</p>
                                        <p className="text-sm text-sage-600 leading-relaxed">{order.shippingAddress}</p>
                                    </div>

                                    <div className="flex items-center gap-4 text-xl">
                                        <span className="text-sage-500 text-base">Total</span>
                                        <span className="font-bold text-[#3A4D39]">RM {order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}