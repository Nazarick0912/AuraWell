import { useState, useEffect } from 'react';
import { Pencil, Trash2, MoreHorizontal, Loader2 } from 'lucide-react';

export default function ProductTable({ products, loading, onEdit, onDelete }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-menu-container')) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleAction = (action, product) => {
        action(product);
        setOpenMenuId(null);
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#3A4D39]" />
                <span className="ml-3 text-sage-600">Loading products...</span>
            </div>
        );
    }

    // Empty state
    if (products.length === 0) {
        return (
            <div className="text-center py-12 text-sage-400">
                <p>No products found.</p>
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
                        style={{ gridTemplateColumns: '1fr 120px 100px 100px 90px' }}
                    >
                        <div>Product</div>
                        <div>Category</div>
                        <div>Price</div>
                        <div>Stock</div>
                        <div className="text-right">Actions</div>
                    </div>
                </div>

                {/* Body */}
                <div className="divide-y divide-stone-100">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="grid items-center gap-4 px-4 py-3 hover:bg-stone-50 transition-colors relative"
                            style={{ gridTemplateColumns: '1fr 120px 100px 100px 90px' }}
                        >
                            {/* Product Name + Image */}
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden border border-stone-100 shrink-0">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-sage-900 text-sm truncate">{product.name}</h3>
                            </div>

                            {/* Category */}
                            <span className="text-sm text-sage-600 truncate">{product.category}</span>

                            {/* Price */}
                            <span className="text-sm font-bold text-sage-900">RM {product.price.toFixed(2)}</span>

                            {/* Stock */}
                            <span className={`text-sm ${product.stock < 5 ? 'text-amber-600 font-bold' : 'text-sage-600'}`}>
                                {product.stock}
                            </span>

                            {/* Actions */}
                            <div className="flex justify-end">
                                <div className="relative action-menu-container">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleMenu(product.id); }}
                                        className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                                            openMenuId === product.id
                                                ? 'bg-stone-100 text-[#3A4D39]'
                                                : 'text-stone-400 hover:text-[#3A4D39] hover:bg-stone-50'
                                        }`}
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>

                                    {openMenuId === product.id && (
                                        <div className="absolute top-12 right-0 w-48 bg-white border border-stone-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleAction(onEdit, product); }}
                                                className="w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2 min-h-[44px] transition-colors text-sage-700 hover:bg-stone-100"
                                            >
                                                <Pencil size={16} />
                                                Edit Product
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleAction(onDelete, product); }}
                                                className="w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2 min-h-[44px] transition-colors border-t border-stone-200 text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 relative">
                        <div className="flex items-start gap-3">
                            {/* Product Image */}
                            <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden border border-stone-100 shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0 pr-10">
                                <h3 className="font-bold text-sage-900 text-sm truncate mb-1">{product.name}</h3>
                                <p className="text-xs text-sage-500 mb-2">{product.category}</p>

                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-bold text-sage-900">RM {product.price.toFixed(2)}</span>
                                    <span className={`text-xs ${product.stock < 5 ? 'text-amber-600 font-bold' : 'text-sage-500'}`}>
                                        Stock: {product.stock}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Actions Button */}
                        <div className="absolute top-4 right-4 action-menu-container">
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleMenu(product.id); }}
                                className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                                    openMenuId === product.id
                                        ? 'bg-stone-100 text-[#3A4D39]'
                                        : 'text-stone-400 hover:text-[#3A4D39] hover:bg-stone-50'
                                }`}
                            >
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {/* Mobile Action Menu */}
                        {openMenuId === product.id && (
                            <div className="mt-3 w-full bg-stone-50 rounded-lg overflow-hidden">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleAction(onEdit, product); }}
                                    className="w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2 min-h-[44px] transition-colors text-sage-700 hover:bg-stone-100"
                                >
                                    <Pencil size={16} />
                                    Edit Product
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleAction(onDelete, product); }}
                                    className="w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2 min-h-[44px] transition-colors border-t border-stone-200 text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}


