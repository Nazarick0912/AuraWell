import React from 'react'
import search from '../../Assets/search.png';
import leaf from '../../Assets/leaf.png';

const Hero = () => {
  return (
    <section className="text-center bg-[#fffaf3] py-[120px] px-5 text-brand-darker">
      <div className="max-w-[1720px] mx-auto">
        <h1 className="text-[90px] font-medium leading-[1.2] mb-0 text-brand-darker max-md:text-4xl">
          Welcome to<br />
          <span className="text-brand-accent">AuraWell</span>
          <span className="inline-block">
            <img
              src={leaf}
              alt="leaf img"
              className="w-14 h-[66px] ml-2.5 -mr-5"
            />
          </span>
        </h1>
        <p className="text-[40px] text-[#333] mb-[50px] leading-[1.2] max-w-[840px] mx-auto max-md:text-base">
          A curated wellness boutique that recommends products based on your lifestyle goals — not just what's trending.
        </p>
        <div className="relative max-w-[700px] mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-3.5 pl-4 pr-11 border border-brand-darker rounded-[10px] text-[27px] text-[#333] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 placeholder:text-[#aaa] focus:border-brand-dark focus:shadow-[0_2px_6px_rgba(0,0,0,0.08)] focus:outline-none max-md:text-base"
          />
          <img
            src={search}
            alt="Search img"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] opacity-90 cursor-pointer transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;