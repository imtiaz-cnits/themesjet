"use client";

import { motion } from "framer-motion";
import { Monitor, Rocket, Puzzle, ArrowRight } from "lucide-react";

// Service Data matching your design
const services = [
    {
        id: "theme",
        title: "Custom Theme Build",
        description: "We translate your designs into pixel-perfect, high-performance themes that are easy to edit.",
        icon: <Monitor className="w-8 h-8 text-white relative z-10" />,
        glowColor: "bg-[#15274E]", // Blue from your SVG
        dotColor: "bg-blue-500",
        features: [
            "Pixel Perfect Design",
            "SEO Optimized Code",
            "100% Mobile Responsive"
        ]
    },
    {
        id: "plugin",
        title: "Plugin Development",
        description: "Extend your platform's power. We build secure, scalable plugins that integrate seamlessly.",
        icon: <Puzzle className="w-8 h-8 text-white relative z-10" />,
        glowColor: "bg-[#154E28]", // Green from your SVG
        dotColor: "bg-green-500",
        features: [
            "Highly Secure",
            "Easy Installation",
            "Regular Updates"
        ]
    },
    {
        id: "web",
        title: "Web Development",
        description: "Full-stack web applications built from scratch, tailored specifically to your startup needs.",
        icon: <Rocket className="w-8 h-8 text-white relative z-10" />,
        glowColor: "bg-[#4E1516]", // Red from your SVG
        dotColor: "bg-red-500",
        features: [
            "Pixel Perfect Design",
            "SEO Optimized Code",
            "100% Mobile Responsive"
        ]
    }
];

export default function ServiceSection() {
    return (
        <section className="py-24  relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-wider uppercase text-xs mb-2 block font-heading"
                    >
                        Our Custom Services
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-heading font-bold text-4xl md:text-5xl text-foreground"
                    >
                        Services
                    </motion.h2>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            // Card Container
                            className="group relative bg-card rounded-[2rem] border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col"
                        >
                            {/* Icon Box with Glow Effect */}
                            <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
                                {/* The Glow Background (Replicating your SVG filter) */}
                                <div className={`absolute inset-0 rounded-xl blur-sm ${service.glowColor}`}></div>
                                {/* The Icon */}
                                {service.icon}
                            </div>

                            {/* Title & Description */}
                            <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                                {service.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-body">
                                {service.description}
                            </p>

                            {/* Feature List */}
                            <ul className="space-y-4 mb-10">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                        {/* Colored Dot */}
                                        <span className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`}></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Button */}
                            <button className="mt-auto w-full py-4 rounded-xl border border-border bg-card/50 text-foreground font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 font-heading text-sm">
                                Get Quote
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}