import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderSummaryCard from './components/OrderSummaryCard';
import DetailsForm from './components/DetailsForm';
import { useCart } from '../../contexts/CartContext'; //get real cart data
import { productsAPI } from '../../services/api'; //fetch product info

export default function Checkout() {
    const { cart } = useCart(); //grab current cart state
    const [allProducts, setAllProducts] = useState([]);
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    //fetch all products to get names and images for the items in cart
    useEffect(() => {
        const loadProducts = async () => {
            const data = await productsAPI.getAll();
            setAllProducts(data);
        };
        loadProducts();
    }, []);

    //map the cart item ids to full product details for the ui
    const cartItems = cart?.items?.map(cartItem => {
        const productInfo = allProducts.find(p => p.id === cartItem.productId);
        return {
            id: cartItem.productId,
            name: productInfo?.name || "loading...",
            variant: productInfo?.category || "wellness", //using category as variant
            price: productInfo?.price || 0,
            qty: cartItem.quantity, //mapping backend 'quantity' to 'qty' for card
            image: productInfo?.imageUrl || ""
        };
    }) || [];

    //calculate values based on the real items
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const isFreeShipping = subtotal >= 100;

    let shippingCost = 0;
    if (shippingMethod === 'standard') {
        shippingCost = isFreeShipping ? 0 : 10.00;
    } else {
        shippingCost = 25.00;
    }

    const tax = 1.50; //mock tax value
    const total = subtotal + shippingCost + tax;

    return (
        <div className="min-h-screen bg-white font-sans text-sage-900">
            {/* mobile summary view */}
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

            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    
                    {/* left side: checkout form */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <div className="hidden lg:flex items-center justify-between mb-10">
                            <div className="font-display text-2xl font-bold tracking-tight text-sage-900 flex items-center gap-2">
                                <span className="text-[#3A4D39]">AuraWell</span>
                            </div>
                            <Link 
                                to="/products" 
                                className="flex items-center gap-2 bg-stone-100 text-sage-800 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#3A4D39] hover:text-white transition-all duration-300 min-h-[44px]"
                            >
                                <ArrowLeft size={14} /> return to shop
                            </Link>
                        </div>

                        {/* breadcrumb for mobile */}
                        <div className="lg:hidden mb-6">
                            <Link 
                                to="/products" 
                                className="inline-flex items-center gap-1 text-xs font-bold text-sage-500 min-h-[44px] py-2"
                            >
                                <ArrowLeft size={12} /> return to shop
                            </Link>
                        </div>

                        <DetailsForm
                            shippingMethod={shippingMethod}
                            onShippingMethodChange={setShippingMethod}
                            isFreeShipping={isFreeShipping}
                            total={total}
                        />
                    </div>

                    {/* right side: desktop summary sidebar */}
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