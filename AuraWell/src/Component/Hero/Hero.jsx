import React from 'react'
import "./Hero.css"
import search from '../../Assets/search.png';
import leaf from '../../Assets/leaf.png';

const Hero = () => {
  return (
    <section className="hero">
        <div className="hero-content">
            <h1 className="hero-title">
                Welcome to<br /> <span>AuraWell</span><span className="leaf"><img src={leaf} alt="leaf img" /></span>
                
            </h1>
            <p className='hero-subtitle'>
                A curated wellness boutique that recommends products based on your lifestyle goals — not just what's trending.
            </p>
            <div className="hero-search">
                <input type="text" placeholder="Search..." />
                <img src={search} alt="Search img" />
            </div>
        </div>
    </section>
  );
};

export default Hero;