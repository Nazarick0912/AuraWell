import React, {useState, useEffect} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import logo from "../../assets/logo.png";
import {ShoppingCart, LogOut, X, Menu, User} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

// Accept the 'onCartClick' prop
const Navbar = ({ onCartClick }) => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Auth & Cart context
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { cart } = useCart();

    // Show cart only for authenticated non-admin users
    const showCart = isAuthenticated && !isAdmin;

    const isProductPage = location.pathname === "/products";
    const activeCategory = searchParams.get("category");

    const isActiveCategory = (value) => {
        if (!isProductPage) return false;
        return value ? activeCategory === value : activeCategory === null;
    };

    const closeMobile = () => setMobileOpen(false);

    // Close mobile menu on route change
    useEffect(() => {
        closeMobile();
    }, [location.pathname, location.search]);


    // Calculate total cart items count
    const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const categories = [
        { key: "", label: "Shop All" },
        { key: "supplements", label: "Supplements" },
        { key: "vitamins", label: "Vitamins" },
        { key: "aromatherapy", label: "Aromatherapy" },
    ];

    return (
        <>
            <nav className="
              w-full h-[76px]
              px-[4%]
              bg-linear-to-b from-cream-50 to-cream-100
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
                        {categories.map((cat, i) => (
                            <li key={i}>
                                <Link to={`/products${cat.key ? `?category=${cat.key}` : ""}`}
                                      className={`nav-link ${isActiveCategory(cat.key || null) ? "nav-link-active" : ""}`}
                                >
                                    {cat.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Actions (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            // Logged in state
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sage-800">
                                    <User className="w-5 h-5" />
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
                            // Logged out state
                            <>
                                <Link to="/login">Sign In</Link>
                                <Link to="/signup" className="btn-primary">Get Started</Link>
                            </>
                        )}

                        {showCart && (
                            <button
                                onClick={onCartClick}
                                className="relative p-2 hover:bg-cream-200/60 rounded-full transition-colors cursor-pointer"
                                aria-label="Open Cart"
                            >
                                <ShoppingCart className="w-6 h-6 text-sage-700"/>
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-sage-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-cream-50">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Mobile Actions */}
                    <div className="md:hidden flex items-center gap-1">
                        {/* Mobile Cart Button - only show for authenticated non-admin users */}
                        {showCart && (
                            <button
                                onClick={onCartClick}
                                className="relative p-2.5 hover:bg-cream-200/60 rounded-full transition-colors active:scale-95"
                                aria-label="Open Cart"
                            >
                                <ShoppingCart className="w-6 h-6 text-sage-700"/>
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-sage-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-cream-50">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        )}

                        {/* Hamburger / Close Button */}
                        <button
                            onClick={() => setMobileOpen(p => !p)}
                            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-cream-200/60 active:scale-95 transition-all"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                        >
                            <div className="relative w-6 h-6 flex items-center justify-center">
                                <Menu className={`w-6 h-6 text-sage-800 absolute transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} />
                                <X className={`w-6 h-6 text-sage-800 absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU DROPDOWN - Sticky, simplified */}
            <div className={`md:hidden fixed left-0 right-0 top-[76px] z-40 transition-all duration-200 ease-out ${
                mobileOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
            }`}>
                <div className="mx-3 mt-2 bg-white rounded-xl shadow-lg border border-cream-200 overflow-hidden">
                    {/* Category Links - Simple list */}
                    <div className="py-1">
                        {categories.map((cat, i) => {
                            const isActive = isActiveCategory(cat.key || null);
                            return (
                                <Link
                                    key={i}
                                    to={`/products${cat.key ? `?category=${cat.key}` : ""}`}
                                    onClick={closeMobile}
                                    className={`block px-4 py-2.5 text-sm font-medium transition-colors active:bg-cream-100 ${
                                        isActive
                                            ? "text-sage-600 bg-sage-50"
                                            : "text-sage-800"
                                    }`}
                                >
                                    {cat.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Section - Only show if not logged in */}
                    {!user && (
                        <>
                            <div className="border-t border-cream-200" />
                            <div className="p-2 flex gap-2">
                                <Link
                                    to="/login"
                                    onClick={closeMobile}
                                    className="flex-1 py-2 text-center rounded-lg text-sage-700 text-sm font-medium active:bg-cream-100 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={closeMobile}
                                    className="flex-1 py-2 text-center rounded-lg bg-sage-600 text-white text-sm font-medium active:bg-sage-700 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </>
                    )}

                    {/* Logout - Only show if logged in */}
                    {user && (
                        <>
                            <div className="border-t border-cream-200" />
                            <button
                                onClick={() => {
                                    closeMobile();
                                    logout();
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 active:bg-red-50 transition-colors flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Backdrop for closing menu on tap outside */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-30"
                    style={{ top: '76px' }}
                    onClick={closeMobile}
                />
            )}
        </>
    );
};

export default Navbar;
