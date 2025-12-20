"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, CreditCard, Wallet, Bitcoin, Check, ShieldCheck, User, Mail, Calendar, CreditCard as CardIcon, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState("card");

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">

            {/* --- GLOBAL BACKGROUND GRADIENTS (Fixed) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-5" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-5" />
            </div>

            <TopBar />
            <Navbar />

            {/* Content Wrapper */}
            <div className="flex-grow pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Page Title (Hidden visually but good for accessibility/SEO, simplified layout) */}
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* === LEFT COLUMN: FORMS === */}
                        <div className="flex-1 space-y-8">

                            {/* 1. Account Information */}
                            <section>
                                <div className="flex justify-between items-end mb-6">
                                    <h2 className="text-xl font-heading font-bold text-foreground">1. Account Information</h2>
                                    <Link href="/login" className="text-sm font-bold text-primary hover:underline">
                                        Already have an account? Log in
                                    </Link>
                                </div>

                                <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                defaultValue="you@company.com"
                                                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">First Name</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                />
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Last Name</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                />
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Payment Method */}
                            <section>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-heading font-bold text-foreground">2. Payment Method</h2>
                                    <div className="flex items-center gap-1.5 text-green-600 bg-green-500/10 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                                        <Lock size={12} /> 256-Bit SSL Encrypted
                                    </div>
                                </div>

                                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">

                                    {/* Tabs */}
                                    <div className="flex gap-4 border-b border-border pb-6 mb-6">
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold border transition-all ${paymentMethod === "card" ? "bg-primary/5 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:border-primary/50"}`}
                                        >
                                            <CreditCard size={18} /> Card
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod("paypal")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold border transition-all ${paymentMethod === "paypal" ? "bg-primary/5 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:border-primary/50"}`}
                                        >
                                            <Wallet size={18} /> PayPal
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod("crypto")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold border transition-all ${paymentMethod === "crypto" ? "bg-primary/5 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:border-primary/50"}`}
                                        >
                                            <Bitcoin size={18} /> Crypto
                                        </button>
                                    </div>

                                    {/* Card Form */}
                                    {paymentMethod === "card" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Card Number</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="0000 0000 0000 0000"
                                                        className="w-full bg-background border border-border rounded-lg pl-10 pr-12 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                                                    />
                                                    <CardIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 opacity-50 grayscale">
                                                        <div className="w-6 h-4 bg-foreground/20 rounded"></div>
                                                        <div className="w-6 h-4 bg-foreground/20 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Expiry Date</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                                                        />
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-2">
                                                        <label className="block text-xs font-bold uppercase text-muted-foreground">CVC / CVV</label>
                                                        <Info size={14} className="text-muted-foreground cursor-pointer hover:text-primary" />
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="123"
                                                            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                                                        />
                                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Name on Card</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Alternate Payment States */}
                                    {paymentMethod === "paypal" && (
                                        <div className="text-center py-10">
                                            <p className="text-muted-foreground mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                                            <button className="bg-[#0070BA] text-white px-8 py-3 rounded-full font-bold hover:bg-[#005ea6] transition-colors">
                                                Proceed to PayPal
                                            </button>
                                        </div>
                                    )}
                                    {paymentMethod === "crypto" && (
                                        <div className="text-center py-10">
                                            <p className="text-muted-foreground mb-4">Pay with Bitcoin, Ethereum, or USDT securely.</p>
                                            <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
                                                Pay with Crypto
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </section>

                        </div>

                        {/* === RIGHT COLUMN: ORDER SUMMARY (STICKY) === */}
                        <div className="w-full lg:w-[400px] flex-shrink-0">
                            <div className="sticky top-28 bg-card border border-border rounded-2xl p-6 shadow-xl">

                                <h3 className="font-heading font-bold text-lg text-foreground mb-6">Order Summary</h3>

                                {/* Product Item */}
                                <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                                    <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 relative overflow-hidden border border-border">
                                        {/* Use <Image /> in production */}
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/product-1.jpg')" }}></div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm leading-snug">DashLite React Admin</h4>
                                        <p className="text-xs text-muted-foreground mt-1">Extended License</p>
                                        <p className="text-sm font-bold text-primary mt-2">$24.00</p>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="flex gap-2 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Promo Code"
                                        className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground outline-none focus:border-primary transition-all"
                                    />
                                    <button className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-border transition-all">
                                        Apply
                                    </button>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-3 mb-6 pb-6 border-b border-border text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-bold text-foreground">$24.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Handling Fee</span>
                                        <span className="font-bold text-foreground">$2.40</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg font-bold text-foreground">Total</span>
                                    <div className="text-right">
                                        <span className="text-xs text-muted-foreground block mb-1">USD</span>
                                        <span className="text-3xl font-extrabold text-primary tracking-tight">$26.40</span>
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <button className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mb-4">
                                    Pay $26.40
                                </button>

                                {/* Footer Icons */}
                                <div className="flex justify-center gap-3 opacity-50 grayscale">
                                    <div className="w-10 h-6 bg-foreground/10 rounded"></div>
                                    <div className="w-10 h-6 bg-foreground/10 rounded"></div>
                                    <div className="w-10 h-6 bg-foreground/10 rounded"></div>
                                </div>

                                {/* Security Badge */}
                                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                    <ShieldCheck size={14} className="text-green-500" /> Secure Checkout
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