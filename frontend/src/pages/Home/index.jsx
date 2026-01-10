import React from 'react';
import HeroSection from './components/HeroSection';
import ShopByCategory from './components/ShopByCategory';
import TrustAndTestimonials from './components/TrustAndTestimonials';
import MarketingCTA from "../../components/ui/MarketingCTA";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <main>
            <HeroSection />
            <ShopByCategory />
            {!isAuthenticated && <MarketingCTA />}
            <TrustAndTestimonials />
        </main>
    );
}