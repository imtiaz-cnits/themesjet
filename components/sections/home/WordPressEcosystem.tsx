"use client";

import { motion } from "framer-motion";
import { Plug, LayoutTemplate } from "lucide-react";

export default function WordPressEcosystem() {
    return (
        // SECTION: Uses standard background variable
        <section className="py-10 relative z-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* Main Card Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="
                        relative rounded-[32px] overflow-hidden

                        /* STRUCTURAL COLORS (From Variables) */
                        border border-border

                        /* BACKGROUND:
                           Light Mode -> 'bg-secondary' (Light Gray defined in globals)
                           Dark Mode  -> 'bg-card' (Deep Blue defined in globals)
                        */
                        bg-secondary dark:bg-card

                        p-10 md:p-16 text-center isolate shadow-sm dark:shadow-2xl
                        transition-colors duration-300
                    "
                >
                    {/* Pattern Overlay */}
                    <div
                        className="absolute top-0 left-0 w-full h-full opacity-[0.05] dark:opacity-[0.15] pointer-events-none z-[1]"
                        style={{
                            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                            color: "inherit"
                        }}
                    ></div>

                    <div className="relative z-10 flex flex-col items-center">

                        {/* BADGE: Inverted Colors for Contrast */}
                        <span className="
                            inline-block py-1 px-3 rounded
                            border border-transparent dark:border-border

                            /* Light: Dark BG (Foreground) + White Text (Background) */
                            bg-foreground text-background

                            /* Dark: Subtle Glassy Look */
                            dark:bg-muted/20 dark:text-muted-foreground

                            text-xs font-bold tracking-widest uppercase mb-4
                            backdrop-blur-sm shadow-sm
                        ">
                            Coming Soon
                        </span>

                        {/* HEADING: Semantic Text Color */}
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 transition-colors duration-300">
                            The WordPress Ecosystem
                        </h2>

                        {/* DESCRIPTION: Muted Text Color */}
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8 font-body">
                            We are building the next generation of <span className="text-foreground font-semibold">Themes</span> and <span className="text-foreground font-semibold">Plugins</span> optimized for Core Web Vitals. Be the first to know.
                        </p>

                        {/* Inner Cards */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">

                            {/* Theme Card */}
                            <div className="
                                flex items-center gap-4
                                px-6 py-4 rounded-xl
                                border border-border

                                /* Light: White Card (bg-card) on Gray Container (bg-secondary) */
                                /* Dark: Translucent Black for depth */
                                bg-foreground dark:bg-background

                                hover:border-primary/50
                                transition-colors shadow-sm dark:shadow-none backdrop-blur-md
                            ">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20">
                                    <LayoutTemplate size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-foreground font-heading">Premium Themes</div>
                                    <div className="text-xs text-muted-foreground font-body">Coming Soon</div>
                                </div>
                            </div>

                            {/* Plugin Card */}
                            <div className="
                                flex items-center gap-4
                                px-6 py-4 rounded-xl
                                border border-border
                                bg-foreground dark:bg-background
                                hover:border-green-500/50
                                transition-colors shadow-sm dark:shadow-none backdrop-blur-md
                            ">
                                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center border border-green-200 dark:border-green-500/20">
                                    <Plug size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-foreground font-heading">Utility Plugins</div>
                                    <div className="text-xs text-muted-foreground font-body">Coming Soon</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}