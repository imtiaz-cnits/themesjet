"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Check, FileText, Code, ShoppingCart, Heart, ShieldCheck, Zap, Globe, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import AddToCartButton from "./AddToCartButton"; // 1. Import Button

interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    framework: string | null;
    imageUrl: string;
    fileUrl: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    salesCount: number;
}

export default function ProductClientView({ product }: { product: ProductProps }) {
    const [activeTab, setActiveTab] = useState("details");

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* LEFT CONTENT */}
                <div className="flex-1 min-w-0">
                    <div className="mb-8">
                        <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight">{product.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center text-amber-500 font-bold">
                                <div className="flex mr-1">{[...Array(5)].map((_, i) => (<Star key={i} size={14} fill="currentColor" />))}</div>
                                <span className="text-muted-foreground font-normal">(5.0 Reviews)</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-border"></div>
                            <div><span className="text-foreground font-bold">{product.salesCount}</span> Sales</div>
                            <div className="w-1 h-1 rounded-full bg-border"></div>
                            <div>By <span className="text-primary hover:underline">Themes Jet</span></div>
                        </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-border bg-muted aspect-video mb-10 group shadow-sm">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-black font-bold rounded-full shadow-2xl flex items-center gap-2">
                                <Eye size={20} /> Live Preview
                            </motion.button>
                        </div>
                    </div>

                    {/* Tabs and Description omitted for brevity, keeping existing structure... */}
                    <div className="border-b border-border mb-8">
                        <nav className="flex gap-8">
                            {['details', 'reviews', 'support'].map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{tab === 'details' ? 'Item Details' : tab}</button>
                            ))}
                        </nav>
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
                        <p className="mb-6 text-lg leading-relaxed whitespace-pre-wrap">{product.description}</p>
                        {/* Features List... */}
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="w-full lg:w-96 flex-shrink-0">
                    <div className="sticky top-28 space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-muted-foreground text-sm font-medium">Regular License</span>
                                <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded font-bold uppercase border border-green-500/20">In Stock</span>
                            </div>
                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-foreground tracking-tight">${Number(product.price).toFixed(2)}</span>
                                <span className="text-muted-foreground text-sm">USD</span>
                            </div>

                            <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Quality Checked by Themes Jet</li>
                                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Future Updates Included</li>
                                <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> 6 Months Support</li>
                            </ul>

                            <div className="space-y-3">
                                {/* 2. Use the Reusable Button */}
                                <AddToCartButton product={product} fullWidth={true} />

                                <button className="w-full py-3.5 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-muted transition-colors border border-border">
                                    Buy Now
                                </button>
                            </div>
                            <div className="mt-4 text-center text-xs text-muted-foreground">Secure checkout via Stripe</div>
                        </div>

                        {/* Specs & Tags... */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <table className="w-full text-sm text-left">
                                <tbody className="divide-y divide-border">
                                <tr><td className="py-3 text-muted-foreground">Released</td><td className="py-3 text-foreground text-right font-medium">{format(new Date(product.createdAt), "MMM dd, yyyy")}</td></tr>
                                <tr><td className="py-3 text-muted-foreground">Category</td><td className="py-3 text-foreground text-right font-medium">{product.category}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}