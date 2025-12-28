"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, User, Settings, LogOut, ShoppingBag, FileText, Heart, CreditCard, Loader2, Bell, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams
import { updateUserProfile } from "@/actions/user";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface DashboardProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    stats: {
        totalSpent: number;
        productsOwned: number;
    };
    purchases: any[];
}

export default function UserDashboardClient({ user, stats, purchases }: DashboardProps) {
    const { data: session, update } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams(); // Hook to get query params

    // Initialize activeTab based on URL query param 'tab'
    const initialTab = searchParams.get("tab") || "overview";
    const [activeTab, setActiveTab] = useState(initialTab);

    const [isSigningOut, setIsSigningOut] = useState(false);

    // Settings State
    const [firstName, setFirstName] = useState(user.name?.split(" ")[0] || "");
    const [lastName, setLastName] = useState(user.name?.split(" ").slice(1).join(" ") || "");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState(user.image || "");
    const [isSaving, setIsSaving] = useState(false);

    // Effect to update activeTab when URL changes (e.g. navigation via Navbar)
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && ["overview", "downloads", "settings"].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    // Sync state if session updates externally
    useEffect(() => {
        if (session?.user) {
            setAvatarUrl(session.user.image || "");
            const parts = session.user.name?.split(" ") || [];
            if (parts.length > 0) {
                setFirstName(parts[0]);
                setLastName(parts.slice(1).join(" "));
            }
        }
    }, [session]);

    // Helper to switch tabs and update URL
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`/user/dashboard?tab=${tabId}`, { scroll: false });
    };

    const handleSignOut = async () => {
        setIsSigningOut(true);
        localStorage.removeItem("themesjet_cart");
        await signOut({ callbackUrl: "/" });
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const result = await updateUserProfile({ firstName, lastName, image: avatarUrl });

            if (result.error) {
                toast.error(result.error);
                return;
            }

            await update({
                user: {
                    name: `${firstName} ${lastName}`,
                    image: avatarUrl
                }
            });

            toast.success("Profile updated successfully!");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const menuItems = [
        { id: "overview", label: "Overview", icon: User },
        { id: "downloads", label: "My Downloads", icon: Download },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
            </div>

            <TopBar />
            <Navbar />

            <div className="flex-grow pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">My Account</h1>
                            <p className="text-muted-foreground">
                                Welcome back, <span className="font-bold text-foreground">{session?.user?.name || "User"}</span>.
                            </p>
                        </div>
                        <button onClick={handleSignOut} disabled={isSigningOut} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-bold text-red-500 hover:bg-red-500/5 transition-colors cursor-pointer">
                            {isSigningOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                            {isSigningOut ? "Signing Out..." : "Sign Out"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-4 sticky top-32">
                                <div className="flex flex-col gap-1">
                                    {menuItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleTabChange(item.id)} // Updated to handle URL change
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 cursor-pointer" : "text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"}`}
                                        >
                                            <item.icon size={18} /> {item.label}
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
                                        <Link href="/admin/upload" className="block w-full py-2 bg-background border border-border rounded-lg text-xs font-bold hover:border-primary transition-colors">Apply Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">

                                {/* 1. OVERVIEW TAB */}
                                {activeTab === "overview" && (
                                    <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
                                                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-foreground"><CreditCard size={24} /></div>
                                                <div><p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Spent</p><p className="text-2xl font-heading font-bold text-foreground">${stats.totalSpent.toFixed(2)}</p></div>
                                            </div>
                                            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
                                                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-foreground"><ShoppingBag size={24} /></div>
                                                <div><p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Products Owned</p><p className="text-2xl font-heading font-bold text-foreground">{stats.productsOwned}</p></div>
                                            </div>
                                            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
                                                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-foreground"><FileText size={24} /></div>
                                                <div><p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Support Tickets</p><p className="text-2xl font-heading font-bold text-foreground">0</p></div>
                                            </div>
                                        </div>

                                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                                            <div className="p-6 border-b border-border flex justify-between items-center">
                                                <h3 className="font-heading font-bold text-lg text-foreground">Recent Activity</h3>
                                                <button onClick={() => handleTabChange("downloads")} className="text-xs font-bold text-primary hover:underline cursor-pointer">View All</button>
                                            </div>
                                            <div className="divide-y divide-border">
                                                {purchases.slice(0, 3).map((item) => (
                                                    <div key={item.id} className="p-6 flex items-center gap-4 group hover:bg-secondary/30 transition-colors">
                                                        <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0 border border-border overflow-hidden relative">
                                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                                <span>{item.category}</span>
                                                                <span>•</span>
                                                                <span>{format(new Date(item.date), "MMM dd, yyyy")}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="font-bold text-foreground block text-sm">${item.price.toFixed(2)}</span>
                                                            <Link href={item.fileUrl} target="_blank" className="text-xs font-bold text-primary flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                                                                <Download size={12} /> Download
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                                {purchases.length === 0 && <div className="p-8 text-center text-muted-foreground text-sm">No recent activity.</div>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 2. DOWNLOADS TAB */}
                                {activeTab === "downloads" && (
                                    <motion.div key="downloads" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                        <h2 className="text-xl font-heading font-bold text-foreground">My Downloads</h2>
                                        <div className="grid grid-cols-1 gap-4">
                                            {purchases.map((item) => (
                                                <div key={item.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 shadow-sm hover:border-primary/30 transition-all">
                                                    <div className="w-full md:w-32 aspect-video rounded-xl bg-muted border border-border overflow-hidden flex-shrink-0 relative">
                                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                                                                <p className="text-xs text-muted-foreground font-medium mt-1">Category: <span className="text-foreground">{item.category}</span></p>
                                                            </div>
                                                            <span className="bg-secondary px-2 py-1 rounded text-[10px] font-bold text-muted-foreground border border-border">{item.version}</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3 mt-4">
                                                            <Link href={item.fileUrl} target="_blank" className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                                                                <Download size={14} /> Download Files
                                                            </Link>
                                                            <button className="px-4 py-2 bg-background border border-border text-foreground text-xs font-bold rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
                                                                <ShieldCheck size={14} /> License Certificate
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {purchases.length === 0 && (
                                                <div className="p-12 text-center border border-dashed border-border rounded-2xl">
                                                    <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                                                    <h3 className="text-lg font-bold text-foreground">No downloads found</h3>
                                                    <p className="text-muted-foreground text-sm mb-4">You haven't purchased any items yet.</p>
                                                    <Link href="/products" className="text-primary font-bold hover:underline text-sm">Browse Products</Link>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* 3. SETTINGS TAB */}
                                {activeTab === "settings" && (
                                    <motion.div
                                        key="settings"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-card border border-border rounded-2xl p-8 shadow-sm"
                                    >
                                        <h2 className="text-xl font-heading font-bold text-foreground mb-8">Profile Settings</h2>

                                        {/* Avatar Upload */}
                                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                                            <div className="relative w-24 h-24 rounded-full border-2 border-border overflow-hidden bg-muted">
                                                {avatarUrl ? (
                                                    <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground"><User size={32} /></div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground mb-1">Profile Photo</h3>
                                                <p className="text-xs text-muted-foreground mb-3">Recommended 300x300px. JPG, PNG.</p>

                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={async (res) => {
                                                        // Fix: Handle both old and new UploadThing URL properties
                                                        // @ts-ignore
                                                        const newUrl = res[0].ufsUrl || res[0].url;

                                                        setAvatarUrl(newUrl);

                                                        // A. Update Database
                                                        await updateUserProfile({ image: newUrl });

                                                        // B. Update Session Trigger (Updates Navbar instantly)
                                                        await update({
                                                            user: {
                                                                name: `${firstName} ${lastName}`,
                                                                image: newUrl
                                                            }
                                                        });
                                                        toast.success("Avatar updated!");
                                                        router.refresh();
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error(`Error: ${error.message}`);
                                                    }}
                                                    appearance={{
                                                        button: "!bg-primary text-xs font-bold px-4 py-2 h-auto w-auto rounded-lg",
                                                        allowedContent: "hidden"
                                                    }}
                                                    content={{ button: "Upload New" }}
                                                />
                                            </div>
                                        </div>

                                        {/* Profile Form */}
                                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">First Name</label>
                                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Last Name</label>
                                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Email Address</label>
                                                <input type="email" defaultValue={user.email || ""} disabled className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-muted-foreground cursor-not-allowed" />
                                            </div>
                                            <div className="pt-6 border-t border-border">
                                                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Bell size={18} /></div>
                                                        <div><p className="font-bold text-sm text-foreground">Email Notifications</p><p className="text-xs text-muted-foreground">Receive updates about your purchases.</p></div>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-4">
                                                <button type="submit" disabled={isSaving} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer">
                                                    {isSaving && <Loader2 size={16} className="animate-spin" />} {isSaving ? "Saving..." : "Save Changes"}
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