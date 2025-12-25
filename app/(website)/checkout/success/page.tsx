"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, FileText, Check, ArrowRight, Copy, ShieldCheck, Home, FileCode } from "lucide-react";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OrderSuccessPage() {
    const [copied, setCopied] = useState(false);
    const orderId = "ORD-2024-8592";

    const handleCopy = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Mock Purchased Items
    const purchasedItems = [
        {
            id: 1,
            name: "DashLite - React Admin Template",
            license: "Regular License",
            size: "145 MB",
            version: "v2.4.0",
            image: "/images/product-1.jpg"
        },
        {
            id: 2,
            name: "SaaS Landing Kit",
            license: "Extended License",
            size: "42 MB",
            version: "v1.1.0",
            image: "/images/product-2.jpg"
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">

            {/* --- GLOBAL BACKGROUND GRADIENTS --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-green-500 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
            </div>

            <TopBar />
            <Navbar />

            {/* Content Wrapper */}
            <div className="flex-grow pt-32 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto px-6">

                    {/* 1. SUCCESS HEADER */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 text-green-500"
                        >
                            <Check size={48} strokeWidth={3} />
                        </motion.div>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
                            Payment Successful!
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                            Thank you for your purchase. Your files are ready for instant download below. A confirmation email has been sent to <span className="font-bold text-foreground">alex@example.com</span>.
                        </p>
                    </div>

                    {/* 2. ORDER DETAILS CARD */}
                    <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden mb-10">
                        {/* Header */}
                        <div className="bg-secondary/50 px-8 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Order ID:</span>
                                <div className="flex items-center gap-2 bg-background border border-border px-3 py-1 rounded-lg text-foreground font-mono font-bold">
                                    {orderId}
                                    <button onClick={handleCopy} className="hover:text-primary transition-colors">
                                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                    </button>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                <FileText size={16} /> Download Invoice
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="p-8 space-y-8">
                            {purchasedItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-border last:pb-0 last:border-0"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-full md:w-32 aspect-video bg-muted rounded-xl border border-border overflow-hidden shrink-0">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="font-heading font-bold text-xl text-foreground mb-1">{item.name}</h3>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-muted-foreground mb-4">
                                            <span className="bg-secondary px-2 py-1 rounded border border-border">{item.license}</span>
                                            <span className="bg-secondary px-2 py-1 rounded border border-border">{item.version}</span>
                                            <span>{item.size}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-3 w-full md:w-auto">
                                        <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                            <Download size={18} /> Download
                                        </button>
                                        <button className="px-6 py-3 bg-background border border-border text-foreground font-bold rounded-xl hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-sm">
                                            <ShieldCheck size={16} /> License PDF
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 3. NEXT STEPS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Documentation Card */}
                        <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileCode size={24} />
                            </div>
                            <h3 className="font-bold text-foreground mb-2">Documentation</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Learn how to install and customize your new templates quickly.
                            </p>
                            <Link href="/help-center" className="text-sm font-bold text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read Docs <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Dashboard Card */}
                        <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Home size={24} />
                            </div>
                            <h3 className="font-bold text-foreground mb-2">Go to Dashboard</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Manage your downloads, account settings, and purchase history.
                            </p>
                            <Link href="/user/dashboard" className="text-sm font-bold text-purple-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Dashboard <ArrowRight size={14} />
                            </Link>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}