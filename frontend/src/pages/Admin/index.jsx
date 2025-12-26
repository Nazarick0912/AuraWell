import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package, Plus, Search, Filter,
    AlertCircle, CheckCircle2, Archive, X, UploadCloud,
    MoreHorizontal, Pencil, Trash2, FileText, Power,
    LogOut // Imported LogOut icon
} from 'lucide-react';

export default function AdminPanel() {
    const navigate = useNavigate();

    // 1. Dummy Data
    const [products, setProducts] = useState([
        { id: 1, name: "Organic Lavender Essential Oil", category: "Aromatherapy", price: 24.00, stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=200", description: "Pure organic lavender oil.", ageGroup: "All" },
        { id: 2, name: "Premium Vitamin C Complex", category: "Vitamins", price: 65.00, stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200", description: "High potency vitamin C.", ageGroup: "Adult" },
        { id: 3, name: "Magnesium Glycinate Sleep Blend", category: "Supplements", price: 45.00, stock: 0, status: "Draft", image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=200", description: "Sleep aid supplement.", ageGroup: "Adult" },
    ]);

    // --- STATE MANAGEMENT ---
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

    // --- HANDLERS ---

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

    // --- NEW LOGOUT HANDLER ---
    const handleLogout = () => {
        if(window.confirm("Are you sure you want to sign out?")) {
            navigate('/login');
        }
    };

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-4 flex-1">
            <div className={`p-3 rounded-lg ${color}`}><Icon size={24} /></div>
            <div>
                <p className="text-xs text-sage-500 font-bold uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-display font-bold text-sage-900">{value}</p>
            </div>
        </div>
    );

    const gridStructure = "grid grid-cols-[1fr_110px_100px_100px_100px_90px] items-center gap-4 px-4";

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-sage-900 flex relative" onClick={() => setOpenActionMenuId(null)}>

            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-stone-200 p-6 flex flex-col h-screen sticky top-0" onClick={(e) => e.stopPropagation()}>
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="w-8 h-8 bg-[#3A4D39] rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="font-display text-xl font-bold text-[#3A4D39]">AuraAdmin</span>
                </div>
                <nav className="space-y-2 flex-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#3A4D39] text-white font-medium transition-colors">
                        <Package size={20} /><span>Products</span>
                    </button>
                </nav>
                <div className="border-t border-stone-100 pt-4">
                     {/* REPLACED SETTINGS WITH SIGN OUT BUTTON */}
                     <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sage-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                     >
                        <LogOut size={20} /><span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8 overflow-y-auto" onClick={() => setOpenActionMenuId(null)}>
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="font-display text-3xl font-bold text-[#3A4D39]">Admin Panel</h1>
                            <div className="flex gap-4 mt-4 border-b border-stone-200">
                                <button className="pb-2 border-b-2 border-[#3A4D39] text-[#3A4D39] font-bold text-sm flex gap-2 items-center">
                                    <Package size={16}/> Products
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); openAddModal(); }}
                            className="bg-[#3A4D39] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#2F4030] transition-all font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            <Plus size={18} /> Add Product
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <StatCard icon={Archive} label="Total Products" value={products.length} color="bg-blue-100 text-blue-700" />
                        <StatCard icon={CheckCircle2} label="Active Listings" value={products.filter(p => p.status === 'Active').length} color="bg-green-100 text-green-700" />
                        <StatCard icon={AlertCircle} label="Low Stock" value={products.filter(p => p.stock < 5).length} color="bg-amber-100 text-amber-700" />
                    </div>

                    {/* TABLE HEADER */}
                    <div className={`bg-[#F9F7F2] py-3 rounded-xl text-sm font-bold text-sage-700 shadow-sm ${gridStructure}`}>
                        <div>Product</div>
                        <div>Category</div>
                        <div>Status</div>
                        <div>Price</div>
                        <div>Stock</div>
                        <div className="text-right">Actions</div>
                    </div>

                    {/* PRODUCT LIST */}
                    <div className="space-y-3 pb-20">
                        {products.map((product) => (
                            <div key={product.id} className={`bg-white py-3 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative ${gridStructure}`}>

                                {/* 1. Product (Image + Name) */}
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden border border-stone-100 flex-shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-sage-900 text-sm truncate">{product.name}</h3>
                                </div>

                                {/* 2. Category */}
                                <div className="text-sm text-sage-600 truncate">{product.category}</div>

                                {/* 3. Status Badge */}
                                <div>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                                        product.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        product.status === 'Draft' ? 'bg-stone-100 text-stone-600' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.status}
                                    </span>
                                </div>

                                {/* 4. Price */}
                                <div className="text-sm font-bold text-sage-900">RM {product.price.toFixed(2)}</div>

                                {/* 5. Stock */}
                                <div className="text-sm">
                                    <span className={`${product.stock < 5 ? 'text-amber-600 font-bold' : 'text-sage-600'}`}>{product.stock}</span>
                                </div>

                                {/* 6. ACTIONS DROPDOWN */}
                                <div className="flex justify-end relative">
                                     <button
                                        onClick={(e) => { e.stopPropagation(); toggleActionMenu(product.id); }}
                                        className={`p-2 rounded-lg transition-colors ${openActionMenuId === product.id ? 'bg-stone-100 text-[#3A4D39]' : 'text-stone-400 hover:text-[#3A4D39] hover:bg-stone-50'}`}
                                     >
                                        <MoreHorizontal size={20} />
                                    </button>

                                    {openActionMenuId === product.id && (
                                        <div className="absolute top-10 right-0 w-48 bg-white border border-stone-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">

                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleEdit(product); }}
                                                className="w-full text-left px-4 py-3 text-sm font-medium text-sage-700 hover:bg-stone-50 flex items-center gap-2"
                                            >
                                                <Pencil size={16} /> Edit Product
                                            </button>

                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleToggleStatus(product.id); }}
                                                className="w-full text-left px-4 py-3 text-sm font-medium text-sage-700 hover:bg-stone-50 flex items-center gap-2 border-t border-stone-100"
                                            >
                                                {product.status === 'Active' ? (
                                                    <><FileText size={16} /> Set to Draft</>
                                                ) : (
                                                    <><Power size={16} className="text-green-600" /> Activate</>
                                                )}
                                            </button>

                                            {/* DELETE BUTTON WITH ALERT */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(product.id, product.name); }}
                                                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-stone-100"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* --- ADD / EDIT PRODUCT MODAL --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
                    <div className="absolute inset-0 bg-sage-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col">

                        <div className="sticky top-0 bg-white border-b border-stone-100 px-8 py-5 flex items-center justify-between z-10">
                            <h2 className="font-display text-2xl font-bold text-[#3A4D39]">
                                {isEditing ? "Edit Product" : "Add New Product"}
                            </h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-stone-400 hover:bg-stone-100 hover:text-sage-700 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProduct} className="p-8 space-y-6">

                            <div>
                                <label className="block text-xs font-bold text-sage-700 uppercase mb-1.5">Product Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-sage-700 uppercase mb-1.5">Description</label>
                                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all resize-none"></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-sage-700 uppercase mb-1.5">Price (RM)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-sage-700 uppercase mb-1.5">Stock</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required min="0" className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-sage-700 uppercase mb-1.5">Category</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all cursor-pointer">
                                        <option value="Vitamins">Vitamins</option>
                                        <option value="Supplements">Supplements</option>
                                        <option value="Aromatherapy">Aromatherapy</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-sage-700 uppercase mb-1.5">Age Group</label>
                                    <select name="ageGroup" value={formData.ageGroup} onChange={handleInputChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all cursor-pointer">
                                        <option value="Toddler">Toddler</option>
                                        <option value="Child">Child</option>
                                        <option value="Teen">Teen</option>
                                        <option value="Adult">Adult</option>
                                        <option value="Elderly">Elderly</option>
                                        <option value="All">All</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-sage-700 uppercase mb-1.5">Status</label>
                                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all cursor-pointer">
                                        <option value="Active">Active</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Archived">Archived</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-sage-700 uppercase mb-1.5">Product Image</label>
                                <div className="border-2 border-dashed border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-[#3A4D39]/50 hover:bg-stone-50 transition-colors cursor-pointer group">
                                    <div className="p-2 bg-stone-100 text-stone-400 rounded-lg mb-2 group-hover:bg-[#3A4D39]/10 group-hover:text-[#3A4D39] transition-colors">
                                        <UploadCloud size={20} />
                                    </div>
                                    <button type="button" className="text-sm font-bold text-sage-700 underline decoration-stone-300 hover:decoration-[#3A4D39] mb-1">Upload Image</button>
                                    <p className="text-xs text-sage-400">JPG, PNG, GIF, WebP (max 10MB)</p>
                                    <input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="...or paste URL here" className="mt-3 w-full text-xs p-2 border border-stone-200 rounded focus:border-[#3A4D39] outline-none" />
                                </div>
                            </div>

                            <div className="h-32 bg-[#FCFCF9] border border-stone-100 rounded-xl flex flex-col items-center justify-center text-stone-300">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="h-full object-contain" />
                                ) : (
                                    <>
                                        <div className="mb-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>
                                        <span className="text-xs">No image uploaded yet</span>
                                    </>
                                )}
                            </div>

                            <div className="pt-2 flex justify-between gap-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-5 py-3 bg-[#F5F5F0] text-sage-800 font-bold rounded-lg hover:bg-[#EBEBE5] transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 px-5 py-3 bg-[#506350] text-white font-bold rounded-lg hover:bg-[#3A4D39] transition-colors flex justify-center items-center gap-2">
                                    <CheckCircle2 size={18} /> {isEditing ? "Save Changes" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}