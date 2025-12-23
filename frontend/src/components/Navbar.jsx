import React from 'react';
import {Link, useLocation, useSearchParams} from 'react-router-dom';
import logo from '../assets/logo.png';
import {ShoppingCart} from "lucide-react";

const Navbar = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const isProductPage = location.pathname === "/products";
    const activeCategory = searchParams.get("category");
    const isActiveCategory = (categoryValue) => {
        if (!isProductPage) return false;

        if (!categoryValue) {
            return activeCategory === null;
        }
        return activeCategory === categoryValue;
    };
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

            {/* Mobile Toggle */}
            <div className="md:hidden">
                <span className="w-[25px] h-[3px] bg-[#333] rounded-sm"></span>
                <span className="w-[25px] h-[3px] bg-[#333] rounded-sm"></span>
                <span className="w-[25px] h-[3px] bg-[#333] rounded-sm"></span>
            </div>

            {/* Nav Links */}
            <ul className="hidden md:flex gap-7 items-center">
                <li>
                    <Link to="/Products" className={`nav-link ${isActiveCategory(null) ? "nav-link-active" : ""}`}>
                        Shop All
                    </Link>
                </li>

                <li>
                    <Link to="/Products?category=supplements"
                          className={`nav-link ${
                              isActiveCategory("supplements") ? "nav-link-active" : ""
                          }`}
                    >
                        Supplements
                    </Link>
                </li>

                <li>
                    <Link to="/Products?category=vitamins"
                          className={`nav-link ${
                              isActiveCategory("vitamins") ? "nav-link-active" : ""
                          }`}
                    >
                        Vitamins
                    </Link>
                </li>

                <li>
                    <Link to="/Products?category=aromatherapy"
                          className={`nav-link ${
                              isActiveCategory("aromatherapy") ? "nav-link-active" : ""
                          }`}
                    >
                        Aromatherapy
                    </Link>
                </li>
            </ul>


            {/* Right side */}
            <div className="flex items-center gap-3">
                <Link to="/login">Sign In</Link>
                <Link to="/signup" className="btn-primary">
                    Get Started
                </Link>
                <ShoppingCart
                    className="w-6 h-6 text-sage-700 hover:text-sage-900 cursor-pointer transition"
                />
            </div>
        </nav>
    );
};

export default Navbar;
