"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Github, ArrowRight, ArrowLeft, Lock } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to admin dashboard
        router.push("/admin");
    };

    return (
        <div className="min-h-screen flex bg-background text-foreground font-body transition-colors duration-300">

            {/* --- LEFT SIDE: FORM AREA --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10 p-6 lg:p-12 xl:p-24 overflow-y-auto">

                <div className="max-w-md w-full mx-auto mt-16 lg:mt-0">

                    <Link href="/" className="flex items-center gap-2 group pb-5 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold">Back to Home</span>
                    </Link>

                    <div className="mb-10">
                        <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to manage your downloads and settings.</p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Email Address</label>
                            <input type="email" className="w-full bg-input/10 border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50" placeholder="john@example.com" />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-muted-foreground uppercase">Password</label>
                                <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot Password?</Link>
                            </div>
                            <input type="password" className="w-full bg-input/10 border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" className="w-4 h-4 rounded border-input bg-input/10 text-primary focus:ring-primary" />
                            </div>
                            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                                Remember me for 30 days
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                            Sign In
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Join Now</Link>
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE: VISUAL ART (Hidden on Mobile) --- */}
            <div className="hidden lg:block w-1/2 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-background via-secondary to-primary/10 z-0"></div>

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative w-[500px] h-[500px]">

                        {/* Glowing Orb */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[180px]"
                        />

                        {/* Centered Illustration - Lock/Security */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-background/60 backdrop-blur-2xl border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                                <Lock size={80} className="text-primary relative z-10" />
                            </div>
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-20 right-10 bg-card border border-border px-5 py-3 rounded-xl shadow-xl flex items-center gap-3"
                        >
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold text-foreground">Secure Login</span>
                        </motion.div>

                    </div>
                </div>
            </div>

        </div>
    );
}