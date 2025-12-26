import { Shield, Lock, Eye, Database } from 'lucide-react';
import PolicyCard from '../../components/ui/PolicyCard';

export default function Privacy() {
    const sections = [
        {
            icon: Database,
            title: "Information We Collect",
            content: "We collect information you provide directly: name, email, shipping address, and payment details when you make a purchase. We also collect usage data to improve our services."
        },
        {
            icon: Lock,
            title: "How We Protect Your Data",
            content: "Your data is encrypted using industry-standard SSL technology. We never store complete payment information on our servers and use trusted payment processors."
        },
        {
            icon: Eye,
            title: "How We Use Your Information",
            content: "We use your information to process orders, send order updates, improve our products and services, and occasionally send promotional emails (you can opt out anytime)."
        },
        {
            icon: Shield,
            title: "Your Rights",
            content: "You can request access to, correction of, or deletion of your personal data at any time. Contact us at privacy@aurawell.com for any privacy-related requests."
        }
    ];

    return (
        <div className="min-h-screen bg-cream-50">
            {/* Header */}
            <div className="bg-cream-50 pt-12 pb-6">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Shield className="w-10 h-10 mx-auto mb-3 text-sage-500" />
                    <h1 className="text-3xl font-display font-bold text-sage-800 mb-2">Privacy Policy</h1>
                    <p className="text-sage-500 text-sm">Last updated: December 2025</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 pb-12">
                <p className="text-sage-600 mb-6 text-center text-sm">
                    At AuraWell, we value your privacy and are committed to protecting your personal information.
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
