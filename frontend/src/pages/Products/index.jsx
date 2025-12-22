import {useSearchParams} from 'react-router-dom';

export default function Products() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    const PRODUCTS = [
        {id: 1, name: "Vitamin D3 1000IU", category: "vitamins", price: 24.99, ageGroup: "Adults"},
        {id: 2, name: "Kids Multivitamin Gummies", category: "vitamins", price: 19.99, ageGroup: "Children"},
        {id: 3, name: "Omega-3 Fish Oil", category: "supplements", price: 29.99, ageGroup: "Adults"},
        {id: 4, name: "Lavender Essential Oil", category: "aromatherapy", price: 18.99, ageGroup: "All Ages"},
    ];

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

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl border border-cream-200 p-4"
                    >
                        <p className="text-xs text-sage-500">{product.ageGroup}</p>

                        <h3 className="mt-1 font-medium text-sage-800">
                            {product.name}
                        </h3>

                        <p className="mt-3 font-semibold">
                            RM{product.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
