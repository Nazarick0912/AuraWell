import { BadgeDollarSign, X } from 'lucide-react';

const PRICE_RANGES = [
    { label: "All Prices", value: null },
    { label: "Under RM20", value: "under-20" },
    { label: "RM20 - RM50", value: "20-50" },
    { label: "RM50 - RM100", value: "50-100" },
    { label: "RM100+", value: "100-plus" },
];

export default function PriceFilter({ price, isOpen, onToggle, onPriceChange }) {
    const activeRange = PRICE_RANGES.find(r => r.value === price);

    const handleClearFilter = (e) => {
        e.stopPropagation();
        onPriceChange(null);
    };

    return (
        <div className="relative">
            {/* Price Filter Toggle Button */}
            <button
                onClick={onToggle}
                className={`
                    px-4 sm:px-5 py-2 rounded-full text-sm font-medium 
                    flex items-center gap-2 transition-colors min-h-[44px] touch-manipulation
                    ${price
                        ? "bg-sage-600 text-white"
                        : "bg-cream-100 text-sage-700 hover:bg-cream-200"
                    }
                `}
            >
                <BadgeDollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Price</span>
                {price && (
                    <>
                        <span className="text-xs opacity-90">• {activeRange?.label}</span>
                        <button
                            onClick={handleClearFilter}
                            className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="Clear price filter"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </>
                )}
            </button>

            {/* Expandable Price Filter Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onToggle}
                        className="fixed inset-0 z-40"
                    />

                    {/* Dropdown Panel */}
                    <div className="absolute left-0 top-full mt-2 z-50 bg-white rounded-xl border border-cream-200 shadow-lg p-2 min-w-[200px]">
                        {PRICE_RANGES.map((range) => {
                            const isActive = range.value === null ? price === null : price === range.value;

                            return (
                                <button
                                    key={range.label}
                                    onClick={() => onPriceChange(range.value)}
                                    className={`
                                        w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium
                                        transition-colors
                                        ${isActive
                                            ? "bg-sage-600 text-white"
                                            : "text-sage-700 hover:bg-cream-100"
                                        }
                                    `}
                                >
                                    {range.label}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
