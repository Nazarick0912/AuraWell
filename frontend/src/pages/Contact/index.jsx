import React from 'react';

export default function Contact() {
    return (
        <div className="bg-cream-50 min-h-screen py-12 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-display font-bold text-sage-900 mb-4 text-center">Get in Touch</h1>
                <p className="text-sage-600 text-center mb-12 max-w-2xl mx-auto">
                    Have a question about our vitamins or need help with an order? We'd love to hear from you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="card p-8 bg-white border border-cream-300">
                            <h3 className="text-xl font-display font-bold text-sage-800 mb-4">
                                Customer Support
                            </h3>
                            <div className="space-y-4 text-sage-700">
                                <p className="flex items-center gap-3">
                                    <span className="font-bold text-terracotta-500">Email:</span>
                                    support@aurawell.com
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="font-bold text-terracotta-500">Phone:</span>
                                    +60 12-345 6789
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="font-bold text-terracotta-500">Hours:</span>
                                    Mon–Fri, 9:00 AM – 6:00 PM (MYT)
                                </p>
                            </div>
                        </div>


                        <div className="card p-8 bg-sage-100 border border-sage-200">
                            <h3 className="text-xl font-display font-bold text-sage-800 mb-4">
                                Headquarters
                            </h3>
                            <p className="text-sage-700 leading-relaxed">
                                Level 12, Menara Wellness<br/>
                                No. 88, Jalan Tun Razak<br/>
                                50400 Kuala Lumpur<br/>
                                Malaysia
                            </p>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <form className="card p-8 bg-white shadow-lg">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-sage-700 mb-2">Name</label>
                                <input type="text" className="input-field" placeholder="Your name"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sage-700 mb-2">Email</label>
                                <input type="email" className="input-field" placeholder="you@example.com"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sage-700 mb-2">Message</label>
                                <textarea rows="4" className="input-field" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}