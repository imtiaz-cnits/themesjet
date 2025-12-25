"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileText, Mail } from "lucide-react";
import Link from "next/link";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
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
                                <Shield size={12} /> Legal
                            </span>
                            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                                Privacy Policy
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Last Updated: <span className="font-bold text-foreground">October 24, 2024</span>
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
                                At Themes Jet, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or purchase our products.
                            </p>

                            <h3 className="text-foreground flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><FileText size={18} /></div>
                                1. Information We Collect
                            </h3>
                            <p>
                                When you create an account, purchase a product, or subscribe to our newsletter, we may collect the following information:
                            </p>
                            <ul>
                                <li><strong>Personal Identification:</strong> Name, email address, and country.</li>
                                <li><strong>Payment Data:</strong> We do not store credit card details. All transactions are processed securely via Stripe or PayPal.</li>
                                <li><strong>Usage Data:</strong> IP address, browser type, and pages visited (via Google Analytics).</li>
                            </ul>

                            <h3 className="text-foreground flex items-center gap-3 mt-10">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Lock size={18} /></div>
                                2. How We Use Your Data
                            </h3>
                            <p>
                                We use your information strictly to improve your experience and deliver our services:
                            </p>
                            <ul>
                                <li>Processing transactions and delivering download links.</li>
                                <li>Sending product updates, bug fixes, and security alerts.</li>
                                <li>Providing customer support and responding to inquiries.</li>
                                <li>Improving our website performance and user interface.</li>
                            </ul>

                            <h3 className="text-foreground flex items-center gap-3 mt-10">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Shield size={18} /></div>
                                3. Data Security
                            </h3>
                            <p>
                                We implement industry-standard security measures to protect your data. This includes SSL encryption for all data transmission and secure servers for database storage. However, no method of transmission over the internet is 100% secure.
                            </p>

                            <h3 className="text-foreground mt-10">4. Cookies</h3>
                            <p>
                                We use cookies to remember your login session and cart contents. You can disable cookies in your browser settings, but some features of the site may not function correctly.
                            </p>

                            <h3 className="text-foreground mt-10">5. Third-Party Links</h3>
                            <p>
                                Our website may contain links to external sites (e.g., demos hosted on Vercel or Netlify). We are not responsible for the privacy practices of these external sites.
                            </p>

                            <hr className="border-border my-12" />

                            <div className="bg-secondary/50 rounded-xl p-6 border border-border not-prose">
                                <h4 className="text-foreground font-bold text-lg mb-2 flex items-center gap-2">
                                    <Mail size={20} className="text-primary" /> Questions?
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    If you have any questions about this Privacy Policy, please contact us.
                                </p>
                                <a href="mailto:privacy@themesjet.com" className="text-primary font-bold hover:underline text-sm">
                                    privacy@themesjet.com
                                </a>
                            </div>

                        </article>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </main>
    );
}