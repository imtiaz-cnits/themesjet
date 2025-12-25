"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-foreground font-body flex items-center justify-center relative overflow-hidden selection:bg-primary/30">

            {/* --- 1. ANIMATED BACKGROUND GRID --- */}
            <div className="absolute inset-0 z-0 pointer-events-none perspective-[500px]">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* Glowing Orbs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
                />
            </div>

            {/* --- 2. GIANT BACKGROUND 404 --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-[20vw] md:text-[30vw] font-heading font-black text-foreground/5 leading-none select-none tracking-tighter"
                >
                    404
                </motion.h1>
            </div>

            {/* --- 3. MAIN CONTENT CARD --- */}
            <div className="relative z-10 px-6 w-full max-w-2xl">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-card/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl ring-1 ring-white/5 relative overflow-hidden"
                >
                    {/* Top Highlight Line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    {/* Icon Badge */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/20">
                        <AlertTriangle size={32} className="text-white" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
                        Page not found
                    </h2>

                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
                        Sorry, the page you are looking for doesn't exist or has been moved. Here are some helpful links:
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                        >
                            <Home size={18} />
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-3.5 bg-background border border-border text-foreground font-bold rounded-xl hover:bg-secondary transition-all flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </button>
                    </div>

                    {/* Quick Search (Optional Utility) */}
                    <div className="mt-8 pt-8 border-t border-border">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-4">Or search for a product</p>
                        <div className="relative max-w-xs mx-auto">
                            <input
                                type="text"
                                placeholder="Search templates..."
                                className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                            />
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                    </div>

                </motion.div>
            </div>

            {/* --- 4. FLOATING PARTICLES --- */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-foreground/10 rounded-full w-2 h-2"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                        opacity: 0
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                />
            ))}

        </div>
    );
}