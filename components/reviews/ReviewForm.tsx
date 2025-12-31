"use client";

import { useState } from "react";
import { createReview } from "@/actions/review";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import StarRating from "./StarRating";
import LoginModal from "@/components/auth/LoginModal"; // Import the modal

export default function ReviewForm({ productId }: { productId: string }) {
    const { data: session } = useSession();

    // State to control modal
    const [showLogin, setShowLogin] = useState(false);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    // --- AUTH CHECKER ---
    // Returns true if logged in, otherwise opens modal and returns false
    const checkAuth = () => {
        if (!session) {
            setShowLogin(true); // Open Modal instead of Redirecting
            return false;
        }
        return true;
    };

    const handleRatingClick = (selectedRating: number) => {
        if (checkAuth()) {
            setRating(selectedRating);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!checkAuth()) return; // Stop if not logged in

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
        <>
            {/* THE LOGIN MODAL */}
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">

                {/* Optional: Transparent overlay to catch clicks on the form background if not logged in */}
                {!session && (
                    <div
                        className="absolute inset-0 z-10 bg-transparent cursor-pointer"
                        onClick={checkAuth}
                        title="Click to sign in and review"
                    />
                )}

                <h3 className="font-bold text-lg mb-6">Write a Review</h3>

                <div className="mb-6 relative">
                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-3">Your Rating</label>
                    <StarRating rating={rating} setRating={handleRatingClick} size={24} />
                </div>

                <div className="mb-6 relative">
                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-3">Your Experience</label>
                    <textarea
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        // Intercept focus
                        onFocus={checkAuth}
                        placeholder="Tell us what you liked (or didn't like) about this product..."
                        className="w-full bg-background border border-border rounded-lg p-4 min-h-[120px] outline-none focus:border-primary transition-colors text-sm leading-relaxed"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        // Intercept button click
                        onClick={(e) => {
                            if (!session) {
                                e.preventDefault();
                                checkAuth();
                            }
                        }}
                        className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50 transition-all text-sm"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        Submit Review
                    </button>
                </div>
            </form>
        </>
    );
}