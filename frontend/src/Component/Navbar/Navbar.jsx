import React, { useState } from 'react'
import logo from '../../Assets/logo.png';
import cart from '../../Assets/cart.png';
import { Link } from 'react-router-dom';

import "./Navbar.css"

const Navbar = () => {
    const[menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
        <div className="navbar-logo">
            <img src={logo} alt="AuraWell Logo" />
            <h1>AuraWell</h1>
        </div>

        <div className={`nav-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        >
        <span></span>
        <span></span>
        <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="#">Home</a></li>

          <li className="dropdown">
            <a href="#">Shop ▾</a>
            <ul className= "dropdown-menu">
              <li><a href="#">All Products</a></li>
              <li><a href="#">Herbal Teas</a></li>
              <li><a href="#">Essential Oils</a></li>
              <li><a href="#">Vitamin</a></li>
              <li><a href="#">Acromatherapy</a></li>
            </ul>
          </li>

          <li className="dropdown">
            <a href="#">Your Goal ▾</a>
            <ul className= "dropdown-menu">
              <li><a href="#">Better Sleep</a></li>
              <li><a href="#">Boost Energy</a></li>
              <li><a href="#">Relieve Stress</a></li>
              <li><a href="#">Immunity</a></li>
              <li><a href="#">Focus</a></li>
            </ul>
          </li>

          <li className="dropdown">
            <a href="#">About ▾</a>
            <ul className= "dropdown-menu">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Team Member</a></li>
            </ul>
          </li>

          <li><a href="#">Personalise Me</a></li>
        </ul>

        <div className="nav-icons">
          <Link to="/login">
            <button className='login-btn'>Sign In</button>
          </Link>

          <Link to="/signup">
            <button className='signup-btn'>Get Started</button>
          </Link>
          <a href="#"><img src={cart} alt="Cart" /></a>
        </div>
    </nav>
  );
};

export default Navbar;