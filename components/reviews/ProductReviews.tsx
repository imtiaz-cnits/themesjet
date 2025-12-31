import { getReviews } from "@/actions/review";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";

export default async function ProductReviews({ productId }: { productId: string }) {
    const reviews = await getReviews(productId);

    // Calculate Summary Stats
    const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";

    return (
        <section id="reviews" className="scroll-mt-32">

            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-border">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">Customer Reviews</h2>
                    <p className="text-muted-foreground mt-1">See what others are saying.</p>
                </div>

                <div className="flex items-center gap-4 bg-secondary/30 px-6 py-3 rounded-2xl border border-border">
                    <div className="text-3xl font-bold text-primary">{averageRating}</div>
                    <div className="flex flex-col">
                        <StarRating rating={Math.round(Number(averageRating))} readOnly />
                        <span className="text-xs text-muted-foreground mt-1 font-medium">{reviews.length} Ratings</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">

                {/* Left Column: Form */}
                <div className="lg:col-span-4">
                    <div className="sticky top-32">
                        <ReviewForm productId={productId} />
                    </div>
                </div>

                {/* Right Column: Review List */}
                <div className="lg:col-span-8 space-y-8">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="flex gap-4">
                                {/* Avatar */}
                                <div className="shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-secondary border border-border overflow-hidden relative">
                                        {review.user.image ? (
                                            <Image src={review.user.image} alt={review.user.name || "User"} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-xs text-muted-foreground uppercase">
                                                {review.user.name?.slice(0, 2) || "U"}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-sm text-foreground">{review.user.name}</h4>
                                        <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
                                    </div>
                                    <StarRating rating={review.rating} readOnly size={14} />
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl bg-secondary/5">
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                                <MessageSquare size={20} />
                            </div>
                            <h3 className="font-bold text-foreground">No reviews yet</h3>
                            <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-1">
                                Be the first to share your experience with the community.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}