"use client";

import { signIn } from "next-auth/react";
import { X, Github, Mail, Lock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle Social Login
    const handleSocialLogin = (provider: string) => {
        setIsLoading(provider);
        signIn(provider, { callbackUrl: "/checkout" });
    };

    // Handle Email/Password Login
    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading("credentials");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false, // We handle redirect to check for errors first
                callbackUrl: "/checkout"
            });

            if (result?.error) {
                toast.error("Invalid email or password");
                setIsLoading(null);
            } else {
                // Success: Redirect manually
                window.location.href = "/checkout";
            }
        } catch (error) {
            toast.error("Something went wrong");
            setIsLoading(null);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-[70] w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
                    >
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="mb-4 flex justify-center">
                                    <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6">
                                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-heading font-bold text-foreground">Welcome Back</h2>
                                <p className="text-muted-foreground text-sm mt-2">
                                    Sign in to complete your purchase.
                                </p>
                            </div>

                            {/* Social Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleSocialLogin("google")}
                                    disabled={!!isLoading}
                                    className="relative w-full flex items-center justify-center gap-3 bg-background border border-border hover:bg-secondary/50 text-foreground font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isLoading === "google" ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            <div className="w-5 h-5 relative">
                                                <svg viewBox="0 0 24 24" className="w-full h-full">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                            </div>
                                            <span>Continue with Google</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => handleSocialLogin("github")}
                                    disabled={!!isLoading}
                                    className="w-full flex items-center justify-center gap-3 bg-[#24292F] text-white font-bold py-3.5 rounded-xl hover:bg-[#24292F]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading === "github" ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Github size={20} />
                                            <span>Continue with GitHub</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground font-bold">Or continue with</span>
                                </div>
                            </div>

                            {/* Credentials Login Form */}
                            <form onSubmit={handleCredentialsLogin} className="space-y-4">
                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            required
                                            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            required
                                            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!!isLoading}
                                    className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-all disabled:opacity-50"
                                >
                                    {isLoading === "credentials" ? <Loader2 size={18} className="animate-spin" /> : "Sign In with Email"}
                                </button>
                            </form>

                            <p className="text-center text-xs text-muted-foreground mt-6">
                                By clicking continue, you agree to our <a href="#" className="underline hover:text-foreground">Terms</a> and <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}