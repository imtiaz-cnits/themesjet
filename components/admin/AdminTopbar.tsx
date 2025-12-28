"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, ExternalLink, LogOut, User, Settings, ShoppingBag, UserPlus, ArrowRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { getDashboardNotifications } from "@/actions/admin";
import { formatDistanceToNow } from "date-fns";

export default function AdminTopbar() {
    const { data: session } = useSession();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const profileRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    // 1. Fetch & Sync with LocalStorage
    useEffect(() => {
        const fetchNotifs = async () => {
            try {
                const serverData = await getDashboardNotifications(5);

                // Get read IDs from localStorage
                const storedReadIds = localStorage.getItem("admin_read_notifs");
                const readIds = storedReadIds ? JSON.parse(storedReadIds) : [];

                // Compare and Merge
                const mergedData = serverData.map((n: any) => ({
                    ...n,
                    read: readIds.includes(n.id) // True if ID exists in local storage
                }));

                setNotifications(mergedData);
            } catch (error) {
                console.error("Failed to fetch notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifs();
        // Poll less frequently to avoid flicker
        const interval = setInterval(fetchNotifs, 120000);
        return () => clearInterval(interval);
    }, []);

    // Close on Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 2. Mark All Read
    const handleMarkRead = () => {
        // Update Local State immediately
        const updatedNotifs = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updatedNotifs);

        // Update Local Storage
        // We get ALL current notification IDs and add them to the 'read' list
        const currentIds = updatedNotifs.map(n => n.id);
        const storedReadIds = localStorage.getItem("admin_read_notifs");
        const existingIds = storedReadIds ? JSON.parse(storedReadIds) : [];

        // Use Set to ensure uniqueness
        const newReadList = Array.from(new Set([...existingIds, ...currentIds]));
        localStorage.setItem("admin_read_notifs", JSON.stringify(newReadList));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="h-20 bg-card/50 backdrop-blur-xl border-b border-border sticky top-0 z-30 px-6 flex items-center justify-between">

            <div className="flex items-center gap-4">
                <h2 className="text-xl font-heading font-bold text-foreground hidden md:block">Dashboard</h2>
            </div>

            <div className="flex items-center gap-6">

                <Link
                    href="/"
                    target="_blank"
                    className="hidden sm:flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors bg-secondary/50 px-4 py-2 rounded-lg border border-transparent hover:border-primary/20"
                >
                    <ExternalLink size={16} />
                    <span>View Website</span>
                </Link>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative p-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary focus:outline-none"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && !loading && (
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card animate-pulse"></span>
                        )}
                    </button>

                    <AnimatePresence>
                        {isNotifOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50 origin-top-right flex flex-col"
                            >
                                <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                                    <h3 className="font-bold text-sm">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <button onClick={handleMarkRead} className="text-xs text-primary cursor-pointer font-bold hover:underline">Mark all read</button>
                                    )}
                                </div>

                                <div className="max-h-[350px] overflow-y-auto">
                                    {loading ? (
                                        <div className="p-6 text-center text-xs text-muted-foreground">Loading...</div>
                                    ) : notifications.length === 0 ? (
                                        <div className="p-6 text-center text-xs text-muted-foreground">No recent activity.</div>
                                    ) : (
                                        notifications.map((notif) => (
                                            <div key={notif.id} className={`p-4 border-b border-border hover:bg-muted/50 transition-colors flex gap-3 ${!notif.read ? 'bg-primary/5' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                                    notif.type === 'order' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                    {notif.type === 'order' ? <ShoppingBag size={14} /> : <UserPlus size={14} />}
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-start mb-0.5">
                                                        <p className={`text-sm leading-none ${!notif.read ? 'font-bold text-foreground' : 'text-foreground/80'}`}>{notif.title}</p>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{notif.desc}</p>
                                                    <p className="text-[10px] text-muted-foreground/60 font-medium">
                                                        {formatDistanceToNow(new Date(notif.date), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* View All Button */}
                                <div className="p-3 border-t border-border bg-card">
                                    <Link
                                        href="/admin/notifications"
                                        onClick={() => setIsNotifOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold text-foreground hover:bg-secondary rounded-lg transition-colors"
                                    >
                                        View All Activity <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 cursor-pointer focus:outline-none"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-foreground leading-none">{session?.user?.name || "Admin"}</p>
                            <p className="text-xs text-muted-foreground mt-1">Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg overflow-hidden border-2 border-border shadow-sm">
                            {session?.user?.image ? (
                                <Image src={session.user.image} alt="Admin" width={40} height={40} className="object-cover w-full h-full" />
                            ) : (
                                <User size={20} />
                            )}
                        </div>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50 origin-top-right"
                            >
                                <div className="p-2 space-y-1">
                                    <Link
                                        href="/admin/settings"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                                    >
                                        <Settings size={16} /> Admin Settings
                                    </Link>
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="w-full flex items-center cursor-pointer gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </header>
    );
}