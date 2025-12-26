import React from 'react';
import HeroSection from './components/HeroSection';
import TrustAndTestimonials from './components/TrustAndTestimonials';

export default function Home(){
    return (
        <main>
           <HeroSection/>

           {/* This adds the fancy section ONLY to the Home page */}
           <TrustAndTestimonials />

        </main>
    );
}