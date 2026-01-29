"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getPosts } from "@/actions/insights"; // Import the server action (usable in client if 'use server' is at top of action file)
import { format } from "date-fns";

export default function InsightsClient({ initialPosts, totalPages, featuredPost }: any) {
    const [posts, setPosts] = useState(initialPosts);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const handlePageChange = async (newPage: number) => {
        setLoading(true);
        const data = await getPosts(newPage);
        setPosts(data.posts);
        setCurrentPage(newPage);
        setLoading(false);

        const gridElement = document.getElementById("articles-grid");
        if (gridElement) gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
                <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    Insights & Resources
                </span>
                <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-6 leading-tight">
                    Stories for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Makers.</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Tutorials, industry news, and expert advice to help you build better software.
                </p>
            </div>

            {/* Featured Post (Only on Page 1) */}
            {currentPage === 1 && featuredPost && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 md:mb-16"
                >
                    <Link href={`/insights/${featuredPost.slug}`} className="group relative block rounded-3xl overflow-hidden border border-border bg-card transition-all duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="h-64 lg:h-auto bg-muted relative overflow-hidden">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${featuredPost.coverImage})` }} />
                            </div>
                            <div className="p-6 lg:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-lg">{featuredPost.category}</span>
                                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1"><Clock size={12} /> {featuredPost.readTime}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary border border-border overflow-hidden flex items-center justify-center font-bold text-muted-foreground">
                                            {featuredPost.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{featuredPost.author}</p>
                                            <p className="text-xs text-muted-foreground">{format(new Date(featuredPost.createdAt), "MMM dd, yyyy")}</p>
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
            <div id="articles-grid" className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
                {posts.map((post: any, i: number) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link href={`/insights/${post.slug}`} className="group block h-full flex flex-col">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-6 relative border border-border">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${post.coverImage})` }} />
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-20">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-50 transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-bold text-muted-foreground">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-50 transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}