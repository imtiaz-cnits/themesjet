"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, Star, Eye, ShoppingCart, LayoutGrid, List, X, RotateCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    updatedAt: Date;
    rating: number;
    reviews: number;
    badge?: string;
    badgeColor?: string;
}

interface ProductsBrowserProps {
    initialProducts: Product[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export default function ProductsBrowser({ initialProducts, totalCount, totalPages, currentPage }: ProductsBrowserProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // UI States
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    // Initialize price from URL or default to 100
    const [price, setPrice] = useState(Number(searchParams.get("maxPrice")) || 100);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Check if any filters are active
    const hasActiveFilters = searchParams.get("framework") || searchParams.get("maxPrice") || searchParams.get("rating");

    // Helper: Update URL Params
    const updateQuery = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null) params.delete(key);
            else params.set(key, value);
        });
        router.push(`/products?${params.toString()}`);
    };

    // Filter Handlers
    const updateFilter = (key: string, value: string) => {
        updateQuery({ [key]: value || null, page: "1" });
    };

    const handlePriceChange = (newPrice: number) => {
        setPrice(newPrice);
        updateQuery({ maxPrice: newPrice.toString(), page: "1" });
    };

    const handlePageChange = (page: number) => {
        updateQuery({ page: page.toString() });
    };

    // Clear All Filters
    const clearAllFilters = () => {
        setPrice(100); // Reset visual slider
        router.push("/products"); // Reset URL
        setIsMobileFilterOpen(false); // Close mobile modal if open
    };

    // --- REUSABLE FILTER CONTENT ---
    const FilterContent = () => (
        <div className="space-y-8">

            {/* Clear Filter Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                    >
                        <RotateCcw size={12} /> Clear All
                    </button>
                )}
            </div>

            {/* Price Filter */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-foreground text-xs mb-4 uppercase tracking-wider">Price Range</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-bold">
                        <span>$0</span>
                        <span>${price}+</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        onMouseUp={() => handlePriceChange(price)}
                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex gap-3">
                        <div className="w-1/2 bg-background border border-border rounded px-3 py-2 text-sm text-center font-bold">$0</div>
                        <div className="w-1/2 bg-background border border-border rounded px-3 py-2 text-sm text-center font-bold text-primary">${price}</div>
                    </div>
                </div>
            </div>

            {/* Framework Filter */}
            <div>
                <h3 className="font-bold text-foreground text-xs mb-4 uppercase tracking-wider">Framework</h3>
                <div className="space-y-3">
                    {["React", "Next.js", "HTML", "Figma"].map((fw) => {
                        const isActive = searchParams.get("framework") === fw;
                        return (
                            <label key={fw} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={() => updateFilter("framework", isActive ? "" : fw)}
                                        className="peer w-5 h-5 border-2 border-muted rounded appearance-none checked:bg-primary checked:border-primary transition-all"
                                    />
                                    <svg className="absolute w-3.5 h-3.5 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <span className={`text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>{fw}</span>
                            </label>
                        )
                    })}
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <h3 className="font-bold text-foreground text-xs mb-4 uppercase tracking-wider">Rating</h3>
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
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* --- DESKTOP SIDEBAR --- */}
                <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                    <FilterContent />
                </aside>

                {/* --- MOBILE FILTER MODAL --- */}
                <AnimatePresence>
                    {isMobileFilterOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
                            />

                            {/* Drawer Panel */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-card border-l border-border shadow-2xl p-6 overflow-y-auto lg:hidden"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-heading font-bold text-foreground">Filters</h2>
                                    <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="p-2 hover:bg-muted rounded-full transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <FilterContent />

                                <div className="mt-8 pt-4 border-t border-border">
                                    <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20"
                                    >
                                        Show Results
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* --- CONTENT GRID --- */}
                <main className="flex-1">

                    {/* Toolbar */}
                    <div className="flex flex-nowrap justify-between items-center mb-8 gap-3 bg-card p-2 rounded-xl border border-border shadow-sm">

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold text-foreground bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                            <Filter size={18} />
                            <span className="hidden sm:inline">Filters</span>
                        </button>

                        <div className="hidden sm:flex items-center gap-4 pl-4">
                            <span className="text-sm font-medium text-muted-foreground">
                                Showing page <span className="text-foreground font-bold">{currentPage}</span> of {totalPages}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 ml-auto">
                            <div className="flex items-center bg-background border border-border rounded-lg p-1">
                                <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"}`}><LayoutGrid size={18} /></button>
                                <button onClick={() => setViewMode("list")} className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"}`}><List size={18} /></button>
                            </div>

                            <div className="relative">
                                <select onChange={(e) => updateFilter("sort", e.target.value)} className="appearance-none bg-background border border-border text-foreground text-sm font-bold rounded-lg pl-4 pr-8 py-2.5 outline-none focus:border-primary cursor-pointer w-full max-w-[140px] sm:max-w-none text-ellipsis">
                                    <option value="newest">Newest Releases</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {initialProducts.length > 0 ? (
                        <>
                            <div className={`grid gap-6 mb-12 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                                {initialProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={`group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex ${viewMode === "grid" ? "flex-col" : "flex-col md:flex-row md:h-48"}`}
                                    >
                                        {/* Thumbnail */}
                                        <div className={`${viewMode === "grid" ? "h-48" : "h-48 w-full md:w-64 md:h-auto"} relative overflow-hidden bg-muted flex-shrink-0`}>
                                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                                            {product.badge && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className={`px-2.5 py-1 ${product.badgeColor} backdrop-blur-md text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-lg`}>
                                                        {product.badge}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/20">
                                                <Link href={`/products/${product.id}`} className="px-5 py-2.5 bg-white text-black font-bold rounded-lg text-xs flex items-center gap-2 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                                                    <Eye size={14} /> View Details
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <Link href={`/products/${product.id}`}>
                                                    <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1">{product.name}</h3>
                                                </Link>
                                                <span className="font-bold text-foreground bg-muted px-2 py-0.5 rounded text-sm">${product.price}</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
                                                <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded border border-border">{product.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-border"></span>
                                                <span>{formatDistanceToNow(new Date(product.updatedAt))} ago</span>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < product.rating ? "currentColor" : "none"} className={i >= product.rating ? "text-muted" : ""} />
                                                    ))}
                                                    <span className="text-xs text-muted-foreground ml-1 font-bold">({product.reviews})</span>
                                                </div>
                                                <button className="text-muted-foreground hover:text-primary transition-colors"><ShoppingCart size={18} /></button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage <= 1}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        &lt;
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
                                                        currentPage === page
                                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                                            : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        }
                                        if (page === currentPage - 2 || page === currentPage + 2) {
                                            return <span key={page} className="w-10 h-10 flex items-center justify-center text-muted-foreground font-bold">...</span>;
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPages}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-card border border-border rounded-2xl">
                            <h3 className="text-xl font-bold text-foreground">No products found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters or <button onClick={clearAllFilters} className="text-primary hover:underline">clear all</button>.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}