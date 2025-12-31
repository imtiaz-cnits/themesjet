import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/Topbar";
import {FileText, Lock, Shield, Database, Eye, Cookie, Mail, Scale} from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300">
            <TopBar />
            <Navbar />

            <div className="pt-40 pb-24 relative overflow-hidden">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Scale size={12} /> Legal
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-6 tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Your privacy matters. Here is a transparent breakdown of how we handle and protect your data.
                        </p>
                    </div>

                    {/* Content Card */}
                    <div className="bg-card/80 border border-border rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-xl">

                        <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground">
                            <p>
                                At Themes Jet, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or purchase our products. Last updated on <strong className="text-foreground">January 1, 2026</strong>.
                            </p>
                        </div>

                        {/* Grid: Collection vs Usage */}
                        <div className="grid md:grid-cols-2 gap-6 mb-12">

                            {/* Collection */}
                            <div className="bg-secondary/30 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Database size={80} className="text-blue-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <FileText className="text-blue-600 dark:text-blue-500" size={24} />
                                    <h3 className="text-xl font-bold text-foreground">Information We Collect</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="text-blue-500">•</span> <strong>Identity:</strong> Name, email address, and country.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-blue-500">•</span> <strong>Payment:</strong> Processed securely via Stripe.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-blue-500">•</span> <strong>Usage Data:</strong> IP address and browser type.
                                    </li>
                                </ul>
                            </div>

                            {/* Usage */}
                            <div className="bg-secondary/30 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Eye size={80} className="text-purple-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Lock className="text-purple-600 dark:text-purple-500" size={24} />
                                    <h3 className="text-xl font-bold text-foreground">How We Use It</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="text-purple-500">•</span> Processing transactions & delivering downloads.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-500">•</span> Sending critical product updates & patches.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-500">•</span> Providing customer support.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Additional Content */}
                        <div className="space-y-10">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Shield className="text-muted-foreground" size={20} />
                                    <h3 className="text-xl font-bold text-foreground">Data Security</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    We implement industry-standard security measures to protect your data. This includes SSL encryption for all data transmission and secure servers for database storage. However, no method of transmission over the internet is 100% secure.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Cookie className="text-muted-foreground" size={20} />
                                    <h3 className="text-xl font-bold text-foreground">Cookies Policy</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    We use cookies to remember your login session, cart contents, and preferences (like Dark Mode). You can disable cookies in your browser settings, but some features of the site may not function correctly.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-3">Third-Party Services</h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We may share minimal data with trusted third-party providers solely for operational purposes:
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                    <li className="bg-secondary/20 p-3 rounded-lg border border-border">
                                        <strong className="text-foreground block mb-1">Authentication</strong>
                                        Google & GitHub (via NextAuth)
                                    </li>
                                    <li className="bg-secondary/20 p-3 rounded-lg border border-border">
                                        <strong className="text-foreground block mb-1">Payments</strong>
                                        Stripe (Payment Processing)
                                    </li>
                                    <li className="bg-secondary/20 p-3 rounded-lg border border-border">
                                        <strong className="text-foreground block mb-1">Analytics</strong>
                                        Vercel Analytics (Usage stats)
                                    </li>
                                    <li className="bg-secondary/20 p-3 rounded-lg border border-border">
                                        <strong className="text-foreground block mb-1">Hosting</strong>
                                        Vercel & AWS (Infrastructure)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Box */}
                        <div className="mt-12 bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                            <div className="p-3 bg-purple-500/20 rounded-full text-purple-600 dark:text-purple-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="text-foreground font-bold text-lg mb-1">Have questions about your data?</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                    If you want to request deletion of your data or have concerns about this policy, please reach out to our privacy officer.
                                </p>
                                <a href="mailto:privacy@themesjet.com" className="text-purple-600 dark:text-purple-400 font-bold hover:underline transition-colors text-sm flex items-center gap-2 justify-center sm:justify-start">
                                    privacy@themesjet.com &rarr;
                                </a>
                            </div>
                        </div>

                    </div>

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