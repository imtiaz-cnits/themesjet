"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- MOCK DATA ---
const featuredPost = {
    id: 1,
    slug: "scaling-nextjs-applications",
    title: "The Ultimate Guide to Scaling Next.js Applications in 2025",
    excerpt: "Learn the advanced techniques top engineering teams use to optimize performance, manage state, and deploy resilient Next.js apps.",
    image: "/images/blog-featured.jpg",
    author: "Alex Morgan",
    date: "Oct 24, 2024",
    readTime: "8 min read",
    category: "Engineering"
};

// Expanded data to demonstrate pagination
const initialPosts = [
    {
        id: 2,
        slug: "ui-design-trends-2025",
        title: "5 UI Design Trends That Will Dominate 2025",
        excerpt: "From glassmorphism to neobrutalism, discover the styles that are shaping the future of digital products.",
        image: "/images/blog-1.jpg",
        author: "Sarah Jenkins",
        date: "Oct 20, 2024",
        readTime: "5 min read",
        category: "Design"
    },
    {
        id: 3,
        slug: "monetize-react-templates",
        title: "How to Monetize Your React Templates Effectively",
        excerpt: "Turn your code into passive income. A step-by-step guide for developers looking to sell on Themes Jet.",
        image: "/images/blog-2.jpg",
        author: "David Kim",
        date: "Oct 15, 2024",
        readTime: "6 min read",
        category: "Business"
    },
    {
        id: 4,
        slug: "tailwindcss-best-practices",
        title: "Tailwind CSS: Best Practices for Large Teams",
        excerpt: "Stop the class chaos. Learn how to organize your utility classes and create a maintainable design system.",
        image: "/images/blog-3.jpg",
        author: "Alex Morgan",
        date: "Oct 10, 2024",
        readTime: "4 min read",
        category: "Tutorial"
    },
    {
        id: 5,
        slug: "nextjs-vs-remix",
        title: "Next.js vs Remix: Which Framework to Choose?",
        excerpt: "A comprehensive comparison of the two hottest React frameworks. We dive deep into routing, data loading, and hydration.",
        image: "/images/blog-4.jpg",
        author: "Emily Chen",
        date: "Sep 28, 2024",
        readTime: "10 min read",
        category: "Technology"
    },
    {
        id: 6,
        slug: "accessibility-checklist",
        title: "The 2025 Web Accessibility Checklist",
        excerpt: "Ensure your website is usable by everyone. Covers WCAG 2.2 standards, ARIA labels, and keyboard navigation.",
        image: "/images/blog-5.jpg",
        author: "Sarah Jenkins",
        date: "Sep 22, 2024",
        readTime: "7 min read",
        category: "Accessibility"
    },
    {
        id: 7,
        slug: "state-management-2025",
        title: "Is Redux Dead? State Management in 2025",
        excerpt: "Exploring the rise of signals, atoms, and server state tools like React Query versus traditional global stores.",
        image: "/images/blog-6.jpg",
        author: "David Kim",
        date: "Sep 15, 2024",
        readTime: "6 min read",
        category: "Engineering"
    },
    {
        id: 8,
        slug: "figma-to-code",
        title: "Optimizing the Figma to Code Workflow",
        excerpt: "How to bridge the gap between designers and developers using the latest dev mode features and plugins.",
        image: "/images/blog-7.jpg",
        author: "Sarah Jenkins",
        date: "Sep 10, 2024",
        readTime: "5 min read",
        category: "Design"
    },
    {
        id: 9,
        slug: "serverless-databases",
        title: "The Rise of Serverless Databases",
        excerpt: "Why Neon, PlanetScale, and Supabase are changing how frontend developers interact with backend data.",
        image: "/images/blog-8.jpg",
        author: "Alex Morgan",
        date: "Sep 05, 2024",
        readTime: "8 min read",
        category: "Backend"
    },
    {
        id: 10,
        slug: "seo-for-developers",
        title: "Technical SEO Guide for React Developers",
        excerpt: "Mastering meta tags, sitemaps, and structured data to get your single page application ranked on Google.",
        image: "/images/blog-9.jpg",
        author: "Emily Chen",
        date: "Aug 28, 2024",
        readTime: "9 min read",
        category: "Marketing"
    }
];

export default function InsightsPage() {
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Calculate Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = initialPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(initialPosts.length / postsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // Optional: Scroll to top of grid
        const gridElement = document.getElementById("articles-grid");
        if (gridElement) gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">

            {/* --- GLOBAL BACKGROUND GRADIENTS --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
            </div>

            <TopBar />
            <Navbar />

            {/* Content Wrapper */}
            <div className="flex-grow pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            Insights & Resources
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
                            Stories for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Makers.</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Tutorials, industry news, and expert advice to help you build better software.
                        </p>
                    </div>

                    {/* Featured Post (Only show on page 1) */}
                    {currentPage === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-16"
                        >
                            <Link href={`/insights/${featuredPost.slug}`} className="group relative block rounded-3xl overflow-hidden border border-border bg-card transition-all duration-500">
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="h-64 lg:h-auto bg-muted relative overflow-hidden">
                                        <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${featuredPost.image})` }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 lg:hidden" />
                                    </div>
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-lg">{featuredPost.category}</span>
                                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1"><Clock size={12} /> {featuredPost.readTime}</span>
                                        </div>
                                        <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-secondary border border-border overflow-hidden">
                                                    {/* Placeholder Avatar */}
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">{featuredPost.author}</p>
                                                    <p className="text-xs text-muted-foreground">{featuredPost.date}</p>
                                                </div>
                                            </div>
                                            <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                                <ArrowRight size={18} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Articles Grid */}
                    <div id="articles-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentPosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={`/insights/${post.slug}`} className="group block h-full flex flex-col">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-6 relative border border-border">
                                        <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${post.image})` }} />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-background/80 backdrop-blur-md border border-white/10 text-foreground text-xs font-bold rounded-lg shadow-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read Article <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-20">
                            <button
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-colors ${
                                        currentPage === i + 1
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                            : "bg-card border border-border text-foreground hover:bg-secondary"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* Standard CTA (Replaces Newsletter) */}
                    <section className="mt-24">
                        <div className="relative rounded-[32px] overflow-hidden py-16 px-6 text-center bg-card border border-border shadow-2xl">
                            {/* Animated Gradient Blob inside CTA */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <div className="absolute top-[-50%] left-[20%] w-[60%] h-[200%] bg-primary/20 blur-[100px] animate-pulse"></div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 text-foreground">
                                    Ready to Ship Faster?
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                                    Join thousands of developers who are building faster and better with Themes Jet.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="/products" className="px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                                        Browse Templates
                                    </Link>
                                    <Link href="/contact" className="px-8 py-4 bg-background border border-border text-foreground font-bold rounded-xl hover:bg-secondary transition-colors">
                                        Contact Support
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            <Footer />
        </main>
    );
}