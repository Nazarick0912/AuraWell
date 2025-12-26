import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Minus, Plus, ArrowRight, ShoppingBag, Leaf, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function CartDrawer({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cart, addToCart, removeFromCart, loading } = useCart();
    
    const [itemToDelete, setItemToDelete] = useState(null);

    // Get cart items from context or use empty array
    const cartItems = cart?.items || [];

    // --- HELPER LOGIC ---
    const subtotal = cartItems.reduce((total, item) => {
        // If we have price info from backend, use it
        const price = item.price || 0;
        return total + (price * item.quantity);
    }, 0);

    // This is the amount of purchase needed to get the free shipping (RM100)
    const freeShippingThreshold = 100;
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

    const updateQty = async (productId, change) => {
        if (change > 0) {
            await addToCart(productId, change);
        } else if (change < 0) {
            // For decreasing, we'll need to handle this differently
            // For now, we can add negative (the backend should handle this)
            await addToCart(productId, change);
        }
    };

    const requestRemove = (productId) => {
        setItemToDelete(productId);
    };

    const confirmRemove = async () => {
        if (itemToDelete) {
            await removeFromCart(itemToDelete);
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

    const handleLogin = () => {
        onClose();
        navigate('/login');
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

                    {/* --- NOT LOGGED IN STATE --- */}
                    {!user ? (
                        <div className="flex flex-col items-center justify-center h-full text-center pb-20">
                            <div className="w-24 h-24 bg-gradient-to-br from-cream-100 to-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-white">
                                <ShoppingBag size={32} className="text-sage-400 opacity-80 ml-1" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-sage-900 mb-2">
                                Sign in to view your cart
                            </h3>
                            <p className="text-sage-500 max-w-[250px] mx-auto mb-8 leading-relaxed text-sm">
                                Login to add items and manage your shopping cart.
                            </p>
                            <button
                                onClick={handleLogin}
                                className="bg-sage-900 text-cream-50 px-8 py-3.5 rounded-full font-medium text-sm hover:bg-sage-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                            >
                                Sign In <ArrowRight size={16} />
                            </button>
                        </div>
                    ) : loading ? (
                        // Loading state
                        <div className="flex flex-col items-center justify-center h-full text-center pb-20">
                            <div className="w-8 h-8 border-2 border-sage-300 border-t-sage-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-sage-500">Loading cart...</p>
                        </div>
                    ) : cartItems.length === 0 ? (
                        // --- EMPTY STATE ---
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
                            <div key={item.productId} className="flex gap-4 group bg-white p-4 rounded-2xl border border-transparent hover:border-sage-200 hover:shadow-sm transition-all duration-300">
                                {/* Image placeholder or actual image */}
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.productName || 'Product'}
                                            className="h-full w-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <ShoppingBag size={24} className="text-sage-300" />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex flex-1 flex-col justify-between py-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h3 className="text-base font-bold text-sage-900 leading-tight">
                                                {item.productName || `Product #${item.productId}`}
                                            </h3>
                                            <p className="text-xs text-sage-500 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        {item.price && (
                                            <p className="font-bold text-sage-900 text-sm">
                                                RM {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        )}
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center bg-stone-50 rounded-lg border border-stone-200 h-8">
                                            <button
                                                onClick={() => updateQty(item.productId, -1)}
                                                className="w-8 h-full flex items-center justify-center text-sage-500 hover:text-sage-900 hover:bg-white rounded-l-lg transition-colors"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold text-sage-900">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQty(item.productId, 1)}
                                                className="w-8 h-full flex items-center justify-center text-sage-500 hover:text-sage-900 hover:bg-white rounded-r-lg transition-colors"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => requestRemove(item.productId)}
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
                {user && cartItems.length > 0 && (
                    <div className="border-t border-stone-100 p-6 bg-white">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm text-sage-600">
                                <p>Subtotal</p>
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
                                RM {subtotal.toFixed(2)} <ArrowRight size={16} />
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
