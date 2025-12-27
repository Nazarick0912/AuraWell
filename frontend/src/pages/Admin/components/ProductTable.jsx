import { MoreHorizontal, Pencil, Trash2, FileText, Power } from 'lucide-react';

export default function ProductTable({ 
    products, 
    openActionMenuId, 
    onToggleActionMenu, 
    onEdit, 
    onToggleStatus, 
    onDelete 
}) {
    return (
        <div className="space-y-3 pb-20">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-hidden rounded-xl border border-stone-200 shadow-sm">
                {/* Table Header */}
                <div className="bg-[#F9F7F2] text-sm font-bold text-sage-700">
                    <div className="grid grid-cols-[1fr_110px_100px_100px_100px_90px] items-center gap-4 px-4 py-3">
                        <div>Product</div>
                        <div>Category</div>
                        <div>Status</div>
                        <div>Price</div>
                        <div>Stock</div>
                        <div className="text-right">Actions</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="bg-white divide-y divide-stone-100">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="grid grid-cols-[1fr_110px_100px_100px_100px_90px] items-center gap-4 px-4 py-3 hover:bg-stone-50 transition-colors relative"
                        >
                            {/* Product (Image + Name) */}
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden border border-stone-100 flex-shrink-0">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-sage-900 text-sm truncate">{product.name}</h3>
                            </div>

                            {/* Category */}
                            <div className="text-sm text-sage-600 truncate">{product.category}</div>

                            {/* Status Badge */}
                            <div>
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                                    product.status === 'Active' ? 'bg-green-100 text-green-800' :
                                    product.status === 'Draft' ? 'bg-stone-100 text-stone-600' : 'bg-red-100 text-red-800'
                                }`}>
                                    {product.status}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="text-sm font-bold text-sage-900">RM {product.price.toFixed(2)}</div>

                            {/* Stock */}
                            <div className="text-sm">
                                <span className={`${product.stock < 5 ? 'text-amber-600 font-bold' : 'text-sage-600'}`}>
                                    {product.stock}
                                </span>
                            </div>

                            {/* Actions Dropdown */}
                            <div className="flex justify-end relative">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onToggleActionMenu(product.id); }}
                                    className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                                        openActionMenuId === product.id 
                                            ? 'bg-stone-100 text-[#3A4D39]' 
                                            : 'text-stone-400 hover:text-[#3A4D39] hover:bg-stone-50'
                                    }`}
                                >
                                    <MoreHorizontal size={20} />
                                </button>

                                {openActionMenuId === product.id && (
                                    <ActionMenu 
                                        product={product}
                                        onEdit={onEdit}
                                        onToggleStatus={onToggleStatus}
                                        onDelete={onDelete}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 relative"
                    >
                        <div className="flex items-start gap-3">
                            {/* Product Image */}
                            <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden border border-stone-100 flex-shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sage-900 text-sm truncate mb-1">{product.name}</h3>
                                <p className="text-xs text-sage-500 mb-2">{product.category}</p>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                                        product.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        product.status === 'Draft' ? 'bg-stone-100 text-stone-600' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.status}
                                    </span>
                                    <span className="text-sm font-bold text-sage-900">RM {product.price.toFixed(2)}</span>
                                    <span className={`text-xs ${product.stock < 5 ? 'text-amber-600 font-bold' : 'text-sage-500'}`}>
                                        Stock: {product.stock}
                                    </span>
                                </div>
                            </div>

                            {/* Actions Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleActionMenu(product.id); }}
                                className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                                    openActionMenuId === product.id 
                                        ? 'bg-stone-100 text-[#3A4D39]' 
                                        : 'text-stone-400 hover:text-[#3A4D39] hover:bg-stone-50'
                                }`}
                            >
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {openActionMenuId === product.id && (
                            <ActionMenu 
                                product={product}
                                onEdit={onEdit}
                                onToggleStatus={onToggleStatus}
                                onDelete={onDelete}
                                isMobile={true}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ActionMenu({ product, onEdit, onToggleStatus, onDelete, isMobile = false }) {
    const baseClasses = isMobile 
        ? "mt-3 w-full bg-stone-50 rounded-lg overflow-hidden"
        : "absolute top-12 right-0 w-48 bg-white border border-stone-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100";

    return (
        <div className={baseClasses}>
            <button
                onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-sage-700 hover:bg-stone-100 flex items-center gap-2 min-h-[44px]"
            >
                <Pencil size={16} /> Edit Product
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onToggleStatus(product.id); }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-sage-700 hover:bg-stone-100 flex items-center gap-2 border-t border-stone-200 min-h-[44px]"
            >
                {product.status === 'Active' ? (
                    <><FileText size={16} /> Set to Draft</>
                ) : (
                    <><Power size={16} className="text-green-600" /> Activate</>
                )}
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onDelete(product.id, product.name); }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-stone-200 min-h-[44px]"
            >
                <Trash2 size={16} /> Delete
            </button>
        </div>
    );
}