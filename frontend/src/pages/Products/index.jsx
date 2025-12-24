import {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import ProductCard from './ProductCard';
import {Funnel} from 'lucide-react';
import {AnimatePresence, motion} from "framer-motion";

export default function Products() {
    const [isAgeFilterOpen, setIsAgeFilterOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');
    const age = searchParams.get('age');

    const CATEGORIES = [
        {label: "All", value: null},
        {label: "Vitamins", value: "vitamins"},
        {label: "Supplements", value: "supplements"},
        {label: "Aromatherapy", value: "aromatherapy"},
    ];
    const PRODUCTS = [
        {
            id: 1,
            name: "Vitamin D3 1000IU",
            category: "vitamins",
            price: 24.99,
            ageGroup: "Adults",
            image: "/productCard/vitD3.jpg"
        },
        {
            id: 2,
            name: "Kids Multivitamin Gummies",
            category: "vitamins",
            price: 19.99,
            ageGroup: "Children",
            image: "/productCard/gummies.jpg"
        },
        {
            id: 3,
            name: "Omega-3 Fish Oil",
            category: "supplements",
            price: 29.99,
            ageGroup: "Adults",
            image: "/productCard/fishOil.jpg"
        },
        {
            id: 4,
            name: "Lavender Essential Oil",
            category: "aromatherapy",
            price: 18.99,
            ageGroup: "Universal",
            image: "/productCard/essentialOil.jpg"
        },
    ];

    const AGE_GROUPS = [
        {label: "All Ages", value: null},
        {label: "Toddler", value: "toddler"},
        {label: "Children", value: "children"},
        {label: "Teens", value: "teens"},
        {label: "Adults", value: "adults"},
        {label: "Seniors", value: "seniors"},
        {label: "Universal", value: "universal"},
    ];

    const setCategory = (value) => {
        if (!value) {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({category: value});
        }
    };

    const setAge = (value) => {
        if (!value) {
            const next = new URLSearchParams(searchParams);
            next.delete("age");
            setSearchParams(next);
        } else {
            setSearchParams({category, age: value});
        }
        setIsAgeFilterOpen(false);
    };

    const filteredProducts = PRODUCTS.filter(product => {
        const matchCategory = category
            ? product.category === category
            : true;

        const matchAge = age
            ? product.ageGroup.toLowerCase() === age
            : true;

        return matchCategory && matchAge;
    })

    const hasResults = filteredProducts.length > 0;

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
                { /* Categories Filter Button */}
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
                                    : "bg-cream-100 text-sage-700 hover:bg-cream-200 active:scale-[0.98]"
                            }
                            `}
                        >
                            {cat.label}
                        </button>
                    );
                })}

                {/* Age Filter Toggle Button */}
                <button
                    onClick={() => setIsAgeFilterOpen(prev => !prev)}
                    className={`
                      px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition
                      ${
                        age
                            ? "bg-sage-600 text-white"
                            : "bg-cream-100 text-sage-700 hover:bg-cream-200"
                    }
                    `}
                >
                    <Funnel className="w-4 h-4"/>
                    Filter
                    {age && (
                        <span className="opacity-80">
                        • {AGE_GROUPS.find(g => g.value === age)?.label}
                        </span>
                    )}
                </button>
            </div>

            {isAgeFilterOpen && (
                <div
                    className={`
                    mt-6 overflow-hidden transition-all duration-300 ease-out
                    ${isAgeFilterOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"}
                  `}
                >
                    <div className="p-6 bg-white rounded-xl border border-cream-200 shadow-sm">
                        <h3 className="text-sm font-semibold text-sage-700 mb-4">
                            Filter by Age Group
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {AGE_GROUPS.map((group) => {
                                const isActive =
                                    group.value === null ? age === null : age === group.value;

                                return (
                                    <button
                                        key={group.label}
                                        onClick={() => setAge(group.value)}
                                        className={`
                                          px-4 py-2 rounded-full text-sm font-medium transition
                                          ${
                                            isActive
                                                ? "bg-sage-600 text-white"
                                                : "bg-cream-100 text-sage-700 hover:bg-cream-200"
                                        }
                                        `}
                                    >
                                        {group.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

            )}


            {/* Product Grid */}
            {hasResults ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className={"text-center py-16"}>
                    <p className="text-lg font-medium text-sage-700">
                        No products found
                    </p>
                    <p className="mt-2 text-sm text-sage-500">
                        Try adjusting your filters or browse all products.
                    </p>

                    <button
                        onClick={() => setSearchParams({})}
                        className="mt-6 px-6 py-2 rounded-full bg-sage-600 text-white text-sm font-medium hover:bg-sage-700 transition"
                    >
                        View all products
                    </button>
                </div>
            )}
        </div>
    );
}
