"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";

// Data with added descriptions to match the new layout
const products = [
    {
        id: 512195,
        title: "InterBroad - ISP",
        category: "Hosting", // Used for the badge text
        description: "High-speed broadband & hosting provider template with pricing tables.",
        price: "$28",
        rating: 5.0,
        reviews: 12,
        sales: "1.2k",
        image: "/images/interbroad.webp",
        link: "https://www.templatemonster.com/website-templates/interbroad-isp-broadband-service-and-hosting-provider-website-html-template-512195.html",
        badgeColor: "bg-blue-500/90" // Custom colors for badges
    },
    {
        id: 498267,
        title: "Bricks Land",
        category: "Construction",
        description: "Industrial construction template featuring project galleries and services.",
        price: "$16",
        rating: 4.8,
        reviews: 8,
        sales: "850",
        image: "/images/bricksland.webp",
        link: "https://www.templatemonster.com/website-templates/bricks-land-construction-and-brick-manufacturer-website-html-template-498267.html",
        badgeColor: "bg-amber-500/90"
    },
    {
        id: 459262,
        title: "CN Construction",
        category: "Real Estate",
        description: "Modern architecture & building company theme with 3D elements.",
        price: "$14",
        rating: 4.9,
        reviews: 24,
        sales: "640",
        image: "/images/cn-construction.webp",
        link: "https://www.templatemonster.com/website-templates/cn-construction-website-html-template-459262.html",
        badgeColor: "bg-purple-500/90"
    }
];

export default function PopularProducts() {
    return (
        <section className="py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-extrabold font-heading text-foreground mb-4"
                        >
                            Popular <span className="text-primary">Products</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground font-body max-w-lg text-lg"
                        >
                            Explore our best-selling templates curated for high-performance.
                        </motion.p>
                    </div>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group flex items-center gap-2 text-primary font-bold font-heading hover:text-primary/80 transition-colors"
                    >
                        View Marketplace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            // Cards
                            className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] flex flex-col"
                        >
                            {/* Thumbnail Area */}
                            <div className="h-64 bg-muted relative overflow-hidden">

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10"></div>

                                {/* Image with Zoom Effect */}
                                <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>

                                {/* Floating Badge (Tag Box) - Top Left */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className={`px-2 py-1 ${product.badgeColor} backdrop-blur text-white text-[10px] font-bold rounded uppercase tracking-wide`}>
                                        {product.category}
                                    </span>
                                </div>

                                {/* Hover Actions Overlay */}
                                <div className="absolute inset-0 bg-background/80 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">

                                    {/* Preview Button - Slides Up */}
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-foreground text-background font-bold rounded-lg text-sm hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2"
                                    >
                                        <Eye size={16} /> Live Preview
                                    </a>

                                    {/* Cart Button - Slides Up with Delay */}
                                    <button className="p-2 border border-border rounded-lg text-foreground hover:bg-foreground hover:text-background transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer">
                                        {product.title}
                                    </h3>
                                    <span className="font-bold text-foreground text-lg">{product.price}</span>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 font-body line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Footer Stats */}
                                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                    <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                                        ★★★★★ <span className="text-muted-foreground ml-1 font-medium">({product.reviews} Reviews)</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground font-bold">
                                        {product.sales} Sales
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-4 border border-border rounded-full text-foreground font-bold hover:bg-foreground hover:text-background transition-all font-heading text-sm">
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    );
}