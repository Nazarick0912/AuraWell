import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
    // This simple SVG pattern creates a subtle "film grain" texture
    const noiseTexture = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
    };

    return (
        <footer className='bg-sage-900 text-cream-100 py-20 font-sans relative overflow-hidden'>

            {/* --- UPGRADE 1: BACKGROUND TEXTURE --- */}
            {/* This overlay creates the "Paper/Stone" feel */}
            <div className='absolute inset-0 z-0 pointer-events-none' style={noiseTexture}></div>

            {/* --- UPGRADE 2: HARMONIOUS "EARTHY" AURAS --- */}

            {/* Top Left: "Morning Sun" - A warm, golden glow that compliments green */}
            {/* We use standard tailwind colors (amber/yellow) with very low opacity */}
            <div className='absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[600px] h-[600px] bg-yellow-100/5 rounded-full blur-[120px] pointer-events-none z-0'></div>

            {/* Bottom Right: "Deep Forest" - A lighter green to add depth without being neon */}
            <div className='absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-sage-500/10 rounded-full blur-[120px] pointer-events-none z-0'></div>


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

                {/* --- SECTION 2: Testimonials (Frosted Glass) --- */}
                <div className='mb-24'>
                    <h3 className='font-display text-2xl font-semibold mb-10 text-center text-white'>What Our Customers Say</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

                        {/* I increased the background opacity slightly (white/10) to make them pop
                           against the textured background.
                        */}
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

                {/* --- SECTION 3: Main Footer Grid --- */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-12 border-t border-white/10'>

                    <div className='lg:col-span-4'>
                        <div className='flex items-center gap-3 mb-6'>
                            <img src={logo} alt="AuraWell Logo" className="h-10 opacity-90" />
                            <span className='font-display text-2xl font-bold text-white tracking-tight'>AuraWell</span>
                        </div>
                        <p className='text-sage-300 text-sm leading-relaxed mb-6 max-w-sm font-light'>
                            Your trusted source for wellness products, from vitamins to aromatherapy. We are dedicated to your journey towards a healthier life.
                        </p>
                    </div>

                    <div className='hidden lg:block lg:col-span-1'></div>

                    <div className='lg:col-span-2'>
                        <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs'>Shop</h4>
                        <ul className='space-y-4 text-sm text-sage-300'>
                            <li><Link to="/vitamins" className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Vitamins</Link></li>
                            <li><Link to="/supplements" className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Supplements</Link></li>
                            <li><Link to="/aromatherapy" className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Aromatherapy</Link></li>
                        </ul>
                    </div>

                    <div className='lg:col-span-2'>
                        <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs'>Support</h4>
                        <ul className='space-y-4 text-sm text-sage-300'>
                            <li><a href='#' className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Contact Us</a></li>
                            <li><a href='#' className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>FAQs</a></li>
                            <li><a href='#' className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Shipping Info</a></li>
                        </ul>
                    </div>

                    <div className='lg:col-span-3'>
                        <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs'>Legal</h4>
                        <ul className='space-y-4 text-sm text-sage-300'>
                            <li><a href='#' className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Privacy Policy</a></li>
                            <li><a href='#' className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className='mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-sage-500 tracking-wider'>
                    <p>&copy; {new Date().getFullYear()} AuraWell. All rights reserved.</p>
                    <p className='mt-2 md:mt-0'>Designed for Wellness.</p>
                </div>
            </div>
        </footer>
    );
}