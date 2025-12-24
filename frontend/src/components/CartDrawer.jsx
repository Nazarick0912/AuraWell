import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Minus, Plus, ArrowRight, ShoppingBag, Leaf, AlertCircle } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
    const navigate = useNavigate();

    // --- STATE ---
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Organic Lavender Oil",
            price: 24.00,
            image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=200",
            qty: 1
        },
        {
            id: 2,
            name: "Vitamin C Complex",
            price: 32.50,
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200",
            qty: 2
        }
    ]);

    const [itemToDelete, setItemToDelete] = useState(null);

    // --- HELPER LOGIC ---
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

    // This is the amount of purchase needed to get the free shipping (RM100)
    const freeShippingThreshold = 100;
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

    const updateQty = (id, change) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQty = item.qty + change;
                return newQty > 0 ? { ...item, qty: newQty } : item;
            }
            return item;
        }));
    };

    const requestRemove = (id) => {
        setItemToDelete(id);
    };

    const confirmRemove = () => {
        if (itemToDelete) {
            setCartItems(items => items.filter(item => item.id !== itemToDelete));
            setItemToDelete(null);
        }
    };

    const cancelRemove = () => {
        setItemToDelete(null);
    };

    const handleStartShopping = () => {
        onClose();
        navigate('/products');
    };

    if (!isOpen) return null;

    return (
        <div className="relative z-50">
            {/* Dark Backdrop */}
            <div
                className="fixed inset-0 bg-sage-900/40 backdrop-blur-[2px] transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Sliding Drawer */}
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAFAF9] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">

                {/* --- HEADER --- */}
                <div className="px-6 pt-6 pb-4 bg-white border-b border-stone-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display text-2xl font-bold text-sage-900 flex items-center gap-2">
                            Your Cart <span className="text-sm font-sans font-normal text-sage-500 bg-stone-100 px-2 py-0.5 rounded-full">({cartItems.length})</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-stone-400 hover:text-sage-900 transition-colors p-2 hover:bg-stone-100 rounded-full"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Free Shipping Bar */}
                    {cartItems.length > 0 && (
                        <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-500">
                            <p className="text-xs text-sage-600 mb-2 font-medium tracking-wide">
                                {progress < 100
                                    // UPDATED CURRENCY HERE
                                    ? <span>You are <span className="font-bold text-sage-800">RM {(freeShippingThreshold - subtotal).toFixed(2)}</span> away from free shipping.</span>
                                    : <span className="text-emerald-700 font-bold flex items-center gap-1"><Leaf size={12}/> You've unlocked Free Shipping!</span>
                                }
                            </p>
                            <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-sage-800 transition-all duration-700 ease-out rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAF9] relative">

                    {/* --- DELETE POPUP --- */}
                    {itemToDelete && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm p-6 animate-in fade-in duration-200">
                            <div className="bg-white p-6 rounded-2xl shadow-xl border border-stone-100 w-full max-w-sm text-center transform scale-100 animate-in zoom-in-95 duration-200">
                                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle size={24} className="text-red-500" />
                                </div>
                                <h3 className="font-bold text-lg text-sage-900 mb-2">Remove Item?</h3>
                                <p className="text-sage-500 text-sm mb-6">Are you sure you want to remove this item from your cart?</p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={cancelRemove}
                                        className="flex-1 py-2.5 rounded-lg border border-stone-200 text-sage-700 font-medium hover:bg-stone-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmRemove}
                                        className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- EMPTY STATE --- */}
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center pb-20">
                            <div className="w-24 h-24 bg-gradient-to-br from-cream-100 to-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-white">
                                <ShoppingBag size={32} className="text-sage-400 opacity-80 ml-1" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-sage-900 mb-2">
                                Your cart feels a bit light
                            </h3>
                            <p className="text-sage-500 max-w-[250px] mx-auto mb-8 leading-relaxed text-sm">
                                Explore our wellness collection to find your new daily ritual.
                            </p>
                            <button
                                onClick={handleStartShopping}
                                className="bg-sage-900 text-cream-50 px-8 py-3.5 rounded-full font-medium text-sm hover:bg-sage-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                            >
                                Start Shopping <ArrowRight size={16} />
                            </button>
                        </div>
                    ) : (
                        // --- LIST ITEMS ---
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 group bg-white p-4 rounded-2xl border border-transparent hover:border-sage-200 hover:shadow-sm transition-all duration-300">
                                {/* Image */}
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-stone-50 border border-stone-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex flex-1 flex-col justify-between py-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h3 className="text-base font-bold text-sage-900 leading-tight">{item.name}</h3>
                                            <p className="text-xs text-sage-500 mt-1">50ml Bottle</p>
                                        </div>
                                        {/* UPDATED CURRENCY HERE */}
                                        <p className="font-bold text-sage-900 text-sm">RM {(item.price * item.qty).toFixed(2)}</p>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center bg-stone-50 rounded-lg border border-stone-200 h-8">
                                            <button
                                                onClick={() => updateQty(item.id, -1)}
                                                className="w-8 h-full flex items-center justify-center text-sage-500 hover:text-sage-900 hover:bg-white rounded-l-lg transition-colors"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold text-sage-900">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item.id, 1)}
                                                className="w-8 h-full flex items-center justify-center text-sage-500 hover:text-sage-900 hover:bg-white rounded-r-lg transition-colors"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => requestRemove(item.id)}
                                            className="text-xs font-medium text-stone-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                            title="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* --- FOOTER --- */}
                {cartItems.length > 0 && (
                    <div className="border-t border-stone-100 p-6 bg-white">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm text-sage-600">
                                <p>Subtotal</p>
                                {/* UPDATED CURRENCY HERE */}
                                <p className="font-bold text-sage-900">RM {subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-sm text-sage-600">
                                <p>Shipping</p>
                                <p className="font-medium text-sage-900">
                                    {subtotal >= freeShippingThreshold ? 'Free' : 'Calculated at checkout'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                onClose();
                                navigate('/checkout');
                            }}
                            className="w-full flex items-center justify-between rounded-full bg-sage-900 px-6 py-4 text-sm font-bold text-cream-50 shadow-lg hover:bg-sage-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                        >
                            <span>Checkout</span>
                            <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                {/* UPDATED CURRENCY HERE */}
                                RM {subtotal.toFixed(2)} <ArrowRight size={16} />
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}