import { useState, useEffect } from 'react';
import { Clock, Truck, CheckCircle, XCircle, ChevronDown, Loader2 } from 'lucide-react';

const STATUS_OPTIONS = [
    { value: 'Processing', label: 'Processing', icon: <Clock size={14} />, style: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { value: 'Shipped', label: 'Shipped', icon: <Truck size={14} />, style: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { value: 'Delivered', label: 'Delivered', icon: <CheckCircle size={14} />, style: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
    { value: 'Cancelled', label: 'Cancelled', icon: <XCircle size={14} />, style: 'bg-red-50 text-red-600 hover:bg-red-100' }
];

export default function OrderTable({ orders, loading, onStatusChange }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.status-dropdown-container')) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleStatusSelect = (order, newStatus) => {
        onStatusChange(order, newStatus);
        setOpenDropdownId(null);
    };

    // Status dropdown component
    const StatusDropdown = ({ order }) => {
        const currentOption = STATUS_OPTIONS.find(opt => opt.value === order.status);
        const isOpen = openDropdownId === order.id;

        return (
            <div className="relative status-dropdown-container">
                <button
                    onClick={(e) => { e.stopPropagation(); toggleDropdown(order.id); }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all justify-between w-full
                        ${currentOption?.style || 'bg-stone-100 text-stone-600'}
                    `}
                >
                    <div className="flex items-center gap-2">
                        {currentOption?.icon}
                        {currentOption?.label || order.status}
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute z-50 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 right-0 top-full mt-2 w-40">
                        {STATUS_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleStatusSelect(order, option.value)}
                                className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2 hover:bg-stone-50 transition-colors
                                    ${order.status === option.value ? 'text-[#3A4D39] bg-stone-50' : 'text-sage-600'}
                                `}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#3A4D39]" />
                <span className="ml-3 text-sage-600">Loading orders...</span>
            </div>
        );
    }

    // Empty state
    if (orders.length === 0) {
        return (
            <div className="text-center py-12 text-sage-400">
                <p>No orders found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 pb-20">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-visible rounded-xl border border-stone-200 shadow-sm bg-white">
                {/* Header */}
                <div className="bg-[#F9F7F2] text-sm font-bold text-sage-700 border-b border-stone-100 rounded-t-xl">
                    <div 
                        className="grid items-center gap-4 px-4 py-3"
                        style={{ gridTemplateColumns: '100px 1fr 120px 1.5fr 100px 140px' }}
                    >
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Date</div>
                        <div>Items</div>
                        <div>Total</div>
                        <div>Status</div>
                    </div>
                </div>

                {/* Body */}
                <div className="divide-y divide-stone-100">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="grid items-start gap-4 px-4 py-3 hover:bg-stone-50 transition-colors relative"
                            style={{ gridTemplateColumns: '100px 1fr 120px 1.5fr 100px 140px' }}
                        >
                            {/* Order ID - shortened with ellipsis */}
                            <span className="font-bold text-[#3A4D39] text-sm whitespace-nowrap" title={order.id}>
                                {order.id.length > 8 ? `${order.id.substring(0, 8)}...` : order.id}
                            </span>

                            {/* Customer - allows multiple lines */}
                            <span className="text-sm font-medium text-sage-900 break-words">{order.customer}</span>

                            {/* Date */}
                            <span className="text-sm text-sage-500 whitespace-nowrap">{order.date}</span>

                            {/* Items - each item on separate line */}
                            <div className="text-sm text-sage-600">
                                {order.itemsList && order.itemsList.length > 0 ? (
                                    order.itemsList.map((item, idx) => (
                                        <div key={idx}>{item}</div>
                                    ))
                                ) : (
                                    <span>No items</span>
                                )}
                            </div>

                            {/* Total */}
                            <span className="text-sm font-bold text-sage-900 whitespace-nowrap">RM {order.total.toFixed(2)}</span>

                            {/* Status */}
                            <StatusDropdown order={order} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 relative">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-[#3A4D39]" title={order.id}>
                                    {order.id.length > 8 ? `${order.id.substring(0, 8)}...` : order.id}
                                </h3>
                                <p className="text-xs text-sage-500">{order.date}</p>
                            </div>
                            <span className="font-bold text-sage-900">RM {order.total.toFixed(2)}</span>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-medium text-sage-900 mb-1">{order.customer}</p>
                            <div className="text-xs text-sage-600">
                                {order.itemsList && order.itemsList.length > 0 ? (
                                    order.itemsList.map((item, idx) => (
                                        <div key={idx}>{item}</div>
                                    ))
                                ) : (
                                    <span>No items</span>
                                )}
                            </div>
                        </div>

                        {/* Mobile Status Dropdown */}
                        <StatusDropdown order={order} />
                    </div>
                ))}
            </div>
        </div>
    );
}


