import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ShoppingCart, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth(); //
    const { cart } = useCart(); //get the current cart state
    const navLinkClass = "text-sage-700 hover:text-sage-900 font-medium transition";

    //calculate total item count (sum of all quantities)
    const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <nav className="
          w-full h-[76px]
          flex flex-nowrap items-center justify-between
          px-[4%]
          bg-gradient-to-b from-cream-50 to-cream-100
          border-b border-cream-200
          sticky top-0 z-50
        ">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="AuraWell Logo" className="h-10"/>
                <h1 className="text-xl font-semibold text-sage-800">AuraWell</h1>
            </Link>

            <ul className="hidden md:flex gap-7 items-center">
                <li><Link to="/Products" className={navLinkClass}>Shop All</Link></li>
                <li><Link to="/Products?category=supplements" className={navLinkClass}>Essential Oils</Link></li>
                <li><Link to="/Products?category=vitamins" className={navLinkClass}>Vitamins</Link></li>
                <li><Link to="/Products?category=aromatherapy" className={navLinkClass}>Aromatherapy</Link></li>
            </ul>

            <div className="flex items-center gap-5">
                {user ? (
                    //show this when login
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sage-800">
                            <UserIcon className="w-5 h-5" />
                            <span className="font-medium">Hi, {user.firstName}</span>
                        </div>
                        <button 
                            onClick={logout}
                            className="flex items-center gap-1 text-sage-600 hover:text-red-600 transition text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                ) : (
                    //show this when logout
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sage-700 hover:text-sage-900 font-medium">
                            Sign In
                        </Link>
                        <Link to="/signup" className="btn-primary">
                            Get Started
                        </Link>
                    </div>
                )}

                <Link to="/cart" className="relative p-2">
                    <ShoppingCart className="w-6 h-6 text-sage-700 hover:text-sage-900 cursor-pointer transition" />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-sage-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-cream-50">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;