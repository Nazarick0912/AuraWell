import { ArrowUpDown, X } from 'lucide-react';

const SORT_OPTIONS = [
    { label: "Default", value: null },
    { label: "Name (A-Z)", value: "name-asc" },
    { label: "Name (Z-A)", value: "name-desc" },
];

export default function SortFilter({ sort, isOpen, onToggle, onSortChange }) {
    const activeSort = SORT_OPTIONS.find(s => s.value === sort);

    const handleClearSort = (e) => {
        e.stopPropagation();
        onSortChange(null);
    };

    return (
        <div className="relative">
            {/* Sort Toggle Button */}
            <button
                onClick={onToggle}
                className={`
                    px-4 sm:px-5 py-2 rounded-full text-sm font-medium 
                    flex items-center gap-2 transition-colors min-h-[44px] touch-manipulation
                    ${sort
                        ? "bg-sage-600 text-white"
                        : "bg-cream-100 text-sage-700 hover:bg-cream-200"
                    }
                `}
            >
                <ArrowUpDown className="w-4 h-4" />
                <span className="hidden sm:inline">Sort</span>
                {sort && (
                    <>
                        <span className="text-xs opacity-90">• {activeSort?.label}</span>
                        <button
                            onClick={handleClearSort}
                            className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="Clear sort"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </>
                )}
            </button>

            {/* Expandable Sort Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onToggle}
                        className="fixed inset-0 z-40"
                    />

                    {/* Dropdown Panel */}
                    <div className="absolute left-0 top-full mt-2 z-50 bg-white rounded-xl border border-cream-200 shadow-lg p-2 min-w-[200px]">
                        {SORT_OPTIONS.map((option) => {
                            const isActive = option.value === null ? sort === null : sort === option.value;

                            return (
                                <button
                                    key={option.label}
                                    onClick={() => onSortChange(option.value)}
                                    className={`
                                        w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium
                                        transition-colors
                                        ${isActive
                                            ? "bg-sage-600 text-white"
                                            : "text-sage-700 hover:bg-cream-100"
                                        }
                                    `}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
