import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import search from '../../../assets/search.png';
import leaf from '../../../assets/leaf.png';
import { ArrowRight, SunMedium} from 'lucide-react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-lg px-4 py-3 rounded-xl
                bg-white border border-sage-300
                text-sage-800 placeholder-sage-400
                focus:outline-none focus:ring-2 focus:ring-sage-300"
    />
  );
};

export default function HeroSection(){
  const [query, setQuery] = useState("");

  return (
    <div>
      { /* Hero Section*/}
      <section className='relative flex items-center overflow-hidden'>
        {/* Background */}
        <div className='absolute inset-0 bg-gradient-to-br from-sage-100 via-cream-100 to-cream-200'/>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-sage-300 rounded-full blur-3xl'/>
          <div className='absolute bottom-20 right-10 w-96 h-96 bg-terracotta-200 rounded-full blur-3xl'/>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm-px-6 lg:px-8 py-24" >
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <span className='inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6'>
                <SunMedium className="w-4 h-4" />
                Wellness for Every Generation
            </span>

            <h1 className='text-5xl lg:text-7xl font-display font-bold text-sage-900 leading-tight mb-6'>
              Nourish Your
              <span className='text-sage-600 block'> Natural Glow</span>
            </h1>

            <p className='text-xl text-sage-600 mb-8 max-w-lg'>
              Thoughtfully curated wellness products for a healthier, more balanced life.
            </p>

            <div className='flex flex-wrap gap-4'>
              <Link className="btn-primary flex items-center gap-2 text-lg">
                Shop now
                <ArrowRight className='w-5 h-5'/>
              </Link>

              <SearchBar query={query} setQuery={setQuery}/>
            </div>
          </div>
        </div>
        
      </section>

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
              <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
      </section>
    </div>
      
    
  );
}

