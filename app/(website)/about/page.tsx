"use client";

import { motion } from "framer-motion";
import { Code, Heart, ShieldCheck, Users, Zap, Globe, ArrowRight, Target, Lightbulb } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- MOCK DATA ---
const stats = [
    { label: "Premium Products", value: "50+" },
    { label: "Happy Developers", value: "10k+" },
    { label: "Support Tickets Solved", value: "24/7" },
    { label: "Years of Excellence", value: "5+" },
];

const team = [
    { name: "Alex Morgan", role: "Founder & Lead Developer", image: "/images/team-1.jpg" },
    { name: "Sarah Jenkins", role: "Head of Design", image: "/images/team-2.jpg" },
    { name: "David Kim", role: "Frontend Specialist", image: "/images/team-3.jpg" },
    { name: "Emily Chen", role: "Customer Success", image: "/images/team-4.jpg" },
];

const values = [
    {
        icon: Code,
        title: "Clean Code",
        desc: "We write code that humans can read and machines love. Strict standards, TypeScript support, and modular architecture are our defaults."
    },
    {
        icon: ShieldCheck,
        title: "Reliability",
        desc: "Our products are battle-tested. We don't just ship templates; we ship production-ready foundations you can trust."
    },
    {
        icon: Heart,
        title: "Developer First",
        desc: "Built by developers, for developers. We include the features we'd want: clear docs, regular updates, and zero bloat."
    }
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">

            {/* --- GLOBAL BACKGROUND GRADIENTS (Fixed) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
            </div>

            <TopBar />
            <Navbar />

            {/* Content Wrapper */}
            <div className="flex-grow relative z-10 pt-32 pb-20">

                {/* 1. HERO SECTION */}
                <section className="max-w-5xl mx-auto px-6 text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            Our Story
                        </span>
                        <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-foreground mb-6 leading-tight">
                            We Craft Digital Assets for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Modern Builders.</span>
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Themes Jet is a premium single-vendor marketplace. We don't just sell templates; we build the tools that help you launch your next big idea 10x faster.
                        </p>
                    </motion.div>
                </section>

                {/* 2. STATS STRIP (Glassmorphism) */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-10 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative overflow-hidden">
                        {/* Decorative background for the card */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />

                        {stats.map((stat, i) => (
                            <div key={i} className="relative z-10">
                                <div className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-2">{stat.value}</div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. MISSION & VISION */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div>
                            <div className="flex items-center gap-2 text-primary font-bold mb-4">
                                <Target size={20} />
                                <span className="uppercase tracking-wider text-sm">Our Mission</span>
                            </div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
                                Eliminate the "Boring" <br /> Part of Development.
                            </h2>
                            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                                <p>
                                    Every great project starts with the same repetitive tasks: setting up the repo, configuring the grid, building the dashboard shell.
                                </p>
                                <p>
                                    At <strong>Themes Jet</strong>, we believe you shouldn't have to reinvent the wheel. We build robust, scalable, and beautiful starting points so you can focus on the unique business logic that makes your product special.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><ArrowRight size={14} /></div>
                                        <span className="text-foreground font-medium text-sm">Single Vendor Quality Control</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><ArrowRight size={14} /></div>
                                        <span className="text-foreground font-medium text-sm">Lifetime Updates Included</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><ArrowRight size={14} /></div>
                                        <span className="text-foreground font-medium text-sm">Direct Support from Creators</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Image / Visual */}
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl bg-secondary/50 relative group">
                                {/* Abstract Geometric Pattern / Or Image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-card to-background flex items-center justify-center">
                                    <Lightbulb size={64} className="text-primary/20" />
                                </div>

                                {/* Floating Element 1 */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-12 left-12 right-12 bg-card/90 backdrop-blur-xl border border-border p-6 rounded-2xl shadow-xl"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">T</div>
                                        <div>
                                            <div className="h-3 w-32 bg-foreground/10 rounded mb-2"></div>
                                            <div className="h-2 w-20 bg-foreground/10 rounded"></div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Floating Element 2 */}
                                <motion.div
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-12 right-12 bg-card/90 backdrop-blur-xl border border-border px-6 py-4 rounded-xl shadow-xl flex items-center gap-3"
                                >
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-bold text-foreground text-sm">System Operational</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. CORE VALUES */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground">The principles that guide every line of code we write.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((val, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
                            >
                                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                                    <val.icon size={28} />
                                </div>
                                <h3 className="font-heading font-bold text-xl text-foreground mb-3">{val.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. TEAM */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Meet the Makers</h2>
                        <p className="text-muted-foreground">A small team with big ambitions.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <div key={i} className="group">
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted mb-5 relative border border-border">
                                    {/* Placeholder for Member Image - Replace with <Image /> */}
                                    <div className="w-full h-full bg-secondary group-hover:scale-105 transition-transform duration-500 flex items-end justify-center pb-4">
                                        <Users className="text-muted-foreground/20 w-32 h-32" />
                                    </div>

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                                        <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-colors">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                                    <p className="text-sm text-primary font-medium">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. CTA (Matches Home Page Style) */}
                <section className="max-w-5xl mx-auto px-6">
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

            <Footer />
        </main>
    );
}