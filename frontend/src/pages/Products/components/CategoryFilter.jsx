const CATEGORIES = [
    { label: "All", value: null },
    { label: "Vitamins", value: "vitamins" },
    { label: "Supplements", value: "supplements" },
    { label: "Aromatherapy", value: "aromatherapy" },
];

export default function CategoryFilter({ category, onCategoryChange }) {
    return (
        <>
            {CATEGORIES.map((cat) => {
                const isActive =
                    cat.value === null
                        ? category === null
                        : category === cat.value;
                return (
                    <button
                        key={cat.label}
                        onClick={() => onCategoryChange(cat.value)}
                        className={`
                            px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition
                            min-h-[44px] touch-manipulation
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
        </>
    );
}

