"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, Star, Eye, ShoppingCart, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock Data
const products = [
    {
        id: 1,
        title: "DashLite - React Admin",
        category: "React",
        price: "$28",
        rating: 5,
        reviews: 124,
        image: "/images/product-1.jpg",
        badge: "Best Seller",
        badgeColor: "bg-yellow-500",
        updated: "2 days ago"
    },
    {
        id: 2,
        title: "SaaS Landing Kit",
        category: "HTML",
        price: "$19",
        rating: 4,
        reviews: 42,
        image: "/images/product-2.jpg",
        badge: "v2.1",
        badgeColor: "bg-primary",
        updated: "v2.1"
    },
    {
        id: 3,
        title: "Crypto Wallet UI",
        category: "Figma",
        price: "$15",
        rating: 5,
        reviews: 8,
        image: "/images/product-3.jpg",
        badge: "New",
        badgeColor: "bg-purple-500",
        updated: "Today"
    },
    {
        id: 4,
        title: "EduLearn - LMS",
        category: "React",
        price: "$45",
        rating: 4,
        reviews: 15,
        image: "/images/product-1.jpg",
        badge: "LMS",
        badgeColor: "bg-blue-500",
        updated: "LMS System"
    },
    {
        id: 5,
        title: "Agency X Portfolio",
        category: "HTML",
        price: "$22",
        rating: 5,
        reviews: 33,
        image: "/images/product-2.jpg",
        badge: "Portfolio",
        badgeColor: "bg-orange-500",
        updated: "Portfolio"
    },
    {
        id: 6,
        title: "Medical CRM",
        category: "Laravel",
        price: "$59",
        rating: 4,
        reviews: 9,
        image: "/images/product-3.jpg",
        badge: "CRM",
        badgeColor: "bg-green-500",
        updated: "CRM System"
    }
];

