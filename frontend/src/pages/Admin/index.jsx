import { useState } from 'react';
import { Package, Plus, ShoppingBag } from 'lucide-react';
import ProductTable from './components/ProductTable';
import OrderTable from './components/OrderTable';
import ProductFormModal from './components/ProductFormModal';
import Dialog from '../../components/ui/Dialog';
import { useProducts } from './hooks/useProducts';
import { useOrders } from './hooks/useOrders';
import { useProductForm } from './hooks/useProductForm';

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('products');

    // Dialog state
    const [dialog, setDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        variant: 'info',
        confirmText: 'OK',
        showCancel: false,
        onConfirm: null,
    });

    // Pending delete state
    const [pendingDelete, setPendingDelete] = useState(null);

    // Custom hooks for data management
    const { products, loading: productsLoading, updateProduct, deleteProduct, addProduct } = useProducts();
    const { orders, loading: ordersLoading, updateOrderStatus } = useOrders();
    const { 
        formData, 
        isEditing, 
        isModalOpen, 
        handleInputChange, 
        openAddModal, 
        openEditModal, 
        closeModal, 
        resetForm 
    } = useProductForm();

    // Show dialog helper
    const showDialog = ({ title, message, variant = 'info', confirmText = 'OK', showCancel = false, onConfirm = null }) => {
        setDialog({
            isOpen: true,
            title,
            message,
            variant,
            confirmText,
            showCancel,
            onConfirm,
        });
    };

    // Close dialog helper
    const closeDialog = () => {
        setDialog(prev => ({ ...prev, isOpen: false }));
    };

    // Show error dialog helper
    const showError = (title, message) => {
        showDialog({ title, message, variant: 'error' });
    };

    // Save product handler - receives updated formData with uploaded image URL
    const handleSaveProduct = async (e, updatedFormData) => {
        e.preventDefault();

        // Use updatedFormData if provided (contains Cloudinary URL), otherwise fall back to formData
        const dataToSave = updatedFormData || formData;

        if (isEditing) {
            const result = await updateProduct(dataToSave.id, dataToSave);
            if (!result.success) {
                showError('Update Failed', result.error || 'Failed to update product. Please try again.');
                return;
            }
        } else {
            const result = await addProduct(dataToSave);
            if (!result.success) {
                showError('Creation Failed', result.error || 'Failed to create product. Please try again.');
                return;
            }
        }

        closeModal();
        resetForm();
    };

    // Delete product handler - show confirmation first
    const handleDelete = (product) => {
        setPendingDelete(product);
        showDialog({
            title: 'Delete Product',
            message: `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
            variant: 'danger',
            confirmText: 'Delete',
            showCancel: true,
            onConfirm: () => confirmDelete(product),
        });
    };

    // Confirm delete after dialog
    const confirmDelete = async (product) => {
        const result = await deleteProduct(product);
        setPendingDelete(null);

        if (!result.success && !result.cancelled) {
            showError('Delete Failed', result.error || 'Failed to delete product. Please try again.');
        }
    };

    // Order status change handler
    const handleOrderStatusChange = async (order, newStatus) => {
        const result = await updateOrderStatus(order, newStatus);
        if (!result.success) {
            showError('Update Failed', result.error || 'Failed to update order status. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-sage-900 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-[#3A4D39]">Admin Panel</h1>
                        <p className="text-sage-600 mt-1">Manage your inventory, prices, and product details.</p>
                    </div>

                    {activeTab === 'products' && (
                        <button
                            onClick={(e) => { e.stopPropagation(); openAddModal(); }}
                            className="bg-[#3A4D39] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#2F4030] transition-all font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <Plus size={20} /> Add Product
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-8 border-b border-stone-200">
                    <button
                        onClick={(e) => { e.stopPropagation(); setActiveTab('products'); }}
                        className={`pb-3 flex items-center gap-2 text-sm font-bold transition-colors relative
                            ${activeTab === 'products' ? 'text-[#3A4D39]' : 'text-sage-400 hover:text-sage-600'}
                        `}
                    >
                        <Package size={18} /> Products
                        {activeTab === 'products' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3A4D39] rounded-t-full"></div>
                        )}
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); setActiveTab('orders'); }}
                        className={`pb-3 flex items-center gap-2 text-sm font-bold transition-colors relative
                            ${activeTab === 'orders' ? 'text-[#3A4D39]' : 'text-sage-400 hover:text-sage-600'}
                        `}
                    >
                        <ShoppingBag size={18} /> Orders
                        {activeTab === 'orders' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3A4D39] rounded-t-full"></div>
                        )}
                    </button>
                </div>

                {/* Content */}
                <div className="mt-6">
                    {activeTab === 'products' ? (
                        <ProductTable
                            products={products}
                            loading={productsLoading}
                            onEdit={openEditModal}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <OrderTable
                            orders={orders}
                            loading={ordersLoading}
                            onStatusChange={handleOrderStatusChange}
                        />
                    )}
                </div>
            </div>

            {/* Product Form Modal */}
            <ProductFormModal
                isOpen={isModalOpen}
                isEditing={isEditing}
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSaveProduct}
                onClose={closeModal}
            />

            {/* Dialog for confirmations and errors */}
            <Dialog
                isOpen={dialog.isOpen}
                onClose={closeDialog}
                onConfirm={dialog.onConfirm}
                title={dialog.title}
                message={dialog.message}
                variant={dialog.variant}
                confirmText={dialog.confirmText}
                showCancel={dialog.showCancel}
            />
        </div>
    );
}
