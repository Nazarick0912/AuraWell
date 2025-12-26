import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
    const [shippingMethod, setShippingMethod] = useState('standard');

    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    // Dummy Data
    const cartItems = [
        {
            id: 1,
            name: "Organic Lavender Oil",
            variant: "50ml",
            price: 24.00,
            qty: 5,
            image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=200"
        }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const isFreeShipping = subtotal >= 100;

    let shippingCost = 0;
    if (shippingMethod === 'standard') {
        shippingCost = isFreeShipping ? 0 : 10.00;
    } else {
        shippingCost = 25.00;
    }

    const tax = 1.50;
    const total = subtotal + shippingCost + tax;

    return (
        <div className="min-h-screen bg-white font-sans text-sage-900">

            {/* MOBILE ORDER SUMMARY */}
            <div className={`lg:hidden border-b border-stone-200 bg-stone-50 transition-all duration-300 ease-in-out overflow-hidden ${isSummaryOpen ? 'max-h-[1000px]' : 'max-h-16'}`}>
                <button
                    onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                    className="w-full flex items-center justify-between p-4 text-sm font-medium text-[#3A4D39]"
                    >
                    <div className="flex items-center gap-2">
                        <span className="text-stone-500">
                            {isSummaryOpen ? 'Hide' : 'Show'} order summary
                        </span>
                        {isSummaryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    <span className="font-bold text-lg">RM {total.toFixed(2)}</span>
                </button>

                <div className={`px-4 pb-6 pt-2 border-t border-stone-200 ${isSummaryOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
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
                                <div className="flex-1">
                                    <h4 className="font-bold text-sage-900 text-sm">{item.name}</h4>
                                    <p className="text-xs text-sage-500">{item.variant}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="font-medium text-sage-900 text-sm">RM {(item.price * item.qty).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

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


            {/* --- MAIN CONTENT CONTAINER --- */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    <div className="lg:col-span-7 order-2 lg:order-1">

                        {/* Desktop Header */}
                        <div className="hidden lg:flex items-center justify-between mb-10">
                            <div className="font-display text-2xl font-bold tracking-tight text-sage-900 flex items-center gap-2">
                                <span className="text-[#3A4D39]">AuraWell</span>
                            </div>
                            <Link to="/products" className="flex items-center gap-2 bg-stone-100 text-sage-800 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#3A4D39] hover:text-white transition-all duration-300">
                                <ArrowLeft size={14} /> Return to Shop
                            </Link>
                        </div>

                        {/* Mobile Breadcrumb */}
                        <div className="lg:hidden mb-6">
                            <Link to="/products" className="flex items-center gap-1 text-xs font-bold text-sage-500">
                                <ArrowLeft size={12} /> Return to Shop
                            </Link>
                        </div>

                        <div className="space-y-12">

                            {/* 1. Contact Information */}
                            <section>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-4 gap-2">
                                    <h2 className="font-display text-xl font-bold flex items-center gap-3 text-[#3A4D39]">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3A4D39] text-white text-sm font-sans">1</span>
                                        Contact Information
                                    </h2>
                                    <span className="text-xs text-sage-500 pl-11 sm:pl-0">
                                        Already have an account? <Link to="/login" className="text-[#3A4D39] font-bold hover:underline">Log in</Link>
                                    </span>
                                </div>

                                <div className="space-y-4 pl-0 sm:pl-11">
                                    <div>
                                        <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Email Address</label>
                                        <input type="email" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" placeholder="you@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                                        <input type="tel" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" placeholder="+60 12-345 6789" />
                                    </div>
                                </div>
                            </section>

                            {/* 2. Shipping Address */}
                            <section>
                                <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-3 text-[#3A4D39]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3A4D39] text-white text-sm font-sans">2</span>
                                    Shipping Address
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 sm:pl-11">
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Full Name</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" placeholder="e.g. Sarah Tan" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Address Line 1</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" placeholder="Street address, P.O. box" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Address Line 2 (Optional)</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" placeholder="Apartment, suite, unit, etc." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">City</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" placeholder="City" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Postcode</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all" placeholder="Postcode" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">State</label>
                                        <div className="relative">
                                            <select className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all text-sage-900">
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
                                <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-3 text-[#3A4D39]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3A4D39] text-white text-sm font-sans">3</span>
                                    Shipping Method
                                </h2>

                                <div className="pl-0 sm:pl-11">
                                    <div className="border border-stone-200 rounded-xl overflow-hidden mb-8">
                                        <label className={`flex items-center justify-between p-4 cursor-pointer border-b border-stone-100 transition-colors ${shippingMethod === 'standard' ? 'bg-[#3A4D39]/5' : 'bg-white'}`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'standard'}
                                                    onChange={() => setShippingMethod('standard')}
                                                    className="text-[#3A4D39] focus:ring-[#3A4D39]"
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

                                        <label className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${shippingMethod === 'express' ? 'bg-[#3A4D39]/5' : 'bg-white'}`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'express'}
                                                    onChange={() => setShippingMethod('express')}
                                                    className="text-[#3A4D39] focus:ring-[#3A4D39]"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-sage-900">Express Shipping</span>
                                                    <span className="text-xs text-sage-500">1-2 Business Days</span>
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-sage-900">RM 25.00</span>
                                        </label>
                                    </div>

                                    {/* --- PAY BUTTON (End of Flow) --- */}
                                    <button className="w-full py-5 bg-[#3A4D39] text-white rounded-xl font-bold text-lg hover:bg-[#2F4030] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2">
                                        Pay RM {total.toFixed(2)}
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* --- Order Summary --- */}
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
                                            <div className="flex-1">
                                                <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                                <p className="text-xs text-sage-300">{item.variant}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
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
                                <div className="flex gap-3 mb-8">
                                    <input
                                        type="text"
                                        className="flex-1 bg-[#2F4030] border border-[#4A5E49] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-sage-400 text-white shadow-sm"
                                        placeholder="Discount code"
                                    />
                                    <button className="px-5 py-2 bg-[#2F4030] border border-[#4A5E49] text-sage-200 rounded-lg text-sm font-bold hover:bg-[#4A5E49] hover:text-white transition-colors disabled:opacity-50">
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
                                        <span className="text-3xl font-display font-bold text-white">RM {total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-2 text-sage-400 text-xs opacity-80">
                                    <ShieldCheck size={14} />
                                    <span>Secure SSL Encrypted Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}