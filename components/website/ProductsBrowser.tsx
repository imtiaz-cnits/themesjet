"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Star, Eye, ShoppingCart, LayoutGrid, List, X, RotateCcw, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Import RC Slider dynamically to avoid SSR issues
import dynamic from "next/dynamic";
import "rc-slider/assets/index.css";
const Slider = dynamic(() => import("rc-slider"), { ssr: false });

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
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { addToCart, items } = useCart();

    // UI States
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isMounted, setIsMounted] = useState(false);

    // Price State
    const MAX_PRICE_LIMIT = 100; // Increased limit slightly to be safe
    const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE_LIMIT]);

    // Initialize
    useEffect(() => {
        setIsMounted(true);
        const min = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0;
        const max = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : MAX_PRICE_LIMIT;
        setPriceRange([min, max]);
    }, [searchParams]);

    // Helper: Update URL Params
    const updateQuery = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null) params.delete(key);
            else params.set(key, value);
        });

        if (!newParams.page) params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Handlers
    const updateFilter = (key: string, value: string) => updateQuery({ [key]: value || null });
    const handlePageChange = (page: number) => updateQuery({ page: page.toString() });

    // FIX: Replaced onAfterChange with onChangeComplete to fix console warning
    const handleSliderChangeComplete = (value: number | number[]) => {
        if (Array.isArray(value)) {
            updateQuery({
                minPrice: value[0] > 0 ? value[0].toString() : null,
                maxPrice: value[1] < MAX_PRICE_LIMIT ? value[1].toString() : null
            });
        }
    };

    const handleManualInputSubmit = () => {
        updateQuery({
            minPrice: priceRange[0] > 0 ? priceRange[0].toString() : null,
            maxPrice: priceRange[1] < MAX_PRICE_LIMIT ? priceRange[1].toString() : null
        });
    };

    const clearAllFilters = () => {
        setPriceRange([0, MAX_PRICE_LIMIT]);
        router.push(pathname);
        setIsMobileFilterOpen(false);
    };

    // --- FILTER UI ---
    const filterUI = (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">Filters</h3>
                {(searchParams.toString().length > 0 && searchParams.get("page") !== "1") || searchParams.toString().length > 7 ? (
                    <button onClick={clearAllFilters} className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer">
                        <RotateCcw size={12} /> Clear All
                    </button>
                ) : null}
            </div>

            {/* Price Filter */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-foreground text-xs mb-4 uppercase tracking-wider">Price Range</h3>
                <div className="space-y-6 px-2">

                    {isMounted && (
                        <Slider
                            range
                            min={0}
                            max={MAX_PRICE_LIMIT}
                            value={priceRange as [number, number]}
                            onChange={(val) => {
                                if (Array.isArray(val)) setPriceRange(val as number[]);
                            }}
                            // FIX: Using onChangeComplete instead of onAfterChange
                            onChangeComplete={handleSliderChangeComplete}
                            trackStyle={{ backgroundColor: "var(--primary)", height: 4 }}
                            handleStyle={[
                                { borderColor: "var(--primary)", backgroundColor: "var(--background)", opacity: 1, borderWidth: 2, height: 18, width: 18, marginTop: -7, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
                                { borderColor: "var(--primary)", backgroundColor: "var(--background)", opacity: 1, borderWidth: 2, height: 18, width: 18, marginTop: -7, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
                            ]}
                            railStyle={{ backgroundColor: "var(--muted)", height: 4 }}
                        />
                    )}

                    <div className="flex gap-3 items-center mt-4">
                        <div className="relative w-1/2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-bold">$</span>
                            <input
                                type="number"
                                min="0"
                                max={priceRange[1]}
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])}
                                onBlur={handleManualInputSubmit}
                                onKeyDown={(e) => e.key === 'Enter' && handleManualInputSubmit()}
                                className="w-full bg-background border border-border rounded px-3 py-2 pl-6 text-sm text-center font-bold outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <span className="text-muted-foreground font-bold">-</span>
                        <div className="relative w-1/2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-xs font-bold">$</span>
                            <input
                                type="number"
                                min={priceRange[0]}
                                max={MAX_PRICE_LIMIT}
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])}
                                onBlur={handleManualInputSubmit}
                                onKeyDown={(e) => e.key === 'Enter' && handleManualInputSubmit()}
                                className="w-full bg-background border border-border rounded px-3 py-2 pl-6 text-sm text-center font-bold text-primary outline-none focus:border-primary transition-colors"
                            />
                        </div>
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
                                    <input type="checkbox" checked={isActive} onChange={() => updateFilter("framework", isActive ? "" : fw)} className="peer w-5 h-5 border-2 border-muted rounded appearance-none checked:bg-primary checked:border-primary transition-all" />
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
                    {[5, 4].map((stars) => {
                        const isChecked = searchParams.get("rating") === stars.toString();
                        return (
                            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={isChecked}
                                    onChange={() => updateFilter("rating", stars.toString())}
                                    className="w-4 h-4 accent-primary border-border"
                                />
                                <div className="flex text-amber-400 text-xs">{[...Array(5)].map((_, i) => (<Star key={i} size={14} fill={i < stars ? "currentColor" : "none"} className={i >= stars ? "text-muted" : ""} />))}</div>
                                <span className="text-muted-foreground text-xs font-bold group-hover:text-foreground">& Up</span>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-10 items-start"> {/* Added items-start for sticky behavior */}

                {/* SIDEBAR - FIX: Added sticky positioning */}
                <aside className="hidden lg:block lg:w-64 flex-shrink-0 sticky top-28 h-fit">
                    {filterUI}
                </aside>

                {/* MOBILE MODAL */}
                <AnimatePresence>
                    {isMobileFilterOpen && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileFilterOpen(false)} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden" />
                            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-card border-l border-border shadow-2xl p-6 overflow-y-auto lg:hidden">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-heading font-bold text-foreground">Filters</h2>
                                    <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X size={24} /></button>
                                </div>
                                {filterUI}
                                <div className="mt-8 pt-4 border-t border-border">
                                    <button onClick={() => setIsMobileFilterOpen(false)} className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20">Show Results</button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* MAIN CONTENT */}
                <main className="flex-1 w-full">
                    {/* Toolbar */}
                    <div className="flex flex-nowrap justify-between items-center mb-8 gap-3 bg-card p-2 rounded-xl border border-border shadow-sm">
                        <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold text-foreground bg-muted rounded-lg hover:bg-muted/80 transition-colors"><Filter size={18} /> <span className="hidden sm:inline">Filters</span></button>
                        <div className="hidden sm:flex items-center gap-4 pl-4"><span className="text-sm font-medium text-muted-foreground">Showing page <span className="text-foreground font-bold">{currentPage}</span> of {totalPages}</span></div>
                        <div className="flex items-center gap-2 ml-auto">
                            <div className="flex items-center bg-background border border-border rounded-lg p-1">
                                <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded cursor-pointer transition-colors ${viewMode === "grid" ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"}`}><LayoutGrid size={18} /></button>
                                <button onClick={() => setViewMode("list")} className={`p-1.5 rounded cursor-pointer transition-colors ${viewMode === "list" ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"}`}><List size={18} /></button>
                            </div>
                            <div className="relative">
                                <select onChange={(e) => updateFilter("sort", e.target.value)} className="appearance-none bg-background border border-border text-foreground text-sm font-bold rounded-lg pl-4 pr-8 py-2.5 outline-none focus:border-primary cursor-pointer w-full max-w-[140px] sm:max-w-none text-ellipsis">
                                    <option value="newest">Newest</option>
                                    <option value="price_asc">Price: Low</option>
                                    <option value="price_desc">Price: High</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {initialProducts.length > 0 ? (
                        <>
                            <div className={`grid gap-6 mb-12 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                                {initialProducts.map((product) => {
                                    const isInCart = items.some(item => item.id === product.id);

                                    return (
                                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex ${viewMode === "grid" ? "flex-col" : "flex-col md:flex-row md:h-48"}`}>
                                            <div className={`${viewMode === "grid" ? "h-48" : "h-48 w-full md:w-64 md:h-auto"} relative overflow-hidden bg-muted flex-shrink-0`}>
                                                <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                                {product.badge && (<div className="absolute top-3 left-3 z-10"><span className={`px-2.5 py-1 ${product.badgeColor} backdrop-blur-md text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-lg`}>{product.badge}</span></div>)}
                                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/20">
                                                    <Link href={`/products/${product.id}`} className="px-5 py-2.5 bg-white text-black font-bold rounded-lg text-xs flex items-center gap-2 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                                                        <Eye size={14} /> View Details
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <Link href={`/products/${product.id}`}><h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1">{product.name}</h3></Link>
                                                    <span className="font-bold text-foreground bg-muted px-2 py-0.5 rounded text-sm">${product.price}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
                                                    <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded border border-border">{product.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-border"></span>
                                                    <span>{formatDistanceToNow(new Date(product.updatedAt))} ago</span>
                                                </div>
                                                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                                                    <div className="flex items-center gap-1 text-amber-400">
                                                        {[...Array(5)].map((_, i) => (<Star key={i} size={14} fill={i < product.rating ? "currentColor" : "none"} className={i >= product.rating ? "text-muted" : ""} />))}
                                                        <span className="text-xs text-muted-foreground ml-1 font-bold">({product.reviews})</span>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            addToCart({
                                                                id: product.id,
                                                                name: product.name,
                                                                price: product.price,
                                                                image: product.imageUrl,
                                                                category: product.category
                                                            });
                                                            toast.success(`${product.name} added to cart!`, {
                                                                description: "You can proceed to checkout.",
                                                                duration: 3000,
                                                                icon: <ShoppingCart size={16} />,
                                                            });
                                                        }}
                                                        disabled={isInCart}
                                                        className={`transition-colors ${isInCart ? 'text-green-500' : 'text-muted-foreground hover:text-primary cursor-pointer'}`}
                                                        title={isInCart ? "In Cart" : "Add to Cart"}
                                                    >
                                                        {isInCart ? <Check size={18} /> : <ShoppingCart size={18} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )})}
                            </div>
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed">&lt;</button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button key={page} onClick={() => handlePageChange(page)} className={`w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${currentPage === page ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{page}</button>
                                    ))}
                                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-card border border-border rounded-2xl"><h3 className="text-xl font-bold text-foreground">No products found</h3><p className="text-muted-foreground">Try adjusting your filters.</p></div>
                    )}
                </main>
            </div>
        </div>
    );
}