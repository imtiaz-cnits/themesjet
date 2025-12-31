"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define Interface matching the passed data
interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: number | string;
    imageUrl: string;
    category: string;
    demoLink?: string;
    _count?: {
        orderItems: number;
    }
}

export default function FreshFromLab({ products }: { products: ProductProps[] }) {

    // Helper to assign random colors to badges based on index
    const getBadgeColor = (index: number) => {
        const colors = ["bg-blue-500/90", "bg-amber-500/90", "bg-purple-500/90", "bg-emerald-500/90"];
        return colors[index % colors.length];
    };

    return (
        <section className="py-16 relative transition-colors duration-300">
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
                {products.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] flex flex-col"
                            >
                                {/* Thumbnail Area */}
                                <div className="h-64 bg-muted relative overflow-hidden">
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10"></div>

                                    {/* Image */}
                                    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                                        <Image
                                            src={product.imageUrl || "/images/placeholder.jpg"}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>

                                    {/* Floating Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className={`px-2 py-1 ${getBadgeColor(index)} backdrop-blur text-white text-[10px] font-bold rounded uppercase tracking-wide`}>
                                            {product.category}
                                        </span>
                                    </div>

                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-background/80 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="px-4 py-2 bg-foreground text-background font-bold rounded-lg text-sm hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2"
                                        >
                                            <Eye size={16} /> View Details
                                        </Link>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1" title={product.name}>
                                            {product.name}
                                        </h3>
                                        <span className="font-bold text-foreground text-lg">${Number(product.price).toFixed(2)}</span>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 font-body line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Footer Stats */}
                                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                        <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                                            ★★★★★ <span className="text-muted-foreground ml-1 font-medium">(New)</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground font-bold">
                                            {product._count?.orderItems || 0} Sales
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border">
                        <p className="text-muted-foreground">No fresh products found.</p>
                    </div>
                )}

                {/* Mobile View All Button */}
                <div className="mt-16 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-block px-8 py-4 border border-border rounded-full text-foreground font-bold hover:bg-foreground hover:text-background transition-all font-heading text-sm"
                    >
                        View All Products
                    </Link>
                </div>

            </div>
        </section>
    );
}