export default function ProductsPage() {
    const [price, setPrice] = useState(50);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col">

            {/* 1. Global Navigation */}
            <TopBar />
            <Navbar />

            {/* 2. Content Wrapper (Flex-grow ensures footer stays at bottom if content is short) */}
            <div className="flex-grow">

                {/* --- PAGE HEADER --- */}
                {/* pt-32 accounts for the fixed Navbar height */}
                <div className="relative pt-32 pb-12 border-b border-border bg-card/30 backdrop-blur-md">
                    {/* Background Blobs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-6">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-primary transition-colors">Templates</Link>
                            <span>/</span>
                            <span className="text-foreground">HTML</span>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div>
                                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2 ">
                                    All Products
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    Found <span className="text-foreground font-bold">4,203</span> premium assets
                                </p>
                            </div>

                            {/* Quick Categories */}
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide align-middle items-center">
                                {["All Items", "Admin", "Landing Page", "Portfolio", "E-commerce"].map((tab, i) => (
                                    <button
                                        key={tab}
                                        className={`
                                            whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border
                                            ${i === 0
                                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                                            : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                        }
                                        `}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN LAYOUT --- */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* --- SIDEBAR FILTERS --- */}
                        <aside className={`
                            lg:w-64 flex-shrink-0 space-y-8
                            ${isMobileFilterOpen ? "block" : "hidden lg:block"}
                        `}>
                            {/* Price Filter */}
                            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                                <h3 className="font-heading font-bold text-foreground text-sm mb-4 uppercase tracking-wider">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground font-bold">
                                        <span>$10</span>
                                        <span>${price}+</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="200"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex gap-3">
                                        <div className="w-1/2 bg-background border border-border rounded px-3 py-2 text-sm text-center font-bold">$10</div>
                                        <div className="w-1/2 bg-background border border-border rounded px-3 py-2 text-sm text-center font-bold text-primary">${price}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Framework Filter */}
                            <div>
                                <h3 className="font-heading font-bold text-foreground text-sm mb-4 uppercase tracking-wider">Framework</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: "Bootstrap 5", count: "2.1k" },
                                        { name: "Tailwind CSS", count: "1.8k" },
                                        { name: "React Next.js", count: "850" },
                                        { name: "Vue.js", count: "420" }
                                    ].map((fw) => (
                                        <label key={fw.name} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-5 h-5 border-2 border-muted rounded appearance-none checked:bg-primary checked:border-primary transition-all" />
                                                <svg className="absolute w-3.5 h-3.5 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            </div>
                                            <span className="text-muted-foreground text-sm font-medium group-hover:text-foreground transition-colors">{fw.name}</span>
                                            <span className="ml-auto text-xs text-muted-foreground/60 font-bold bg-muted px-2 py-0.5 rounded-full">{fw.count}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <h3 className="font-heading font-bold text-foreground text-sm mb-4 uppercase tracking-wider">Rating</h3>
                                <div className="space-y-2">
                                    {[5, 4].map((stars) => (
                                        <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="radio" name="rating" className="w-4 h-4 accent-primary border-border" />
                                            <div className="flex text-amber-400 text-xs">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < stars ? "currentColor" : "none"} className={i >= stars ? "text-muted" : ""} />
                                                ))}
                                            </div>
                                            <span className="text-muted-foreground text-xs font-bold group-hover:text-foreground">& Up</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* --- CONTENT GRID --- */}
                        <main className="flex-1">

                            {/* Toolbar */}
                            <div className="flex flex-wrap justify-between items-center mb-8 gap-4 bg-card p-2 rounded-xl border border-border shadow-sm">

                                {/* Mobile Filter Toggle */}
                                <button
                                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground bg-muted rounded-lg"
                                >
                                    <Filter size={16} /> Filters
                                </button>

                                <div className="hidden sm:flex items-center gap-4 pl-4">
                                    <span className="text-sm font-medium text-muted-foreground">Showing <span className="text-foreground font-bold">1-9</span> of 4,203</span>
                                </div>

                                <div className="flex items-center gap-3 ml-auto">
                                    <div className="flex items-center bg-background border border-border rounded-lg p-1">
                                        <button className="p-1.5 rounded hover:bg-muted text-primary bg-muted"><LayoutGrid size={18} /></button>
                                        <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><List size={18} /></button>
                                    </div>
                                    <div className="relative">
                                        <select className="appearance-none bg-background border border-border text-foreground text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 outline-none focus:border-primary cursor-pointer">
                                            <option>Best Selling</option>
                                            <option>Newest Releases</option>
                                            <option>Price: Low to High</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
                                    >
                                        {/* Thumbnail */}
                                        <div className="h-48 relative overflow-hidden bg-muted">
                                            {/* Image Placeholder */}
                                            <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${product.image})` }}></div>

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                                            {/* Badge */}
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className={`px-2.5 py-1 ${product.badgeColor} backdrop-blur-md text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-lg`}>
                                                    {product.badge}
                                                </span>
                                            </div>

                                            {/* Hover Button */}
                                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/20">
                                                <button className="px-5 py-2.5 bg-white text-black font-bold rounded-lg text-xs flex items-center gap-2 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                                                    <Eye size={14} /> Live Preview
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1">
                                                    {product.title}
                                                </h3>
                                                <span className="font-bold text-foreground bg-muted px-2 py-0.5 rounded text-sm">{product.price}</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
                                                <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded border border-border">
                                                    {product.category}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-border"></span>
                                                <span>{product.updated}</span>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-amber-400">
                                                    <Star size={14} fill="currentColor" />
                                                    <Star size={14} fill="currentColor" />
                                                    <Star size={14} fill="currentColor" />
                                                    <Star size={14} fill="currentColor" />
                                                    <Star size={14} fill="currentColor" className="text-muted" />
                                                    <span className="text-xs text-muted-foreground ml-1 font-bold">({product.reviews})</span>
                                                </div>
                                                <button className="text-muted-foreground hover:text-primary transition-colors">
                                                    <ShoppingCart size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-bold text-sm">
                                    &lt;
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 text-sm">
                                    1
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-bold text-sm">
                                    2
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-bold text-sm">
                                    3
                                </button>
                                <span className="w-10 h-10 flex items-center justify-center text-muted-foreground font-bold">...</span>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-bold text-sm">
                                    &gt;
                                </button>
                            </div>

                        </main>
                    </div>
                </div>
            </div>

            {/* 3. Global Footer */}
            <Footer />
        </main>
    );
}