import { useState } from 'react';
import { Package, Plus, ShoppingBag, Pencil, Trash2, FileText, Power, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import DataTable from './components/DataTable';
import ProductFormModal from './components/ProductFormModal';

export default function AdminPanel() {
    // Dummy Data - Products
    const [products, setProducts] = useState([
        { id: 1, name: "Organic Lavender Essential Oil", category: "Aromatherapy", price: 24.00, stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=200", description: "Pure organic lavender oil.", ageGroup: "All" },
        { id: 2, name: "Premium Vitamin C Complex", category: "Vitamins", price: 65.00, stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200", description: "High potency vitamin C.", ageGroup: "Adult" },
        { id: 3, name: "Magnesium Glycinate Sleep Blend", category: "Supplements", price: 45.00, stock: 0, status: "Draft", image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=200", description: "Sleep aid supplement.", ageGroup: "Adult" },
    ]);

    // Dummy Data - Orders
    const [orders, setOrders] = useState([
        { id: "ORD-001", customer: "Alex Tan", date: "2025-12-26", total: 120.50, status: "Processing", items: "Lavender Oil (x2), Vitamin C" },
        { id: "ORD-002", customer: "Sarah Lee", date: "2025-12-25", total: 45.00, status: "Delivered", items: "Magnesium Sleep Blend" },
        { id: "ORD-003", customer: "Kyzer Lim", date: "2025-12-24", total: 24.00, status: "Shipped", items: "Lavender Oil" },
        { id: "ORD-004", customer: "Ivan Teoh", date: "2025-12-20", total: 210.00, status: "Cancelled", items: "Premium Vitamin C (x3)" },
    ]);

    // State Management
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

    const handleToggleStatus = (product) => {
        setProducts(products.map(p => {
            if (p.id === product.id) {
                return { ...p, status: p.status === "Active" ? "Draft" : "Active" };
            }
            return p;
        }));
    };

    const handleDelete = (product) => {
        if (window.confirm(`Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`)) {
            setProducts(products.filter(p => p.id !== product.id));
        }
    };

    const handleOrderStatusChange = (order, newStatus) => {
        setOrders(orders.map(o =>
            o.id === order.id ? { ...o, status: newStatus } : o
        ));
    };

    // Product Table Configuration
    const productColumns = [
        {
            key: 'name',
            label: 'Product',
            width: '1fr',
            mobilePosition: 'header',
            render: (item) => (
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden border border-stone-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-sage-900 text-sm truncate">{item.name}</h3>
                </div>
            )
        },
        {
            key: 'category',
            label: 'Category',
            width: '110px',
            mobilePosition: 'body',
            render: (item) => <span className="text-sm text-sage-600 truncate">{item.category}</span>
        },
        {
            key: 'status',
            label: 'Status',
            width: '100px',
            mobilePosition: 'footer',
            render: (item) => (
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                    item.status === 'Active' ? 'bg-green-100 text-green-800' :
                    item.status === 'Draft' ? 'bg-stone-100 text-stone-600' : 'bg-red-100 text-red-800'
                }`}>
                    {item.status}
                </span>
            )
        },
        {
            key: 'price',
            label: 'Price',
            width: '100px',
            mobilePosition: 'footer',
            render: (item) => <span className="text-sm font-bold text-sage-900">RM {item.price.toFixed(2)}</span>
        },
        {
            key: 'stock',
            label: 'Stock',
            width: '100px',
            mobilePosition: 'footer',
            render: (item) => (
                <span className={`text-sm ${item.stock < 5 ? 'text-amber-600 font-bold' : 'text-sage-600'}`}>
                    {item.stock}
                </span>
            )
        }
    ];

    const productActions = [
        {
            label: 'Edit Product',
            icon: <Pencil size={16} />,
            onClick: handleEdit,
            className: 'text-sage-700 hover:bg-stone-100'
        },
        {
            label: (item) => item.status === 'Active' ? 'Set to Draft' : 'Activate',
            icon: <FileText size={16} />,
            onClick: handleToggleStatus,
            className: 'text-sage-700 hover:bg-stone-100'
        },
        {
            label: 'Delete',
            icon: <Trash2 size={16} />,
            onClick: handleDelete,
            className: 'text-red-600 hover:bg-red-50'
        }
    ];

    // Order Table Configuration
    const orderColumns = [
        {
            key: 'id',
            label: 'Order ID',
            width: '100px',
            mobilePosition: 'header',
            render: (item) => <span className="font-bold text-[#3A4D39] text-sm">{item.id}</span>
        },
        {
            key: 'customer',
            label: 'Customer',
            width: '1fr',
            mobilePosition: 'body',
            render: (item) => <span className="text-sm font-medium text-sage-900">{item.customer}</span>
        },
        {
            key: 'date',
            label: 'Date',
            width: '120px',
            mobilePosition: 'header',
            render: (item) => <span className="text-sm text-sage-500">{item.date}</span>
        },
        {
            key: 'items',
            label: 'Items',
            width: '1.5fr',
            mobilePosition: 'body',
            render: (item) => <span className="text-sm text-sage-600 truncate">{item.items}</span>
        },
        {
            key: 'total',
            label: 'Total',
            width: '100px',
            mobilePosition: 'header',
            render: (item) => <span className="text-sm font-bold text-sage-900">RM {item.total.toFixed(2)}</span>
        },
        {
            key: 'status',
            label: 'Status',
            width: '140px',
            mobilePosition: 'footer'
        }
    ];

    const orderStatusOptions = [
        { value: 'Processing', label: 'Processing', icon: <Clock size={14} />, style: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
        { value: 'Shipped', label: 'Shipped', icon: <Truck size={14} />, style: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
        { value: 'Delivered', label: 'Delivered', icon: <CheckCircle size={14} />, style: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
        { value: 'Cancelled', label: 'Cancelled', icon: <XCircle size={14} />, style: 'bg-red-50 text-red-600 hover:bg-red-100' }
    ];

    // Custom mobile card renderers
    const renderProductMobileCard = (item, renderActions, renderStatus) => (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 relative">
            <div className="flex items-start gap-3">
                {/* Product Image */}
                <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden border border-stone-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0 pr-10">
                    <h3 className="font-bold text-sage-900 text-sm truncate mb-1">{item.name}</h3>
                    <p className="text-xs text-sage-500 mb-2">{item.category}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                            item.status === 'Active' ? 'bg-green-100 text-green-800' :
                            item.status === 'Draft' ? 'bg-stone-100 text-stone-600' : 'bg-red-100 text-red-800'
                        }`}>
                            {item.status}
                        </span>
                        <span className="text-sm font-bold text-sage-900">RM {item.price.toFixed(2)}</span>
                        <span className={`text-xs ${item.stock < 5 ? 'text-amber-600 font-bold' : 'text-sage-500'}`}>
                            Stock: {item.stock}
                        </span>
                    </div>
                </div>
            </div>

            {renderActions()}
        </div>
    );

    const renderOrderMobileCard = (item, renderActions, renderStatus) => (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 relative">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-[#3A4D39]">{item.id}</h3>
                    <p className="text-xs text-sage-500">{item.date}</p>
                </div>
                <span className="font-bold text-sage-900">RM {item.total.toFixed(2)}</span>
            </div>

            <div className="mb-4">
                <p className="text-sm font-medium text-sage-900 mb-1">{item.customer}</p>
                <p className="text-xs text-sage-600 line-clamp-2">{item.items}</p>
            </div>

            {/* Mobile Status Dropdown */}
            <div className="status-dropdown-container">
                {renderStatus()}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-sage-900 p-6 sm:p-10">
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
                            <DataTable
                                data={products}
                                columns={productColumns}
                                keyField="id"
                                actions={productActions}
                                emptyMessage="No products found."
                                renderMobileCard={renderProductMobileCard}
                            />
                        </div>
                    ) : (
                        <DataTable
                            data={orders}
                            columns={orderColumns}
                            keyField="id"
                            statusDropdown={{
                                field: 'status',
                                options: orderStatusOptions,
                                onChange: handleOrderStatusChange
                            }}
                            emptyMessage="No orders found."
                            renderMobileCard={renderOrderMobileCard}
                        />
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
