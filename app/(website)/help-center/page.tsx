"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronRight, FileText, ShoppingCart, Users, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- DATA ---
const categories = [
    {
        icon: ShoppingCart,
        title: "Buying & Accounts",
        desc: "Creating accounts, purchase methods, and downloading items"
    },
    {
        icon: FileText,
        title: "Licenses & Terms",
        desc: "Understanding Regular vs Extended licenses and usage rights"
    },
    {
        icon: Users,
        title: "Authors & Payouts",
        desc: "How to become a seller, upload items, and withdraw earnings"
    },
];

const popularArticles = [
    {
        question: "How do I download my purchase?",
        answer: "Go to your Dashboard > Downloads. Click the download button next to your purchased item. You will receive a ZIP file containing all source codes and documentation."
    },
    {
        question: "Can I use the item on multiple domains?",
        answer: "No, a Regular License is valid for a single end product (one domain). If you need to use it on multiple domains, you must purchase a separate license for each, or an Extended License depending on usage."
    },
    {
        question: "What is your refund policy?",
        answer: "We offer refunds within 14 days if the item is broken, malfunctioning, or not as described. Refunds are not issued for mistaken purchases or if you simply change your mind."
    },
    {
        question: "How do I contact the author for support?",
        answer: "Visit the item page and click on the 'Support' tab. You can message the author directly. Response times vary but are typically within 1 business day."
    }
];

// --- ACCORDION ITEM COMPONENT ---
function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
    return (
        <div className="border-b border-border last:border-0">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-5 text-left group"
            >
                <span className={`font-bold transition-colors ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground group-hover:text-foreground'}`}>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-muted-foreground text-sm leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function HelpCenterPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <div className="flex-grow relative z-10 pt-32 pb-20">

                {/* 1. HERO SECTION */}
                <section className="text-center max-w-3xl mx-auto px-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                            How can we help you?
                        </h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            Search our knowledge base for instant answers.
                        </p>

                        {/* Search Input */}
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="e.g. How to download, Refund policy, License types..."
                                className="w-full h-14 pl-12 pr-4 bg-card border border-border rounded-xl shadow-lg text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        </div>
                    </motion.div>
                </section>

                <div className="max-w-7xl mx-auto px-6">

                    {/* 2. CATEGORIES GRID (Full Width, Top) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-card border border-border p-8 rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer flex flex-col items-center text-center h-full"
                            >
                                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                    <cat.icon size={28} />
                                </div>
                                <h3 className="font-bold text-foreground text-lg mb-3">{cat.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* 3. SPLIT LAYOUT: FAQ + SIDEBAR */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* LEFT: Popular Articles (8 cols) */}
                        <div className="lg:col-span-8">
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Popular Articles</h2>
                                <div className="divide-y divide-border">
                                    {popularArticles.map((faq, idx) => (
                                        <AccordionItem
                                            key={idx}
                                            question={faq.question}
                                            answer={faq.answer}
                                            isOpen={openIndex === idx}
                                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: 'Still Stuck?' Sidebar (4 cols) */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-32">
                                <div className="bg-gradient-to-br from-card to-primary/5 border border-border rounded-2xl p-8 text-center relative overflow-hidden shadow-xl">

                                    {/* Decor Blob */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>

                                    <div className="w-14 h-14 mx-auto bg-primary rounded-full flex items-center justify-center text-primary-foreground mb-5 shadow-lg shadow-primary/30 relative z-10">
                                        <MessageCircle size={28} />
                                    </div>
                                    <h3 className="font-bold text-foreground text-lg mb-2 relative z-10">Still stuck?</h3>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed relative z-10 px-2">
                                        Can't find what you're looking for? Our support team is here to help.
                                    </p>
                                    <button className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 relative z-10 text-sm">
                                        <Mail size={16} /> Contact Support
                                    </button>
                                    <div className="mt-4 text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                                        Response time: <span className="text-foreground">~2 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}