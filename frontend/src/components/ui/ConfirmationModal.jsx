import React from 'react';
import { X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-sage-900/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-md card p-6 animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 text-sage-500 hover:text-sage-800 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="mb-6">
                    <h3 className="text-xl font-display font-semibold text-sage-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-sage-600">
                        {message}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-cream-300 text-sage-700 hover:bg-cream-100 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-terracotta-500 text-white hover:bg-terracotta-600 font-medium transition-colors shadow-sm"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
