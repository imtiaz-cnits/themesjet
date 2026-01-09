"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Layout, Database, Palette } from "lucide-react";
import Image from "next/image";

const categories = [
    {
        id: "html",
        title: "HTML Templates",
        description: "Responsive, SEO-friendly layouts built with Bootstrap 5 and Tailwind.",
        icon: <Layout className="w-6 h-6" />,
        color: "text-orange-500",
        bgColor: "bg-orange-500/20",
        image: "/images/category-html.jpg", // You can use a generic coding image here
        gridClass: "md:col-span-2 md:row-span-2", // Large Square
        gradient: "from-background via-transparent to-transparent"
    },
    {
        id: "react",
        title: "React & Next.js",
        description: "Server-side rendered dashboards and apps.",
        icon: <Code className="w-6 h-6" />,
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
        gridClass: "md:col-span-2", // Wide Rectangle
        gradient: "from-blue-900/20 to-card"
    },
    {
        id: "php",
        title: "PHP Scripts",
        description: "PHP & Laravel",
        icon: <Database className="w-6 h-6" />,
        color: "text-purple-400",
        bgColor: "bg-purple-500/20",
        gridClass: "", // Small Square
        gradient: "from-purple-900/40 via-card to-card"
    },
    {
        id: "ui",
        title: "UI Templates",
        description: "Figma, Sketch, Framer",
        icon: <Palette className="w-6 h-6" />,
        color: "text-pink-400",
        bgColor: "bg-pink-500/20",
        gridClass: "", // Small Square
        gradient: "from-pink-900/40 via-card to-card"
    }
];

export default function BrowseCategories() {
    return (
        <section className="relative z-10 py-16">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-wider uppercase text-xs mb-2 block font-heading"
                        >
                            Curated Collections
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-heading font-bold text-3xl md:text-4xl text-foreground"
                        >
                            Browse by Category
                        </motion.h2>
                    </div>
                    <motion.a
                        href="/categories"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-bold group"
                    >
                        View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-5 h-auto md:h-[600px]">

                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 ${cat.gridClass}`}
                        >
                            {/* Background Image (Only for HTML category based on design) */}
                            {cat.id === 'html' && (
                                <div className="absolute inset-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000"
                                        alt="HTML"
                                        fill
                                        className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                                </div>
                            )}

                            {/* Background Gradient (For others) */}
                            {cat.id !== 'html' && (
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`}></div>
                            )}

                            {/* Content */}
                            <div className={`relative h-full flex flex-col p-6 ${cat.id === 'html' ? 'justify-end p-8' : cat.id === 'react' ? 'justify-center items-start p-8' : 'justify-between'}`}>

                                <div className={`flex items-center gap-3 ${cat.id === 'html' ? 'mb-4' : cat.id === 'react' ? 'mb-3' : ''}`}>
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${cat.bgColor} ${cat.color} flex items-center justify-center backdrop-blur-md border border-white/10`}>
                                        {cat.icon}
                                    </div>

                                    {/* Inline Title for Wide Cards */}
                                    {cat.id === 'react' && (
                                        <h3 className="text-xl font-bold text-foreground font-heading">{cat.title}</h3>
                                    )}
                                </div>

                                <div>
                                    {/* Block Title for Square/Large Cards */}
                                    {cat.id !== 'react' && (
                                        <h3 className={`font-bold text-foreground font-heading ${cat.id === 'html' ? 'text-2xl mb-1' : 'text-lg'}`}>
                                            {cat.title}
                                        </h3>
                                    )}

                                    <p className={`text-muted-foreground ${cat.id === 'html' ? 'text-sm line-clamp-2' : 'text-xs mt-1'}`}>
                                        {cat.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}