"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import Image from "next/image"; // <--- Ensure this is imported

// Data extracted from your TemplateMonster links
const products = [
    {
        id: 512195,
        title: "InterBroad - ISP & Broadband",
        category: "Hosting & Internet",
        price: "$28",
        rating: 5.0,
        sales: "1.2k",
        // Make sure these files exist in your 'public/images' folder
        image: "/images/interbroad.jpg",
        link: "https://www.templatemonster.com/website-templates/interbroad-isp-broadband-service-and-hosting-provider-website-html-template-512195.html",
        badge: "Best Seller"
    },
    {
        id: 498267,
        title: "Bricks Land - Construction",
        category: "Building & Manufacturing",
        price: "$16",
        rating: 4.8,
        sales: "850",
        image: "/images/bricksland.webp",
        link: "https://www.templatemonster.com/website-templates/bricks-land-construction-and-brick-manufacturer-website-html-template-498267.html",
        badge: "Trending"
    },
    {
        id: 459262,
        title: "CN Construction",
        category: "Architecture & Real Estate",
        price: "$14",
        rating: 4.9,
        sales: "640",
        image: "/images/cn-construction.jpg",
        link: "https://www.templatemonster.com/website-templates/cn-construction-website-html-template-459262.html",
        badge: "New"
    }
];

export default function PopularProducts() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
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
                            Explore our best-selling templates curated for high-performance and scalability.
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

                {/* Products Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="relative h-56 bg-muted overflow-hidden">

                                {/* NEXT.JS IMAGE COMPONENT */}
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Badge */}
                                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-border z-10">
                                    {product.badge}
                                </div>

                                {/* Hover Overlay Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px] z-20">
                                    <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg" title="Preview">
                                        <Eye size={20} />
                                    </button>
                                    <button className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform shadow-lg" title="Add to Cart">
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
                                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                        <Star size={12} fill="currentColor" />
                                        {product.rating}
                                    </div>
                                </div>

                                <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {product.title}
                                </h3>

                                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">Price</span>
                                        <span className="font-heading font-bold text-xl text-foreground">{product.price}</span>
                                    </div>
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-muted text-foreground font-bold text-sm rounded-lg hover:bg-primary hover:text-white transition-colors"
                                    >
                                        Buy Now
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}