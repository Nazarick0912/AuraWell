import React from 'react';
import { Leaf, Target, Eye, Quote } from 'lucide-react';

export default function TrustAndTestimonials() {
    return (
        <>
            {/* --- SECTION 1: About / Mission / Vision --- */}
            <section className="relative py-20 px-4 overflow-hidden">
                {/* Background - same as Hero */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-cream-100 to-cream-200" />

                <div className="relative max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 bg-sage-200 rounded-full text-sage-700 text-sm font-medium mb-4">
                            Our Story
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-sage-800 mb-4">
                            Wellness, Naturally
                        </h2>
                        <p className="text-sage-600 text-lg max-w-2xl mx-auto">
                            We believe nature holds the answers to modern wellness challenges
                        </p>
                    </div>

                    {/* Three Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* About Us Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-md border border-cream-200 hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-sage-400 to-sage-600 rounded-xl flex items-center justify-center mb-6">
                                <Leaf className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-display text-xl font-semibold text-sage-800 mb-4">
                                About Us
                            </h3>
                            <p className="text-sage-600 leading-relaxed">
                                Founded in 2020 with a simple belief: nature holds the key to vitality.
                                We curate the finest organic ingredients, partnering with sustainable farms
                                to bring you wellness solutions that truly work.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-md border border-cream-200 hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-terracotta-400 to-terracotta-600 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-display text-xl font-semibold text-sage-800 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-sage-600 leading-relaxed">
                                To democratize access to high-quality, sustainable wellness products.
                                We refuse to compromise on ethics, ensuring every product is cruelty-free,
                                eco-conscious, and transparently sourced.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-md border border-cream-200 hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-cream-400 to-cream-500 rounded-xl flex items-center justify-center mb-6">
                                <Eye className="w-7 h-7 text-sage-800" />
                            </div>
                            <h3 className="font-display text-xl font-semibold text-sage-800 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-sage-600 leading-relaxed">
                                A world where holistic health is the standard, not the exception.
                                We envision transparency in sourcing as the norm, empowering
                                everyone to make informed wellness choices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: Testimonials --- */}
            <section className="relative py-20 font-sans overflow-hidden">
                {/* Background - same as Hero */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-cream-100 to-cream-200" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h3 className="font-display text-2xl md:text-3xl font-semibold text-sage-800 mb-3">
                            What Our Customers Say
                        </h3>
                        <p className="text-sage-600 text-sm">
                            Real stories from our wellness community
                        </p>
                    </div>

                    {/* Testimonial Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                quote: "The aromatherapy oils have completely changed my nightly routine. I've never slept better!",
                                author: "Choong SQ"
                            },
                            {
                                quote: "I love that I can trust the ingredients in the vitamin supplements. AuraWell is my go-to now.",
                                author: "Michael T."
                            },
                            {
                                quote: "Shipping was incredibly fast, and the packaging is eco-friendly. Truly a brand that cares.",
                                author: "Emily Wong"
                            },
                            {
                                quote: "My skin usually hates new products, but this Vitamin C is gentle. Noticed a glow after just a week!",
                                author: "Jack Tan"
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl border border-cream-200 shadow-md hover:scale-[1.02] transition-transform duration-300"
                            >
                                <Quote className="w-8 h-8 text-sage-400 mb-4" />
                                <p className="italic text-sage-700 text-sm mb-4 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                                <span className="text-xs font-bold text-sage-500 uppercase tracking-wider">
                                    - {testimonial.author}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}