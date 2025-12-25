"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Check, ArrowRight, ArrowLeft } from "lucide-react";

export default function SignupPage() {
    const [role, setRole] = useState<'buy' | 'sell'>('buy');
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to admin dashboard
        router.push("/admin");
    };

    return (
        <div className="min-h-screen flex bg-background text-foreground font-body transition-colors duration-300">

            {/* --- LEFT SIDE: FORM AREA --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10 p-6 lg:p-10 xl:px-24 xl:py-10 overflow-y-auto">

                <div className="max-w-md w-full mx-auto mt-16 lg:mt-0">

                    <Link href="/public" className="flex items-center gap-2 group pb-5 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold">Back to Home</span>
                    </Link>

                    <div className="mb-10">
                        <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">Let's Join the Pack</h1>
                        <p className="text-muted-foreground">Access premium resources from top developers.</p>
                    </div>

                    {/* Signup Form */}
                    <form className="space-y-5" onSubmit={handleSignup}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">First Name</label>
                                <input type="text" className="w-full bg-input/10 border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Last Name</label>
                                <input type="text" className="w-full bg-input/10 border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Email Address</label>
                            <input type="email" className="w-full bg-input/10 border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Password</label>
                            <input type="password" className="w-full bg-input/10 border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            {/* Strength Meter */}
                            <div className="flex gap-1 mt-2 h-1">
                                <div className="w-1/4 bg-red-500 rounded-full"></div>
                                <div className="w-1/4 bg-yellow-500/50 rounded-full"></div>
                                <div className="w-1/4 bg-green-500/30 rounded-full"></div>
                                <div className="w-1/4 bg-green-500/30 rounded-full"></div>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1 text-right">Password strength: Weak</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input id="terms" type="checkbox" className="w-4 h-4 rounded border-input bg-input/10 text-primary focus:ring-primary" />
                            </div>
                            <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                                I agree to the <Link href="#" className="text-foreground hover:text-primary font-bold transition-colors">Terms of Service</Link> and <Link href="#" className="text-foreground hover:text-primary font-bold transition-colors">Privacy Policy</Link>.
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                            Create Account
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE: VISUAL ART (Hidden on Mobile) --- */}
            <div className="hidden lg:block w-1/2 bg-secondary relative overflow-hidden">
                {/* Dynamic Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-primary/20 z-0"></div>

                {/* Abstract Shapes & Animations */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative w-[500px] h-[500px]">

                        {/* Glowing Orb */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-[150px]"
                        />

                        {/* 3D Floating Card 1 */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [-12, -10, -12] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-10 w-64 h-80 bg-background/40 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col p-6 shadow-2xl"
                        >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-500 mb-4 shadow-lg"></div>
                            <div className="h-4 w-32 bg-white/20 rounded mb-2"></div>
                            <div className="h-3 w-20 bg-white/10 rounded"></div>
                            <div className="mt-auto flex gap-2">
                                <div className="h-8 w-8 rounded-full bg-white/10"></div>
                                <div className="h-8 w-full bg-white/5 rounded-full"></div>
                            </div>
                        </motion.div>

                        {/* 3D Floating Card 2 */}
                        <motion.div
                            animate={{ y: [0, 20, 0], rotate: [12, 14, 12] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 right-10 w-64 h-64 bg-background/40 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl"
                        >
                            <div className="text-center">
                                <div className="text-5xl font-heading font-bold text-white mb-2 drop-shadow-lg">500+</div>
                                <div className="text-sm text-gray-200 uppercase tracking-widest font-bold">Premium Assets</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
}