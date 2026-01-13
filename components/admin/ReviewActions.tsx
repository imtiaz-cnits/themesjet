"use client";

import { useState } from "react";
import { deleteReview, toggleReviewFeature } from "@/actions/review";
import { Trash2, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteReviewButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure? This cannot be undone.")) return;
        setLoading(true);
        const res = await deleteReview(id);
        if (res.success) toast.success("Review deleted");
        else toast.error(res.error);
        setLoading(false);
    };

    return (
        <button onClick={handleDelete} disabled={loading} className="p-2 hover:bg-red-500/10 cursor-pointer text-muted-foreground hover:text-red-500 rounded-lg transition-colors">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
    );
}

export function ToggleFeatureButton({ id, isFeatured }: { id: string, isFeatured: boolean }) {
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        const res = await toggleReviewFeature(id, isFeatured);
        if (res.success) toast.success(isFeatured ? "Removed from Home" : "Featured on Home");
        else toast.error(res.error);
        setLoading(false);
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isFeatured
                    ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                    : "hover:bg-secondary text-muted-foreground hover:text-yellow-500"
            }`}
            title={isFeatured ? "Unfeature" : "Feature on Home"}
        >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Star size={18} fill={isFeatured ? "currentColor" : "none"} />}
        </button>
    );
}