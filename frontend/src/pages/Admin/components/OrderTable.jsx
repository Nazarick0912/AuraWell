import { useState, useEffect } from 'react';
import { Clock, Truck, CheckCircle, XCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const STATUS_OPTIONS = [
    { value: 'Processing', label: 'Processing', icon: <Clock size={14} />, style: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { value: 'Shipped', label: 'Shipped', icon: <Truck size={14} />, style: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { value: 'Delivered', label: 'Delivered', icon: <CheckCircle size={14} />, style: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
    { value: 'Cancelled', label: 'Cancelled', icon: <XCircle size={14} />, style: 'bg-red-50 text-red-600 hover:bg-red-100' }
];

export default function OrderTable({ orders, loading, onStatusChange }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

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

    const toggleExpanded = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
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
                        style={{ gridTemplateColumns: '30px 100px 1fr 120px 100px 140px' }}
                    >
                        <div></div>
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Date</div>
                        <div>Total</div>
                        <div>Status</div>
                    </div>
                </div>

                {/* Body */}
                <div className="divide-y divide-stone-100">
                    {orders.map((order) => (
                        <div key={order.id}>
                            {/* Order Row */}
                            <div
                                className="grid items-center gap-4 px-4 py-3 hover:bg-stone-50 transition-colors relative cursor-pointer"
                                style={{ gridTemplateColumns: '30px 100px 1fr 120px 100px 140px' }}
                                onClick={() => toggleExpanded(order.id)}
                                title="Click to view details"
                            >
                                {/* Expand Icon */}
                                <div className="text-sage-400">
                                    {expandedOrderId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                {/* Order ID */}
                                <span className="font-bold text-[#3A4D39] text-sm whitespace-nowrap" title={order.id}>
                                    {order.id.length > 8 ? `${order.id.substring(0, 8)}...` : order.id}
                                </span>

                                {/* Customer */}
                                <span className="text-sm font-medium text-sage-900 break-words">{order.customer}</span>

                                {/* Date */}
                                <span className="text-sm text-sage-500 whitespace-nowrap">{order.date}</span>

                                {/* Total */}
                                <span className="text-sm font-bold text-sage-900 whitespace-nowrap">RM {order.total.toFixed(2)}</span>

                                {/* Status */}
                                <div onClick={(e) => e.stopPropagation()}>
                                    <StatusDropdown order={order} />
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedOrderId === order.id && (
                                <div className="px-4 py-4 bg-stone-50 border-t border-stone-100">
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Order Items */}
                                        <div>
                                            <h4 className="text-sm font-bold text-sage-800 mb-2">Order Items</h4>
                                            <div className="space-y-1">
                                                {order.itemsList && order.itemsList.length > 0 ? (
                                                    order.itemsList.map((item, idx) => (
                                                        <div key={idx} className="text-sm text-sage-600 py-1 border-b border-stone-200 last:border-0">
                                                            {item}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-sage-400">No items</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Order Info */}
                                        <div>
                                            <h4 className="text-sm font-bold text-sage-800 mb-2">Order Information</h4>
                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="text-sage-500">Order ID: </span>
                                                    <span className="text-sage-800 font-medium">{order.id}</span>
                                                </div>
                                                <div>
                                                    <span className="text-sage-500">Customer: </span>
                                                    <span className="text-sage-800 font-medium">{order.customer}</span>
                                                </div>
                                                <div>
                                                    <span className="text-sage-500">Date: </span>
                                                    <span className="text-sage-800 font-medium">{order.date}</span>
                                                </div>
                                                <div>
                                                    <span className="text-sage-500">Total: </span>
                                                    <span className="text-sage-800 font-bold">RM {order.total.toFixed(2)}</span>
                                                </div>
                                                {order.shippingAddress && (
                                                    <div>
                                                        <span className="text-sage-500">Shipping: </span>
                                                        <span className="text-sage-800 font-medium">{order.shippingAddress}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        {/* Clickable Header */}
                        <div
                            className="p-4 cursor-pointer"
                            onClick={() => toggleExpanded(order.id)}
                            title="Click to view details"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="text-sage-400">
                                        {expandedOrderId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#3A4D39]" title={order.id}>
                                            {order.id.length > 8 ? `${order.id.substring(0, 8)}...` : order.id}
                                        </h3>
                                        <p className="text-xs text-sage-500">{order.date}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-sage-900">RM {order.total.toFixed(2)}</span>
                            </div>

                            <p className="text-sm font-medium text-sage-900 mb-2">{order.customer}</p>
                        </div>

                        {/* Expanded Details */}
                        {expandedOrderId === order.id && (
                            <div className="px-4 py-4 bg-stone-50 border-t border-stone-100">
                                <h4 className="text-sm font-bold text-sage-800 mb-2">Order Items</h4>
                                <div className="space-y-1 mb-4">
                                    {order.itemsList && order.itemsList.length > 0 ? (
                                        order.itemsList.map((item, idx) => (
                                            <div key={idx} className="text-sm text-sage-600 py-1 border-b border-stone-200 last:border-0">
                                                {item}
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-sm text-sage-400">No items</span>
                                    )}
                                </div>

                                {order.shippingAddress && (
                                    <div className="text-sm mb-4">
                                        <span className="text-sage-500">Shipping: </span>
                                        <span className="text-sage-800 font-medium">{order.shippingAddress}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile Status Dropdown - always visible */}
                        <div className="px-4 pb-4" onClick={(e) => e.stopPropagation()}>
                            <StatusDropdown order={order} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


