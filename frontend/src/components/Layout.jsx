import React, {useEffect, useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import CartDrawer from './ui/CartDrawer';

export default function Layout() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const {pathname} = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col relative">
            <Navbar onCartClick={() => setIsCartOpen(true)}/>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            <main className="flex-1">
                <Outlet/>
            </main>

            <Footer/>
        </div>
    );
}