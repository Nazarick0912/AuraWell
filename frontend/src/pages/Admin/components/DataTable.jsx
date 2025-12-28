import { useState, useEffect } from 'react';
import { MoreHorizontal, ChevronDown } from 'lucide-react';

export default function DataTable({
    data = [],
    columns = [],
    keyField = 'id',
    actions = [],
    statusDropdown = null,
    emptyMessage = 'No data found.',
    renderMobileCard = null,
}) {
    const [openActionMenuId, setOpenActionMenuId] = useState(null);
    const [openStatusDropdownId, setOpenStatusDropdownId] = useState(null);

    // Close menus on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-menu-container') && 
                !event.target.closest('.status-dropdown-container')) {
                setOpenActionMenuId(null);
                setOpenStatusDropdownId(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleActionMenu = (id) => {
        setOpenActionMenuId(openActionMenuId === id ? null : id);
        setOpenStatusDropdownId(null);
    };

    const toggleStatusDropdown = (id) => {
        setOpenStatusDropdownId(openStatusDropdownId === id ? null : id);
        setOpenActionMenuId(null);
    };

    // Build grid template columns string
    const gridCols = columns.map(col => col.width || '1fr').join(' ');
    const hasActions = actions.length > 0;
    const finalGridCols = hasActions ? `${gridCols} 90px` : gridCols;

    // Render cell content
    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item, column);
        }
        const value = item[column.key];
        return <span className="text-sm text-sage-600 truncate">{value}</span>;
    };

    // Render status dropdown
    const renderStatusDropdown = (item) => {
        if (!statusDropdown) return null;

        const currentStatus = item[statusDropdown.field];
        const currentOption = statusDropdown.options.find(opt => opt.value === currentStatus);
        const isOpen = openStatusDropdownId === item[keyField];

        return (
            <div className="relative status-dropdown-container">
                <button
                    onClick={(e) => { e.stopPropagation(); toggleStatusDropdown(item[keyField]); }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all justify-between w-full
                        ${currentOption?.style || 'bg-stone-100 text-stone-600'}
                    `}
                >
                    <div className="flex items-center gap-2">
                        {currentOption?.icon}
                        {currentOption?.label || currentStatus}
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute z-50 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 right-0 top-full mt-2 w-40">
                        {statusDropdown.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    statusDropdown.onChange(item, option.value);
                                    setOpenStatusDropdownId(null);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2 hover:bg-stone-50 transition-colors
                                    ${currentStatus === option.value ? 'text-[#3A4D39] bg-stone-50' : 'text-sage-600'}
                                `}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Render action menu
    const renderActionMenu = (item, isMobile = false) => {
        if (actions.length === 0) return null;

        const isOpen = openActionMenuId === item[keyField];
        const visibleActions = actions.filter(action => 
            !action.condition || action.condition(item)
        );

        const baseClasses = isMobile
            ? "mt-3 w-full bg-stone-50 rounded-lg overflow-hidden"
            : "absolute top-12 right-0 w-48 bg-white border border-stone-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100";

        return (
            <div className="relative action-menu-container">
                {!isMobile && (
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleActionMenu(item[keyField]); }}
                        className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                            isOpen
                                ? 'bg-stone-100 text-[#3A4D39]'
                                : 'text-stone-400 hover:text-[#3A4D39] hover:bg-stone-50'
                        }`}
                    >
                        <MoreHorizontal size={20} />
                    </button>
                )}

                {isOpen && (
                    <div className={baseClasses}>
                        {visibleActions.map((action, index) => (
                            <button
                                key={action.label}
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    action.onClick(item);
                                    setOpenActionMenuId(null);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2 min-h-[44px] transition-colors
                                    ${index > 0 ? 'border-t border-stone-200' : ''}
                                    ${action.className || 'text-sage-700 hover:bg-stone-100'}
                                `}
                            >
                                {action.icon}
                                {typeof action.label === 'function' ? action.label(item) : action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Default mobile card renderer
    const defaultMobileCard = (item) => {
        const headerCols = columns.filter(col => col.mobilePosition === 'header');
        const bodyCols = columns.filter(col => col.mobilePosition === 'body' || !col.mobilePosition);
        const footerCols = columns.filter(col => col.mobilePosition === 'footer');

        return (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 relative">
                {/* Header */}
                {headerCols.length > 0 && (
                    <div className="flex justify-between items-start mb-3">
                        {headerCols.map((col, idx) => (
                            <div key={col.key} className={idx === 0 ? '' : 'text-right'}>
                                {renderCell(item, col)}
                            </div>
                        ))}
                    </div>
                )}

                {/* Body */}
                <div className="space-y-2 mb-3">
                    {bodyCols.map(col => (
                        <div key={col.key}>
                            {renderCell(item, col)}
                        </div>
                    ))}
                </div>

                {/* Footer with status and/or actions */}
                <div className="flex items-center gap-2 flex-wrap">
                    {footerCols.map(col => (
                        <div key={col.key}>
                            {renderCell(item, col)}
                        </div>
                    ))}
                    {statusDropdown && (
                        <div className="flex-1">
                            {renderStatusDropdown(item)}
                        </div>
                    )}
                </div>

                {/* Mobile Actions Button */}
                {actions.length > 0 && (
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleActionMenu(item[keyField]); }}
                            className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                                openActionMenuId === item[keyField]
                                    ? 'bg-stone-100 text-[#3A4D39]'
                                    : 'text-stone-400 hover:text-[#3A4D39] hover:bg-stone-50'
                            }`}
                        >
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                )}

                {openActionMenuId === item[keyField] && renderActionMenu(item, true)}
            </div>
        );
    };

    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-sage-400">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 pb-20">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-visible rounded-xl border border-stone-200 shadow-sm bg-white">
                {/* Table Header */}
                <div className="bg-[#F9F7F2] text-sm font-bold text-sage-700 border-b border-stone-100 rounded-t-xl">
                    <div 
                        className="grid items-center gap-4 px-4 py-3"
                        style={{ gridTemplateColumns: finalGridCols }}
                    >
                        {columns.map(col => (
                            <div key={col.key}>{col.label}</div>
                        ))}
                        {hasActions && <div className="text-right">Actions</div>}
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-stone-100">
                    {data.map((item) => (
                        <div
                            key={item[keyField]}
                            className="grid items-center gap-4 px-4 py-3 hover:bg-stone-50 transition-colors relative"
                            style={{ gridTemplateColumns: finalGridCols }}
                        >
                            {columns.map(col => (
                                <div key={col.key}>
                                    {col.key === statusDropdown?.field 
                                        ? renderStatusDropdown(item)
                                        : renderCell(item, col)
                                    }
                                </div>
                            ))}
                            {hasActions && (
                                <div className="flex justify-end">
                                    {renderActionMenu(item)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
                {data.map((item) => (
                    <div key={item[keyField]}>
                        {renderMobileCard 
                            ? renderMobileCard(item, () => renderActionMenu(item, true), () => renderStatusDropdown(item))
                            : defaultMobileCard(item)
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

