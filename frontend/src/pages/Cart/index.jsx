import React from 'react';
import { useCart } from '../../context/CartContext'; 
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
    { id: "169cd55c-6a61-473e-8b2e-c509e379fad2", name: "Vitamin D3 1000IU", price: 24.99 },
    { id: "2", name: "Kids Multivitamin Gummies", price: 19.99 },
    { id: "3", name: "Omega-3 Fish Oil", price: 29.99 },
    { id: "4", name: "Lavender Essential Oil", price: 18.99 },
];

export default function Cart() {
    const { cart, loading, addToCart, removeFromCart, clearCart } = useCart(); 

    const cartItems = cart?.items.map(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        return {
            ...product,
            quantity: item.quantity,
            itemTotal: (product?.price || 0) * item.quantity
        };
    }) || [];

    const grandTotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);

    // New logic to handle deducting items
    const handleDeduct = (itemId, currentQuantity) => {
        if (currentQuantity > 1) {
            // If more than 1, send -1 to the backend to reduce count
            addToCart(itemId, -1);
        } else {
            // If only 1 left, remove the item entirely
            removeFromCart(itemId);
        }
    };

    const handleCheckout = () => {
        alert("Order Placed Successfully! Your wellness journey continues.");
        clearCart();
    };

    if (loading) return <div className="p-20 text-center">Loading your cart...</div>;

    if (!cart || cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-bold text-sage-800">Your cart is empty</h2>
                <Link to="/Products" className="text-sage-600 underline mt-4 block">Go Shopping</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-sage-800 mb-8">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-cream-200">
                            <div className="flex gap-4 items-center">
                                <button onClick={() => removeFromCart(item.id)} className="p-2 text-sage-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div>
                                    <h3 className="font-semibold text-sage-800">{item.name}</h3>
                                    <p className="text-sage-500">RM{item.price}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-cream-200 rounded-lg">
                                    {/* FIXED: Added onClick for Minus button */}
                                    <button 
                                        onClick={() => handleDeduct(item.id, item.quantity)}
                                        className="p-2 hover:bg-cream-50 transition"
                                    >
                                        <Minus className="w-4 h-4"/>
                                    </button>
                                    
                                    <span className="px-3 min-w-[30px] text-center">{item.quantity}</span>
                                    
                                    <button 
                                        onClick={() => addToCart(item.id, 1)} 
                                        className="p-2 hover:bg-cream-50 transition"
                                    >
                                        <Plus className="w-4 h-4"/>
                                    </button>
                                </div>
                                <p className="font-bold w-20 text-right text-sage-900">RM{item.itemTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="bg-sage-50 p-8 rounded-3xl h-fit border border-sage-100">
                    <h2 className="text-xl font-bold mb-4 text-sage-800">Summary</h2>
                    <div className="flex justify-between text-xl font-bold border-t border-sage-200 pt-4 text-sage-900">
                        <span>Total</span><span>RM{grandTotal.toFixed(2)}</span>
                    </div>
                    <button onClick={handleCheckout} className="w-full btn-primary mt-8 py-4">Checkout</button>
                </div>
            </div>
        </div>
    );
}