"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp, ArrowRight, Package } from "lucide-react";
import Link from "next/link";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock Data for "Instant" results
const recentSearches = ["DashLite React", "SaaS Kit"];
const trendingProducts = [
    { name: "FinTech Dashboard", category: "React", url: "/products/fintech" },
    { name: "Agency Portfolio", category: "HTML", url: "/products/agency" },
    { name: "Crypto Wallet App", category: "Mobile", url: "/products/crypto" },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");

    // Close on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] overflow-y-auto p-4 sm:p-6 md:p-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="mx-auto max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5"
                        >
                            {/* Search Input */}
                            <div className="relative border-b border-border">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search products, categories, or tags..."
                                    className="w-full bg-transparent border-none py-4 pl-12 pr-12 text-lg text-foreground placeholder:text-muted-foreground outline-none focus:ring-0"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    onClick={onClose}
                                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="p-4 sm:p-6 bg-secondary/20">

                                {query.length === 0 ? (
                                    <div className="space-y-8">
                                        {/* Recent Searches */}
                                        <div>
                                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Recent</h3>
                                            <div className="space-y-1">
                                                {recentSearches.map((item) => (
                                                    <button key={item} className="w-full flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left text-sm text-foreground group">
                                                        <Clock size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Trending */}
                                        <div>
                                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Trending Now</h3>
                                            <div className="space-y-1">
                                                {trendingProducts.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.url}
                                                        onClick={onClose}
                                                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                                <TrendingUp size={14} />
                                                            </div>
                                                            <span className="text-sm font-bold text-foreground">{item.name}</span>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded group-hover:border-primary/30 transition-colors">
                                                            {item.category}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Search Results State (Mock) */
                                    <div>
                                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Results for "{query}"</h3>
                                        <Link href="/products/dashlite" className="flex items-center gap-4 p-3 rounded-xl hover:bg-card border border-transparent hover:border-border transition-all group">
                                            <div className="w-12 h-12 bg-muted rounded-lg border border-border shrink-0" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">DashLite React Admin</h4>
                                                <p className="text-xs text-muted-foreground">Premium Dashboard Template</p>
                                            </div>
                                            <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </div>
                                )}

                            </div>

                            {/* Footer Tip */}
                            <div className="bg-card border-t border-border px-4 py-3 text-xs text-muted-foreground flex justify-between items-center">
                                <span>Search 500+ premium assets</span>
                                <span className="hidden sm:inline-block">Press <kbd className="font-mono bg-secondary px-1.5 py-0.5 rounded border border-border text-foreground">ESC</kbd> to close</span>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}