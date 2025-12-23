import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Products() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const { addToCart } = useCart();

    //updated IDs to match backend's products.json
    const PRODUCTS = [
        { id: "169cd55c-6a61-473e-8b2e-c509e379fad2", name: "Vitamin D3 1000IU", category: "vitamins", price: 24.99, ageGroup: "Adults" },
        { id: "2", name: "Kids Multivitamin Gummies", category: "vitamins", price: 19.99, ageGroup: "Children" },
        { id: "3", name: "Omega-3 Fish Oil", category: "supplements", price: 29.99, ageGroup: "Adults" },
        { id: "4", name: "Lavender Essential Oil", category: "aromatherapy", price: 18.99, ageGroup: "All Ages" },
    ];

    const handleAddToCart = async (product) => {
        //calls the CartServlet.java via the Context
        const success = await addToCart(product.id, 1);
        
        if (success) {
            alert(`${product.name} added to cart!`);
        } else {
            alert("Failed to add to cart. Are you signed in?"); //
        }
    };

    const filteredProducts = category
        ? PRODUCTS.filter(p => p.category === category)
        : PRODUCTS;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <h1 className="text-4xl font-display font-bold mb-2 capitalize">
                {category || 'All Products'}
            </h1>
            <p className="text-sage-500 mb-8">
                Browse our curated wellness products
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl border border-cream-200 p-4 flex flex-col justify-between"
                    >
                        <div>
                            <p className="text-xs text-sage-500 uppercase tracking-wider">{product.ageGroup}</p>
                            <h3 className="mt-1 font-medium text-sage-800">
                                {product.name}
                            </h3>
                            <p className="mt-3 font-semibold">
                                RM{product.price}
                            </p>
                        </div>

                        <button
                            onClick={() => handleAddToCart(product)}
                            className="mt-6 w-full py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition duration-200"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}