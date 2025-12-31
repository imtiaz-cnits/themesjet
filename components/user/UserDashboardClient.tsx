"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, User, Settings, LogOut, ShoppingBag, FileText, Heart, CreditCard, Loader2, Bell, ShieldCheck, Star, MessageSquare, X, Send } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { updateUserProfile } from "@/actions/user";
import { createReview } from "@/actions/review";

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
    reviews: any[];
}

export default function UserDashboardClient({ user, stats, purchases, reviews }: DashboardProps) {
    const { data: session, update } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialTab = searchParams.get("tab") || "overview";
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isSigningOut, setIsSigningOut] = useState(false);

    // Review Modal State
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewProduct, setReviewProduct] = useState<{ id: string, name: string, image: string } | null>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    // Settings State (Restored)
    const [firstName, setFirstName] = useState(user.name?.split(" ")[0] || "");
    const [lastName, setLastName] = useState(user.name?.split(" ").slice(1).join(" ") || "");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState(user.image || "");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab) setActiveTab(tab);
    }, [searchParams]);

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

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`/user/dashboard?tab=${tabId}`, { scroll: false });
    };

    const handleSignOut = async () => {
        setIsSigningOut(true);
        localStorage.removeItem("themesjet_cart");
        await signOut({ callbackUrl: "/" });
    };

    // Profile Update Handler (Restored)
    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const result = await updateUserProfile({ firstName, lastName, image: avatarUrl });
            if (result.error) {
                toast.error(result.error);
                return;
            }
            await update({ user: { name: `${firstName} ${lastName}`, image: avatarUrl } });
            toast.success("Profile updated!");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    // Open Modal
    const openReviewModal = (product: any) => {
        setReviewProduct({ id: product.id, name: product.name, image: product.image });
        setRating(0);
        setComment("");
        setIsReviewModalOpen(true);
    };

    // Submit Review
    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return toast.error("Please select a rating.");
        if (!reviewProduct) return;

        setIsSubmittingReview(true);
        const res = await createReview({
            productId: reviewProduct.id,
            rating,
            comment
        });

        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success("Review submitted!");
            setIsReviewModalOpen(false);
            router.refresh();
        }
        setIsSubmittingReview(false);
    };

    const menuItems = [
        { id: "overview", label: "Overview", icon: User },
        { id: "downloads", label: "My Downloads", icon: Download },
        { id: "reviews", label: "My Reviews", icon: MessageSquare },
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
                                            onClick={() => handleTabChange(item.id)}
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

                                {/* 1. OVERVIEW */}
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
                                                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-foreground"><MessageSquare size={24} /></div>
                                                <div><p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">My Reviews</p><p className="text-2xl font-heading font-bold text-foreground">{reviews.length}</p></div>
                                            </div>
                                        </div>

                                        {/* RECENT ACTIVITY */}
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

                                {/* 2. DOWNLOADS */}
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

                                                            {/* Review Button Logic */}
                                                            {item.hasReviewed ? (
                                                                <button disabled className="px-4 py-2 bg-green-500/10 text-green-600 border border-green-500/20 text-xs font-bold rounded-lg cursor-default flex items-center gap-2">
                                                                    <Star size={14} fill="currentColor" /> Reviewed
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => openReviewModal(item)} className="px-4 py-2 bg-background border border-border text-foreground text-xs font-bold rounded-lg hover:bg-secondary hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
                                                                    <Star size={14} /> Write Review
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {purchases.length === 0 && (
                                                <div className="p-12 text-center border border-dashed border-border rounded-2xl">
                                                    <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                                                    <h3 className="text-lg font-bold text-foreground">No downloads found</h3>
                                                    <Link href="/products" className="text-primary font-bold hover:underline text-sm">Browse Products</Link>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* 3. MY REVIEWS TAB */}
                                {activeTab === "reviews" && (
                                    <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                        <h2 className="text-xl font-heading font-bold text-foreground">My Reviews</h2>
                                        <div className="grid grid-cols-1 gap-4">
                                            {reviews.map((review) => (
                                                <div key={review.id} className="bg-card border border-border rounded-2xl p-6 flex gap-6 shadow-sm">
                                                    <div className="w-16 h-16 rounded-xl bg-muted border border-border overflow-hidden flex-shrink-0 relative">
                                                        <Image src={review.product.imageUrl} alt={review.product.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="font-bold text-foreground text-base">{review.product.name}</h3>
                                                            <span className="text-xs text-muted-foreground">{format(new Date(review.createdAt), "MMM dd, yyyy")}</span>
                                                        </div>
                                                        <div className="flex text-amber-500 my-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-muted/20" : ""} />
                                                            ))}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {reviews.length === 0 && (
                                                <div className="p-12 text-center border border-dashed border-border rounded-2xl">
                                                    <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                                                    <h3 className="text-lg font-bold text-foreground">No reviews yet</h3>
                                                    <p className="text-muted-foreground text-sm">Go to Downloads to review your purchases.</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* 4. SETTINGS (RESTORED COMPLETELY) */}
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
                                                        // @ts-ignore
                                                        const newUrl = res[0].ufsUrl || res[0].url;
                                                        setAvatarUrl(newUrl);
                                                        await updateUserProfile({ image: newUrl });
                                                        await update({ user: { name: `${firstName} ${lastName}`, image: newUrl } });
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

            {/* --- REVIEW MODAL (PORTAL) --- */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isReviewModalOpen && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsReviewModalOpen(false)} className="fixed inset-0 z-[9998] bg-background/80 backdrop-blur-sm" />
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 z-[9999] w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4">
                                <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl">
                                    <button onClick={() => setIsReviewModalOpen(false)} className="absolute right-4 top-4 p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"><X size={20} /></button>
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-muted rounded-xl mx-auto mb-4 relative overflow-hidden border border-border">
                                            {reviewProduct && <Image src={reviewProduct.image} alt={reviewProduct.name} fill className="object-cover" />}
                                        </div>
                                        <h2 className="text-xl font-heading font-bold text-foreground">Review {reviewProduct?.name}</h2>
                                        <p className="text-muted-foreground text-xs mt-1">Share your experience with this product.</p>
                                    </div>
                                    <form onSubmit={handleSubmitReview} className="space-y-4">
                                        <div className="flex justify-center gap-2 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button key={star} type="button" onClick={() => setRating(star)} className="hover:scale-110 transition-transform cursor-pointer">
                                                    <Star size={32} className={star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted/20 text-muted-foreground/30"} />
                                                </button>
                                            ))}
                                        </div>
                                        <textarea required value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your feedback..." className="w-full bg-background border border-border rounded-xl p-4 min-h-[100px] outline-none focus:border-primary transition-colors text-sm" />
                                        <button type="submit" disabled={isSubmittingReview} className="w-full cursor-pointer flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-xl text-sm hover:bg-primary/90 transition-all disabled:opacity-50">
                                            {isSubmittingReview ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} Submit Review
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </main>
    );
}