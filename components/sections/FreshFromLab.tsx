"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock Data based on your screenshot
const products = [
    {
        id: 1,
        title: "FinDash - SaaS Admin",
        category: "HTML5",
        badgeColor: "bg-blue-500",
        price: "$24",
        rating: 5.0,
        reviews: 12,
        sales: "84",
        image: "/images/product-1.jpg", // Replace with your image paths
    },
    {
        id: 2,
        title: "NeoCrypto Landing",
        category: "REACT",
        badgeColor: "bg-teal-500",
        price: "$39",
        rating: 5.0,
        reviews: 28,
        sales: "205",
        image: "/images/product-2.jpg",
    },
    {
        id: 3,
        title: "ShopMaster POS",
        category: "PHP",
        badgeColor: "bg-purple-500",
        price: "$59",
        rating: 4.5,
        reviews: 8,
        sales: "45",
        image: "/images/product-3.jpg",
    },
    {
        id: 4,
        title: "FinDash - SaaS Admin",
        category: "HTML5",
        badgeColor: "bg-blue-500",
        price: "$24",
        rating: 5.0,
        reviews: 12,
        sales: "84",
        image: "/images/product-1.jpg",
    },
    {
        id: 5,
        title: "NeoCrypto Landing",
        category: "REACT",
        badgeColor: "bg-teal-500",
        price: "$39",
        rating: 5.0,
        reviews: 28,
        sales: "205",
        image: "/images/product-2.jpg",
    },
    {
        id: 6,
        title: "ShopMaster POS",
        category: "PHP",
        badgeColor: "bg-purple-500",
        price: "$59",
        rating: 4.5,
        reviews: 8,
        sales: "45",
        image: "/images/product-3.jpg",
    }
];

export default function FreshFromLab() {
    return (
        <section className="py-24 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-heading font-bold text-foreground"
                    >
                        Fresh from the Lab
                    </motion.h2>

                    <Link href="/products" className="hidden md:flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="
                                group relative flex flex-col rounded-2xl overflow-hidden
                                border border-border dark:border-white/5
                                bg-card dark:bg-[#0E121B]
                                hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/50
                                transition-all duration-300
                            "
                        >
                            {/* Image Placeholder / Thumbnail Area */}
                            <div className="relative h-64 bg-muted dark:bg-[#1A1F2E] overflow-hidden">
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0E121B] via-transparent to-transparent opacity-60 z-10" />

                                {/* Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className={`${product.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg`}>
                                        {product.category}
                                    </span>
                                </div>

                                {/* Hover Overlay Actions */}
                                <div className="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                    <button className="h-10 px-4 bg-white text-black font-bold text-sm rounded-lg hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        Live Preview
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center border border-white/20 text-white rounded-lg hover:bg-white hover:text-black transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-4 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer">
                                        {product.title}
                                    </h3>
                                    <span className="font-bold text-lg text-foreground">
                                        {product.price}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                                    Advanced financial dashboard with dark mode and 50+ components.
                                </p>

                                {/* Footer Stats */}
                                <div className="mt-auto pt-4 border-t border-border dark:border-white/5 flex justify-between items-center text-xs font-medium">
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill="currentColor" className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-600"} />
                                            ))}
                                        </div>
                                        <span className="text-muted-foreground ml-1">({product.reviews} Reviews)</span>
                                    </div>
                                    <div className="text-muted-foreground">
                                        {product.sales} Sales
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-10 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-block px-8 py-3 rounded-full border border-border text-sm font-bold text-foreground hover:bg-muted transition-colors"
                    >
                        View All Products
                    </Link>
                </div>

            </div>
        </section>
    );
}