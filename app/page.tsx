"use client";

import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Search, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import PopularProducts from "@/components/sections/PopularProducts";

export default function Home() {
    return (
        // FIX 1: Use 'bg-background' and 'text-foreground' instead of hardcoded colors
        <main className="min-h-screen bg-background text-foreground font-body selection:bg-primary/30 overflow-x-hidden transition-colors duration-300">

            {/* 1. Global Navigation */}
            <TopBar />
            <Navbar />

            {/* 2. HERO SECTION */}
            <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-40 overflow-visible">

                {/* GLOBAL BACKGROUND BLOBS */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                </div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

                    {/* LEFT: Text Content */}
                    <div className="text-left relative z-20">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Live v1.0
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-heading font-extrabold text-5xl md:text-7xl leading-[1.1] mb-6 text-foreground"
                        >
                            Build Faster.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 text-glow">
                                Ship Better.
                            </span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            // FIX 2: Use 'text-muted-foreground' for gray text
                            className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed font-body"
                        >
                            The premium marketplace for elite developers. Discover high-performance <span className="text-foreground font-semibold">HTML, React, & PHP</span> assets curated for scale.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            // FIX 3: Use 'bg-card' or 'bg-muted' for containers
                            className="bg-card/80 border border-border p-1.5 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-lg shadow-2xl dark:shadow-black/50 backdrop-blur-sm relative z-20"
                        >
                            <div className="flex-1 flex items-center px-4 h-12">
                                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                                <input
                                    type="text"
                                    placeholder="e.g. SaaS Dashboard, Crypto..."
                                    className="bg-transparent border-none outline-none text-foreground placeholder-muted-foreground w-full font-medium font-body text-sm"
                                />
                            </div>
                            <button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group font-heading text-sm">
                                Explore
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </motion.div>

                        {/* Trust Tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 flex items-center gap-6 text-sm text-muted-foreground font-medium"
                        >
                            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Verified Code</span>
                            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-500" /> Instant Download</span>
                        </motion.div>
                    </div>

                    {/* RIGHT: 3D Visuals */}
                    <div className="relative hidden lg:block h-[600px] w-full perspective-[2000px]">

                        {/* AMBIENT GLOW ANIMATION LAYER */}
                        <motion.div
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.5, 0.7, 0.5],
                                rotate: [0, 10, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            // FIX 4: Adjusted gradient to work in Light mode too
                            className="absolute top-10 right-10 w-[450px] h-[550px] bg-gradient-to-tr from-primary/40 via-purple-600/40 to-blue-400/40 rounded-full blur-[100px] -z-10"
                        />

                        {/* Main Card (Back Layer) */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: 10, rotateX: 5 }}
                            animate={{ opacity: 1, y: [0, -15, 0] }}
                            transition={{
                                opacity: { duration: 0.8 },
                                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                            }}
                            // FIX 5: Use 'bg-card' or 'bg-background' with border variables
                            className="absolute top-10 right-10 w-[420px] h-[520px] bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-6 rotate-3 z-10 ring-1 ring-border"
                        >
                            {/* Mock UI Header */}
                            <div className="flex gap-2 mb-6 border-b border-border pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                            </div>
                            {/* Mock Content */}
                            <div className="space-y-4">
                                <div className="h-40 w-full bg-muted/50 rounded-xl border border-dashed border-border flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground font-mono">Chart Visualization</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-24 bg-primary/10 rounded-xl border border-primary/20 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/20 blur-lg animate-pulse"></div>
                                    </div>
                                    <div className="h-24 bg-muted/50 rounded-xl"></div>
                                </div>
                                <div className="h-4 w-3/4 bg-muted/50 rounded"></div>
                                <div className="h-4 w-1/2 bg-muted/50 rounded"></div>
                            </div>
                        </motion.div>

                        {/* Floating Info Card (Front Layer) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0, y: [0, 20, 0] }}
                            transition={{
                                opacity: { delay: 0.3 },
                                y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                            }}
                            // FIX 6: Ensure front card is also theme-aware
                            className="absolute bottom-20 left-0 w-[280px] bg-card/95 backdrop-blur-md border border-border rounded-2xl p-5 shadow-2xl z-20 -rotate-2 ring-1 ring-border"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-500/10 rounded-xl text-green-500 border border-green-500/20">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <div className="text-base font-bold text-foreground font-heading">Verified Code</div>
                                    <div className="text-xs text-muted-foreground">100% Bug Free & Tested</div>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "92%" }}
                                    transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                />
                            </div>
                        </motion.div>

                        {/* Floating Badge (Top Right) */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{
                                scale: { duration: 0.5 },
                                default: { duration: 4, repeat: Infinity }
                            }}
                            className="absolute top-0 right-20 bg-card border border-border p-3 pr-6 rounded-2xl shadow-xl z-30 flex items-center gap-4 animate-float"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground font-medium">Trending</div>
                                <div className="font-bold text-foreground text-lg font-heading">React Templates</div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* STATS STRIP */}
            <div className="border-y border-border bg-card/30 backdrop-blur-md relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-center md:justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-foreground font-heading">500+</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-body">Premium Assets</p>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block"></div>
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-foreground font-heading">24/7</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-body">Dedicated Support</p>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block"></div>
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-foreground font-heading">10k+</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-body">Happy Developers</p>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block"></div>

                    {/* Logos */}
                    <div className="flex gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="h-8 w-24 bg-foreground/20 rounded"></div>
                        <div className="h-8 w-24 bg-foreground/20 rounded"></div>
                        <div className="h-8 w-24 bg-foreground/20 rounded"></div>
                    </div>
                </div>
            </div>

            {/* POPULAR PRODUCTS SECTION */}
            <PopularProducts />

            <div className="h-[200px]"></div>
        </main>
    );
}