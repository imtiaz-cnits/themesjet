"use client";

import { motion } from "framer-motion";
import { MessageCircle, Star, Trash2, Reply } from "lucide-react";

const comments = [
    { id: 1, user: "Alex Morgan", product: "DashLite React", text: "Is this compatible with Next.js 15 app router?", date: "2 hours ago", rating: 5 },
    { id: 2, user: "Sarah Jenkins", product: "SaaS Landing Kit", text: "Great design, but I found a small bug in the mobile menu.", date: "5 hours ago", rating: 4 },
    { id: 3, user: "Michael Chen", product: "Crypto Wallet UI", text: "Can I get a refund? It's not what I expected.", date: "1 day ago", rating: 2 },
    { id: 4, user: "David Kim", product: "DashLite React", text: "Absolutely stunning work. The code quality is top notch!", date: "2 days ago", rating: 5 },
];

export default function AdminCommentsPage() {
    return (
        <div className="space-y-8">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Comments</h1>
                    <p className="text-muted-foreground">Interact with your customers.</p>
                </div>
            </div>

            <div className="grid gap-4">
                {comments.map((comment, i) => (
                    <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-all group"
                    >
                        <div className="flex gap-4">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {comment.user.charAt(0)}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm">{comment.user}</h4>
                                        <span className="text-xs text-muted-foreground">on <span className="text-primary font-medium">{comment.product}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} size={12} fill={j < comment.rating ? "currentColor" : "none"} className={j >= comment.rating ? "text-muted" : ""} />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    {comment.text}
                                </p>

                                <div className="flex items-center gap-4">
                                    <button className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline">
                                        <Reply size={14} /> Reply
                                    </button>
                                    <button className="text-xs font-bold text-muted-foreground hover:text-red-500 flex items-center gap-1.5 transition-colors">
                                        <Trash2 size={14} /> Delete
                                    </button>
                                    <span className="text-xs text-muted-foreground/50 ml-auto">{comment.date}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}