import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/Topbar";
import Link from "next/link";
import {CheckCircle2, XCircle, AlertTriangle, Scale} from "lucide-react";

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300">
            <TopBar />
            <Navbar />

            {/* Main Content Wrapper */}
            <div className="pt-40 pb-24 relative overflow-hidden">

                {/* Background Glow Effects */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">

                    {/* 1. Header Section */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Scale size={12} /> Legal
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-6 tracking-tight">
                            Refund Policy
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We want you to be satisfied. Please read our guidelines regarding digital product returns and cancellations.
                        </p>
                    </div>

                    {/* 2. Main Content Card */}
                    <div className="bg-card/80 border border-border rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-xl">

                        {/* Intro */}
                        <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground">
                            <p>
                                By accessing this website and purchasing products from Themes Jet, you agree to be bound by these Refund Policies. Given the nature of digital content, we generally offer a refund or credit on a purchase only under specific conditions.
                            </p>
                        </div>

                        {/* 3. The Grid Boxes */}
                        <div className="grid md:grid-cols-2 gap-6 mb-12">

                            {/* Box 1: Eligible */}
                            <div className="bg-secondary/30 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/40 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <CheckCircle2 size={80} className="text-green-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle2 className="text-green-600 dark:text-green-500" size={24} />
                                    <h3 className="text-xl font-bold text-foreground">Eligible for Refund</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="text-green-500">•</span> Product is technically defective or broken.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-500">•</span> Fatal errors not fixed by support within 48h.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-500">•</span> Product completely different from description.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-500">•</span> Security vulnerabilities found in code.
                                    </li>
                                </ul>
                            </div>

                            {/* Box 2: Not Eligible */}
                            <div className="bg-secondary/30 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/40 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <XCircle size={80} className="text-red-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <XCircle className="text-red-600 dark:text-red-500" size={24} />
                                    <h3 className="text-xl font-bold text-foreground">Non-Refundable</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span> You simply changed your mind.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span> You lack the technical skills to use it.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span> You bought the wrong item by mistake.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span> Issues caused by 3rd party plugins/hosting.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 4. Text Content Sections */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-3">Service Refunds (Agency)</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    For our custom design and development services, the initial <strong>50% deposit is non-refundable</strong> once the project kick-off meeting has occurred and work has commenced. If you cancel the project midway, you are liable for all hours worked up to that point.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-3">How to Request</h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    To initiate a refund, please contact our support team. We aim to review and process all requests within 3 business days.
                                </p>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all">
                                    Open Support Ticket &rarr;
                                </Link>
                            </div>
                        </div>

                        {/* 5. Disclaimer Box */}
                        <div className="mt-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5 flex gap-4 items-start">
                            <AlertTriangle className="text-yellow-600 dark:text-yellow-500 shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="text-yellow-700 dark:text-yellow-500 font-bold text-sm mb-1">Digital Goods Disclaimer</h4>
                                <p className="text-yellow-700/80 dark:text-yellow-500/80 text-xs leading-relaxed">
                                    Please note that our products are digital downloads. Once a purchase is made and files are downloaded, they cannot be technically "returned". We reserve the right to decline refund requests that appear fraudulent or abusive.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-muted-foreground text-sm">
                            &copy; {new Date().getFullYear()} Themes Jet. All rights reserved.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}