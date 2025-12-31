"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, HelpCircle, ArrowRight, Zap, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

    const pricing = {
        monthly: {
            starter: "1,499",
            growth: "2,499",
            enterprise: "Custom",
        },
        quarterly: {
            starter: "2,499", // ~15% off
            growth: "4,249", // ~15% off
            enterprise: "Custom",
        },
    };

    const features = [
        { name: "Design Requests", starter: "1 Active", growth: "2 Active", enterprise: "Unlimited" },
        { name: "Development", starter: false, growth: true, enterprise: true },
        { name: "Project Manager", starter: false, growth: true, enterprise: "Dedicated" },
        { name: "Turnaround Time", starter: "2-3 Days", growth: "1-2 Days", enterprise: "Priority" },
        { name: "Slack Support", starter: "Standard", growth: "Priority", enterprise: "24/7 VIP" },
        { name: "Source Files", starter: true, growth: true, enterprise: true },
        { name: "Pause or Cancel", starter: true, growth: true, enterprise: true },
    ];

    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* 1. HEADER */}
                <div className="text-center max-w-8xl mx-auto mb-16">
                    <section className="max-w-5xl mx-auto px-6 text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                        <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            Pricing
                        </span>
                            <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-foreground mb-6 leading-tight">
                                Transparent Pricing for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">World-Class Digital Products</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                                Choose a plan that fits your stage of growth. No hidden fees, pause or cancel anytime.
                            </p>
                        </motion.div>
                    </section>

                    {/* Toggle Switch */}
                    {/*<div className="inline-flex bg-secondary p-1 rounded-full border border-border relative">*/}
                    {/*    <div*/}
                    {/*        className={`absolute top-1 bottom-1 w-[140px] bg-background rounded-full shadow-sm transition-all duration-300 ease-in-out ${*/}
                    {/*            billingCycle === "monthly" ? "left-1" : "left-[148px]"*/}
                    {/*        }`}*/}
                    {/*    />*/}
                    {/*    <button*/}
                    {/*        onClick={() => setBillingCycle("monthly")}*/}
                    {/*        className={`relative z-10 w-[140px] py-2.5 text-sm font-bold transition-colors ${*/}
                    {/*            billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground hover:text-foreground"*/}
                    {/*        }`}*/}
                    {/*    >*/}
                    {/*        Monthly*/}
                    {/*    </button>*/}
                    {/*    <button*/}
                    {/*        onClick={() => setBillingCycle("quarterly")}*/}
                    {/*        className={`relative z-10 w-[140px] py-2.5 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${*/}
                    {/*            billingCycle === "quarterly" ? "text-foreground" : "text-muted-foreground hover:text-foreground"*/}
                    {/*        }`}*/}
                    {/*    >*/}
                    {/*        Quarterly*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>

                {/* 2. PRICING CARDS */}
                <div className="grid lg:grid-cols-3 gap-8 mb-24">

                    {/* TIER 1: STARTER */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border rounded-3xl p-8 flex flex-col hover:border-primary/30 transition-colors duration-300"
                    >
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-foreground mb-2">MVP / Starter</h3>
                            <p className="text-sm text-muted-foreground mb-6">Best for early-stage startups needing quick design iterations.</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-foreground">${pricing[billingCycle].starter}</span>
                                <span className="text-muted-foreground">/mo</span>
                            </div>
                        </div>
                        <Link href="/contact" className="w-full py-3 rounded-xl border border-border font-bold text-foreground hover:bg-secondary transition-colors text-center mb-8">
                            Get Started
                        </Link>
                        <ul className="space-y-4 flex-1">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Check size={16} className="text-primary" /> {feature.name}
                                    </span>
                                    <span className="font-medium text-foreground text-right">
                                        {typeof feature.starter === "boolean" ? (
                                            feature.starter ? <Check size={16} className="text-primary" /> : <X size={16} className="text-muted-foreground/30" />
                                        ) : feature.starter}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* TIER 2: GROWTH (HIGHLIGHTED) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border-2 border-primary rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-primary/10 scale-105 z-10"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                            Most Popular
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">Growth Partner <Zap size={16} className="fill-current" /></h3>
                            <p className="text-sm text-muted-foreground mb-6">Full design & development power for scaling teams.</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-foreground">${pricing[billingCycle].growth}</span>
                                <span className="text-muted-foreground">/mo</span>
                            </div>
                        </div>
                        <Link href="/contact" className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors text-center mb-8 shadow-lg shadow-primary/25">
                            Start Scaling Now
                        </Link>
                        <ul className="space-y-4 flex-1">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start justify-between text-sm border-b border-border/50 last:border-0 pb-3 last:pb-0">
                                    <span className="text-foreground font-medium flex items-center gap-2">
                                        <Check size={16} className="text-primary" /> {feature.name}
                                    </span>
                                    <span className="font-bold text-foreground text-right">
                                        {typeof feature.growth === "boolean" ? (
                                            feature.growth ? <Check size={16} className="text-primary" /> : <X size={16} className="text-muted-foreground/30" />
                                        ) : feature.growth}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* TIER 3: ENTERPRISE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border border-border rounded-3xl p-8 flex flex-col hover:border-primary/30 transition-colors duration-300"
                    >
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-foreground mb-2">Enterprise</h3>
                            <p className="text-sm text-muted-foreground mb-6">For large organizations needing dedicated resources & SLA.</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-foreground">Custom</span>
                            </div>
                        </div>
                        <Link href="/contact" className="w-full py-3 rounded-xl border border-border font-bold text-foreground hover:bg-secondary transition-colors text-center mb-8">
                            Book a Call
                        </Link>
                        <ul className="space-y-4 flex-1">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Check size={16} className="text-primary" /> {feature.name}
                                    </span>
                                    <span className="font-medium text-foreground text-right">
                                        {typeof feature.enterprise === "boolean" ? (
                                            feature.enterprise ? <Check size={16} className="text-primary" /> : <X size={16} className="text-muted-foreground/30" />
                                        ) : feature.enterprise}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* 3. ADD-ONS */}
                <div className="max-w-4xl mx-auto mb-24">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">Power-Up Add-ons</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-secondary/20 border border-border p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4"><Zap size={20} /></div>
                            <h4 className="font-bold text-foreground mb-1">SEO Optimization</h4>
                            <p className="text-xs text-muted-foreground mb-3">Technical SEO & Meta optimization</p>
                            <span className="font-bold text-primary">+$500 <span className="text-muted-foreground text-xs font-normal">/project</span></span>
                        </div>
                        <div className="bg-secondary/20 border border-border p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4"><Star size={20} /></div>
                            <h4 className="font-bold text-foreground mb-1">Copywriting</h4>
                            <p className="text-xs text-muted-foreground mb-3">Conversion-focused landing page copy</p>
                            <span className="font-bold text-primary">+$0.15 <span className="text-muted-foreground text-xs font-normal">/word</span></span>
                        </div>
                        <div className="bg-secondary/20 border border-border p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4"><ShieldCheck size={20} /></div>
                            <h4 className="font-bold text-foreground mb-1">Priority SLA</h4>
                            <p className="text-xs text-muted-foreground mb-3">Guaranteed 4h response time</p>
                            <span className="font-bold text-primary">+$999 <span className="text-muted-foreground text-xs font-normal">/mo</span></span>
                        </div>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">Common Questions</h3>
                    <div className="space-y-4">
                        {[
                            { q: "What happens if I don't like the design?", a: "We offer unlimited revisions on the Growth and Enterprise plans. We'll keep iterating until you're 100% satisfied with the result." },
                            { q: "Do I own the code and designs?", a: "Yes! Once the project is paid for, you have 100% ownership of all source files, code, and assets. We reserve no rights." },
                            { q: "How fast is the turnaround time?", a: "For design requests, you'll typically see updates every 24-48 hours. Development sprints depend on complexity but usually ship weekly." },
                            { q: "Can I pause my subscription?", a: "Absolutely. If you have no active requests, you can pause your subscription and resume it when you have more work for us." }
                        ].map((item, i) => (
                            <div key={i} className="border border-border rounded-xl p-6 bg-card hover:bg-secondary/20 transition-colors">
                                <h4 className="font-bold text-foreground text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle size={20} className="text-primary mt-1 shrink-0" />
                                    {item.q}
                                </h4>
                                <p className="text-muted-foreground leading-relaxed pl-8">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}