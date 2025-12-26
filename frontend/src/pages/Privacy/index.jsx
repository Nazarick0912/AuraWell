export default function Privacy() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-display font-bold mb-6 text-sage-600">Privacy Policy</h1>
            <p className="mb-4 text-sage-600">Last Updated: {new Date().toLocaleString("en-US", {
                month: "long",
                year: "numeric",
            })}</p>

            <section className="mb-6">
                <h2 className="text-xl font-display font-bold mb-2 text-sage-600">1. Information We Collect</h2>
                <p className="mb-2 text-sage-800">We collect information that you voluntarily provide to us,
                    including:</p>
                <ul className="list-disc pl-5 space-y-1 text-sage-700">
                    <li><strong>Personal Information:</strong> First name, last name, and email address when you
                        register an account.
                    </li>
                    <li><strong>Order Information:</strong> Shipping address and purchase history when you buy products.
                    </li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our website.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-display font-bold mb-2 text-sage-600">2. How We Use Your Information</h2>
                <p className="text-sage-800">We use your data for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-sage-700">
                    <li>To process and fulfill your orders for vitamins and supplements.</li>
                    <li>To manage your account and authentication.</li>
                    <li>To communicate with you regarding your orders or policy updates.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-display font-bold mb-2 text-sage-600">3. Data Security</h2>
                <p className="text-sage-800">
                    We implement appropriate security measures to protect your personal information. However, no method
                    of transmission over the Internet is 100% secure.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-display font-bold mb-2 text-sage-600">4. Third-Party Services</h2>
                <p className="text-sage-800">
                    We may share your data with third-party vendors solely for the purpose of payment processing and
                    shipping delivery. We do not sell your personal data to advertisers.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-display font-bold mb-2 text-sage-600">5. Your Rights</h2>
                <p className="text-sage-800">
                    You have the right to access, correct, or delete your personal information. Please contact us if you
                    wish to exercise these rights.
                </p>
            </section>
        </div>
    );
}