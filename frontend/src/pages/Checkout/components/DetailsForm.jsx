import React, {useState} from 'react'; //added useState
import {ChevronDown} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {ordersAPI} from '../../../services/api'; //to use centralized API from api.js
import {useCart} from '../../../contexts/CartContext'; //clear cart locally after success

export default function DetailsForm({
                                        shippingMethod,
                                        onShippingMethodChange,
                                        isFreeShipping,
                                        total
                                    }) {
    const navigate = useNavigate();
    const {fetchCart} = useCart(); //refreshes cart state everytime it is clear on backend

    //state for form fields
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        state: 'Selangor'
    });
    const [loading, setLoading] = useState(false);

    const inputClasses = "w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A4D39]/20 focus:border-[#3A4D39] transition-all min-h-[44px]";
    const labelClasses = "block text-xs font-bold text-sage-500 uppercase tracking-wider mb-1.5";

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        //add validation: ensure all required fields are filled before proceed...
        if (!formData.email || !formData.fullName || !formData.address1 || !formData.city || !formData.postcode) {
            alert("Please fill in all required shipping and contact details.");
            return;
        }

        setLoading(true);
        try {
            //i combine the field into one string for Order.java's shippingAddress
            const fullAddress = `${formData.fullName}, ${formData.address1} ${formData.address2}, ${formData.postcode} ${formData.city}, ${formData.state}. Phone: ${formData.phone}`;

            //call centralized API to place order
            const result = await ordersAPI.placeOrder(fullAddress);

            if (result.success) {
                //navigate using REAL orderId from backend
                await fetchCart(); //to ensure local cart UI updates to empty
                navigate('/order-success', {
                    state: {orderId: result.order.id}
                });
            } else {
                alert(result.error || "Checkout failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("A server error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handlePayment} className="space-y-10 sm:space-y-12">
            {/* Contact Info */}
            <section>
                <h2 className="font-display text-lg sm:text-xl font-bold flex items-center gap-3 text-[#3A4D39] mb-4">
                    <span
                        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3A4D39] text-white text-xs sm:text-sm font-sans">1</span>
                    Contact Information
                </h2>
                <div className="space-y-4 pl-0 sm:pl-11">
                    <div>
                        <label className={labelClasses}>Email Address</label>
                        <input name="email" value={formData.email} onChange={handleInputChange} type="email"
                               className={inputClasses} placeholder="you@example.com" required/>
                    </div>
                    <div>
                        <label className={labelClasses}>Phone Number</label>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel"
                               className={inputClasses} placeholder="+60 12-345 6789"/>
                    </div>
                </div>
            </section>

            {/* Shipping Address */}
            <section>
                <h2 className="font-display text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-3 text-[#3A4D39]">
                    <span
                        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3A4D39] text-white text-xs sm:text-sm font-sans">2</span>
                    Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-11">
                    <div className="sm:col-span-2">
                        <label className={labelClasses}>Full Name</label>
                        <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text"
                               className={inputClasses} placeholder="e.g. Sarah Tan" required/>
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClasses}>Address Line 1</label>
                        <input name="address1" value={formData.address1} onChange={handleInputChange} type="text"
                               className={inputClasses} placeholder="Street address, P.O. box" required/>
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClasses}>Address Line 2 (Optional)</label>
                        <input name="address2" value={formData.address2} onChange={handleInputChange} type="text"
                               className={inputClasses} placeholder="Apartment, suite, unit, etc."/>
                    </div>
                    <div>
                        <label className={labelClasses}>City</label>
                        <input name="city" value={formData.city} onChange={handleInputChange} type="text"
                               className={inputClasses} placeholder="City" required/>
                    </div>
                    <div>
                        <label className={labelClasses}>Postcode</label>
                        <input name="postcode" value={formData.postcode} onChange={handleInputChange} type="text"
                               className={inputClasses} placeholder="Postcode" required/>
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClasses}>State</label>
                        <div className="relative">
                            <select name="state" value={formData.state} onChange={handleInputChange}
                                    className={`${inputClasses} appearance-none pr-10 text-sage-900`}>
                                <option>Johor</option>
                                <option>Kedah</option>
                                <option>Kelantan</option>
                                <option>Kuala Lumpur</option>
                                <option>Melaka</option>
                                <option>Negeri Sembilan</option>
                                <option>Pahang</option>
                                <option>Penang</option>
                                <option>Perak</option>
                                <option>Perlis</option>
                                <option>Pulau Pinang</option>
                                <option>Sabah</option>
                                <option>Sarawak</option>
                                <option>Selangor</option>
                                <option>Terengganu</option>
                            </select>
                            <ChevronDown size={16}
                                         className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 pointer-events-none"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shipping Method & Pay Button */}
            <section>
                <h2 className="font-display text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-3 text-[#3A4D39]">
                    <span
                        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3A4D39] text-white text-xs sm:text-sm font-sans">3</span>
                    Shipping Method
                </h2>
                <div className="pl-0 sm:pl-11">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 sm:py-5 bg-[#3A4D39] text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex justify-center items-center gap-2 min-h-[56px] ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#2F4030] hover:shadow-xl hover:-translate-y-0.5'}`}
                    >
                        {loading ? 'Processing...' : `Pay RM ${total.toFixed(2)}`}
                    </button>
                </div>
            </section>
        </form>
    );
}