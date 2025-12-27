import { Package, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminSidebar({ onLogout }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-stone-200 z-40 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#3A4D39] rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="font-display text-lg font-bold text-[#3A4D39]">AuraAdmin</span>
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-stone-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 pt-16"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div 
                        className="bg-white w-64 h-full p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="space-y-2 flex-1">
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#3A4D39] text-white font-medium transition-colors min-h-[44px]">
                                <Package size={20} /><span>Products</span>
                            </button>
                        </nav>
                        <div className="border-t border-stone-100 pt-4 mt-auto absolute bottom-6 left-6 right-6">
                            <button
                                onClick={onLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sage-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium min-h-[44px]"
                            >
                                <LogOut size={20} /><span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside 
                className="hidden lg:flex w-64 bg-white border-r border-stone-200 p-6 flex-col h-screen sticky top-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="w-8 h-8 bg-[#3A4D39] rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="font-display text-xl font-bold text-[#3A4D39]">AuraAdmin</span>
                </div>
                <nav className="space-y-2 flex-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#3A4D39] text-white font-medium transition-colors min-h-[44px]">
                        <Package size={20} /><span>Products</span>
                    </button>
                </nav>
                <div className="border-t border-stone-100 pt-4">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sage-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium min-h-[44px]"
                    >
                        <LogOut size={20} /><span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

