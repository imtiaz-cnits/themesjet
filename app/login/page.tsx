"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ArrowRight, ArrowLeft, Lock } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex bg-background text-foreground font-body transition-colors duration-300">

            {/* --- LEFT SIDE: FORM AREA --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10 p-6 lg:p-12 xl:p-24 overflow-y-auto">

                {/* Back Button */}
                <div className="absolute top-8 left-6 lg:left-12">
                    <Link href="/" className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold">Back to Home</span>
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto mt-16 lg:mt-0">

                    <div className="mb-10">
                        <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to manage your downloads and settings.</p>
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button className="flex items-center justify-center gap-2 py-2.5 bg-card border border-border rounded-lg hover:bg-secondary transition-all text-sm font-bold text-foreground">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 bg-card border border-border rounded-lg hover:bg-secondary transition-all text-sm font-bold text-foreground">
                            <Github className="w-5 h-5" />
                            GitHub
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                        <div className="relative flex justify-center"><span className="px-4 bg-background text-xs text-muted-foreground uppercase font-bold tracking-wider">Or sign in with email</span></div>
                    </div>

                    <form className="space-y-5">
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

                        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
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