import { useState } from 'react';
import { Package, Plus, ShoppingBag } from 'lucide-react'; // Added ShoppingBag
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';
import OrdersTable from './components/OrdersTable';

export default function AdminPanel() {
    // Dummy Data
    const [products, setProducts] = useState([
        { id: 1, name: "Organic Lavender Essential Oil", category: "Aromatherapy", price: 24.00, stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=200", description: "Pure organic lavender oil.", ageGroup: "All" },
        { id: 2, name: "Premium Vitamin C Complex", category: "Vitamins", price: 65.00, stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200", description: "High potency vitamin C.", ageGroup: "Adult" },
        { id: 3, name: "Magnesium Glycinate Sleep Blend", category: "Supplements", price: 45.00, stock: 0, status: "Draft", image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=200", description: "Sleep aid supplement.", ageGroup: "Adult" },
    ]);

    // State Management
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [openActionMenuId, setOpenActionMenuId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('products');

    // Form State
    const initialFormState = {
        id: null,
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'Vitamins',
        ageGroup: 'Adult',
        status: 'Active',
        image: ''
    };
    const [formData, setFormData] = useState(initialFormState);

    // Handlers
    const toggleActionMenu = (id) => {
        setOpenActionMenuId(openActionMenuId === id ? null : id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const openAddModal = () => {
        setFormData(initialFormState);
        setIsEditing(false);
        setIsAddModalOpen(true);
    };

    const handleEdit = (product) => {
        setFormData(product);
        setIsEditing(true);
        setIsAddModalOpen(true);
        setOpenActionMenuId(null);
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();

        const processedData = {
            ...formData,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            image: formData.image || "https://via.placeholder.com/200x200?text=No+Image"
        };

        if (isEditing) {
            setProducts(products.map(p => p.id === formData.id ? processedData : p));
        } else {
            const newProduct = { ...processedData, id: Date.now() };
            setProducts([newProduct, ...products]);
        }

        setIsAddModalOpen(false);
        setFormData(initialFormState);
    };

    const handleToggleStatus = (id) => {
        setProducts(products.map(p => {
            if (p.id === id) {
                return { ...p, status: p.status === "Active" ? "Draft" : "Active" };
            }
            return p;
        }));
        setOpenActionMenuId(null);
    };

    const handleDelete = (id, productName) => {
        if (window.confirm(`Are you sure you want to delete "${productName}"?\n\nThis action cannot be undone.`)) {
            setProducts(products.filter(p => p.id !== id));
        }
        setOpenActionMenuId(null);
    };

    return (
        <div
            className="min-h-screen bg-stone-50 font-sans text-sage-900 p-6 sm:p-10"
            onClick={() => setOpenActionMenuId(null)}
        >
            <div className="max-w-7xl mx-auto space-y-6">

                {/* --- HEADER --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-[#3A4D39]">Admin Panel</h1>
                        <p className="text-sage-600 mt-1">Manage your inventory, prices, and product details.</p>
                    </div>

                    {/* Button on the right */}
                    {activeTab === 'products' && (
                        <button
                            onClick={(e) => { e.stopPropagation(); openAddModal(); }}
                            className="bg-[#3A4D39] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#2F4030] transition-all font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <Plus size={20} /> Add Product
                        </button>
                    )}
                </div>

                {/* --- TABS --- */}
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

                {/* Main Content Area (Table) */}
                <div className="mt-6">
                   {activeTab === 'products' ? (
                       <div className="p-1">
                           <ProductTable
                               products={products}
                               openActionMenuId={openActionMenuId}
                               onToggleActionMenu={toggleActionMenu}
                               onEdit={handleEdit}
                               onToggleStatus={handleToggleStatus}
                               onDelete={handleDelete}
                           />
                       </div>
                   ) : (
                       <OrdersTable />
                   )}
               </div>
           </div>

            {/* Product Form Modal */}
            <ProductFormModal
                isOpen={isAddModalOpen}
                isEditing={isEditing}
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSaveProduct}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}