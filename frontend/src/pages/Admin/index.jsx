import { useState } from 'react';
import { Package, Plus, ShoppingBag } from 'lucide-react';
import ProductTable from './components/ProductTable';
import OrderTable from './components/OrderTable';
import ProductFormModal from './components/ProductFormModal';
import { useProducts } from './hooks/useProducts';
import { useOrders } from './hooks/useOrders';
import { useProductForm } from './hooks/useProductForm';

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('products');

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

    // Save product handler - receives updated formData with uploaded image URL
    const handleSaveProduct = async (e, updatedFormData) => {
        e.preventDefault();

        // Use updatedFormData if provided (contains Cloudinary URL), otherwise fall back to formData
        const dataToSave = updatedFormData || formData;

        if (isEditing) {
            const result = await updateProduct(dataToSave.id, dataToSave);
            if (!result.success) {
                alert('Failed to update product: ' + result.error);
                return;
            }
        } else {
            addProduct(dataToSave);
        }

        closeModal();
        resetForm();
    };

    // Delete product handler
    const handleDelete = async (product) => {
        const result = await deleteProduct(product);
        if (!result.success && !result.cancelled) {
            alert('Failed to delete product: ' + result.error);
        }
    };

    // Order status change handler
    const handleOrderStatusChange = async (order, newStatus) => {
        const result = await updateOrderStatus(order, newStatus);
        if (!result.success) {
            alert('Failed to update order status: ' + result.error);
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
        </div>
    );
}
