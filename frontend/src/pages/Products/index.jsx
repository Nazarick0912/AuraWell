import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Loader2} from 'lucide-react';
import {AnimatePresence, motion} from "framer-motion";
import {productsAPI} from '../../services/api';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import AgeGroupFilter from './components/AgeGroupFilter';
import Search from '../../components/ui/Search';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAgeFilterOpen, setIsAgeFilterOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get('category');
    const age = searchParams.get('age');
    const searchQuery = searchParams.get('search') || "";

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await productsAPI.getAll(category);

                // Transform backend data to match frontend expected format
                const transformedProducts = data.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    ageGroup: product.ageGroup,
                    image: product.imageUrl,
                }));

                setProducts(transformedProducts);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const handleCategoryChange = (value) => {
        const next = new URLSearchParams(searchParams);

        if (!value) next.delete("category");
        else next.set("category", value);

        setSearchParams(next);
    };

    const handleAgeChange = (value) => {
        const next = new URLSearchParams(searchParams);
        if (!value) {
            next.delete("age");
        } else {
            next.set("age", value);
        }
        setSearchParams(next);
        setIsAgeFilterOpen(false);
    };

    // Filter products by age group (category filtering is done by backend)
    const filteredProducts = products.filter(product => {
        // age filter
        if (age && product.ageGroup?.toLowerCase() !== age.toLowerCase()) return false;

        // search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase().trim();
            const matchName = product.name?.toLowerCase().includes(q);
            const matchDesc = product.description?.toLowerCase().includes(q);
            return matchName || matchDesc;
        }
        return true;
    });

    const hasResults = filteredProducts.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2 capitalize">
                {category || 'All Products'}
            </h1>
            <p className="text-sage-500 mb-6 sm:mb-8">
                Browse our curated wellness products
            </p>

            {/* Search Bar */}
            <div className="mt-6 mb-8">
                <Search
                    value={searchQuery}
                    onChange={(val) => {
                        const next = new URLSearchParams(searchParams);
                        if (val) next.set("search", val);
                        else next.delete("search");
                        setSearchParams(next);
                    }}
                    onSearch={() => {
                    }}
                />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                <CategoryFilter
                    category={category}
                    onCategoryChange={handleCategoryChange}
                />
                <AgeGroupFilter
                    age={age}
                    isOpen={isAgeFilterOpen}
                    onToggle={() => setIsAgeFilterOpen(prev => !prev)}
                    onAgeChange={handleAgeChange}
                />
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-sage-600 animate-spin mb-4"/>
                    <p className="text-sage-500">Loading products...</p>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="text-center py-16">
                    <p className="text-lg font-medium text-red-600 mb-2">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 rounded-full bg-sage-600 text-white text-sm font-medium hover:bg-sage-700 transition min-h-[44px]"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Product Grid */}
            {!isLoading && !error && hasResults && (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && !error && !hasResults && (
                <div className="text-center py-16">
                    <p className="text-lg font-medium text-sage-700">
                        No products found
                    </p>
                    <p className="mt-2 text-sm text-sage-500">
                        Try adjusting your filters or browse all products.
                    </p>

                    <button
                        onClick={() => setSearchParams({})}
                        className="mt-6 px-6 py-2 rounded-full bg-sage-600 text-white text-sm font-medium hover:bg-sage-700 transition min-h-[44px]"
                    >
                        View all products
                    </button>
                </div>
            )}
        </div>
    );
}
