import {Link} from "react-router-dom";
import {ArrowRight} from "lucide-react";

export default function MarketingCTA() {
    return (
        <section className="py-20 bg-sage-700">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-display font-semibold text-white mb-4">
                    Start Your Wellness Journey Today
                </h2>
                <p className="text-sage-200 mb-8 text-lg">
                    Join thousands of customers who trust AuraWell for their health and wellness needs.
                </p>
                <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sage-700 font-semibold rounded-xl hover:bg-cream-100 transition-colors"
                >
                    Create Your Account
                    <ArrowRight className="w-5 h-5"/>
                </Link>
            </div>
        </section>
    );
}
