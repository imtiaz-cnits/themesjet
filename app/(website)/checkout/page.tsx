"use client";

import { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { Lock, CreditCard, Wallet, Bitcoin, Check, ShieldCheck, User, Mail, Calendar, CreditCard as CardIcon, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { createCheckoutSession } from "@/actions/checkout"; // Import Server Action
import { toast } from "sonner";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CheckoutPage() {
    const { items, cartTotal } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [paymentMethod, setPaymentMethod] = useState("card");

    // Tax calculation (Example: 5%)
    const tax = cartTotal * 0.05;
    const totalAmount = cartTotal + tax;

    // Redirect if not logged in
    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("Please login to continue checkout");
            router.push("/login?callbackUrl=/checkout");
        }
    }, [status, router]);

    // Handle Payment (Stripe)
    const handleCheckout = () => {
        if (items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        startTransition(async () => {
            try {
                // Call Server Action
                const result = await createCheckoutSession(items);

                if (result?.error) {
                    toast.error(result.error);
                } else if (result?.url) {
                    // Redirect to Stripe Hosted Page
                    window.location.href = result.url;
                }
            } catch (error) {
                toast.error("An unexpected error occurred.");
            }
        });
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="animate-spin text-primary w-8 h-8" />
            </div>
        );
    }

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
                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* === LEFT COLUMN: FORMS === */}
                        <div className="flex-1 space-y-8">

                            {/* 1. Account Information */}
                            <section>
                                <div className="flex justify-between items-end mb-6">
                                    <h2 className="text-xl font-heading font-bold text-foreground">1. Account Information</h2>
                                    {/* Since user is logged in, we show their info as read-only */}
                                    <span className="text-xs font-bold bg-green-500/10 text-green-600 px-3 py-1 rounded-full border border-green-500/20">
                                        Logged In
                                    </span>
                                </div>

                                <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5 opacity-75 cursor-not-allowed">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                disabled
                                                defaultValue={session?.user?.email || ""}
                                                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground font-bold cursor-not-allowed"
                                            />
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                disabled
                                                defaultValue={session?.user?.name || ""}
                                                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground font-bold cursor-not-allowed"
                                            />
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Payment Method */}
                            <section>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-heading font-bold text-foreground">2. Payment Method</h2>
                                    <div className="flex items-center gap-1.5 text-green-600 bg-green-500/10 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                                        <Lock size={12} /> Secure Checkout
                                    </div>
                                </div>

                                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">

                                    {/* Tabs (Visual Only - Stripe handles method) */}
                                    <div className="flex gap-4 border-b border-border pb-6 mb-6">
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold border transition-all ${paymentMethod === "card" ? "bg-primary/5 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:border-primary/50"}`}
                                        >
                                            <CreditCard size={18} /> Card
                                        </button>
                                        <button disabled className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold border bg-muted text-muted-foreground cursor-not-allowed opacity-50">
                                            <Wallet size={18} /> PayPal (Soon)
                                        </button>
                                    </div>

                                    {/* Card Form Placeholder (Redirect Notice) */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-5 text-center py-8 bg-background/50 rounded-xl border border-dashed border-border"
                                    >
                                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                            <ShieldCheck size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground">Redirecting to Stripe</h3>
                                        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                            For your security, you will be redirected to Stripe's secure payment gateway to complete your purchase. We do not store your card details.
                                        </p>
                                    </motion.div>

                                </div>
                            </section>

                        </div>

                        {/* === RIGHT COLUMN: ORDER SUMMARY (STICKY) === */}
                        <div className="w-full lg:w-[400px] flex-shrink-0">
                            <div className="sticky top-32 bg-card border border-border rounded-2xl p-6 shadow-xl">

                                <h3 className="font-heading font-bold text-lg text-foreground mb-6">Order Summary</h3>

                                {/* Product List */}
                                <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-[300px] overflow-y-auto">
                                    {items.length > 0 ? items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 relative overflow-hidden border border-border">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground text-sm leading-snug line-clamp-1">{item.name}</h4>
                                                <p className="text-xs text-muted-foreground mt-1">{item.category || "Standard License"}</p>
                                                <p className="text-sm font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty.</p>
                                    )}
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
                                        <span className="font-bold text-foreground">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Handling / Tax (5%)</span>
                                        <span className="font-bold text-foreground">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg font-bold text-foreground">Total</span>
                                    <div className="text-right">
                                        <span className="text-xs text-muted-foreground block mb-1">USD</span>
                                        <span className="text-3xl font-extrabold text-primary tracking-tight">${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <button
                                    onClick={handleCheckout}
                                    disabled={isPending || items.length === 0}
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? <Loader2 className="animate-spin" /> : <Lock size={18} />}
                                    {isPending ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
                                </button>

                                {/* Security Badge */}
                                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                    <ShieldCheck size={14} className="text-green-500" /> Secure SSL Checkout
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