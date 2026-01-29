"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";

export default function CartPage() {
    const { items, removeFromCart, cartTotal } = useCart();
    const { status } = useSession(); // Check auth status
    const router = useRouter();

    // Login Modal State
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Calculations
    const tax = cartTotal * 0.05;
    const total = cartTotal + tax;

    // Handle Checkout Click
    const handleProceedToCheckout = (e: React.MouseEvent) => {
        e.preventDefault();

        if (status === "authenticated") {
            // User is logged in -> Go to checkout
            router.push("/checkout");
        } else {
            // User NOT logged in -> Open Modal
            setIsLoginModalOpen(true);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">

            {/* --- LOGIN MODAL --- */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />

            {/* --- GLOBAL BACKGROUND GRADIENTS --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
            </div>

            <TopBar />
            <Navbar />

            {/* Content Wrapper */}
            <div className="flex-grow pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 text-center md:text-lefts">Shopping Cart</h1>
                            <p className="text-muted-foreground text-center md:text-left">
                                You have <span className="font-bold text-primary">{items.length} items</span> in your cart.
                            </p>
                        </div>
                        <Link href="/products" className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                            <ChevronLeft size={16} /> Continue Shopping
                        </Link>
                    </div>

                    {items.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">

                            {/* LEFT: Cart Items List */}
                            <div className="flex-1 space-y-6">
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
                                            className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:border-primary/30 transition-colors"
                                        >
                                            {/* Product Image */}
                                            <div className="w-full sm:w-32 aspect-video sm:aspect-square rounded-xl bg-muted relative overflow-hidden border border-border shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 text-center sm:text-left w-full">
                                                <Link href={`/products/${item.id}`} className="font-heading font-bold text-foreground text-lg mb-1 hover:text-primary transition-colors block">
                                                    {item.name}
                                                </Link>
                                                <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground mb-4">
                                                    <span className="bg-secondary px-2.5 py-1 rounded-md text-xs font-bold border border-border">
                                                        {item.category || "Standard"} License
                                                    </span>
                                                    <span>Instant Download</span>
                                                </div>
                                                {/* FIX: Added mx-auto for mobile and sm:mx-0 for desktop to align properly */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-xs font-bold cursor-pointer text-muted-foreground hover:text-red-500 flex items-center justify-center sm:justify-start gap-1 transition-colors mx-auto sm:mx-0"
                                                >
                                                    <Trash2 size={14} /> Remove Item
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-foreground block">${item.price.toFixed(2)}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* RIGHT: Order Summary (Sticky) */}
                            <div className="w-full lg:w-[380px] shrink-0">
                                <div className="sticky top-32 bg-card border border-border rounded-2xl p-6 shadow-xl">
                                    <h3 className="font-heading font-bold text-lg text-foreground mb-6">Cart Summary</h3>

                                    <div className="space-y-3 pb-6 border-b border-border mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-bold text-foreground">${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tax (5%)</span>
                                            <span className="font-bold text-foreground">${tax.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mb-8">
                                        <span className="text-lg font-bold text-foreground">Total</span>
                                        <div className="text-right">
                                            <span className="text-xs text-muted-foreground block mb-1">USD</span>
                                            <span className="text-3xl font-extrabold text-primary tracking-tight">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* UPDATED CHECKOUT BUTTON */}
                                    <button
                                        onClick={handleProceedToCheckout}
                                        className="group w-full py-4 bg-primary cursor-pointer text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mb-4"
                                    >
                                        Proceed to Checkout <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                                        <ShieldCheck size={14} className="text-green-500" /> Secure 256-bit SSL Payment
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : (
                        // --- EMPTY STATE ---
                        <div className="text-center py-24 bg-card/30 border border-border rounded-3xl backdrop-blur-sm">
                            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground shadow-inner">
                                <ShoppingBag size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
                            <p className="text-muted-foreground mb-8">Looks like you haven't found the right tool yet.</p>
                            <Link href="/products" className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all inline-flex items-center gap-2 shadow-lg shadow-primary/20">
                                Browse Products <ArrowRight size={16} />
                            </Link>
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </main>
    );
}