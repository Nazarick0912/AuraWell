import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building2, Lock, ShieldCheck, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' or 'express'

    // Dummy Data
    const cartItems = [
        {
            id: 1,
            name: "Organic Lavender Oil",
            variant: "50ml",
            price: 24.00,
            qty: 5, // Testing with 5 items
            image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=200"
        }
    ];

    // 1. Calculate Subtotal
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    // 2. Check for Free Shipping (> RM100)
    const isFreeShipping = subtotal >= 100;

    // 3. Logic: Standard is Free if eligible, Express is always paid
    let shippingCost = 0;
    if (shippingMethod === 'standard') {
        shippingCost = isFreeShipping ? 0 : 10.00;
    } else {
        shippingCost = 25.00; // Premium service
    }

    const tax = 1.50;
    const total = subtotal + shippingCost + tax;

    return (
        <div className="min-h-screen bg-white font-sans text-sage-900 flex flex-col lg:flex-row">

            {/* --- LEFT COLUMN: FORM --- */}
            <div className="flex-1 lg:w-[65%] px-4 sm:px-8 lg:px-20 py-8 lg:py-12 order-2 lg:order-1 border-r border-stone-100">

                {/* Header / Nav */}
                <div className="flex items-center justify-between mb-10">
                    <div className="font-display text-2xl font-bold tracking-tight text-sage-900 flex items-center gap-2">
                         <span className="text-[#3A4D39]">AuraWell</span>
                    </div>
                    <Link to="/products" className="flex items-center gap-2 bg-stone-100 text-sage-800 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#3A4D39] hover:text-white transition-all duration-300">
                        <ArrowLeft size={14} /> Return to Shop
                    </Link>
                </div>

                <div className="max-w-2xl mx-auto lg:mx-0 space-y-12 pb-12">

                    {/* 1. Contact Info */}
                    <section>
                        <div className="flex justify-between items-baseline mb-6">
                            <h2 className="font-display text-xl font-bold flex items-center gap-3 text-[#3A4D39]">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3A4D39] text-white text-sm font-sans">1</span>
                                Contact Information
                            </h2>
                            <span className="text-xs text-sage-500">
                                Already have an account? <Link to="/login" className="text-[#3A4D39] font-bold hover:underline">Log in</Link>
                            </span>
                        </div>

                        <div className="space-y-4 pl-11">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
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

                    {/* 3. Shipping Method Selection */}
                    <section>
                        <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-3 text-[#3A4D39]">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3A4D39] text-white text-sm font-sans">3</span>
                            Shipping Method
                        </h2>

                        <div className="pl-11">
                            <div className="border border-stone-200 rounded-xl overflow-hidden">
                                {/* Standard Option */}
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
                                    {/* LOGIC: Show 'Free' if over RM100 */}
                                    <span className="text-sm font-bold text-sage-900">
                                        {isFreeShipping ? <span className="text-[#3A4D39]">Free</span> : 'RM 10.00'}
                                    </span>
                                </label>

                                {/* Express Option */}
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
                        </div>
                    </section>

                    {/* 4. Payment Method */}
                    <section>
                        <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-3 text-[#3A4D39]">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3A4D39] text-white text-sm font-sans">4</span>
                            Payment Method
                        </h2>

                        <div className="pl-11">
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-[#3A4D39] bg-[#3A4D39]/5 text-[#3A4D39]' : 'border-stone-200 hover:border-[#3A4D39]/50 text-stone-500'}`}
                                >
                                    <CreditCard size={24} className="mb-2" />
                                    <span className="text-xs font-bold">Card</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('fpx')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'fpx' ? 'border-[#3A4D39] bg-[#3A4D39]/5 text-[#3A4D39]' : 'border-stone-200 hover:border-[#3A4D39]/50 text-stone-500'}`}
                                >
                                    <Building2 size={24} className="mb-2" />
                                    <span className="text-xs font-bold">FPX</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('ewallet')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'ewallet' ? 'border-[#3A4D39] bg-[#3A4D39]/5 text-[#3A4D39]' : 'border-stone-200 hover:border-[#3A4D39]/50 text-stone-500'}`}
                                >
                                    <Smartphone size={24} className="mb-2" />
                                    <span className="text-xs font-bold">E-Wallet</span>
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                {paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Card Number</label>
                                            <div className="relative">
                                                <input type="text" className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39]" placeholder="0000 0000 0000 0000" />
                                                <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Expiry</label>
                                                <input type="text" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39]" placeholder="MM/YY" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">CVC</label>
                                                <input type="text" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39]" placeholder="123" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5">Name on Card</label>
                                            <input type="text" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39]" placeholder="Full Name" />
                                        </div>
                                    </div>
                                )}
                                {paymentMethod === 'fpx' && (
                                    <div className="text-center py-4">
                                        <p className="text-sage-600 mb-4 text-sm">You will be redirected to your online banking portal to complete the payment safely.</p>
                                        <select className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:border-[#3A4D39] text-sm">
                                            <option>Maybank2u</option>
                                            <option>CIMB Clicks</option>
                                            <option>Public Bank</option>
                                            <option>RHB Now</option>
                                            <option>Hong Leong Connect</option>
                                        </select>
                                    </div>
                                )}
                                {paymentMethod === 'ewallet' && (
                                    <div className="space-y-3">
                                        <p className="text-sage-600 mb-2 text-sm">Select your preferred E-Wallet:</p>
                                        {['GrabPay', 'Touch \'n Go eWallet', 'Boost'].map(wallet => (
                                            <label key={wallet} className="flex items-center p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50">
                                                <input type="radio" name="ewallet" className="w-4 h-4 text-[#3A4D39] focus:ring-[#3A4D39]" />
                                                <span className="ml-3 font-medium text-sage-900">{wallet}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Pay Button */}
                    <div className="pl-11">
                        <button className="w-full py-5 bg-[#3A4D39] text-white rounded-xl font-bold text-lg hover:bg-[#2F4030] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2">
                            Pay RM {total.toFixed(2)}
                        </button>

                        <div className="flex justify-center gap-6 opacity-40 grayscale mt-6">
                            <span className="font-bold text-xs">VISA</span>
                            <span className="font-bold text-xs">MASTERCARD</span>
                            <span className="font-bold text-xs">FPX</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
            <div className="hidden lg:block lg:w-[35%] bg-[#3A4D39] border-l border-[#3A4D39] order-1 lg:order-2 text-cream-50 min-h-screen">
                <div className="sticky top-24 p-8 lg:p-12 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
                    <div className="max-w-sm mx-auto">

                        {/* Item List */}
                        <div className="space-y-6 mb-8">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <span className="absolute -top-2 -right-2 bg-[#4A5E49] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md border border-[#3A4D39]">
                                            {item.qty}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                        <p className="text-xs text-sage-300">{item.variant}</p>
                                    </div>

                                    {/* NEW PRICE DISPLAY WITH QUANTITY MULTIPLIER */}
                                    <div className="flex flex-col items-end">
                                        {/* 1. Line Total */}
                                        <p className="font-medium text-white text-sm">RM {(item.price * item.qty).toFixed(2)}</p>

                                        {/* 2. Unit Calculation Breakdown (Only if qty > 1) */}
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
                                placeholder="Gift card or discount code"
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
                                {/* LOGIC: Display 'Free' if eligible */}
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
    );
}