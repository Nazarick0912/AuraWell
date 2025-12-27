import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderSummaryCard from './components/OrderSummaryCard';
import DetailsForm from './components/DetailsForm';

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
            {/* Mobile Order Summary (collapsible) */}
            <OrderSummaryCard
                isMobile={true}
                isOpen={isSummaryOpen}
                onToggle={() => setIsSummaryOpen(!isSummaryOpen)}
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                total={total}
                isFreeShipping={isFreeShipping}
                shippingMethod={shippingMethod}
            />

            {/* Main Content Container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    
                    {/* Left Column: Details Form */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        {/* Desktop Header */}
                        <div className="hidden lg:flex items-center justify-between mb-10">
                            <div className="font-display text-2xl font-bold tracking-tight text-sage-900 flex items-center gap-2">
                                <span className="text-[#3A4D39]">AuraWell</span>
                            </div>
                            <Link 
                                to="/products" 
                                className="flex items-center gap-2 bg-stone-100 text-sage-800 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#3A4D39] hover:text-white transition-all duration-300 min-h-[44px]"
                            >
                                <ArrowLeft size={14} /> Return to Shop
                            </Link>
                        </div>

                        {/* Mobile Breadcrumb */}
                        <div className="lg:hidden mb-6">
                            <Link 
                                to="/products" 
                                className="inline-flex items-center gap-1 text-xs font-bold text-sage-500 min-h-[44px] py-2"
                            >
                                <ArrowLeft size={12} /> Return to Shop
                            </Link>
                        </div>

                        <DetailsForm
                            shippingMethod={shippingMethod}
                            onShippingMethodChange={setShippingMethod}
                            isFreeShipping={isFreeShipping}
                            total={total}
                        />
                    </div>

                    {/* Right Column: Desktop Order Summary */}
                    <OrderSummaryCard
                        cartItems={cartItems}
                        subtotal={subtotal}
                        shippingCost={shippingCost}
                        tax={tax}
                        total={total}
                        isFreeShipping={isFreeShipping}
                        shippingMethod={shippingMethod}
                    />
                </div>
            </div>
        </div>
    );
}
