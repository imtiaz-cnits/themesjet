"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Twitter, Linkedin, Facebook, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function InsightDetailsPage() {
    const params = useParams();

    // In a real app, use the slug to fetch data
    const slug = params.slug;

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

                {/* BACK LINK */}
                <div className="max-w-4xl mx-auto px-6 mb-8">
                    <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>
                </div>

                {/* ARTICLE HEADER */}
                <header className="max-w-4xl mx-auto px-6 mb-12 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
                        <span className="text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Engineering</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> Oct 24, 2024</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> 8 min read</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-8 leading-tight">
                        The Ultimate Guide to Scaling <br className="hidden md:block" /> Next.js Applications
                    </h1>

                    {/* Author Bar */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary border border-border" /> {/* Author Avatar */}
                        <div className="text-left">
                            <p className="text-sm font-bold text-foreground">Alex Morgan</p>
                            <p className="text-xs text-muted-foreground">Lead Developer @ Themes Jet</p>
                        </div>
                    </div>
                </header>

                {/* FEATURED IMAGE */}
                <div className="max-w-5xl mx-auto px-6 mb-16">
                    <div className="aspect-[21/9] bg-muted rounded-3xl border border-border overflow-hidden shadow-2xl relative">
                        {/* Placeholder for real image */}
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/blog-featured.jpg')" }} />
                    </div>
                </div>

                {/* CONTENT LAYOUT */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* SIDEBAR LEFT (Share - Sticky) */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32 flex flex-col gap-4 items-center">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Share</p>
                            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                                <Twitter size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-blue-600 hover:text-blue-600 hover:bg-blue-600/5 transition-all">
                                <Linkedin size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all">
                                <Facebook size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-green-500 hover:text-green-500 hover:bg-green-500/5 transition-all">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* MAIN CONTENT (8 cols) */}
                    <article className="lg:col-span-8 prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:underline max-w-none">
                        <p className="lead text-xl text-muted-foreground font-medium mb-8">
                            Scaling a Next.js application involves more than just adding servers. It requires a deep understanding of rendering strategies, caching layers, and database optimization. In this guide, we explore the patterns that power high-traffic sites.
                        </p>

                        <h2 className="text-foreground">1. Understanding Rendering Patterns</h2>
                        <p className="text-muted-foreground">
                            Next.js offers multiple rendering strategies: SSR, SSG, and ISR. Choosing the right one is crucial for performance. Static Generation (SSG) is the fastest, but Server-Side Rendering (SSR) ensures fresh data.
                        </p>

                        <div className="my-8 p-6 bg-card border border-border rounded-xl">
                            <h4 className="text-lg font-bold text-foreground mb-2">💡 Pro Tip</h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Use <strong>Incremental Static Regeneration (ISR)</strong> for marketing pages that need to update occasionally without rebuilding the entire site.
                            </p>
                        </div>

                        <h2 className="text-foreground">2. Optimizing Images and Fonts</h2>
                        <p className="text-muted-foreground">
                            Images often account for the largest content paint (LCP). Using the <code>next/image</code> component automatically optimizes images, serving modern formats like WebP and AVIF to supported browsers.
                        </p>

                        <h2 className="text-foreground">3. Database Connection Pooling</h2>
                        <p className="text-muted-foreground">
                            In serverless environments, managing database connections is tricky. Each lambda function might open a new connection, quickly exhausting your pool. Using tools like PgBouncer or Supabase connection pooling is essential.
                        </p>

                        <hr className="border-border my-12" />

                        {/* CTA in Article */}
                        <div className="not-prose bg-secondary/50 border border-border rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-foreground mb-2">Build Faster with Themes Jet</h3>
                            <p className="text-muted-foreground mb-6">
                                Save months of development time with our premium Next.js templates.
                            </p>
                            <Link href="/products" className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                Explore Templates
                            </Link>
                        </div>
                    </article>

                    {/* SIDEBAR RIGHT (TOC - Sticky) */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-wider">On this page</p>
                            <ul className="space-y-3 text-sm border-l border-border pl-4">
                                <li><a href="#" className="text-primary font-bold block border-l-2 border-primary -ml-[18px] pl-4">Rendering Patterns</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Image Optimization</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Database Pooling</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Edge Caching</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Conclusion</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}