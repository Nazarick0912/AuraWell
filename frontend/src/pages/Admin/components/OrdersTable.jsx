import { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

export default function OrdersTable() {
    // --- STATE ---
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Dummy Data
    const [orders, setOrders] = useState([
        { id: "ORD-001", customer: "Alex Tan", date: "2025-12-26", total: 120.50, status: "Processing", items: "Lavender Oil (x2), Vitamin C" },
        { id: "ORD-002", customer: "Sarah Lee", date: "2025-12-25", total: 45.00, status: "Delivered", items: "Magnesium Sleep Blend" },
        { id: "ORD-003", customer: "Kyzer Lim", date: "2025-12-24", total: 24.00, status: "Shipped", items: "Lavender Oil" },
        { id: "ORD-004", customer: "Ivan Teoh", date: "2025-12-20", total: 210.00, status: "Cancelled", items: "Premium Vitamin C (x3)" },
    ]);

    // --- HANDLERS ---
    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        setOpenDropdownId(null);
    };

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

    return (
        <div className="space-y-3 pb-20">

            {/* --- DESKTOP VIEW (Grid) --- */}
            <div className="hidden lg:block overflow-visible rounded-xl border border-stone-200 shadow-sm bg-white">

                {/* Table Header */}
                <div className="bg-[#F9F7F2] text-sm font-bold text-sage-700 border-b border-stone-100 rounded-t-xl">
                    <div className="grid grid-cols-[100px_1fr_120px_1.5fr_100px_140px] items-center gap-4 px-4 py-3">
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Date</div>
                        <div>Items</div>
                        <div>Total</div>
                        <div>Status</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-stone-100">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="grid grid-cols-[100px_1fr_120px_1.5fr_100px_140px] items-center gap-4 px-4 py-3 hover:bg-stone-50 transition-colors relative"
                        >
                            {/* Columns */}
                            <div className="font-bold text-[#3A4D39] text-sm">{order.id}</div>
                            <div className="text-sm font-medium text-sage-900">{order.customer}</div>
                            <div className="text-sm text-sage-500">{order.date}</div>
                            <div className="text-sm text-sage-600 truncate">{order.items}</div>
                            <div className="text-sm font-bold text-sage-900">RM {order.total.toFixed(2)}</div>

                            {/* Status Dropdown Trigger */}
                            <div className="relative status-dropdown-container">
                                <StatusButton
                                    order={order}
                                    isOpen={openDropdownId === order.id}
                                    onToggle={() => toggleDropdown(order.id)}
                                />

                                {/* Dropdown Menu (Conditionally Rendered) */}
                                {openDropdownId === order.id && (
                                    <StatusMenu
                                        currentStatus={order.status}
                                        onSelect={(newStatus) => handleStatusChange(order.id, newStatus)}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MOBILE VIEW (Cards) --- */}
            <div className="lg:hidden space-y-3">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 relative">

                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-[#3A4D39]">{order.id}</h3>
                                <p className="text-xs text-sage-500">{order.date}</p>
                            </div>
                            <span className="font-bold text-sage-900">RM {order.total.toFixed(2)}</span>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-medium text-sage-900 mb-1">{order.customer}</p>
                            <p className="text-xs text-sage-600 line-clamp-2">{order.items}</p>
                        </div>

                        {/* Mobile Status Dropdown */}
                        <div className="relative status-dropdown-container">
                            <StatusButton
                                order={order}
                                isOpen={openDropdownId === order.id}
                                onToggle={() => toggleDropdown(order.id)}
                                isMobile={true}
                            />

                            {openDropdownId === order.id && (
                                <StatusMenu
                                    currentStatus={order.status}
                                    onSelect={(newStatus) => handleStatusChange(order.id, newStatus)}
                                    isMobile={true}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {orders.length === 0 && (
                <div className="text-center py-12 text-sage-400">
                    <p>No orders found.</p>
                </div>
            )}
        </div>
    );
}

// --- SUB-COMPONENTS ---

function StatusButton({ order, isOpen, onToggle, isMobile = false }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Processing': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
            case 'Shipped': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            case 'Delivered': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
            case 'Cancelled': return 'bg-red-50 text-red-600 hover:bg-red-100';
            default: return 'bg-stone-100 text-stone-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing': return <Clock size={14} />;
            case 'Shipped': return <Truck size={14} />;
            case 'Delivered': return <CheckCircle size={14} />;
            case 'Cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    return (
        <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all justify-between
                ${isMobile ? 'w-full py-2' : 'w-full'}
                ${getStatusStyle(order.status)}
            `}
        >
            <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                {order.status}
            </div>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}/>
        </button>
    );
}

function StatusMenu({ currentStatus, onSelect, isMobile = false }) {
    const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing': return <Clock size={14} />;
            case 'Shipped': return <Truck size={14} />;
            case 'Delivered': return <CheckCircle size={14} />;
            case 'Cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    return (
        <div className={`
            absolute z-50 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100
            ${isMobile ? 'left-0 right-0 top-full mt-2' : 'right-0 top-full mt-2 w-40'}
        `}>
            {statusOptions.map((option) => (
                <button
                    key={option}
                    onClick={() => onSelect(option)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2 hover:bg-stone-50 transition-colors
                        ${currentStatus === option ? 'text-[#3A4D39] bg-stone-50' : 'text-sage-600'}
                    `}
                >
                    {getStatusIcon(option)}
                    {option}
                </button>
            ))}
        </div>
    );
}