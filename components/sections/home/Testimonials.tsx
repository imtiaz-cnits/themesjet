"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        author: "James Smith",
        role: "Frontend Lead",
        stars: 5,
        quote: "The code structure in the **NeoCrypto React** template is immaculate. I saved about 3 weeks of frontend work. The documentation was clear, and TypeScript support is a huge plus.",
    },
    {
        id: 2,
        author: "Anita Lee",
        role: "Freelance Developer",
        stars: 5,
        quote: "I used the **ShopMaster POS** script for a client. Installation was smooth, and when I had a conflict with my server config, their support team replied within 20 minutes.",
    },
    {
        id: 3,
        author: "Marcus Ray",
        role: "CTO @ Startup",
        stars: 5,
        quote: "The **FinDash UI Kit** is beautiful. Dark mode implementation is native, not just a CSS override. It really helped us launch our SaaS MVP in record time.",
    }
];

export default function Testimonials() {
    return (
        <section className="py-16 transition-colors duration-300 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block font-heading"
                    >
                        Reviews from our users
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-heading font-extrabold text-foreground"
                    >
                        Loved by Developers
                    </motion.h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="
                                group relative rounded-[24px] p-8 flex flex-col h-full
                                border border-border

                                /* USING VARIABLES: bg-card allows theming (White in Light, Dark in Dark) */
                                bg-card hover:border-primary/50

                                shadow-sm dark:shadow-[0_0_20px_-10px_rgba(0,0,0,0.2)]
                                transition-all duration-300
                            "
                        >
                            {/* Watermark SVG */}
                            <div className="absolute bottom-6 right-6 w-32 h-24 text-muted/50 pointer-events-none z-0 group-hover:scale-105 transition-transform duration-500">
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 224 170"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M233 171H131.912V96.5541L175.43 0H215.321L179.963 89.3351H233V171ZM101.541 171H0V96.5541L43.9708 0H83.8619L48.5039 89.3351H101.541V171Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6 text-amber-400 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" className="drop-shadow-sm" />
                                ))}
                            </div>

                            {/* Quote Text */}
                            <p className="text-muted-foreground font-body leading-relaxed text-[15px] mb-8 relative z-10">
                                {review.quote.split("**").map((part, i) =>
                                    i % 2 === 1 ? <span key={i} className="text-foreground font-bold">{part}</span> : part
                                )}
                            </p>

                            {/* Profile */}
                            <div className="mt-auto flex items-center gap-4 relative z-10">
                                {/* Avatar SVG */}
                                <div className="w-[42px] h-[42px] flex-shrink-0">
                                    <svg width="100%" height="100%" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Using currentColor/variables for fill if possible, or keeping brand colors */}
                                        <path d="M21 39C30.9411 39 39 30.9411 39 21C39 11.0589 30.9411 3 21 3C11.0589 3 3 11.0589 3 21C3 30.9411 11.0589 39 21 39Z" fill="#00306D"/>
                                        <path d="M31.5 36.5C31.5 33.7152 30.3938 31.0445 28.4246 29.0754C26.4555 27.1062 23.7848 26 21 26C18.2152 26 15.5445 27.1062 13.5754 29.0754C11.6062 31.0445 10.5 33.7152 10.5 36.5" stroke="#236AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21 26C24.866 26 28 22.866 28 19C28 15.134 24.866 12 21 12C17.134 12 14 15.134 14 19C14 22.866 17.134 26 21 26Z" stroke="#236AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="21" cy="21" r="19" stroke="#236AEE" strokeWidth="2"/>
                                    </svg>
                                </div>

                                <div>
                                    <div className="text-foreground font-bold font-heading text-sm">
                                        {review.author}
                                    </div>
                                    <div className="text-primary text-xs capitalize tracking-wide mt-0.5 font-bold">
                                        {review.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}