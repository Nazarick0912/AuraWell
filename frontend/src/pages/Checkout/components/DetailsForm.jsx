import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function DetailsForm({
    shippingMethod,
    onShippingMethodChange,
    isFreeShipping,
    total
}) {
    const navigate = useNavigate();
    const inputClasses = "w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all min-h-[44px]";
    const labelClasses = "block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5";

    const handlePayment = (e) => {
            e.preventDefault();
            const randomOrderId = "ORD-" + Math.floor(Math.random() * 1000000);
            navigate('/order-success', {
                state: { orderId: randomOrderId }
            });
        };

    return (
        <div className="space-y-10 sm:space-y-12">
            {/* 1. Contact Info */}
            <section>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-4 gap-2">
                    <h2 className="font-display text-lg sm:text-xl font-bold flex items-center gap-3 text-[#3A4D39]">
                        <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3A4D39] text-white text-xs sm:text-sm font-sans">1</span>
                        Contact Information
                    </h2>
                </div>

                <div className="space-y-4 pl-0 sm:pl-11">
                    <div>
                        <label className={labelClasses}>Email Address</label>
                        <input
                            type="email"
                            className={inputClasses}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Phone Number</label>
                        <input
                            type="tel"
                            className={inputClasses}
                            placeholder="+60 12-345 6789"
                        />
                    </div>
                </div>
            </section>

            {/* 2. Shipping Address */}
            <section>
                <h2 className="font-display text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-3 text-[#3A4D39]">
                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3A4D39] text-white text-xs sm:text-sm font-sans">2</span>
                    Shipping Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-11">
                    <div className="sm:col-span-2">
                        <label className={labelClasses}>Full Name</label>
                        <input
                            type="text"
                            className={inputClasses}
                            placeholder="e.g. Sarah Tan"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClasses}>Address Line 1</label>
                        <input
                            type="text"
                            className={inputClasses}
                            placeholder="Street address, P.O. box"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClasses}>Address Line 2 (Optional)</label>
                        <input
                            type="text"
                            className={inputClasses}
                            placeholder="Apartment, suite, unit, etc."
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>City</label>
                        <input
                            type="text"
                            className={inputClasses}
                            placeholder="City"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Postcode</label>
                        <input
                            type="text"
                            className={inputClasses}
                            placeholder="Postcode"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClasses}>State</label>
                        <div className="relative">
                            <select className={`${inputClasses} appearance-none pr-10 text-sage-900`}>
                                <option>Selangor</option>
                                <option>Kuala Lumpur</option>
                                <option>Penang</option>
                                <option>Johor</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Shipping Method */}
            <section>
                <h2 className="font-display text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-3 text-[#3A4D39]">
                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3A4D39] text-white text-xs sm:text-sm font-sans">3</span>
                    Shipping Method
                </h2>

                <div className="pl-0 sm:pl-11">
                    <div className="border border-stone-200 rounded-xl overflow-hidden mb-6 sm:mb-8">
                        <label className={`flex items-center justify-between p-4 cursor-pointer border-b border-stone-100 transition-colors min-h-[60px] ${shippingMethod === 'standard' ? 'bg-[#3A4D39]/5' : 'bg-white'}`}>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === 'standard'}
                                    onChange={() => onShippingMethodChange('standard')}
                                    className="text-[#3A4D39] focus:ring-[#3A4D39] w-4 h-4"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-sage-900">Standard Shipping</span>
                                    <span className="text-xs text-sage-500">3-5 Business Days</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-sage-900">
                                {isFreeShipping ? <span className="text-[#3A4D39]">Free</span> : 'RM 10.00'}
                            </span>
                        </label>

                        <label className={`flex items-center justify-between p-4 cursor-pointer transition-colors min-h-[60px] ${shippingMethod === 'express' ? 'bg-[#3A4D39]/5' : 'bg-white'}`}>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === 'express'}
                                    onChange={() => onShippingMethodChange('express')}
                                    className="text-[#3A4D39] focus:ring-[#3A4D39] w-4 h-4"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-sage-900">Express Shipping</span>
                                    <span className="text-xs text-sage-500">1-2 Business Days</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-sage-900">RM 25.00</span>
                        </label>
                    </div>

                    {/* Pay Button */}
                    <button
                        onClick={handlePayment}
                        className="w-full py-4 sm:py-5 bg-[#3A4D39] text-white rounded-xl font-bold text-base sm:text-lg hover:bg-[#2F4030] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 min-h-[56px]"
                    >
                        Pay RM {total.toFixed(2)}
                    </button>
                </div>
            </section>
        </div>
    );
}

