import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

export default function Footer() {
    const noiseTexture = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
    };

    return (
        <footer className='bg-sage-900 text-cream-100 py-12 font-sans relative overflow-hidden border-t border-white/5'>
            <div className='absolute inset-0 z-0 pointer-events-none' style={noiseTexture}></div>

            <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8'>

                    <div className='lg:col-span-4'>
                        <div className='flex items-center gap-3 mb-6' onClick={scrollToTop}>
                            <img src={logo} alt="AuraWell Logo" className="h-10 opacity-90"/>
                            <span className='font-display text-2xl font-bold text-white tracking-tight'>AuraWell</span>
                        </div>
                        <p className='text-sage-300 text-sm leading-relaxed mb-6 max-w-sm font-light'>
                            Your trusted source for wellness products, from vitamins to aromatherapy. We are dedicated
                            to your journey towards a healthier life.
                        </p>
                    </div>

                    <div className='hidden lg:block lg:col-span-1'></div>

                    <div className='lg:col-span-2'>
                        <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs'>Shop</h4>
                        <ul className='space-y-4 text-sm text-sage-300'>
                            <li><Link to="/products?category=vitamins" onClick={scrollToTop}
                                      className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Vitamins</Link>
                            </li>
                            <li><Link to="/products?category=supplements" onClick={scrollToTop}
                                      className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Supplements</Link>
                            </li>
                            <li><Link to="/products?category=aromatherapy" onClick={scrollToTop}
                                      className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Aromatherapy</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='lg:col-span-2'>
                        <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs'>Support</h4>
                        <ul className='space-y-4 text-sm text-sage-300'>
                            <li><a href="mailto:support@aurawell.com"
                                   className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Contact
                                Us</a></li>
                            <li><Link to="/products"
                                      className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'
                                      onClick={scrollToTop}>Browse
                                Products</Link></li>
                        </ul>
                    </div>

                    <div className='lg:col-span-3'>
                        <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs'>Legal</h4>
                        <ul className='space-y-4 text-sm text-sage-300'>
                            <li><Link to="/privacy" onClick={scrollToTop}
                                      className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Privacy
                                Policy</Link></li>
                            <li><Link to="/terms" onClick={scrollToTop}
                                      className='hover:text-white transition-all duration-300 hover:translate-x-1 inline-block'>Terms
                                of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div
                    className='mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-sage-500 tracking-wider'>
                    <p>&copy; {new Date().getFullYear()} AuraWell™. All rights reserved.</p>
                    <div className='flex gap-4'>
                        <span>Designed for Wellness.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
