import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, SunMedium } from "lucide-react";
import { motion } from "framer-motion";
import Search from "../../../components/ui/Search";
import heroImage from "../../../assets/hero-healthcare.png";

export default function HeroSection() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const q = query.trim();
        if (q) {
            navigate(`/products?search=${encodeURIComponent(q)}`);
        }
    };

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 16 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" },
        },
    };

    // SAME FLOATING MOTION AS YOUR LEAF
    const float = {
        y: [0, -10, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    };

    return (
        <section className="relative flex items-center overflow-hidden min-h-[95vh]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-cream-100 to-cream-200" />
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-sage-300 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-terracotta-200 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* LEFT COLUMN */}
                    <div>
                        {/* HERO IMAGE - hidden on mobile */}
                        <motion.div variants={item} className="mt-3 hidden lg:block">
                            <div
                                className="
                                  relative
                                  w-[420px] h-[420px]
                                  xl:w-[520px] xl:h-[520px]
                                  rounded-full
                                  bg-sage-200/40
                                  p-3
                                "
                            >
                                {/* leaf icon */}
                                <motion.div
                                    animate={float}
                                    className="absolute top-5 right-5 bg-white p-3 rounded-xl shadow-lg"
                                >
                                    <Leaf className="w-5 h-5 text-sage-600" />
                                </motion.div>

                                {/* Image */}
                                <div className="w-full h-full rounded-full bg-white shadow-xl overflow-hidden">
                                    <img
                                        src={heroImage}
                                        alt="Wellness healthcare"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div>
                        {/* Wellness badge */}
                        <motion.span
                            variants={item}
                            animate={float}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4"
                        >
                            <SunMedium className="w-4 h-4" />
                            Wellness for Every Generation
                        </motion.span>

                        <motion.h1
                            variants={item}
                            className="text-5xl lg:text-7xl font-display font-bold text-sage-900 leading-tight mb-6"
                        >
                            Nourish Your
                            <span className="text-sage-600 block">Natural Glow</span>
                        </motion.h1>

                        <motion.p
                            variants={item}
                            className="text-xl text-sage-600 mb-10 max-w-lg"
                        >
                            Thoughtfully curated wellness products for a healthier, more balanced
                            life.
                        </motion.p>

                        <motion.div variants={item} className="flex flex-wrap gap-4">
                            <Search value={query} onChange={setQuery} onSearch={handleSearch} />

                            <Link to="/products" className="btn-primary flex items-center gap-2 text-lg">
                                Shop now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
