"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiHtml5,
    SiCss3,
    SiFigma,
    SiWordpress,
    SiNodedotjs,
    SiPhp,
    SiMysql,
    SiDocker
} from "react-icons/si";

// ------------------------------------------------------------------
// DATA & CONFIG
// ------------------------------------------------------------------

const stats = [
    { label: "Premium Assets", value: 15, suffix: "+" },
    { label: "Dedicated Support", value: 24, suffix: "/7" },
    { label: "Happy Developers", value: 2, suffix: "k+" },
];

const techLogos = [
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiReact, name: "React" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiHtml5, name: "HTML5" },
    { icon: SiCss3, name: "CSS3" },
    { icon: SiFigma, name: "Figma" },
    { icon: SiWordpress, name: "WordPress" },
    { icon: SiPhp, name: "PHP" },
    { icon: SiNodedotjs, name: "Node.js" },
    { icon: SiMysql, name: "MySQL" },
    { icon: SiDocker, name: "Docker" },
];

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------

export default function StatsStrip() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="border-y mb-16 border-border bg-card/30 backdrop-blur-md relative z-10 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-30">

                {/* LEFT: STATS ITEMS */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 shrink-0">
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="flex items-center gap-8">
                            <div className="text-center md:text-left">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                                >
                                    <span className="text-3xl md:text-4xl font-bold text-foreground font-heading">
                                        {stat.value}{stat.suffix}
                                    </span>
                                </motion.div>
                                <p className="text-sm text-muted-foreground uppercase tracking-widest font-body mt-1">
                                    {stat.label}
                                </p>
                            </div>
                            {/* Divider (only show between items on desktop) */}
                            {i !== stats.length - 1 && (
                                <div className="h-10 w-px bg-border hidden md:block opacity-50"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* RIGHT: TECH STACK SLIDER (Infinite Marquee) */}
                <div className="w-full lg:w-1/2 overflow-hidden relative mask-linear-fade">
                    {/* Gradient Masks for fade effect on edges */}
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background/50 to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background/50 to-transparent z-10"></div>

                    <motion.div
                        className="flex gap-10 items-center w-max"
                        animate={{ x: "-50%" }}
                        transition={{
                            ease: "linear",
                            duration: 20, // Adjust speed: Higher = Slower
                            repeat: Infinity,
                        }}
                    >
                        {/* Render logos TWICE to create seamless loop */}
                        {[...techLogos, ...techLogos].map((logo, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 group"
                                title={logo.name}
                            >
                                <logo.icon
                                    size={32}
                                    className="group-hover:scale-110 transition-transform duration-300 text-foreground group-hover:text-primary"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
}