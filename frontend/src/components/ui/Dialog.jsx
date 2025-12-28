import { useEffect, useRef } from 'react';
import { X, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

const VARIANTS = {
    error: {
        icon: XCircle,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        confirmBtn: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
        icon: AlertTriangle,
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        confirmBtn: 'bg-amber-600 hover:bg-amber-700',
    },
    success: {
        icon: CheckCircle,
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        confirmBtn: 'bg-emerald-600 hover:bg-emerald-700',
    },
    info: {
        icon: Info,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        confirmBtn: 'bg-blue-600 hover:bg-blue-700',
    },
    danger: {
        icon: AlertTriangle,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        confirmBtn: 'bg-red-600 hover:bg-red-700',
    },
};

/**
 * Reusable Dialog Component
 * @param {boolean} isOpen - Whether the dialog is visible
 * @param {function} onClose - Called when dialog should close
 * @param {function} onConfirm - Called when confirm button is clicked (optional)
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message/description
 * @param {string} variant - 'error' | 'warning' | 'success' | 'info' | 'danger'
 * @param {string} confirmText - Text for confirm button (default: 'OK')
 * @param {string} cancelText - Text for cancel button (default: 'Cancel')
 * @param {boolean} showCancel - Whether to show cancel button (default: false for alerts)
 */
export default function Dialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    variant = 'info',
    confirmText = 'OK',
    cancelText = 'Cancel',
    showCancel = false,
}) {
    const dialogRef = useRef(null);
    const config = VARIANTS[variant] || VARIANTS.info;
    const IconComponent = config.icon;

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Focus trap
    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div
                ref={dialogRef}
                tabIndex={-1}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative p-6 pb-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`p-3 rounded-full ${config.iconBg} shrink-0`}>
                            <IconComponent className={config.iconColor} size={24} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pt-1">
                            <h3 className="text-lg font-bold text-stone-900 pr-8">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-3 justify-end">
                    {showCancel && (
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={handleConfirm}
                        className={`px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors ${config.confirmBtn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

