"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";
import Image from "next/image";

// Define the type to match what we fetch from Prisma
interface ReviewProps {
    id: string;
    rating: number;
    comment: string;
    user: {
        name: string | null;
        image: string | null;
    };
}

export default function Testimonials({ reviews }: { reviews: ReviewProps[] }) {

    // If no reviews are featured by admin, don't render the section
    if (!reviews || reviews.length === 0) return null;

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
                        Community Trust
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
                                bg-card hover:border-primary/50
                                shadow-sm dark:shadow-[0_0_20px_-10px_rgba(0,0,0,0.2)]
                                transition-all duration-300
                            "
                        >
                            {/* Watermark SVG  */}
                            <div className="absolute bottom-6 right-6 w-32 h-24 text-muted/20 pointer-events-none z-0 group-hover:scale-105 transition-transform duration-500">
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
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                        className={`drop-shadow-sm ${i >= review.rating ? "text-muted/30" : ""}`}
                                    />
                                ))}
                            </div>

                            {/* Comment Text */}
                            <p className="text-muted-foreground font-body leading-relaxed text-[15px] mb-8 relative z-10 line-clamp-4 flex-1">
                                {review.comment}
                            </p>

                            {/* Profile */}
                            <div className="mt-auto flex items-center gap-4 relative z-10">
                                {/* Dynamic Avatar */}
                                <div className="w-[42px] h-[42px] flex-shrink-0 rounded-full overflow-hidden border border-border bg-secondary relative">
                                    {review.user.image ? (
                                        <Image
                                            src={review.user.image}
                                            alt={review.user.name || "User"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-bold text-sm text-muted-foreground">
                                            {review.user.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="text-foreground font-bold font-heading text-sm">
                                        {review.user.name}
                                    </div>
                                    <div className="text-primary text-xs tracking-wide mt-0.5 font-bold flex items-center gap-1">
                                        <ShieldCheck size={12} /> Verified
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