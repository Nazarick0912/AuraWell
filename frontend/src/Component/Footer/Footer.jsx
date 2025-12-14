import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Footer(){
    return (
        <footer className='bg-sage-800 text-cream-100 py-12'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg-px-8'>
                <div className='grid grild-cols-1 md:grid cols-4 gap-8'>
                    <div>
                      <div className='flex items-center gap-2 mb-4'>
                        <img src={logo} alt="AuraWell Logo" className="h-10" />
                        <span className='font-display text-xl font-semi'>
                        AuraWell
                        </span>
                      </div>
                      <p className='text-cream-300 text-sm'>
                        Your trusted source for wellness products, from vitamins to aromatherapy.
                      </p>
                    </div>

                    <div>
                        <h4 className='font-semibold mb-4'>Shop</h4>
                        <ul className='space-y-2 text-sm text-cream-300'> 
                            <li><Link>Vitamins</Link></li>
                            <li><Link>Supplements</Link></li>
                            <li><Link>Aromatherapy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='font-semibold mb-4'>Support</h4>
                        <ul className='space-y-2 text-sm text-cream-300'> 
                            <li><a href='#' className='hover:text-white transition-colors'>Contact Us</a></li>
                            <li><a href='#' className='hover:text-white transition-colors'>FAQs</a></li>
                            <li><a href='#' className='hover:text-white transition-colors'>Shipping Info</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='font-semibold mb-4'>Legal</h4>
                        <ul className='space-y-2 text-sm text-cream-300'>
                            <li><a href='#' className='hover:text-white transition-colors'>Privacy Policy</a></li>
                             <li><a href='#' className='hover:text-white transition-colors'>Terms of Service</a></li>
                        </ul>
                    </div>
                    
                    <div className='mt-8 pt-8 border-t border-sage-700 text-center text-sm text-cream-400'>
                        <p>&copy; {new Date().getFullYear()} AuraWell. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}