"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce"; // You likely have this, if not: npm i use-debounce
import { searchProducts } from "@/actions/search"; // Import the action
import { useRouter } from "next/navigation";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Keep mock data for the "Empty State" (Recent/Trending)
const trendingProducts = [
    { name: "FinTech Dashboard", category: "React", url: "/products/fintech" },
    { name: "Agency Portfolio", category: "HTML", url: "/products/agency" },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 300); // Wait 300ms before searching
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Handle Search Logic
    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            const products = await searchProducts(debouncedQuery);
            setResults(products);
            setIsLoading(false);
        };

        fetchResults();
    }, [debouncedQuery]);

    // Clear state when closing
    useEffect(() => {
        if (!isOpen) {
            setQuery("");
            setResults([]);
        }
    }, [isOpen]);

    // Close on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const handleLinkClick = (url: string) => {
        onClose();
        router.push(url);
    };

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
                                {isLoading ? (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                    </div>
                                ) : (
                                    <button
                                        onClick={onClose}
                                        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-4 sm:p-6 bg-secondary/20 min-h-[300px]">

                                {query.length === 0 ? (
                                    // EMPTY STATE (Recent & Trending)
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Trending Now</h3>
                                            <div className="space-y-1">
                                                {trendingProducts.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        onClick={() => handleLinkClick(item.url)}
                                                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary transition-colors group text-left"
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
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // RESULTS STATE
                                    <div className="space-y-2">
                                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                                            {results.length > 0 ? `Results for "${query}"` : "No results found"}
                                        </h3>

                                        {results.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-card border border-transparent hover:border-border transition-all group"
                                            >
                                                <div className="relative w-12 h-12 bg-muted rounded-lg border border-border shrink-0 overflow-hidden">
                                                    {/* Make sure your images domain is configured in next.config */}
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                                                        {product.name}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary rounded border border-border">
                                                            {product.category}
                                                        </span>
                                                        <span className="text-xs font-medium text-foreground">
                                                            ${Number(product.price)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        ))}

                                        {!isLoading && results.length === 0 && query.length >= 2 && (
                                            <div className="text-center py-10 text-muted-foreground">
                                                <p>No products found matching "{query}"</p>
                                                <p className="text-xs mt-2">Try searching for "React", "Admin", or "Dashboard"</p>
                                            </div>
                                        )}
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