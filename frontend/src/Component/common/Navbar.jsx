import React, { useState } from 'react'
import logo from '../../assets/logo.png';
import cart from '../../assets/cart.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
      <nav className="w-full h-[70px] flex items-center justify-between px-[4%] bg-cream-50 border-b border-[#eaeaea] sticky top-0 z-100">
      {/* Logo */}
      <Link to="/" className='flex items-center gap-2 group'>
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="AuraWell Logo" className="h-10" />
          <h1 className="text-xl font-semibold text-brand-dark">AuraWell</h1>
        </div>
      </Link>

      {/* Mobile Toggle */}
      <div
        className={`flex-col cursor-pointer gap-1 hidden max-[850px]:flex ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-[25px] h-[3px] bg-[#333] rounded-sm"></span>
        <span className="w-[25px] h-[3px] bg-[#333] rounded-sm"></span>
        <span className="w-[25px] h-[3px] bg-[#333] rounded-sm"></span>
      </div>

      {/* Nav Links */}
      <ul className={`flex gap-6 list-none max-[850px]:absolute max-[850px]:top-[70px] max-[850px]:left-0 max-[850px]:w-full max-[850px]:flex-col max-[850px]:bg-white max-[850px]:border-t max-[850px]:border-[#eee] max-[850px]:py-4 max-[850px]:text-center ${menuOpen ? 'max-[850px]:flex' : 'max-[850px]:hidden'}`}>
        <Link to="/">
          <a href="#" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-brand-dark">
            Home
          </a>
        </Link>

        <li className="relative group">
          <a href="#" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-brand-dark">
            Shop ▾
          </a>
          <ul className="absolute top-full left-0 bg-white border border-[#eaeaea] rounded-lg py-2.5 hidden group-hover:block list-none shadow-[0_3px_8px_rgba(0,0,0,0.05)] cursor-pointer min-w-[160px]">
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">All Products</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Herbal Teas</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Essential Oils</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Vitamin</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Aromatherapy</a>
            </li>
          </ul>
        </li>

        <li className="relative group">
          <a href="#" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-brand-dark">
            Your Goal ▾
          </a>
          <ul className="absolute top-full left-0 bg-white border border-[#eaeaea] rounded-lg py-2.5 hidden group-hover:block list-none shadow-[0_3px_8px_rgba(0,0,0,0.05)] cursor-pointer min-w-[160px]">
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Better Sleep</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Boost Energy</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Relieve Stress</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Immunity</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Focus</a>
            </li>
          </ul>
        </li>

        <li className="relative group">
          <a href="#" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-brand-dark">
            About ▾
          </a>
          <ul className="absolute top-full left-0 bg-white border border-[#eaeaea] rounded-lg py-2.5 hidden group-hover:block list-none shadow-[0_3px_8px_rgba(0,0,0,0.05)] cursor-pointer min-w-[160px]">
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Our Story</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Blog</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Sustainability</a>
            </li>
            <li className="py-2 px-5">
              <a href="#" className="text-[#333] no-underline block hover:bg-[#f7f7f7] hover:text-brand-dark">Team Member</a>
            </li>
          </ul>
        </li>

        <li>
          <a href="#" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-brand-dark">
            Personalise Me
          </a>
        </li>
      </ul>

      {/* Nav Icons */}
      <div className="flex items-center gap-4">
        <Link to="/login">
          <button className="bg-transparent border-none p-0 font-sans font-bold text-sage-500 cursor-pointer hover:text-sage-700 transition-colors duration-200">
            Sign In
          </button>
        </Link>

        <Link to="/signup">
          <button className="w-full btn-primary">
            Get Started
          </button>
        </Link>

        <a href="#">
          <img src={cart} alt="Cart" className="ml-2.5 h-10 cursor-pointer" />
        </a>
      </div>
     </nav>  
  );
};

export default Navbar;
