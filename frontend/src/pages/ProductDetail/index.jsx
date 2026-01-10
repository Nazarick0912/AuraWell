import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, CheckCircle, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { productsAPI } from '../../services/api';
import { AGE_GROUPS } from '../../constants/ageGroups';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    // Fetch Product Data from API
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await productsAPI.getById(id);
                if (data) {
                    // Transform backend data to match frontend expected format
                    const transformedProduct = {
                        ...data,
                        image: data.imageUrl || data.image,
                    };
                    setProduct(transformedProduct);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#3A4D39] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sage-600 font-medium">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-bold text-sage-800 mb-2">{error || 'Product not found'}</p>
                    <Link to="/products" className="text-[#3A4D39] font-medium hover:underline">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const handleQuantityChange = (change) => {
        const newQty = quantity + change;
        if (newQty >= 1 && newQty <= product.stock) {
            setQuantity(newQty);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsAdding(true);
        const success = await addToCart(product.id, quantity);

        setIsAdding(false);

        if (success) {
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000); // Reset button after 2 seconds
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-sage-900 pt-10 pb-20">
            <div className="max-w-6xl mx-auto px-6">

                <Link to="/products" className="inline-flex items-center gap-2 text-sage-600 hover:text-[#3A4D39] font-bold mb-8 transition-colors">
                    <ArrowLeft size={18} /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: Image */}
                    <div className="bg-white p-2 rounded-3xl shadow-sm border border-stone-100">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-stone-50">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/productCard/placeholder.jpg';
                                    e.target.onerror = null;
                                }}
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Details */}
                    <div>
                        <span className="inline-block bg-[#FFF8E1] text-[#B45309] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                            {product.category}
                        </span>

                        <h1 className="font-display text-4xl font-bold text-[#3A4D39] mb-2">{product.name}</h1>
                        <p className="text-2xl font-bold text-sage-900 mb-6">RM {product.price.toFixed(2)}</p>
                        <p className="text-sage-600 leading-relaxed mb-8">{product.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-stone-100">
                                <span className="block text-xs text-sage-400 font-bold uppercase mb-1">Suitable For</span>
                                <span className="font-medium text-sage-900">
                                    {AGE_GROUPS.find(g => g.value === product.ageGroup)?.label || product.ageGroup}
                                </span>
                            </div>
                            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-stone-100">
                                <span className="block text-xs text-sage-400 font-bold uppercase mb-1">Stock Availability</span>
                                <div className="flex flex-col">
                                    <span className={`font-bold flex items-center gap-1.5 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {product.stock > 0 ? <><CheckCircle size={14} /> In Stock</> : "Out of Stock"}
                                    </span>

                                    {product.stock > 0 && (
                                        <span className="text-xs text-sage-600 mt-1 font-medium">
                                            {product.stock} units available
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {product.stock > 0 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-sage-700 mb-2">Quantity</label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                                            <button
                                                onClick={() => handleQuantityChange(-1)}
                                                className="p-3 text-sage-600 hover:bg-stone-50 disabled:opacity-50"
                                                disabled={quantity <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(1)}
                                                className="p-3 text-sage-600 hover:bg-stone-50 disabled:opacity-50"
                                                disabled={quantity >= product.stock}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <span className="text-sm text-sage-500">
                                            Subtotal: <span className="font-bold text-sage-900">RM {(product.price * quantity).toFixed(2)}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* ADD TO CART BUTTON WITH FEEDBACK */}
                                {user ? (
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdding}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                                            ${justAdded
                                                ? "bg-emerald-600 text-white"
                                                : "bg-[#3A4D39] text-white hover:bg-[#2F4030] hover:shadow-lg hover:-translate-y-0.5"
                                            }
                                            ${isAdding ? "opacity-80 cursor-wait" : ""}
                                        `}
                                    >
                                        {justAdded ? (
                                            <> <Check size={20} /> Added to Cart! </>
                                        ) : isAdding ? (
                                            "Adding..."
                                        ) : (
                                            <> <ShoppingCart size={20} /> Add to Cart </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="text-center">
                                        <button
                                            disabled
                                            className="w-full py-4 bg-stone-200 text-stone-400 rounded-xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-2 mb-2"
                                        >
                                            <ShoppingCart size={20} /> Add to Cart
                                        </button>
                                        <p className="text-xs text-sage-500">
                                            <Link to="/login" className="font-bold underline text-[#3A4D39]">Sign in</Link> to add items to your cart
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}