"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ThemeStoreCTA() {
    return (
        // SECTION: Uses semantic background
        <section className="py-16 px-6 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="
                        relative rounded-[32px] overflow-hidden
                        py-20 px-6 text-center isolate

                        /* CONTAINER COLORS: Using variables */
                        /* Light: Light Gray (secondary) | Dark: Deep Blue (secondary/card) */
                        bg-secondary border border-border shadow-xl
                        dark:shadow-none

                        transition-colors duration-300
                    "
                >
                    {/* --- BACKGROUND GRADIENT (Dark Mode Only) --- */}
                    {/* Kept explicit colors for the artistic gradient blobs, only visible in dark mode */}
                    <div className="absolute inset-0 z-0 hidden dark:block">
                        <div className="absolute top-0 left-[-10%] w-[60%] h-full bg-purple-700/40 blur-[120px] mix-blend-screen pointer-events-none"></div>
                        <div className="absolute bottom-0 right-[-10%] w-[60%] h-full bg-[#4D2FFF]/30 blur-[120px] mix-blend-screen pointer-events-none"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">

                        {/* Small Badge */}
                        <div className="
                            w-40 h-10 rounded-lg backdrop-blur-md flex items-center justify-center font-bold text-sm mb-6 shadow-sm

                            /* BADGE COLORS: Using variables */
                            bg-background border border-border text-ring

                            /* Dark Mode Override for Glassmorphism */
                            dark:bg-background/10 dark:border-white/10 dark:text-foreground
                        ">
                            Themes Jet
                        </div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 tracking-tight text-foreground transition-colors">
                            # 1 Theme Store
                        </h2>

                        {/* Description */}
                        <p className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-muted-foreground transition-colors">
                            We are building the next generation of Themes and Plugins optimized for Core Web Vitals. Be the first to know.
                        </p>

                        {/* Button */}
                        <Link href="/products">
                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="
                                    inline-block font-bold py-4 px-10 rounded-xl cursor-pointer

                                    /* BUTTON COLORS: Inverted System */
                                    /* Background = Foreground Color (Black in Light, White in Dark) */
                                    /* Text = Background Color (White in Light, Black in Dark) */
                                    bg-foreground text-background

                                    hover:opacity-90
                                    shadow-lg shadow-foreground/20
                                "
                            >
                                Browse Themes
                            </motion.div>
                        </Link>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}