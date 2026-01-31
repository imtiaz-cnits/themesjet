import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { Star, MessageSquare } from "lucide-react";
import { DeleteReviewButton, ToggleFeatureButton } from "@/components/admin/ReviewActions";
import EditReviewModal from "@/components/admin/EditReviewModal";

export default async function AdminReviewsPage() {
    const session = await auth();
    if (session?.user.role !== "ADMIN") redirect("/login");

    const reviews = await prisma.review.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true, image: true, email: true } },
            product: { select: { name: true, imageUrl: true } }
        }
    });

    return (
        <div className="space-y-8 w-full max-w-full">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Reviews</h1>
                    <p className="text-muted-foreground">Manage customer feedback.</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden w-full max-w-[calc(100vw-32px)] md:max-w-full mx-auto">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                        <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4">Comment</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <tr key={review.id} className="hover:bg-secondary/30 transition-colors">
                                    {/* Customer */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-secondary">
                                                {review.user.image ? (
                                                    <Image src={review.user.image} alt="User" fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center font-bold">{review.user.name?.charAt(0)}</div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">{review.user.name}</p>
                                                <p className="text-xs text-muted-foreground">{review.user.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Product */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-muted relative overflow-hidden">
                                                <Image src={review.product.imageUrl} alt="Prod" fill className="object-cover" />
                                            </div>
                                            <span className="font-medium truncate max-w-[150px]">{review.product.name}</span>
                                        </div>
                                    </td>

                                    {/* Rating */}
                                    <td className="px-6 py-4">
                                        <div className="flex gap-0.5 text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-muted-foreground/30" : ""} />
                                            ))}
                                        </div>
                                    </td>

                                    {/* Comment */}
                                    <td className="px-6 py-4">
                                        <p className="text-muted-foreground truncate max-w-[100px]" title={review.comment}>
                                            {review.comment}
                                        </p>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4 text-muted-foreground text-xs">
                                        {format(new Date(review.createdAt), "MMM dd, yyyy")}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <ToggleFeatureButton id={review.id} isFeatured={review.isFeatured} />

                                            {/* ADD EDIT MODAL HERE */}
                                            <EditReviewModal
                                                review={{
                                                    id: review.id,
                                                    rating: review.rating,
                                                    comment: review.comment,
                                                    userName: review.user.name || "User"
                                                }}
                                            />

                                            <DeleteReviewButton id={review.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <MessageSquare size={32} className="opacity-20" />
                                        <p>No reviews yet.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}