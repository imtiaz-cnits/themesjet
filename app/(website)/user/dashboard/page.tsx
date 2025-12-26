"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, User, Settings, LogOut, ShoppingBag, FileText, Heart, Clock, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- MOCK DATA ---
const purchases = [
    {
        id: 1,
        name: "DashLite React Admin",
        date: "Oct 24, 2024",
        price: "$24.00",
        license: "Regular License",
        image: "/images/product-1.jpg",
        version: "v2.4.0"
    },
    {
        id: 2,
        name: "SaaS Landing Kit",
        date: "Sep 12, 2024",
        price: "$19.00",
        license: "Regular License",
        image: "/images/product-2.jpg",
        version: "v1.1.0"
    }
];

const stats = [
    { label: "Total Spent", value: "$43.00", icon: CreditCard },
    { label: "Products Owned", value: "2", icon: ShoppingBag },
    { label: "Support Tickets", value: "0", icon: FileText },
];

export default function UserDashboard() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("overview");
    const [isSigningOut, setIsSigningOut] = useState(false);

    // Enhanced Sign Out Handler
    const handleSignOut = async () => {
        setIsSigningOut(true);

        // 1. Clear any application specific local storage if needed (Optional)
        // localStorage.removeItem("cart");

        // 2. Trigger NextAuth SignOut
        // This clears the session cookie and redirects to home
        await signOut({ callbackUrl: "/" });
    };

    // Sidebar Menu Items
    const menuItems = [
        { id: "overview", label: "Overview", icon: User },
        { id: "downloads", label: "My Downloads", icon: Download },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">

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
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">My Account</h1>
                            <p className="text-muted-foreground">
                                Welcome back, <span className="font-bold text-foreground">{session?.user?.name || "User"}</span>. Manage your downloads and profile.
                            </p>
                        </div>

                        {/* FUNCTIONAL SIGN OUT BUTTON */}
                        <button
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-bold text-red-500 hover:bg-red-500/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSigningOut ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" /> Signing Out...
                                </>
                            ) : (
                                <>
                                    <LogOut size={16} /> Sign Out
                                </>
                            )}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* --- LEFT SIDEBAR --- */}
                        <div className="lg:col-span-1">
                            <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-4 sticky top-32">
                                <div className="flex flex-col gap-1">
                                    {menuItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                                                ${activeTab === item.id
                                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                            }
                                            `}
                                        >
                                            <item.icon size={18} />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-border px-4">
                                    <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-4 text-center">
                                        <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Heart size={20} fill="currentColor" />
                                        </div>
                                        <p className="text-xs font-bold text-foreground mb-1">Become an Author</p>
                                        <p className="text-[10px] text-muted-foreground mb-3">Start selling your own templates.</p>
                                        <Link href="/admin/upload" className="block w-full py-2 bg-background border border-border rounded-lg text-xs font-bold hover:border-primary transition-colors">
                                            Apply Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT CONTENT AREA --- */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">

                                {/* VIEW: OVERVIEW */}
                                {activeTab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-8"
                                    >
                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {stats.map((stat, i) => (
                                                <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-foreground">
                                                        <stat.icon size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                                                        <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Recent Activity */}
                                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                                            <div className="p-6 border-b border-border flex justify-between items-center">
                                                <h3 className="font-heading font-bold text-lg text-foreground">Recent Activity</h3>
                                                <button
                                                    onClick={() => setActiveTab("downloads")}
                                                    className="text-xs font-bold text-primary hover:underline"
                                                >
                                                    View All
                                                </button>
                                            </div>
                                            <div className="divide-y divide-border">
                                                {purchases.map((item) => (
                                                    <div key={item.id} className="p-6 flex items-center gap-4 group hover:bg-secondary/30 transition-colors">
                                                        <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0 border border-border overflow-hidden">
                                                            {/* Placeholder Image */}
                                                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                                <span>{item.license}</span>
                                                                <span>•</span>
                                                                <span>Purchased on {item.date}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="font-bold text-foreground block">{item.price}</span>
                                                            <button className="text-xs font-bold text-primary flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Download size={12} /> Download
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* VIEW: DOWNLOADS */}
                                {activeTab === "downloads" && (
                                    <motion.div
                                        key="downloads"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-xl font-heading font-bold text-foreground">My Downloads</h2>
                                        <div className="grid grid-cols-1 gap-4">
                                            {purchases.map((item) => (
                                                <div key={item.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 shadow-sm hover:border-primary/30 transition-all">
                                                    <div className="w-full md:w-32 aspect-video rounded-xl bg-muted border border-border overflow-hidden flex-shrink-0">
                                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                                                                <p className="text-xs text-muted-foreground font-medium mt-1">
                                                                    License: <span className="text-foreground">{item.license}</span>
                                                                </p>
                                                            </div>
                                                            <span className="bg-secondary px-2 py-1 rounded text-[10px] font-bold text-muted-foreground border border-border">
                                                                {item.version}
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-wrap gap-3 mt-4">
                                                            <button className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                                                                <Download size={14} /> Download Files
                                                            </button>
                                                            <button className="px-4 py-2 bg-background border border-border text-foreground text-xs font-bold rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
                                                                <FileText size={14} /> License Certificate
                                                            </button>
                                                            <button className="px-4 py-2 bg-background border border-border text-foreground text-xs font-bold rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
                                                                <Clock size={14} /> Changelog
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* VIEW: SETTINGS */}
                                {activeTab === "settings" && (
                                    <motion.div
                                        key="settings"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-card border border-border rounded-2xl p-8 shadow-sm"
                                    >
                                        <h2 className="text-xl font-heading font-bold text-foreground mb-6">Account Settings</h2>

                                        <form className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">First Name</label>
                                                    <input type="text" defaultValue="Alex" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Last Name</label>
                                                    <input type="text" defaultValue="Morgan" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Email Address</label>
                                                <input type="email" defaultValue="alex@example.com" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                            </div>

                                            <div className="pt-6 border-t border-border">
                                                <h3 className="text-sm font-bold text-foreground mb-4">Password Change</h3>
                                                <div className="space-y-4">
                                                    <input type="password" placeholder="Current Password" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <input type="password" placeholder="New Password" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                                        <input type="password" placeholder="Confirm Password" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-4">
                                                <button type="submit" className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}