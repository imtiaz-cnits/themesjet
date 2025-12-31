"use client";

import { useState } from "react";
import { updateReview } from "@/actions/review";
import { toast } from "sonner";
import { Edit, X, Save, Loader2 } from "lucide-react";
import StarRating from "@/components/reviews/StarRating"; // Re-using your star component

interface EditReviewModalProps {
    review: {
        id: string;
        rating: number;
        comment: string;
        userName: string;
    };
}

export default function EditReviewModal({ review }: EditReviewModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(review.rating);
    const [comment, setComment] = useState(review.comment);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await updateReview({ id: review.id, rating, comment });

        if (res.success) {
            toast.success("Review updated successfully");
            setIsOpen(false);
        } else {
            toast.error(res.error);
        }
        setLoading(false);
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-blue-500 transition-colors"
                title="Edit Review"
            >
                <Edit size={18} />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">

                    {/* Modal Content */}
                    <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-heading font-bold mb-1">Edit Review</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Editing feedback from <span className="font-bold text-foreground">{review.userName}</span>
                        </p>

                        <form onSubmit={handleUpdate} className="space-y-4">

                            <div>
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Rating</label>
                                <StarRating rating={rating} setRating={setRating} size={24} />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Comment</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:border-primary outline-none transition-colors resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}