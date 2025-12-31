"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    setRating?: (rating: number) => void;
    readOnly?: boolean;
    size?: number;
}

export default function StarRating({ rating, setRating, readOnly = false, size = 18 }: StarRatingProps) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readOnly}
                    onClick={() => setRating && setRating(star)}
                    className={`transition-transform ${readOnly ? "cursor-default" : "hover:scale-110 cursor-pointer"}`}
                >
                    <Star
                        size={size}
                        className={`${
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted/20 text-muted-foreground/30"
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}