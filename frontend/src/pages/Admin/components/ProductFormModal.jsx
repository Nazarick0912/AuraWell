import { useState, useRef, useEffect } from 'react';
import { X, UploadCloud, CheckCircle2, Loader2, ImageIcon, Trash2, RefreshCw } from 'lucide-react';
import { 
    uploadImage, 
    validateImageFile, 
    createLocalPreview, 
    revokeLocalPreview,
    isCloudinaryConfigured 
} from '../../../services/imageService';
import { AGE_GROUPS } from '../../../constants/ageGroups';

export default function ProductFormModal({ 
    isOpen, 
    isEditing, 
    formData, 
    onInputChange, 
    onSubmit, 
    onClose 
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [localPreviewUrl, setLocalPreviewUrl] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    // Cleanup local preview URL when component unmounts or file changes
    useEffect(() => {
        return () => {
            if (localPreviewUrl) {
                revokeLocalPreview(localPreviewUrl);
            }
        };
    }, [localPreviewUrl]);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSelectedFile(null);
            setLocalPreviewUrl(null);
            setUploadProgress(0);
            setIsUploading(false);
            setUploadError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const inputClasses = "w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all min-h-[44px]";
    const labelClasses = "block text-xs font-bold text-sage-700 uppercase mb-1.5";

    // Handle file selection
    const handleFileSelect = (file) => {
        setUploadError(null);
        
        const validation = validateImageFile(file);
        if (!validation.valid) {
            setUploadError(validation.error);
            return;
        }

        // Revoke previous preview URL
        if (localPreviewUrl) {
            revokeLocalPreview(localPreviewUrl);
        }

        setSelectedFile(file);
        const previewUrl = createLocalPreview(file);
        setLocalPreviewUrl(previewUrl);
    };

    // Handle file input change
    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    // Handle drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    // Clear selected file and image URL
    const handleClearImage = () => {
        if (localPreviewUrl) {
            revokeLocalPreview(localPreviewUrl);
        }
        setSelectedFile(null);
        setLocalPreviewUrl(null);
        setUploadError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // Also clear the form image URL
        onInputChange({ target: { name: 'image', value: '' } });
    };

    // Handle form submission with image upload
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadError(null);

        let finalImageUrl = formData.image;

        // If there's a selected file, upload it first
        if (selectedFile) {
            if (!isCloudinaryConfigured()) {
                setUploadError('Cloudinary is not configured. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file.');
                return;
            }

            setIsUploading(true);
            setUploadProgress(0);

            const result = await uploadImage(selectedFile, {
                onProgress: setUploadProgress
            });

            setIsUploading(false);

            if (!result.success) {
                setUploadError(result.error);
                return;
            }

            finalImageUrl = result.url;
        }

        // Call the original onSubmit with updated image URL
        const updatedFormData = { ...formData, image: finalImageUrl };
        
        // Create a synthetic event with the updated data
        const syntheticEvent = {
            preventDefault: () => {},
            formData: updatedFormData
        };
        
        onSubmit(syntheticEvent, updatedFormData);
    };

    // Get the preview image URL (local preview takes priority over existing URL)
    const previewImageUrl = localPreviewUrl || formData.image;
    const hasImage = Boolean(previewImageUrl);

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
                        disabled={isUploading}
                        className="p-2 text-stone-400 hover:bg-stone-100 hover:text-sage-700 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-5 sm:space-y-6">
                    {/* Product Name */}
                    <div>
                        <label className={labelClasses}>Product Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={onInputChange} 
                            required 
                            disabled={isUploading}
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
                            disabled={isUploading}
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
                                disabled={isUploading}
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
                                disabled={isUploading}
                                className={inputClasses} 
                            />
                        </div>
                    </div>

                    {/* Category & Age Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className={labelClasses}>Category</label>
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={onInputChange} 
                                disabled={isUploading}
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
                                value={formData.ageGroup || "All"}
                                onChange={onInputChange}
                                disabled={isUploading}
                                className={`${inputClasses} cursor-pointer`}
                            >
                                {AGE_GROUPS.map((group) => (
                                    <option key={group.value} value={group.value}>
                                        {group.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Product Image - Unified Section */}
                    <div>
                        <label className={labelClasses}>Product Image</label>
                        
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleFileInputChange}
                            className="hidden"
                            disabled={isUploading}
                        />

                        {/* Image Display / Upload Zone */}
                        <div 
                            className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-colors
                                ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}
                                ${isDragOver 
                                    ? 'border-[#3A4D39] bg-[#3A4D39]/5' 
                                    : hasImage 
                                        ? 'border-stone-200 hover:border-[#3A4D39]/50' 
                                        : 'border-stone-200 hover:border-[#3A4D39]/50 hover:bg-stone-50'
                                }
                            `}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !isUploading && fileInputRef.current?.click()}
                        >
                            {/* Uploading State */}
                            {isUploading ? (
                                <div className="h-48 sm:h-56 flex flex-col items-center justify-center gap-3 bg-[#FCFCF9]">
                                    <Loader2 className="w-10 h-10 animate-spin text-[#3A4D39]" />
                                    <div className="w-48">
                                        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-[#3A4D39] transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                        <p className="text-sm text-sage-600 mt-2 text-center font-medium">
                                            Uploading... {uploadProgress}%
                                        </p>
                                    </div>
                                </div>
                            ) : hasImage ? (
                                /* Image Preview State */
                                <div className="relative group">
                                    <div className="h-48 sm:h-56 bg-[#FCFCF9] flex items-center justify-center">
                                        <img 
                                            src={previewImageUrl} 
                                            alt="Product preview" 
                                            className="max-h-full max-w-full object-contain"
                                            onError={(e) => {
                                                e.target.src = '';
                                                e.target.alt = 'Failed to load image';
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Overlay with actions */}
                                    <div className="absolute inset-0 bg-sage-900/0 group-hover:bg-sage-900/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                fileInputRef.current?.click();
                                            }}
                                            className="p-3 bg-white rounded-full shadow-lg hover:bg-stone-50 transition-colors"
                                            title="Change image"
                                        >
                                            <RefreshCw size={20} className="text-sage-700" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClearImage();
                                            }}
                                            className="p-3 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                                            title="Remove image"
                                        >
                                            <Trash2 size={20} className="text-red-500" />
                                        </button>
                                    </div>

                                    {/* File name badge */}
                                    {selectedFile && (
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-sage-700 font-medium truncate shadow-sm">
                                                {selectedFile.name}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Empty Upload State */
                                <div className="h-48 sm:h-56 flex flex-col items-center justify-center p-6 group">
                                    <div className={`p-3 rounded-xl mb-3 transition-colors
                                        ${isDragOver 
                                            ? 'bg-[#3A4D39]/10 text-[#3A4D39]' 
                                            : 'bg-stone-100 text-stone-400 group-hover:bg-[#3A4D39]/10 group-hover:text-[#3A4D39]'
                                        }
                                    `}>
                                        <UploadCloud size={28} />
                                    </div>
                                    
                                    <span className="text-sm font-bold text-sage-700 mb-1">
                                        {isDragOver ? 'Drop image here' : 'Upload Image'}
                                    </span>
                                    <p className="text-xs text-sage-400 mb-1">
                                        Drag & drop or click to browse
                                    </p>
                                    <p className="text-xs text-sage-400">JPG, PNG, WebP (max 10MB)</p>
                                </div>
                            )}
                        </div>

                        {/* Upload Error */}
                        {uploadError && (
                            <p className="mt-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                                {uploadError}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            disabled={isUploading}
                            className="flex-1 px-5 py-3 bg-[#F5F5F0] text-sage-800 font-bold rounded-lg hover:bg-[#EBEBE5] transition-colors min-h-[48px] disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isUploading}
                            className="flex-1 px-5 py-3 bg-[#506350] text-white font-bold rounded-lg hover:bg-[#3A4D39] transition-colors flex justify-center items-center gap-2 min-h-[48px] disabled:opacity-50"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={18} />
                                    {isEditing ? "Save Changes" : "Create"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
