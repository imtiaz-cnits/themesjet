"use client";

import { motion } from "framer-motion";
import { Scale, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";
import Link from "next/link";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">

            {/* --- GLOBAL BACKGROUND GRADIENTS --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-5" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-5" />
            </div>

            <TopBar />
            <Navbar />

            {/* Content Wrapper */}
            <div className="flex-grow pt-32 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Header */}
                    <header className="mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                <Scale size={12} /> Legal
                            </span>
                            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                                Terms of Service
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Please read these terms carefully before using our products.
                            </p>
                        </motion.div>
                    </header>

                    {/* Content Block */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card/50 backdrop-blur-md border border-border rounded-3xl p-8 md:p-12 shadow-sm"
                    >
                        <article className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:underline max-w-none text-muted-foreground">

                            <p className="lead">
                                By accessing this website and purchasing products from Themes Jet, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                            </p>

                            <h3 className="text-foreground mt-8">1. License Usage</h3>
                            <p>
                                When you purchase an item, you are buying a license to use that item, not the item itself. We offer two types of licenses:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
                                <div className="bg-background border border-border p-5 rounded-xl">
                                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                        <CheckCircle size={16} className="text-green-500" /> Regular License
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Use in a single end product which end users <strong>are not</strong> charged for (e.g., a company website).
                                    </p>
                                </div>
                                <div className="bg-background border border-border p-5 rounded-xl">
                                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                        <CheckCircle size={16} className="text-purple-500" /> Extended License
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Use in a single end product which end users <strong>are</strong> charged for (e.g., a SaaS application).
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-foreground mt-8">2. Refunds Policy</h3>
                            <p>
                                Given the nature of digital content, we do not generally offer a refund or credit on a purchase unless required under consumer law or other relevant consumer protection laws.
                            </p>
                            <p>
                                We <strong>will</strong> refund if:
                            </p>
                            <ul className="marker:text-primary">
                                <li>The item is technically defective and cannot be fixed.</li>
                                <li>The item is materially different from the item description.</li>
                            </ul>
                            <p>
                                We <strong>will not</strong> refund if:
                            </p>
                            <ul className="marker:text-red-500">
                                <li>You simply change your mind.</li>
                                <li>You don't have the technical skills to use the item.</li>
                            </ul>

                            <h3 className="text-foreground mt-8">3. Intellectual Property</h3>
                            <p>
                                All content present on this site is the exclusive property of Themes Jet. You may not claim intellectual or exclusive ownership to any of our products, modified or unmodified.
                            </p>

                            <h3 className="text-foreground mt-8">4. Account Termination</h3>
                            <p>
                                We reserve the right to terminate your access to the site without any advance notice if you violate these Terms of Service.
                            </p>

                            <hr className="border-border my-12" />

                            <div className="flex items-center gap-4 bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-xl not-prose">
                                <AlertTriangle className="text-yellow-500 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-foreground text-sm">Disclaimer</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        The materials on Themes Jet's website are provided on an 'as is' basis. We make no warranties, expressed or implied.
                                    </p>
                                </div>
                            </div>

                        </article>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </main>
    );
}