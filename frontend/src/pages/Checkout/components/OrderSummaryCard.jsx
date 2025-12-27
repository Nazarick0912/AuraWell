import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function OrderSummaryCard({
    cartItems,
    subtotal,
    shippingCost,
    tax,
    total,
    isFreeShipping,
    shippingMethod,
    // Mobile-specific props
    isMobile = false,
    isOpen = false,
    onToggle
}) {
    // Mobile collapsible version
    if (isMobile) {
        return (
            <div className={`lg:hidden border-b border-stone-200 bg-stone-50 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-16'}`}>
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between p-4 text-sm font-medium text-[#3A4D39] min-h-[44px]"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-stone-500">
                            {isOpen ? 'Hide' : 'Show'} order summary
                        </span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    <span className="font-bold text-lg">RM {total.toFixed(2)}</span>
                </button>

                <div className={`px-4 pb-6 pt-2 border-t border-stone-200 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    {/* Item List */}
                    <div className="space-y-4 mb-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="relative">
                                    <div className="w-14 h-14 bg-white border border-stone-200 rounded-lg overflow-hidden">
                                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                    </div>
                                    <span className="absolute -top-2 -right-2 bg-sage-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border border-white">
                                        {item.qty}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sage-900 text-sm truncate">{item.name}</h4>
                                    <p className="text-xs text-sage-500">{item.variant}</p>
                                </div>
                                <div className="flex flex-col items-end flex-shrink-0">
                                    <p className="font-medium text-sage-900 text-sm">RM {(item.price * item.qty).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 text-sm text-sage-600 border-t border-stone-200 pt-4">
                        <div className="flex justify-between"><span>Subtotal</span><span>RM {subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>{isFreeShipping && shippingMethod === 'standard' ? 'Free' : `RM ${shippingCost.toFixed(2)}`}</span></div>
                        <div className="flex justify-between"><span>Tax</span><span>RM {tax.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-sage-900 text-base pt-2">
                            <span>Total</span>
                            <span>RM {total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop sidebar version
    return (
        <div className="hidden lg:block lg:col-span-5 order-1 lg:order-2">
            <div className="sticky top-24">
                <div className="bg-[#3A4D39] text-cream-50 rounded-3xl p-8 shadow-2xl">
                    <h3 className="font-display text-lg font-bold text-white mb-6">Order Summary</h3>

                    {/* Item List */}
                    <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto custom-scrollbar p-4 -mx-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                    </div>
                                    <span className="absolute -top-2 -right-2 bg-sage-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md border border-white">
                                        {item.qty}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                                    <p className="text-xs text-sage-300">{item.variant}</p>
                                </div>
                                <div className="flex flex-col items-end flex-shrink-0">
                                    <p className="font-medium text-white text-sm">RM {(item.price * item.qty).toFixed(2)}</p>
                                    {item.qty > 1 && (
                                        <p className="text-[10px] text-sage-300">
                                            RM {item.price.toFixed(2)} x {item.qty}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="border-[#4A5E49] mb-6" />

                    {/* Discount Code */}
                    <div className="flex gap-2 sm:gap-3 mb-8">
                        <input
                            type="text"
                            className="flex-1 min-w-0 bg-[#2F4030] border border-[#4A5E49] rounded-lg px-3 sm:px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-sage-400 text-white shadow-sm"
                            placeholder="Discount code"
                        />
                        <button className="px-4 sm:px-5 py-2 bg-[#2F4030] border border-[#4A5E49] text-sage-200 rounded-lg text-sm font-bold hover:bg-[#4A5E49] hover:text-white transition-colors disabled:opacity-50 min-h-[44px] flex-shrink-0">
                            Apply
                        </button>
                    </div>

                    <hr className="border-[#4A5E49] mb-6" />

                    {/* Totals */}
                    <div className="space-y-3 text-sm text-sage-300 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium text-white">RM {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-medium text-white">
                                {shippingMethod === 'standard' && isFreeShipping ? 'Free' : `RM ${shippingCost.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span className="font-medium text-white">RM {tax.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-[#4A5E49] pt-6">
                        <span className="text-base font-medium text-white">Total</span>
                        <div className="text-right">
                            <span className="text-xs text-sage-400 mr-2">MYR</span>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-white">RM {total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-sage-400 text-xs opacity-80">
                        <ShieldCheck size={14} />
                        <span>Secure SSL Encrypted Checkout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

