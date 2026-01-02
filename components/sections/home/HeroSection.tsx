"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Zap, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

const words = ["Code More.", "Scale Faster.", "Hassle Free."];

export default function HeroSection() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative pt-30 pb-16 lg:pt-52 lg:pb-40 overflow-visible">

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
                    <div className="font-heading font-extrabold text-5xl md:text-7xl leading-[1.1] mb-6 text-foreground">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Build Faster.<br />
                        </motion.span>

                        {/* --- FIXED ROTATING TEXT --- */}
                        <div
                            // FIX: Increased mobile height to 1.8em to prevent clipping.
                            // Added explicit line-height control.
                            className="relative w-full overflow-hidden mt-2  flex items-start md:items-center"
                            style={{ perspective: "1000px", height: "1.2em" }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: "100%", opacity: 0, rotateX: -90 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: "-100%", opacity: 0, rotateX: 90 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    // FIX: Removed tight padding, added leading-tight to ensure fit
                                    className="absolute left-0 top-0 block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 pr-4 whitespace-nowrap leading-tight"
                                    style={{ transformOrigin: "50% 50%" }}
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed font-body"
                    >
                        The premium marketplace for elite developers. Discover high-performance <span className="text-foreground font-semibold">HTML, React, & PHP</span> assets curated for scale.
                    </motion.p>

                    {/* ACTION BUTTONS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 relative z-20"
                    >
                        {/* Primary Button */}
                        <Link href="/products" className="h-14 px-8 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group font-heading text-md w-full sm:w-auto">
                            Explore Assets
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Secondary Button */}
                        <Link href="/hire" className="h-14 px-8 rounded-xl bg-card/50 border border-border text-foreground font-medium hover:bg-secondary/50 hover:border-primary/30 transition-all backdrop-blur-sm flex items-center justify-center gap-2 font-heading text-md w-full sm:w-auto group">
                            <Briefcase className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Hire Experts
                        </Link>
                    </motion.div>

                    {/* Trust Tags */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-10 flex items-center gap-6 text-sm text-muted-foreground font-medium"
                    >
                        <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Verified Code</span>
                        <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-500" /> Instant Download</span>
                    </motion.div>
                </div>

                {/* RIGHT: 3D Visuals */}
                <div className="relative hidden lg:block h-[600px] w-full perspective-[2000px]">
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
                        className="absolute top-10 right-10 w-[450px] h-[550px] bg-gradient-to-tr from-primary/40 via-purple-600/40 to-blue-400/40 rounded-full blur-[100px] -z-10"
                    />

                    <motion.div
                        initial={{ opacity: 0, rotateY: 10, rotateX: 5 }}
                        animate={{ opacity: 1, y: [0, -15, 0] }}
                        transition={{
                            opacity: { duration: 0.8 },
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute top-10 right-10 w-[420px] h-[520px] bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-6 rotate-3 z-10 ring-1 ring-border"
                    >
                        <div className="flex gap-2 mb-6 border-b border-border pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        </div>
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

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0, y: [0, 20, 0] }}
                        transition={{
                            opacity: { delay: 0.3 },
                            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                        }}
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
    );
}