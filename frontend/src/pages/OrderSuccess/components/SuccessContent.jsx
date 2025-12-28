import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function SuccessContent({ orderId }) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FDFBF7] text-center px-6">

            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                <CheckCircle className="text-green-600 w-12 h-12" strokeWidth={3} />
            </div>

            <h1 className="font-display text-4xl font-bold text-[#3A4D39] mb-4">
                Order Placed Successfully!
            </h1>

            <p className="text-sage-600 mb-2">Thank you for your purchase.</p>
            <p className="text-sm text-sage-400 mb-10">Order ID: <span className="font-mono text-sage-600">{orderId}</span></p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link
                    to="/my-orders"
                    className="flex-1 bg-[#3A4D39] text-white py-4 rounded-xl font-bold hover:bg-[#2F4030] transition-all flex items-center justify-center gap-2"
                >
                    View My Orders <ArrowRight size={18} />
                </Link>

                <Link
                    to="/products"
                    className="flex-1 bg-[#FDFBF7] text-[#3A4D39] border-2 border-[#ECEADF] py-4 rounded-xl font-bold hover:bg-[#F0EEE6] transition-all flex items-center justify-center gap-2"
                >
                    <ShoppingBag size={18} /> Continue Shopping
                </Link>
            </div>
        </div>
    );
}

