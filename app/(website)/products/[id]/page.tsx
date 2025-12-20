"use client";

import { useState } from "react";
import { useParams } from "next/navigation"; // To get the dynamic ID
import Link from "next/link";
import Image from "next/image";
import {Star, Check, FileText, Code, ShoppingCart, Heart, ShieldCheck, Zap, Globe, Eye} from "lucide-react";
import { motion } from "framer-motion";

// Import Shared Data & Layout
import { products } from "@/lib/data";
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProductDetailsPage() {
    // 1. Get the Dynamic ID from URL
    const params = useParams();
    const id = Number(params.id);

    // 2. Find the specific product
    const product = products.find((p) => p.id === id);

    // 3. State for Tabs
    const [activeTab, setActiveTab] = useState("details");

    // 4. Handle "Not Found" state
    if (!product) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                    <Link href="/products" className="text-primary hover:underline">Back to Products</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300">
            <TopBar />
            <Navbar />

            {/* --- BREADCRUMB --- */}
            <div className="border-b border-border bg-card/30 pt-32 pb-4">
                <div className="max-w-7xl mx-auto px-6 text-xs font-medium text-muted-foreground flex gap-2">
                    <Link href="/public" className="hover:text-foreground transition-colors">Home</Link> /
                    <Link href="/products" className="hover:text-foreground transition-colors">Templates</Link> /
                    <span className="text-foreground">{product.category}</span>
                </div>
            </div>

            {/* --- MAIN CONTENT WRAPPER --- */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* === LEFT COLUMN: CONTENT (65%) === */}
                    <div className="flex-1 min-w-0">

                        {/* Title Block */}
                        <div className="mb-8">
                            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center text-amber-500 font-bold">
                                    <div className="flex mr-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-muted" : ""} />
                                        ))}
                                    </div>
                                    <span className="text-muted-foreground font-normal">({product.reviews} Reviews)</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-border"></div>
                                <div><span className="text-foreground font-bold">2.5k</span> Sales</div>
                                <div className="w-1 h-1 rounded-full bg-border"></div>
                                <div>By <Link href="#" className="text-primary hover:underline">Themes Jet</Link></div>
                            </div>
                        </div>

                        {/* Main Preview Image */}
                        <div className="relative rounded-2xl overflow-hidden border border-border bg-muted aspect-video mb-10 group shadow-sm">
                            {/* Use next/image for production */}
                            <div
                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                style={{ backgroundImage: `url(${product.image})` }}
                            />

                            {/* Live Preview Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white text-black font-bold rounded-full shadow-2xl flex items-center gap-2"
                                >
                                    <Eye size={20} /> Live Preview
                                </motion.button>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="border-b border-border mb-8">
                            <nav className="flex gap-8">
                                {['details', 'reviews', 'support'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 border-b-2 font-medium text-sm capitalize transition-colors ${
                                            activeTab === tab
                                                ? "border-primary text-foreground"
                                                : "border-transparent text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {tab === 'details' ? 'Item Details' : tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Description Content */}
                        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
                            <p className="mb-6 text-lg leading-relaxed">
                                {product.description}
                            </p>

                            <h3 className="text-foreground font-heading text-xl font-bold mt-8 mb-4">Key Features</h3>
                            <ul className="grid md:grid-cols-2 gap-3 mb-8">
                                {product.features?.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check size={18} className="text-primary mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-foreground font-heading text-xl font-bold mt-8 mb-4">What's inside?</h3>
                            <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
                                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center border border-blue-500/20">
                                        <Code size={20} />
                                    </div>
                                    <div>
                                        <div className="text-foreground font-bold text-sm">Source Code</div>
                                        <div className="text-xs text-muted-foreground">Full access to GitHub repository</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center border border-purple-500/20">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div className="text-foreground font-bold text-sm">Documentation</div>
                                        <div className="text-xs text-muted-foreground">Detailed setup guide & API reference</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* === RIGHT COLUMN: STICKY SIDEBAR (35%) === */}
                    <aside className="w-full lg:w-96 flex-shrink-0">
                        <div className="sticky top-28 space-y-6">

                            {/* Purchase Card */}
                            <div className="bg-card border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
                                {/* Gradient Blob for Depth */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-muted-foreground text-sm font-medium">Regular License</span>
                                    <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded font-bold uppercase border border-green-500/20">In Stock</span>
                                </div>
                                <div className="mb-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-foreground tracking-tight">${product.price}</span>
                                    <span className="text-muted-foreground text-sm">USD</span>
                                </div>

                                <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Quality Checked by Injaazh</li>
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Future Updates Included</li>
                                    <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> 6 Months Support</li>
                                </ul>

                                <div className="space-y-3">
                                    <button className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex justify-center items-center gap-2">
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                    <button className="w-full py-3.5 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-muted transition-colors border border-border">
                                        Buy Now
                                    </button>
                                </div>
                                <div className="mt-4 text-center text-xs text-muted-foreground">
                                    Secure checkout via PayPal / Stripe
                                </div>
                            </div>

                            {/* Product Specs */}
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="py-3 text-muted-foreground">Last Update</td>
                                        <td className="py-3 text-foreground text-right font-medium">{product.updated}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-muted-foreground">Created</td>
                                        <td className="py-3 text-foreground text-right font-medium">{product.created}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-muted-foreground">Compatible With</td>
                                        <td className="py-3 text-foreground text-right font-medium">{product.compatibility}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-muted-foreground">Files Included</td>
                                        <td className="py-3 text-foreground text-right font-medium">{product.filesIncluded}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {["admin", "react template", "dark mode", "analytics"].map((tag) => (
                                    <Link key={tag} href="#" className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-xs text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                        {tag}
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </aside>
                </div>
            </div>

            {/* --- RELATED PRODUCTS SECTION --- */}
            <section className="border-t border-border bg-secondary/30 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-8">You might also like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Only show 4 items from the array as suggestions */}
                        {products.slice(0, 4).map((item) => (
                            <Link key={item.id} href={`/products/${item.id}`} className="group cursor-pointer">
                                <div className="h-40 bg-muted rounded-xl mb-3 overflow-hidden border border-border group-hover:border-primary/50 transition-colors relative">
                                    {/* Image Placeholder */}
                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${item.image})` }}></div>
                                </div>
                                <h4 className="text-foreground font-bold text-sm truncate group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">${item.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}