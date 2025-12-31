import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/Topbar";
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck, FileText, Ban } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300">
            <TopBar />
            <Navbar />

            <div className="pt-40 pb-24 relative overflow-hidden">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Scale size={12} /> Legal
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-6 tracking-tight">
                            Terms of Service
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Please read these terms carefully before using our products. By accessing Themes Jet, you agree to be bound by these conditions.
                        </p>
                    </div>

                    {/* Content Card */}
                    <div className="bg-card/80 border border-border rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-xl">

                        <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground">
                            <p>
                                Welcome to Themes Jet. By purchasing a product or accessing our website, you agree to the following terms. These terms affect your legal rights and obligations, so please read them carefully.
                            </p>
                        </div>

                        {/* License Grid */}
                        <h3 className="text-2xl font-bold text-foreground mb-6 font-heading">1. License Usage</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-12">

                            {/* Regular */}
                            <div className="bg-secondary/30 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <FileText size={80} className="text-blue-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground">Regular License</h3>
                                </div>
                                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                    Suitable for most projects. Use in a single end product which end users are <strong>not</strong> charged for.
                                </p>
                                <ul className="space-y-2 text-xs text-muted-foreground">
                                    <li className="flex gap-2"><span className="text-blue-500">✓</span> Personal Projects</li>
                                    <li className="flex gap-2"><span className="text-blue-500">✓</span> Client Websites</li>
                                    <li className="flex gap-2"><span className="text-blue-500">✓</span> One Domain / Application</li>
                                </ul>
                            </div>

                            {/* Extended */}
                            <div className="bg-secondary/30 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <ShieldCheck size={80} className="text-purple-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400">
                                        <Scale size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground">Extended License</h3>
                                </div>
                                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                    For commercial scale. Use in a single end product which end users <strong>are</strong> charged for.
                                </p>
                                <ul className="space-y-2 text-xs text-muted-foreground">
                                    <li className="flex gap-2"><span className="text-purple-500">✓</span> SaaS Applications</li>
                                    <li className="flex gap-2"><span className="text-purple-500">✓</span> Paid Memberships</li>
                                    <li className="flex gap-2"><span className="text-purple-500">✓</span> Digital Products for Sale</li>
                                </ul>
                            </div>
                        </div>

                        {/* Additional Sections */}
                        <div className="space-y-10">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Ban className="text-muted-foreground" size={20} />
                                    <h3 className="text-xl font-bold text-foreground">2. Restrictions</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    You cannot redistribute, resell, lease, license, sub-license or offer our resources to any third party. This includes uploading our resources to another marketplace or media-sharing tool.
                                </p>
                                <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                                    <p className="text-red-600 dark:text-red-400 text-sm">
                                        <strong>Strictly Prohibited:</strong> Buying a template and reselling it "as-is" on Fiverr, Upwork, or other marketplaces.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-3">3. Intellectual Property</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    All content present on this site is the exclusive property of Themes Jet. You may not claim intellectual or exclusive ownership to any of our products, modified or unmodified. All products are property of Themes Jet.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-3">4. Account Termination</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We reserve the right to terminate your access to the site without any advance notice if you violate these Terms of Service, particularly regarding license abuse or fraudulent payment activity.
                                </p>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5 flex gap-4 items-start">
                            <AlertTriangle className="text-yellow-600 dark:text-yellow-500 shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="text-yellow-700 dark:text-yellow-500 font-bold text-sm mb-1">Warranty Disclaimer</h4>
                                <p className="text-yellow-700/80 dark:text-yellow-500/80 text-xs leading-relaxed">
                                    The materials on Themes Jet's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.
                                </p>
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