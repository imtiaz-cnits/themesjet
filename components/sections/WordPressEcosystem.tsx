"use client";

import { motion } from "framer-motion";
import { Plug, LayoutTemplate } from "lucide-react";

export default function WordPressEcosystem() {
    return (
        <section className="py-10 relative z-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="
                        relative rounded-[32px] overflow-hidden
                        border border-gray-200 dark:border-white/10
                        bg-gray-50 dark:bg-gradient-to-r dark:from-gray-900 dark:to-[#0A0028]
                        p-10 md:p-16 text-center isolate shadow-sm dark:shadow-2xl
                        transition-colors duration-300
                    "
                >
                    {/* FIXED: Re-added the Dotted Pattern Overlay */}
                    <div
                        className="absolute top-0 left-0 w-full h-full opacity-[0.05] dark:opacity-[0.15] pointer-events-none z-[-1]"
                        style={{
                            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                            color: "inherit"
                        }}
                    ></div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* ... Rest of your content (Badge, Text, Cards) ... */}
                        <span className="inline-block py-1 px-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                            Coming Soon
                        </span>

                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                            The WordPress Ecosystem
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg mb-8 font-body">
                            We are building the next generation of <span className="text-gray-900 dark:text-white font-semibold">Themes</span> and <span className="text-gray-900 dark:text-white font-semibold">Plugins</span> optimized for Core Web Vitals. Be the first to know.
                        </p>

                        {/* Inner Cards */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <div className="flex items-center gap-4 bg-white dark:bg-black/30 px-6 py-4 rounded-xl border border-gray-200 dark:border-white/5 hover:border-blue-200 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none backdrop-blur-md">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-600/20">
                                    <LayoutTemplate size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white font-heading">Premium Themes</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-500 font-body">Q1 2026</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-white dark:bg-black/30 px-6 py-4 rounded-xl border border-gray-200 dark:border-white/5 hover:border-green-200 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none backdrop-blur-md">
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-400 flex items-center justify-center border border-green-100 dark:border-green-600/20">
                                    <Plug size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white font-heading">Utility Plugins</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-500 font-body">Q1 2026</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}