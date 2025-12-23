import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ShoppingCart, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from '../context/AuthContext'; // Added this import

const Navbar = () => {
    const { user, logout } = useAuth(); // Access global user state and logout function
    const navLinkClass = "text-sage-700 hover:text-sage-900 font-medium transition";

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

            {/* Nav Links */}
            <ul className="hidden md:flex gap-7 items-center">
                <li><Link to="/Products" className={navLinkClass}>Shop All</Link></li>
                <li><Link to="/Products?category=supplements" className={navLinkClass}>Essential Oils</Link></li>
                <li><Link to="/Products?category=vitamins" className={navLinkClass}>Vitamins</Link></li>
                <li><Link to="/Products?category=aromatherapy" className={navLinkClass}>Aromatherapy</Link></li>
            </ul>

            {/* Right side - DYNAMIC SECTION */}
            <div className="flex items-center gap-5">
                {user ? (
                    /* Show this when LOGGED IN */
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
                    /* Show this when LOGGED OUT */
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sage-700 hover:text-sage-900 font-medium">
                            Sign In
                        </Link>
                        <Link to="/signup" className="btn-primary">
                            Get Started
                        </Link>
                    </div>
                )}
                
                <Link to="/cart" className="relative">
                    <ShoppingCart className="w-6 h-6 text-sage-700 hover:text-sage-900 cursor-pointer transition" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;