"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ReviewSchema = z.object({
    productId: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(3, "Comment is too short").max(1000),
});

// 1. Submit a Review
export async function createReview(data: { productId: string; rating: number; comment: string }) {
    const session = await auth();
    if (!session || !session.user) return { error: "You must be logged in to review." };

    const validated = ReviewSchema.safeParse(data);
    if (!validated.success) return { error: validated.error.issues[0].message };

    const { productId, rating, comment } = validated.data;

    try {
        // Optional: Check if user already reviewed this product to prevent spam
        const existing = await prisma.review.findFirst({
            where: { userId: session.user.id, productId }
        });

        if (existing) return { error: "You have already reviewed this product." };

        await prisma.review.create({
            data: {
                rating,
                comment,
                productId,
                userId: session.user.id
            }
        });

        revalidatePath(`/products/${productId}`);
        return { success: true };
    } catch (error) {
        return { error: "Failed to submit review." };
    }
}

// 2. Get Reviews for a Product
export async function getReviews(productId: string) {
    try {
        const reviews = await prisma.review.findMany({
            where: { productId },
            include: {
                user: {
                    select: { name: true, image: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return reviews;
    } catch (error) {
        return [];
    }
}


// --- ADMIN ACTIONS ---

// 3. Toggle Featured Status
export async function toggleReviewFeature(id: string, currentState: boolean) {
    const session = await auth();
    if (session?.user.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        await prisma.review.update({
            where: { id },
            data: { isFeatured: !currentState }
        });
        revalidatePath("/admin/reviews");
        revalidatePath("/"); // Revalidate home to update testimonials
        return { success: true };
    } catch (error) {
        return { error: "Failed to update review" };
    }
}

// 4. Delete Review (Admin)
export async function deleteReview(id: string) {
    const session = await auth();
    if (session?.user.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        await prisma.review.delete({ where: { id } });
        revalidatePath("/admin/reviews");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete review" };
    }
}

// 5. Fetch Featured Reviews (For Home Page)
export async function getFeaturedReviews() {
    try {
        return await prisma.review.findMany({
            where: { isFeatured: true },
            take: 3, // Limit to 3 for the homepage
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, image: true } }
            }
        });
    } catch (error) {
        return [];
    }
}

// 6. Update Review (Admin)
export async function updateReview(data: { id: string; rating: number; comment: string }) {
    const session = await auth();
    if (session?.user.role !== "ADMIN") return { error: "Unauthorized" };

    const { id, rating, comment } = data;

    if (!comment || comment.length < 3) return { error: "Comment is too short" };
    if (rating < 1 || rating > 5) return { error: "Invalid rating" };

    try {
        await prisma.review.update({
            where: { id },
            data: { rating, comment }
        });

        revalidatePath("/admin/reviews");
        revalidatePath("/"); // Update home page testimonials
        // We might also need to revalidate the specific product page if we knew the ID,
        // but for admin purposes, this is usually enough.

        return { success: true };
    } catch (error) {
        return { error: "Failed to update review" };
    }
}