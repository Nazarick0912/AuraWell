import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Archive, CheckCircle2, AlertCircle } from 'lucide-react';
import AdminSidebar from './components/AdminSidebar';
import StatCard from './components/StatCard';
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';

export default function AdminPanel() {
    const navigate = useNavigate();

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

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to sign out?")) {
            navigate('/login');
        }
    };

    // Stats calculations
    const totalProducts = products.length;
    const activeListings = products.filter(p => p.status === 'Active').length;
    const lowStock = products.filter(p => p.stock < 5).length;

    return (
        <div 
            className="min-h-screen bg-stone-50 font-sans text-sage-900 lg:flex relative" 
            onClick={() => setOpenActionMenuId(null)}
        >
            <AdminSidebar onLogout={handleLogout} />

            {/* Main Content */}
            <main 
                className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8" 
                onClick={() => setOpenActionMenuId(null)}
            >
                <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                        <div>
                            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#3A4D39]">Admin Panel</h1>
                            <div className="flex gap-4 mt-4 border-b border-stone-200">
                                <button className="pb-2 border-b-2 border-[#3A4D39] text-[#3A4D39] font-bold text-sm flex gap-2 items-center min-h-[44px]">
                                    <Package size={16} /> Products
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); openAddModal(); }}
                            className="w-full sm:w-auto bg-[#3A4D39] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#2F4030] transition-all font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 min-h-[44px]"
                        >
                            <Plus size={18} /> Add Product
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <StatCard 
                            icon={Archive} 
                            label="Total Products" 
                            value={totalProducts} 
                            color="bg-blue-100 text-blue-700" 
                        />
                        <StatCard 
                            icon={CheckCircle2} 
                            label="Active Listings" 
                            value={activeListings} 
                            color="bg-green-100 text-green-700" 
                        />
                        <StatCard 
                            icon={AlertCircle} 
                            label="Low Stock" 
                            value={lowStock} 
                            color="bg-amber-100 text-amber-700" 
                        />
                    </div>

                    {/* Product Table */}
                    <ProductTable
                        products={products}
                        openActionMenuId={openActionMenuId}
                        onToggleActionMenu={toggleActionMenu}
                        onEdit={handleEdit}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDelete}
                    />
                </div>
            </main>

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
