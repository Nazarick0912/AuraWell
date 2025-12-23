import {useSearchParams} from 'react-router-dom';
import ProductCard from './ProductCard';

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');

    const CATEGORIES = [
        {label: "All", value: null},
        {label: "Vitamins", value: "vitamins"},
        {label: "Supplements", value: "supplements"},
        {label: "Aromatherapy", value: "aromatherapy"},
    ];
    const PRODUCTS = [
        {id: 1, name: "Vitamin D3 1000IU", category: "vitamins", price: 24.99, ageGroup: "Adults"},
        {id: 2, name: "Kids Multivitamin Gummies", category: "vitamins", price: 19.99, ageGroup: "Children"},
        {id: 3, name: "Omega-3 Fish Oil", category: "supplements", price: 29.99, ageGroup: "Adults"},
        {id: 4, name: "Lavender Essential Oil", category: "aromatherapy", price: 18.99, ageGroup: "All Ages"},
    ];

    const setCategory = (value) => {
        if (!value) {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({category: value});
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

            <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map((cat) => {
                    const isActive =
                        cat.value === null
                            ? category === null
                            : category === cat.value;
                    return (
                        <button
                            key={cat.label}
                            onClick={() => setCategory(cat.value)}
                            className={`
                              px-5 py-2 rounded-full text-sm font-medium transition
                              ${
                                isActive
                                    ? "bg-sage-600 text-white shadow-sm cursor-default"
                                    : "bg-cream-100 text-sage-700 hover:bg-cream-200 active:scale-[0.98"
                            }
                            `}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
}
