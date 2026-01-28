"use client";

import { motion } from "framer-motion";
import { ArrowRight, Palette, Code, LifeBuoy } from "lucide-react";
import Link from "next/link";

export default function Advantages() {
    return (
        <section className="md:pt-16 pt-12 relative z-10 overflow-hidden transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 h-auto lg:h-[600px]">

                    {/* --- CARD 1: LEFT MAIN --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="
                            relative rounded-[32px] p-8 flex flex-col overflow-hidden isolate
                           bg-white dark:bg-[radial-gradient(circle_at_top_left,#421b7b_0,#050014_55%,#050015_100%)]
                            group
                        "
                    >
                        {/* Glow Effect (Dark Mode Only) */}
                        <div className="hidden dark:block absolute -bottom-[30%] -left-[40%] -right-[40%] h-[70%] opacity-90 blur-[20px] mix-blend-mode-screen pointer-events-none z-[-1] bg-[radial-gradient(circle_at_0%_0%,rgba(132,94,255,0.9),transparent_60%),radial-gradient(circle_at_100%_10%,rgba(0,214,255,0.8),transparent_60%)]"></div>

                        <div className="relative z-10 mt-10">
                            <p className="text-[#2E215C] dark:text-[#8e92ff] uppercase tracking-[0.12em] text-xs font-bold mb-3 font-heading">
                                Advantages
                            </p>
                            <h2 className="md:text-4xl text-3xl leading-[1.05] font-extrabold text-gray-900 dark:text-white mb-4 font-heading">
                                What you will get from us?
                            </h2>
                            <p className="text-gray-600 dark:text-[#c0c4ff] text-[15px] leading-[1.6] max-w-[380px] font-body">
                                We don’t just sell templates; we provide a complete digital ecosystem with rigorously tested HTML, React, Next.js, and WordPress assets.
                            </p>
                        </div>

                        {/* Button */}
                        <div className="relative z-10 mt-8">
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2E215C] text-white font-semibold text-sm hover:opacity-90 transition-all font-heading group shadow-none"
                            >
                                <span>Browse our store</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE CONTAINER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

                        {/* --- CARD 2: TOP RIGHT WIDE --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="
                                md:col-span-2 relative rounded-[32px] p-8 md:p-10 flex flex-col justify-center overflow-hidden isolate
                                border border-gray-200 dark:border-white/5
                                bg-white dark:bg-[radial-gradient(circle_at_top_left,#1a3c88_0,#050014_55%,#050015_100%)]

                                min-h-[240px]
                            "
                        >
                            {/* Blue Glow (Dark Mode Only) */}
                            <div className="hidden dark:block absolute -bottom-[30%] -left-[40%] -right-[40%] h-[70%] opacity-90 blur-[20px] mix-blend-mode-screen pointer-events-none z-[-1] bg-[radial-gradient(circle_at_0%_0%,rgba(0,168,255,0.9),transparent_60%),radial-gradient(circle_at_100%_10%,rgba(92,225,230,0.8),transparent_55%)]"></div>

                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[rgba(15,15,32,0.8)] flex items-center justify-center text-lg mb-4 backdrop-blur-md border border-blue-100 dark:border-white/10">
                                    <Palette size={20} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                                    Immersive Design
                                </h3>
                                <p className="text-gray-500 dark:text-[#c0c4ff] font-body text-[15px] leading-[1.55] max-w-lg">
                                    Forget generic looks. Enjoy bespoke, ready UI kits that captivate users instantly.
                                </p>
                            </div>
                        </motion.div>

                        {/* --- CARD 3: BOTTOM LEFT --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="
                                relative rounded-[32px] p-8 flex flex-col justify-center overflow-hidden isolate
                                border border-gray-200 dark:border-white/5
                                bg-white dark:bg-[radial-gradient(circle_at_top_left,#5c1418_0,#050014_55%,#050015_100%)]

                                min-h-[240px]
                            "
                        >
                            {/* Red Glow (Dark Mode Only) */}
                            <div className="hidden dark:block absolute -bottom-[30%] -left-[40%] -right-[40%] h-[70%] opacity-90 blur-[20px] mix-blend-mode-screen pointer-events-none z-[-1] bg-[radial-gradient(circle_at_0%_0%,rgba(255,72,88,0.9),transparent_60%),radial-gradient(circle_at_100%_10%,rgba(255,178,102,0.8),transparent_55%)]"></div>

                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-[rgba(15,15,32,0.8)] flex items-center justify-center text-lg mb-4 backdrop-blur-md border border-red-100 dark:border-white/10">
                                    <Code size={20} className="text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                                    Clean Code
                                </h3>
                                <p className="text-gray-500 dark:text-[#c0c4ff] font-body text-[15px] leading-[1.55]">
                                    Built with modern standards. Easy to customize, semantic structure.
                                </p>
                            </div>
                        </motion.div>

                        {/* --- CARD 4: BOTTOM RIGHT --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="
                                relative rounded-[32px] p-8 flex flex-col justify-center overflow-hidden isolate
                                border border-gray-200 dark:border-white/5
                                bg-white dark:bg-[radial-gradient(circle_at_top_left,#084231_0,#050014_55%,#050015_100%)]

                                min-h-[240px]
                            "
                        >
                            {/* Green Glow (Dark Mode Only) */}
                            <div className="hidden dark:block absolute -bottom-[30%] -left-[40%] -right-[40%] h-[70%] opacity-90 blur-[20px] mix-blend-mode-screen pointer-events-none z-[-1] bg-[radial-gradient(circle_at_0%_0%,rgba(13,207,151,0.9),transparent_60%),radial-gradient(circle_at_100%_10%,rgba(112,255,188,0.9),transparent_55%)]"></div>

                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-[rgba(15,15,32,0.8)] flex items-center justify-center text-lg mb-4 backdrop-blur-md border border-green-100 dark:border-white/10">
                                    <LifeBuoy size={20} className="text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                                    Updates & Support
                                </h3>
                                <p className="text-gray-500 dark:text-[#c0c4ff] font-body text-[15px] leading-[1.55]">
                                    Receive regular updates, security patches, and dedicated premium support.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}