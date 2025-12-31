"use client";

import { useState } from "react";
import { createReview } from "@/actions/review";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation"; // Import routing hooks
import StarRating from "./StarRating";

export default function ReviewForm({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname(); // Get current path for callback

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    // --- AUTH INTERCEPTOR ---
    const handleAuthCheck = () => {
        if (!session) {
            // Encode the current URL to return here after login
            const callbackUrl = encodeURIComponent(pathname);
            // Redirect to login (triggers modal if using Intercepting Routes)
            router.push(`/login?callbackUrl=${callbackUrl}`);
            return false;
        }
        return true;
    };

    const handleRatingClick = (selectedRating: number) => {
        if (handleAuthCheck()) {
            setRating(selectedRating);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Double check auth on submit
        if (!handleAuthCheck()) return;

        if (rating === 0) return toast.error("Please select a star rating");

        setLoading(true);
        const res = await createReview({ productId, rating, comment });

        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success("Review submitted successfully!");
            setRating(0);
            setComment("");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">

            {/* Optional: Visual hint that login is required (Subtle overlay) */}
            {!session && (
                <div
                    className="absolute inset-0 z-10 bg-transparent cursor-pointer"
                    onClick={handleAuthCheck}
                    title="Please log in to write a review"
                />
            )}

            <h3 className="font-bold text-lg mb-6">Write a Review</h3>

            <div className="mb-6 relative">
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-3">Your Rating</label>
                {/* Pass handleRatingClick instead of direct setRating */}
                <StarRating rating={rating} setRating={handleRatingClick} size={24} />
            </div>

            <div className="mb-6 relative">
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-3">Your Experience</label>
                <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    // Intercept focus event
                    onFocus={handleAuthCheck}
                    placeholder="Tell us what you liked (or didn't like) about this product..."
                    className="w-full bg-background border border-border rounded-lg p-4 min-h-[120px] outline-none focus:border-primary transition-colors text-sm leading-relaxed"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    // Intercept click event
                    onClick={(e) => {
                        if (!session) {
                            e.preventDefault();
                            handleAuthCheck();
                        }
                    }}
                    className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50 transition-all text-sm"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    Submit Review
                </button>
            </div>
        </form>
    );
}