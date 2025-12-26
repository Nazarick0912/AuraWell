export default function Terms() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-sage-600">Terms of Service</h1>
            <p className="mb-4 text-sage-600">Last Updated: {new Date().toLocaleString("en-US", {
                month: "long",
                year: "numeric",
            })}</p>

            <section className="mb-6">
                <h2 className="text-xl text-sage-600 font-semibold mb-2">1. Introduction</h2>
                <p>Welcome to AuraWell. By accessing our website and purchasing our products, you agree to be bound by
                    these Terms and Conditions.</p>
            </section>

            <section className="mb-6 bg-red-50 p-4 rounded-lg border border-red-100">
                <h2 className="text-xl font-semibold mb-2 text-red-800">2. Medical Disclaimer (Important)</h2>
                <p className="text-sage-800">
                    The content provided on AuraWell, including text, graphics, and product descriptions, is for
                    informational purposes only.
                    The products sold on this website (including vitamins, supplements, and aromatherapy) are <strong
                    className="text-sage-800">not
                    intended to diagnose, treat, cure, or prevent any disease</strong>.
                </p>
                <p className="mt-2 text-sage-800">
                    Always consult with a healthcare professional before starting any new supplement regimen, especially
                    if you have pre-existing medical conditions, are pregnant, or are taking prescription medications.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl text-sage-600 font-semibold mb-2">3. User Accounts</h2>
                <p>
                    To access certain features, you may be required to create an account. You are responsible for
                    maintaining the confidentiality of your account credentials (email and password) and for all
                    activities that occur under your account.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl text-sage-600 font-semibold mb-2">4. Purchases and Payments</h2>
                <p>
                    We reserve the right to refuse any order you place with us. Prices for our products are subject to
                    change without notice. We commit to providing accurate product descriptions, but we do not warrant
                    that product quality will meet your expectations in every instance.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl text-sage-600 font-semibold mb-2">5. Returns and Refunds</h2>
                <p>
                    Due to the nature of health and wellness products, we only accept returns for unopened and sealed
                    items within 7 days of purchase. Please contact support for assistance with damaged or incorrect
                    items.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl text-sage-600 font-semibold mb-2">6. Limitation of Liability</h2>
                <p>
                    AuraWell shall not be liable for any indirect, incidental, or consequential damages arising from the
                    use of our products or website.
                </p>
            </section>
        </div>
    );
}