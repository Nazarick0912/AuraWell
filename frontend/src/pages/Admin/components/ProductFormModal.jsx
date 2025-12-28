import { X, UploadCloud, CheckCircle2 } from 'lucide-react';

export default function ProductFormModal({ 
    isOpen, 
    isEditing, 
    formData, 
    onInputChange, 
    onSubmit, 
    onClose 
}) {
    if (!isOpen) return null;

    const inputClasses = "w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all min-h-[44px]";
    const labelClasses = "block text-xs font-bold text-sage-700 uppercase mb-1.5";

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" 
            onClick={(e) => e.stopPropagation()}
        >
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-sage-900/40 backdrop-blur-sm" 
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-stone-100 px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between z-10">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#3A4D39]">
                        {isEditing ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-stone-400 hover:bg-stone-100 hover:text-sage-700 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="p-4 sm:p-8 space-y-5 sm:space-y-6">
                    {/* Product Name */}
                    <div>
                        <label className={labelClasses}>Product Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={onInputChange} 
                            required 
                            className={inputClasses} 
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className={labelClasses}>Description</label>
                        <textarea 
                            name="description" 
                            rows="3" 
                            value={formData.description} 
                            onChange={onInputChange} 
                            className={`${inputClasses} resize-none`}
                        />
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className={labelClasses}>Price (RM)</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={onInputChange} 
                                required 
                                min="0" 
                                step="0.01" 
                                className={inputClasses} 
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Stock</label>
                            <input 
                                type="number" 
                                name="stock" 
                                value={formData.stock} 
                                onChange={onInputChange} 
                                required 
                                min="0" 
                                className={inputClasses} 
                            />
                        </div>
                    </div>

                    {/* Category, Age Group, Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                            <label className={labelClasses}>Category</label>
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={onInputChange} 
                                className={`${inputClasses} cursor-pointer`}
                            >
                                <option value="Vitamins">Vitamins</option>
                                <option value="Supplements">Supplements</option>
                                <option value="Aromatherapy">Aromatherapy</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Age Group</label>
                            <select
                                name="ageGroup"
                                value={formData.ageGroup}
                                onChange={onInputChange}
                                className={`${inputClasses} cursor-pointer`}
                            >
                                <option value={null}>All Ages</option>
                                <option value="infant">Infants (0-2)</option>
                                <option value="child">Children (3-12)</option>
                                <option value="teen">Teens (13-19)</option>
                                <option value="adult">Adults (20-64)</option>
                                <option value="senior">Seniors (65+)</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Status</label>
                            <select 
                                name="status" 
                                value={formData.status} 
                                onChange={onInputChange} 
                                className={`${inputClasses} cursor-pointer`}
                            >
                                <option value="Active">Active</option>
                                <option value="Draft">Draft</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className={labelClasses}>Product Image</label>
                        <div className="border-2 border-dashed border-stone-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:border-[#3A4D39]/50 hover:bg-stone-50 transition-colors cursor-pointer group">
                            <div className="p-2 bg-stone-100 text-stone-400 rounded-lg mb-2 group-hover:bg-[#3A4D39]/10 group-hover:text-[#3A4D39] transition-colors">
                                <UploadCloud size={20} />
                            </div>
                            <button type="button" className="text-sm font-bold text-sage-700 underline decoration-stone-300 hover:decoration-[#3A4D39] mb-1">
                                Upload Image
                            </button>
                            <p className="text-xs text-sage-400">JPG, PNG, GIF, WebP (max 10MB)</p>
                            <input 
                                type="url" 
                                name="image" 
                                value={formData.image} 
                                onChange={onInputChange} 
                                placeholder="...or paste URL here" 
                                className="mt-3 w-full text-xs p-2 border border-stone-200 rounded focus:border-[#3A4D39] outline-none min-h-[36px]" 
                            />
                        </div>
                    </div>

                    {/* Image Preview */}
                    <div className="h-28 sm:h-32 bg-[#FCFCF9] border border-stone-100 rounded-xl flex flex-col items-center justify-center text-stone-300">
                        {formData.image ? (
                            <img src={formData.image} alt="Preview" className="h-full object-contain" />
                        ) : (
                            <>
                                <div className="mb-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                        <circle cx="9" cy="9" r="2"/>
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                                    </svg>
                                </div>
                                <span className="text-xs">No image uploaded yet</span>
                            </>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 px-5 py-3 bg-[#F5F5F0] text-sage-800 font-bold rounded-lg hover:bg-[#EBEBE5] transition-colors min-h-[48px]"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 px-5 py-3 bg-[#506350] text-white font-bold rounded-lg hover:bg-[#3A4D39] transition-colors flex justify-center items-center gap-2 min-h-[48px]"
                        >
                            <CheckCircle2 size={18} /> {isEditing ? "Save Changes" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}