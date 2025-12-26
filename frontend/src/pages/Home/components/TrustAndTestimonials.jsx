import React from 'react';

export default function TrustAndTestimonials() {
    const noiseTexture = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
    };

    return (
        <section className='bg-sage-900 text-cream-100 py-20 font-sans relative overflow-hidden'>

            <div className='absolute inset-0 z-0 pointer-events-none' style={noiseTexture}></div>

            <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>

                {/* --- SECTION 1: The Trust Bar --- */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 border-b border-white/10 pb-16 mb-20'>
                    <div className='md:px-8 text-center md:border-r border-white/10'>
                        <h3 className='font-display text-lg font-semibold text-white mb-3 tracking-wide'>About Us</h3>
                        <p className='text-sage-200 text-sm leading-relaxed max-w-xs mx-auto font-light'>
                            Founded in 2020, nature holds the key to vitality. We curate the finest organic ingredients for your wellness.
                        </p>
                    </div>
                    <div className='md:px-8 text-center md:border-r border-white/10'>
                        <h3 className='font-display text-lg font-semibold text-white mb-3 tracking-wide'>Our Mission</h3>
                        <p className='text-sage-200 text-sm leading-relaxed max-w-xs mx-auto font-light'>
                            To democratize access to high-quality, sustainable wellness products without compromising on ethics.
                        </p>
                    </div>
                    <div className='md:px-8 text-center'>
                        <h3 className='font-display text-lg font-semibold text-white mb-3 tracking-wide'>Our Vision</h3>
                        <p className='text-sage-200 text-sm leading-relaxed max-w-xs mx-auto font-light'>
                            A world where holistic health is the standard and transparency in sourcing is the norm.
                        </p>
                    </div>
                </div>

                {/* --- SECTION 2: Testimonials --- */}
                <div>
                    <h3 className='font-display text-2xl font-semibold mb-10 text-center text-white'>What Our Customers Say</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

                        <div className='bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group'>
                            <p className='italic text-sage-100 text-sm mb-4 group-hover:text-white transition-colors'>"The aromatherapy oils have completely changed my nightly routine. I've never slept better!"</p>
                            <span className='text-xs font-bold text-sage-400 group-hover:text-sage-200 uppercase tracking-wider'>- Sarah J.</span>
                        </div>

                        <div className='bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group'>
                            <p className='italic text-sage-100 text-sm mb-4 group-hover:text-white transition-colors'>"I love that I can trust the ingredients in the vitamin supplements. AuraWell is my go-to now."</p>
                            <span className='text-xs font-bold text-sage-400 group-hover:text-sage-200 uppercase tracking-wider'>- Michael T.</span>
                        </div>

                        <div className='bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group'>
                            <p className='italic text-sage-100 text-sm mb-4 group-hover:text-white transition-colors'>"Shipping was incredibly fast, and the packaging is eco-friendly. Truly a brand that cares."</p>
                            <span className='text-xs font-bold text-sage-400 group-hover:text-sage-200 uppercase tracking-wider'>- Emily R.</span>
                        </div>

                        <div className='bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group'>
                            <p className='italic text-sage-100 text-sm mb-4 group-hover:text-white transition-colors'>"The customer support team helped me pick the right supplements for my diet. Recommended!"</p>
                            <span className='text-xs font-bold text-sage-400 group-hover:text-sage-200 uppercase tracking-wider'>- David K.</span>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}