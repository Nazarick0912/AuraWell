import React, {useState} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import logo from "../assets/logo.png";
import {ShoppingCart} from "lucide-react";

// Accept the 'onCartClick' prop
const Navbar = ({ onCartClick }) => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isProductPage = location.pathname === "/products";
    const activeCategory = searchParams.get("category");

    const isActiveCategory = (value) => {
        if (!isProductPage) return false;
        return value ? activeCategory === value : activeCategory === null;
    };

    const closeMobile = () => setMobileOpen(false);

    return (
        <nav className="
          w-full h-[76px]
          px-[4%]
          bg-gradient-to-b from-cream-50 to-cream-100
          border-b border-cream-200
          sticky top-0 z-50
        ">
            {/* TOP BAR */}
            <div className="h-[76px] flex items-center justify-between">
                {/* Logo */}
                <Link to="/" onClick={closeMobile} className="flex items-center gap-2">
                    <img src={logo} alt="AuraWell Logo" className="h-10"/>
                    <h1 className="text-xl font-semibold text-sage-800">AuraWell</h1>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-7 items-center">
                    {["", "supplements", "vitamins", "aromatherapy"].map((c, i) => (
                        <li key={i}>
                            <Link to={`/products${c ? `?category=${c}` : ""}`}
                                  className={`nav-link ${isActiveCategory(c || null) ? "nav-link-active" : ""}`}
                            >
                                {c ? c.charAt(0).toUpperCase() + c.slice(1) : "Shop All"}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Actions (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-3">
                    <Link to="/login">Sign In</Link>
                    <Link to="/signup" className="btn-primary">Get Started</Link>

                    <button
                        onClick={onCartClick}
                        className="p-2 hover:bg-cream-200/60 rounded-full transition-colors cursor-pointer"
                        aria-label="Open Cart"
                    >
                        <ShoppingCart className="w-6 h-6 text-sage-700"/>
                    </button>
                </div>

                <div className="md:hidden flex items-center gap-2">

                    {/* 1. Mobile Cart Button */}
                    <button
                        onClick={onCartClick}
                        className="p-2 hover:bg-cream-200/60 rounded-full transition-colors"
                        aria-label="Open Cart"
                    >
                        <ShoppingCart className="w-6 h-6 text-sage-700"/>
                    </button>

                    {/* 2. Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(p => !p)}
                        className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-cream-200/60"
                    >
                        <div className="relative w-6 h-6">
                            <span className={`absolute top-[5px] left-0 w-6 h-[3px] bg-sage-800 rounded transition-all
                             ${mobileOpen ? "rotate-45 top-[11px]" : ""}`}/>
                            <span className={`absolute top-[11px] left-0 w-6 h-[3px] bg-sage-800 rounded transition-all
                             ${mobileOpen ? "opacity-0" : ""}`}/>
                            <span className={`absolute top-[17px] left-0 w-6 h-[3px] bg-sage-800 rounded transition-all
                              ${mobileOpen ? "-rotate-45 top-[11px]" : ""}`}/>
                        </div>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            <div className="md:hidden transition-all duration-300 ease-out">
                <div className={`
                  bg-cream-50 border-t border-cream-200
                  overflow-hidden
                  ${mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}
                  transition-all duration-300 ease-out
                `}>
                    <ul className="flex flex-col px-6 py-6 gap-4">
                        {["", "supplements", "vitamins", "aromatherapy"].map((c, i) => (
                            <li key={i}>
                                <Link to={`/products${c ? `?category=${c}` : ""}`}
                                      onClick={closeMobile}
                                      className="block text-sage-900 font-medium py-2"
                                >
                                    {c ? c.charAt(0).toUpperCase() + c.slice(1) : "Shop All"}
                                </Link>
                            </li>
                        ))}

                        <li className="pt-4 border-t border-cream-200">
                            <Link to="/login" onClick={closeMobile}
                                  className="block w-full py-3 rounded-lg bg-cream-200 text-sage-800 font-medium text-center"
                            >
                                Sign In
                            </Link>

                            <Link to="/signup" onClick={closeMobile}
                                  className="btn-primary w-full text-center mt-3 inline-block"
                            >
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;