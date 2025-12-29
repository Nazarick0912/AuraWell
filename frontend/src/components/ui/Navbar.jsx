import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { ShoppingCart, LogOut, X, Menu, User, Package, Settings } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

// Accept the 'onCartClick' prop
const Navbar = ({ onCartClick }) => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const userMenuRef = useRef(null);

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
    const closeUserMenu = () => setUserMenuOpen(false);

    const handleLogoutClick = () => {
        closeUserMenu();
        closeMobile();
        setIsLogoutModalOpen(true);
    };

    const handleLogoutConfirm = async () => {
        await logout();
        setIsLogoutModalOpen(false);
    };

    // Close menus on route change
    useEffect(() => {
        closeMobile();
        closeUserMenu();
    }, [location.pathname, location.search]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                closeUserMenu();
            }
        };

        if (userMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [userMenuOpen]);


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
                        <img src={logo} alt="AuraWell Logo" className="h-10" />
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
                    <div className="hidden md:flex items-center gap-2">
                        {showCart && (
                            <button
                                onClick={onCartClick}
                                className="relative p-2 hover:bg-cream-200/60 rounded-full transition-colors cursor-pointer"
                                aria-label="Open Cart"
                            >
                                <ShoppingCart className="w-6 h-6 text-sage-700" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-sage-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-cream-50">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        )}

                        {user ? (
                            // Logged in state - User dropdown
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(prev => !prev)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream-200/60 transition-colors cursor-pointer"
                                >
                                    <User className="w-5 h-5 text-sage-700" />
                                    <span className="font-medium text-sage-800">{user.firstName}</span>
                                </button>

                                {/* User Dropdown Menu */}
                                <div className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-cream-200 overflow-hidden transition-all duration-200 ${userMenuOpen
                                        ? "opacity-100 translate-y-0 pointer-events-auto"
                                        : "opacity-0 -translate-y-2 pointer-events-none"
                                    }`}>
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-cream-100">
                                        <p className="font-medium text-sage-800">{user.firstName} {user.lastName}</p>
                                        <p className="text-sm text-sage-500">{user.email}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1">
                                        {isAdmin ? (
                                            <Link
                                                to="/admin"
                                                onClick={closeUserMenu}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-sage-700 active:bg-cream-100 transition-colors"
                                            >
                                                <Settings className="w-4 h-4" />
                                                Admin Panel
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/#"
                                                onClick={closeUserMenu}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-sage-700 active:bg-cream-100 transition-colors"
                                            >
                                                <Package className="w-4 h-4" />
                                                My Orders
                                            </Link>
                                        )}
                                    </div>

                                    {/* Sign Out */}
                                    <div className="border-t border-cream-100">
                                        <button
                                            onClick={() => {
                                                handleLogoutClick();
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-terracotta-600 hover:bg-terracotta-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Logged out state
                            <>
                                <Link to="/login">Sign In</Link>
                                <Link to="/signup" className="btn-primary">Get Started</Link>
                            </>
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
                                <ShoppingCart className="w-6 h-6 text-sage-700" />
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
            <div className={`md:hidden fixed left-0 right-0 top-[76px] z-40 transition-all duration-200 ease-out ${mobileOpen
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
                                    className={`block px-4 py-2.5 text-sm font-medium transition-colors active:bg-cream-100 ${isActive
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

                    {/* User Section - Only show if logged in */}
                    {user && (
                        <>
                            <div className="border-t border-cream-200" />
                            {/* User Info */}
                            <div className="px-4 py-3 bg-cream-50/50">
                                <p className="font-medium text-sage-800">{user.firstName} {user.lastName}</p>
                                <p className="text-sm text-sage-500">{user.email}</p>
                            </div>

                            <div className="border-t border-cream-200" />
                            {/* My Orders / Admin Panel */}
                            {isAdmin ? (
                                <Link
                                    to="/admin"
                                    onClick={closeMobile}
                                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-sage-700 active:bg-cream-100 transition-colors flex items-center gap-2"
                                >
                                    <Settings className="w-4 h-4" />
                                    Admin Panel
                                </Link>
                            ) : (
                                <Link
                                    to="/#"
                                    onClick={closeMobile}
                                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-sage-700 active:bg-cream-100 transition-colors flex items-center gap-2"
                                >
                                    <Package className="w-4 h-4" />
                                    My Orders
                                </Link>
                            )}

                            {/* Sign Out */}
                            <button
                                onClick={() => {
                                    handleLogoutClick();
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm font-medium text-terracotta-600 active:bg-terracotta-50 transition-colors flex items-center gap-2"
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

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
                title="Sign Out"
                message="Are you sure you want to sign out of your account?"
            />
        </>
    );
};

export default Navbar;
