import { FileText, ShoppingBag, Truck, RefreshCw } from 'lucide-react';
import PolicyCard from '../../components/ui/PolicyCard';

export default function Terms() {
    const sections = [
        {
            icon: ShoppingBag,
            title: "Orders & Payments",
            content: "All orders are subject to availability and confirmation. Prices are in USD and may change without notice. Payment is required at the time of purchase."
        },
        {
            icon: Truck,
            title: "Shipping & Delivery",
            content: "We ship to most locations within 3-7 business days. Shipping costs are calculated at checkout. We are not responsible for delays caused by carriers or customs."
        },
        {
            icon: RefreshCw,
            title: "Returns & Refunds",
            content: "Unopened products may be returned within 30 days for a full refund. Opened products cannot be returned for hygiene reasons. Contact support to initiate a return."
        },
        {
            icon: FileText,
            title: "Disclaimer",
            content: "Our products are not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before starting any supplement regimen."
        }
    ];

    return (
        <div className="min-h-screen bg-cream-50">
            {/* Header */}
            <div className="bg-cream-50 pt-12 pb-6">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <FileText className="w-10 h-10 mx-auto mb-3 text-sage-500" />
                    <h1 className="text-3xl font-display font-bold text-sage-800 mb-2">Terms of Service</h1>
                    <p className="text-sage-500 text-sm">Last updated: December 2025</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 pb-12">
                <p className="text-sage-600 mb-6 text-center text-sm">
                    By using AuraWell, you agree to the following terms and conditions.
                </p>

                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <PolicyCard
                            key={index}
                            icon={section.icon}
                            title={section.title}
                            content={section.content}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
