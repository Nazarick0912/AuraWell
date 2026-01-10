import { SlidersHorizontal, X } from 'lucide-react';
import { AGE_GROUPS } from '../../../constants/ageGroups';

export default function AgeGroupFilter({ age, isOpen, onToggle, onAgeChange }) {
    const activeGroup = AGE_GROUPS.find(g => g.value === age);

    const handleClearFilter = (e) => {
        e.stopPropagation();
        onAgeChange(null);
    };

    return (
        <div className="relative">
            {/* Age Filter Toggle Button */}
            <button
                onClick={onToggle}
                className={`
                    px-4 sm:px-5 py-2 rounded-full text-sm font-medium 
                    flex items-center gap-2 transition-colors min-h-[44px] touch-manipulation
                    ${age
                        ? "bg-sage-600 text-white"
                        : "bg-cream-100 text-sage-700 hover:bg-cream-200"
                    }
                `}
            >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Age Filter</span>
                {age && (
                    <>
                        <span className="text-xs opacity-90">• {activeGroup?.label}</span>
                        <button
                            onClick={handleClearFilter}
                            className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="Clear age filter"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </>
                )}
            </button>

            {/* Expandable Age Filter Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onToggle}
                        className="fixed inset-0 z-40"
                    />
                    
                    {/* Dropdown Panel */}
                    <div className="absolute left-0 top-full mt-2 z-50 bg-white rounded-xl border border-cream-200 shadow-lg p-2 min-w-[200px]">
                        {AGE_GROUPS.map((group) => {
                            const isActive = group.value === age;

                            return (
                                <button
                                    key={group.label}
                                    onClick={() => onAgeChange(group.value)}
                                    className={`
                                        w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium
                                        transition-colors
                                        ${isActive
                                            ? "bg-sage-600 text-white"
                                            : "text-sage-700 hover:bg-cream-100"
                                        }
                                    `}
                                >
                                    {group.label}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
